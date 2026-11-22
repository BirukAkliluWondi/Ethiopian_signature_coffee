"use client";

import { useState, useEffect, useRef, useTransition } from "react";
import {
  getThreadMessagesAction,
  sendVisitorMessageAction,
} from "@/app/actions/chat";

interface ChatMessage {
  id: string;
  sender_type: "visitor" | "admin";
  content: string;
  created_at: string;
}

interface ConciergeChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConciergeChatModal({
  isOpen,
  onClose,
}: ConciergeChatModalProps) {
  const [visitorToken, setVisitorToken] = useState<string>("");
  const [visitorName, setVisitorName] = useState<string>("");
  const [visitorContact, setVisitorContact] = useState<string>("");
  const [showContactPrompt, setShowContactPrompt] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize or read visitor token
  useEffect(() => {
    if (typeof window === "undefined") return;

    let token = localStorage.getItem("signature_concierge_token");
    if (!token) {
      token = "vt_" + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
      localStorage.setItem("signature_concierge_token", token);
    }
    setVisitorToken(token);

    const savedName = localStorage.getItem("signature_concierge_name");
    const savedContact = localStorage.getItem("signature_concierge_contact");
    if (savedName) setVisitorName(savedName);
    if (savedContact) setVisitorContact(savedContact);
  }, []);

  // Poll for messages when open
  useEffect(() => {
    if (!isOpen || !visitorToken) return;

    const loadMessages = async () => {
      const res = await getThreadMessagesAction(visitorToken);
      if (res.success && res.messages) {
        setMessages(res.messages as ChatMessage[]);
      }
    };

    loadMessages();
    const interval = setInterval(loadMessages, 5000); // 5s asynchronous polling
    return () => clearInterval(interval);
  }, [isOpen, visitorToken]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim() || !visitorToken) return;
    const currentInput = inputMessage.trim();
    setInputMessage("");

    // Optimistically append visitor message
    const tempMsg: ChatMessage = {
      id: "temp_" + Date.now(),
      sender_type: "visitor",
      content: currentInput,
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, tempMsg]);

    // If contact info is missing, show prompt
    if (!visitorContact) {
      setShowContactPrompt(true);
    }

    startTransition(async () => {
      await sendVisitorMessageAction(
        visitorToken,
        currentInput,
        visitorName || undefined,
        visitorContact || undefined
      );
      const res = await getThreadMessagesAction(visitorToken);
      if (res.success && res.messages) {
        setMessages(res.messages as ChatMessage[]);
      }
    });
  };

  const handleSaveContact = () => {
    if (typeof window !== "undefined") {
      if (visitorName) localStorage.setItem("signature_concierge_name", visitorName);
      if (visitorContact) localStorage.setItem("signature_concierge_contact", visitorContact);
    }
    setShowContactPrompt(false);
  };

  if (!isOpen) return null;

  return (
    <div
      aria-labelledby="concierge-chat-title"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end p-0 sm:p-6 bg-black/40 backdrop-blur-sm transition-all"
      role="dialog"
    >
      <div className="w-full sm:w-[420px] h-[92vh] sm:h-[620px] max-h-[92vh] bg-surface-white sm:rounded-2xl shadow-cozy-lg border border-border-subtle flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="px-5 py-4 bg-brand-green text-white flex items-center justify-between border-b border-brand-green-dark">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-yellow/20 border border-brand-yellow/40 flex items-center justify-center text-brand-yellow">
              <span className="material-symbols-outlined text-lg">support_agent</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-sm tracking-wide" id="concierge-chat-title">
                Signature Concierge
              </span>
              <span className="text-[11px] text-white/70 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow" />
                <span>Asynchronous Advisory Desk</span>
              </span>
            </div>
          </div>
          <button
            aria-label="Close Chat"
            className="w-8 h-8 rounded-lg hover:bg-white/10 text-white/80 hover:text-white flex items-center justify-center transition-colors"
            type="button"
            onClick={onClose}
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Contact info banner / prompt */}
        {showContactPrompt && (
          <div className="p-3 bg-surface-cream border-b border-border-subtle flex flex-col gap-2 text-xs">
            <span className="text-text-muted leading-relaxed">
              <strong>Stay Connected:</strong> Leave your phone or WhatsApp so we can notify you when an advisor replies, even if you close this tab.
            </span>
            <div className="grid grid-cols-2 gap-2">
              <input
                className="px-2.5 py-1.5 rounded-lg border border-border-subtle bg-white text-xs outline-none focus:border-brand-green"
                placeholder="Your Name (optional)"
                type="text"
                value={visitorName}
                onChange={(e) => setVisitorName(e.target.value)}
              />
              <input
                className="px-2.5 py-1.5 rounded-lg border border-border-subtle bg-white text-xs outline-none focus:border-brand-green"
                placeholder="Phone or WhatsApp"
                type="tel"
                value={visitorContact}
                onChange={(e) => setVisitorContact(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <button
                className="text-[11px] text-text-muted hover:text-text-main px-2 py-1"
                type="button"
                onClick={() => setShowContactPrompt(false)}
              >
                Dismiss
              </button>
              <button
                className="text-[11px] bg-brand-green text-white font-semibold px-3 py-1 rounded-md hover:bg-brand-green-dark"
                type="button"
                onClick={handleSaveContact}
              >
                Save Contact
              </button>
            </div>
          </div>
        )}

        {/* Message Thread */}
        <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 bg-surface-cream/40">
          {/* Welcome greeting */}
          <div className="flex flex-col items-start max-w-[85%] self-start">
            <div className="p-3.5 rounded-2xl rounded-tl-sm bg-surface-white border border-border-subtle text-xs text-text-main shadow-cozy-sm leading-relaxed">
              <span className="font-semibold block mb-1 text-brand-green">Ethiopian Signature Advisory</span>
              Welcome! How can our advisory team assist with your coffee shop setup, barista training, or catering event today? You can send your question now, and our team will reply directly here.
            </div>
            <span className="text-[10px] text-text-muted mt-1 px-1">Desk Automated Welcome</span>
          </div>

          {/* Dynamic messages */}
          {messages.map((msg) => {
            const isVisitor = msg.sender_type === "visitor";
            return (
              <div
                key={msg.id}
                className={`flex flex-col max-w-[85%] ${
                  isVisitor ? "items-end self-end" : "items-start self-start"
                }`}
              >
                <div
                  className={`p-3.5 rounded-2xl text-xs leading-relaxed shadow-cozy-sm ${
                    isVisitor
                      ? "rounded-tr-sm bg-brand-green text-white"
                      : "rounded-tl-sm bg-surface-white border border-border-subtle text-text-main"
                  }`}
                >
                  {!isVisitor && (
                    <span className="font-semibold block mb-1 text-brand-green">
                      Senior Consultant
                    </span>
                  )}
                  {msg.content}
                </div>
                <span className="text-[10px] text-text-muted mt-1 px-1">
                  {new Date(msg.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick WhatsApp Switch Link */}
        <div className="px-4 py-1.5 bg-surface-cream border-t border-border-subtle/80 flex items-center justify-between text-[11px] text-text-muted">
          <span>Need immediate voice or WhatsApp response?</span>
          <a
            className="text-brand-green font-semibold hover:underline flex items-center gap-1"
            href="https://wa.me/251925451711"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span>Open WhatsApp</span>
            <span className="material-symbols-outlined text-xs">arrow_outward</span>
          </a>
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-surface-white border-t border-border-subtle flex items-center gap-2">
          <input
            className="flex-1 px-3.5 py-2.5 rounded-xl border border-border-subtle bg-surface-cream text-xs outline-none focus:border-brand-green focus:bg-white transition-all placeholder:text-text-muted/60"
            disabled={isPending}
            placeholder="Type your message..."
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <button
            aria-label="Send Message"
            className="w-10 h-10 rounded-xl bg-brand-green hover:bg-brand-green-dark text-white flex items-center justify-center transition-all disabled:opacity-50 shadow-cozy-sm shrink-0 active:scale-95"
            disabled={!inputMessage.trim() || isPending}
            type="button"
            onClick={handleSendMessage}
          >
            <span className="material-symbols-outlined text-lg">send</span>
          </button>
        </div>
      </div>
    </div>
  );
}
