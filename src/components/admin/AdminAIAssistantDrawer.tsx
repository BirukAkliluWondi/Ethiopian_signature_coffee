"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface Message {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: string;
}

const STARTER_PROMPTS = [
  "How do I export registered students to Excel?",
  "How do I create a course with custom questions?",
  "Where do contact form messages arrive?",
  "How do I replace the hero banner image?",
  "Explain the database schema for enrollments.",
];

export default function AdminAIAssistantDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputQuery, setInputQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [userApiKey, setUserApiKey] = useState("");
  const [tempApiKey, setTempApiKey] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load chat history & custom API key from localStorage on mount
  useEffect(() => {
    setMounted(true);
    try {
      const savedKey = localStorage.getItem("admin_gemini_api_key") || "";
      setUserApiKey(savedKey);
      setTempApiKey(savedKey);

      const savedChat = localStorage.getItem("admin_copilot_history");
      if (savedChat) {
        setMessages(JSON.parse(savedChat));
      }
    } catch (e) {
      console.error("Failed to load Copilot localStorage", e);
    }
  }, []);

  // Save chat history to localStorage
  useEffect(() => {
    try {
      if (messages.length > 0) {
        localStorage.setItem("admin_copilot_history", JSON.stringify(messages));
      }
    } catch (e) {
      console.error("Failed to save Copilot history", e);
    }
  }, [messages]);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isLoading]);

  // Focus textarea when drawer opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => textareaRef.current?.focus(), 250);
    }
  }, [isOpen]);

  // Global ESC key listener to close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSaveApiKey = () => {
    const trimmed = tempApiKey.trim();
    setUserApiKey(trimmed);
    localStorage.setItem("admin_gemini_api_key", trimmed);
    setShowSettings(false);
  };

  const handleClearChat = () => {
    setMessages([]);
    localStorage.removeItem("admin_copilot_history");
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query || isLoading) return;

    const userMsg: Message = {
      id: `usr_${Date.now()}`,
      role: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          history: messages.map((m) => ({ role: m.role, text: m.text })),
          userApiKey: userApiKey || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Server responded with ${response.status}`);
      }

      const modelMsg: Message = {
        id: `bot_${Date.now()}`,
        role: "model",
        text: data.answer || "No response received.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, modelMsg]);
    } catch (err: any) {
      const errorMsg: Message = {
        id: `err_${Date.now()}`,
        role: "model",
        text: `⚠️ **Unable to complete request**: ${err.message || "Network error. Please try again."}`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Dimmed Backdrop */}
      <div
        className="fixed inset-0 bg-stone-950/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Slide-Over Drawer Container */}
      <div className="relative w-full sm:w-[480px] h-full bg-[#fcf9f8] border-l border-surface-container-highest shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="h-16 px-5 border-b border-surface-container-highest bg-surface-container-lowest flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-stitch-primary text-stitch-tertiary-fixed flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-sm text-stitch-primary">Admin Copilot</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-stitch-primary/10 text-stitch-primary font-bold tracking-tight">
                  Gemini 2.0
                </span>
              </div>
              <span className="text-[11px] text-on-surface-variant font-medium">
                Live Codebase & Operations Guide
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-on-surface-variant">
            <button
              aria-label="API Key Settings"
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                showSettings ? "bg-stitch-primary text-white" : "hover:bg-surface-container hover:text-stitch-primary"
              }`}
              title="Configure Gemini API Key"
              type="button"
              onClick={() => setShowSettings(!showSettings)}
            >
              <span className="material-symbols-outlined text-lg">settings</span>
            </button>

            <button
              aria-label="Clear Chat History"
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-surface-container hover:text-stitch-error transition-colors"
              title="Clear conversation"
              type="button"
              onClick={handleClearChat}
            >
              <span className="material-symbols-outlined text-lg">delete_sweep</span>
            </button>

            <button
              aria-label="Close Copilot"
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-surface-container hover:text-stitch-primary transition-colors ml-1"
              type="button"
              onClick={onClose}
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>
        </div>

        {/* Optional Collapsible API Key Settings Drawer Section */}
        {showSettings && (
          <div className="p-4 bg-surface-container-low border-b border-surface-container-highest shrink-0 flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stitch-primary flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">key</span>
                <span>Google Gemini API Key (100% Free)</span>
              </span>
              <a
                className="text-[11px] text-stitch-secondary hover:underline font-semibold flex items-center gap-0.5"
                href="https://aistudio.google.com"
                rel="noreferrer"
                target="_blank"
              >
                <span>Get free key</span>
                <span className="material-symbols-outlined text-[12px]">launch</span>
              </a>
            </div>
            <p className="text-[11px] text-on-surface-variant leading-relaxed">
              If not set in your server <code className="bg-surface-container px-1 py-0.5 rounded font-mono text-[10px]">.env.local</code> (as <code className="font-mono text-[10px]">GEMINI_API_KEY</code>), you can paste your key below to save it locally in your browser.
            </p>
            <div className="flex items-center gap-2">
              <input
                className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-surface-container-highest bg-white text-on-surface focus:outline-none focus:ring-1 focus:ring-stitch-primary font-mono"
                placeholder="AIzaSy..."
                type="password"
                value={tempApiKey}
                onChange={(e) => setTempApiKey(e.target.value)}
              />
              <button
                className="px-3 py-1.5 bg-stitch-primary text-white rounded-lg text-xs font-semibold hover:bg-stitch-primary/90 transition-colors"
                type="button"
                onClick={handleSaveApiKey}
              >
                Save
              </button>
            </div>
          </div>
        )}

        {/* Chat History Viewport */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 flex flex-col gap-4">
          {messages.length === 0 ? (
            <div className="my-auto flex flex-col items-center text-center max-w-sm mx-auto py-6">
              <div className="w-12 h-12 rounded-xl bg-stitch-primary/10 text-stitch-primary flex items-center justify-center mb-3">
                <span className="material-symbols-outlined text-2xl">chat</span>
              </div>
              <h3 className="font-serif font-bold text-base text-stitch-primary mb-1">
                How can I assist your operations?
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed mb-6">
                I know every feature, button, database table, and server action in this admin panel. Ask anything or pick a quick topic below:
              </p>

              <div className="w-full flex flex-col gap-2">
                {STARTER_PROMPTS.map((prompt, index) => (
                  <button
                    key={index}
                    className="w-full p-2.5 rounded-xl bg-white border border-surface-container-highest hover:border-stitch-primary/40 hover:bg-surface-container-low text-left text-xs font-medium text-on-surface transition-all flex items-center justify-between group shadow-2xs"
                    type="button"
                    onClick={() => handleSendMessage(prompt)}
                  >
                    <span>{prompt}</span>
                    <span className="material-symbols-outlined text-sm text-outline group-hover:text-stitch-primary group-hover:translate-x-0.5 transition-all">
                      arrow_forward
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col gap-1 ${m.role === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`p-3.5 rounded-2xl text-xs leading-relaxed max-w-[94%] ${
                      m.role === "user"
                        ? "bg-stitch-primary text-white rounded-tr-xs shadow-xs"
                        : "bg-white text-on-surface border border-surface-container-highest rounded-tl-xs shadow-2xs"
                    }`}
                  >
                    <div className="prose prose-xs max-w-none text-current">
                      <FormattedMarkdown content={m.text} />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 px-1">
                    <span className="text-[10px] text-outline">{m.timestamp}</span>
                    {m.role === "model" && (
                      <button
                        className="text-[10px] text-outline hover:text-stitch-primary flex items-center gap-0.5"
                        type="button"
                        onClick={() => handleCopyText(m.id, m.text)}
                      >
                        <span className="material-symbols-outlined text-[12px]">
                          {copiedId === m.id ? "check" : "content_copy"}
                        </span>
                        <span>{copiedId === m.id ? "Copied" : "Copy"}</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex flex-col items-start gap-1">
                  <div className="p-3.5 rounded-2xl rounded-tl-xs bg-white border border-surface-container-highest text-xs text-on-surface shadow-2xs flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-stitch-primary animate-ping" />
                    <span className="text-on-surface-variant font-medium">Consulting codebase & workflows...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-surface-container-highest bg-surface-container-lowest shrink-0">
          <form
            className="flex items-end gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
          >
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-surface-container-highest bg-white text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-stitch-primary resize-none max-h-28 min-h-[42px] leading-relaxed"
                placeholder="Ask how to do anything in the admin panel..."
                rows={1}
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
            </div>

            <button
              aria-label="Send Query"
              className="h-[42px] px-3.5 rounded-xl bg-stitch-primary text-white hover:bg-stitch-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center shrink-0 shadow-xs"
              disabled={isLoading || !inputQuery.trim()}
              type="submit"
            >
              <span className="material-symbols-outlined text-lg">arrow_upward</span>
            </button>
          </form>
          <div className="mt-1.5 flex items-center justify-between px-1">
            <span className="text-[10px] text-outline">Press Enter to send, Shift+Enter for newline</span>
            <span className="text-[10px] text-outline">Press Esc to close</span>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

/**
 * Lightweight, zero-dependency Markdown formatter for structured Copilot answers.
 */
function FormattedMarkdown({ content }: { content: string }) {
  // Simple paragraph & line parser
  const lines = content.split("\n");

  return (
    <div className="space-y-1.5">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} className="h-1.5" />;
        }

        // Headers
        if (trimmed.startsWith("### ")) {
          return (
            <h4 key={idx} className="font-serif font-bold text-xs text-stitch-primary mt-2 mb-1">
              {trimmed.replace("### ", "")}
            </h4>
          );
        }
        if (trimmed.startsWith("## ")) {
          return (
            <h3 key={idx} className="font-serif font-bold text-sm text-stitch-primary mt-2 mb-1">
              {trimmed.replace("## ", "")}
            </h3>
          );
        }

        // Ordered list item (e.g. 1. step)
        const matchNumber = trimmed.match(/^(\d+)\.\s+(.*)/);
        if (matchNumber) {
          return (
            <div key={idx} className="flex items-start gap-1.5 pl-1 my-0.5">
              <span className="font-bold text-stitch-primary shrink-0">{matchNumber[1]}.</span>
              <div>{renderFormattedSpans(matchNumber[2])}</div>
            </div>
          );
        }

        // Unordered list item (e.g. - item or * item)
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          return (
            <div key={idx} className="flex items-start gap-1.5 pl-1 my-0.5">
              <span className="text-stitch-primary shrink-0 leading-tight">•</span>
              <div>{renderFormattedSpans(trimmed.substring(2))}</div>
            </div>
          );
        }

        return <p key={idx}>{renderFormattedSpans(trimmed)}</p>;
      })}
    </div>
  );
}

/**
 * Parses bold text (**bold**) and inline code (`code`) within a line.
 */
function renderFormattedSpans(text: string) {
  // Split by inline code `...`
  const codeParts = text.split(/(`[^`]+`)/g);

  return codeParts.map((part, pIdx) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={pIdx}
          className="px-1 py-0.5 rounded bg-surface-container text-stitch-primary font-mono text-[10px] border border-surface-container-highest"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    // Split by bold **...**
    const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
    return boldParts.map((bPart, bIdx) => {
      if (bPart.startsWith("**") && bPart.endsWith("**")) {
        return (
          <strong key={`${pIdx}_${bIdx}`} className="font-semibold text-on-surface">
            {bPart.slice(2, -2)}
          </strong>
        );
      }
      return <span key={`${pIdx}_${bIdx}`}>{bPart}</span>;
    });
  });
}
