"use client";

import { useState, useEffect, useRef, useTransition } from "react";
import {
  getAdminChatThreadsAction,
  getAdminThreadMessagesAction,
  sendAdminReplyAction,
} from "@/app/actions/chat";

interface ChatThread {
  id: string;
  visitor_name: string;
  visitor_contact?: string;
  status: string;
  last_message_at: string;
  created_at: string;
  unread_count: number;
  latest_message: string;
}

interface ChatMessage {
  id: string;
  thread_id: string;
  sender_type: "visitor" | "admin";
  content: string;
  created_at: string;
}

export default function AdminChatClient({
  initialThreads,
}: {
  initialThreads: ChatThread[];
}) {
  const [threads, setThreads] = useState<ChatThread[]>(initialThreads);
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(
    initialThreads.length > 0 ? initialThreads[0].id : null
  );
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [replyText, setReplyText] = useState("");
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isPending, startTransition] = useTransition();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Poll for threads and active messages every 4 seconds
  useEffect(() => {
    const refreshData = async () => {
      const threadRes = await getAdminChatThreadsAction();
      if (threadRes.success && threadRes.data) {
        setThreads(threadRes.data as ChatThread[]);
      }

      if (selectedThreadId) {
        const msgRes = await getAdminThreadMessagesAction(selectedThreadId);
        if (msgRes.success && msgRes.messages) {
          setMessages(msgRes.messages as ChatMessage[]);
        }
      }
    };

    const interval = setInterval(refreshData, 4000);
    return () => clearInterval(interval);
  }, [selectedThreadId]);

  // Load messages when selecting a thread
  useEffect(() => {
    if (!selectedThreadId) return;

    let isMounted = true;
    setIsLoadingMessages(true);

    getAdminThreadMessagesAction(selectedThreadId).then((res) => {
      if (isMounted) {
        if (res.success && res.messages) {
          setMessages(res.messages as ChatMessage[]);
        }
        setIsLoadingMessages(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [selectedThreadId]);

  // Scroll to bottom on message change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendReply = () => {
    if (!selectedThreadId || !replyText.trim()) return;
    const textToSend = replyText.trim();
    setReplyText("");

    // Optimistic message append
    const tempMsg: ChatMessage = {
      id: "temp_" + Date.now(),
      thread_id: selectedThreadId,
      sender_type: "admin",
      content: textToSend,
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, tempMsg]);

    startTransition(async () => {
      await sendAdminReplyAction(selectedThreadId, textToSend);
      const res = await getAdminThreadMessagesAction(selectedThreadId);
      if (res.success && res.messages) {
        setMessages(res.messages as ChatMessage[]);
      }
    });
  };

  const selectedThread = threads.find((t) => t.id === selectedThreadId) || threads[0];

  const cannedResponses = [
    "Hello! Thank you for reaching out to Ethiopian Signature Coffee. How can we help you today?",
    "Our Barista Academy cohorts start every month. Would you like to reserve a seat in the next class?",
    "For catering, please let us know your expected guest count and event date so we can prepare a quote.",
  ];

  return (
    <div className="flex flex-col gap-5">
      {/* Step-by-Step Guide for Visitor Chat */}
      <div className="p-4 rounded-xl bg-surface-container-lowest border border-surface-container-highest shadow-sm flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded bg-stitch-primary text-white flex items-center justify-center text-xs font-bold shrink-0">
            ?
          </span>
          <h2 className="font-semibold text-xs text-stitch-primary uppercase tracking-wider">
            Step-by-Step Guide: How to Chat with Website Visitors
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
          <div className="p-3 rounded-lg bg-surface-container-low border border-surface-container-highest flex items-start gap-2.5">
            <span className="w-5 h-5 rounded bg-stitch-primary text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
              1
            </span>
            <div className="flex flex-col">
              <span className="font-bold text-on-surface">Select a Visitor</span>
              <span className="text-[11px] text-on-surface-variant mt-0.5 leading-relaxed">
                Click any visitor from the list on the left to open their chat thread.
              </span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-surface-container-low border border-surface-container-highest flex items-start gap-2.5">
            <span className="w-5 h-5 rounded bg-stitch-secondary text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
              2
            </span>
            <div className="flex flex-col">
              <span className="font-bold text-on-surface">Read their Question</span>
              <span className="text-[11px] text-on-surface-variant mt-0.5 leading-relaxed">
                The full message history between you and this visitor is displayed in the middle window.
              </span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-surface-container-low border border-surface-container-highest flex items-start gap-2.5">
            <span className="w-5 h-5 rounded bg-[#25D366] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
              3
            </span>
            <div className="flex flex-col">
              <span className="font-bold text-on-surface">Type Reply &amp; Send</span>
              <span className="text-[11px] text-on-surface-variant mt-0.5 leading-relaxed">
                Type your answer below (or pick a Quick Reply) and hit <strong>Send</strong>. Visitors receive it immediately!
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="h-[700px] max-h-[75vh] rounded-xl bg-surface-container-lowest border border-surface-container-highest overflow-hidden flex flex-col sm:flex-row shadow-sm">
        {/* Threads Sidebar */}
        <div className="w-full sm:w-80 border-r border-surface-container-highest bg-surface-container-low/40 flex flex-col shrink-0">
          <div className="p-3.5 border-b border-surface-container-highest bg-surface-container-lowest flex items-center justify-between">
            <span className="font-serif font-semibold text-xs text-stitch-primary uppercase tracking-wider">
              Visitor Conversations
            </span>
            <span className="text-[11px] text-on-surface-variant font-bold">
              {threads.length} Total
            </span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-surface-container-highest">
            {threads.length === 0 ? (
              <div className="p-8 text-center flex flex-col items-center justify-center gap-2 text-on-surface-variant">
                <span className="material-symbols-outlined text-2xl text-outline">mark_chat_read</span>
                <span className="text-xs font-medium text-on-surface">No Active Chats</span>
                <span className="text-[11px] text-on-surface-variant leading-relaxed">
                  Incoming questions from site visitors will appear here.
                </span>
              </div>
            ) : (
              threads.map((thread) => {
                const isSelected = thread.id === selectedThreadId;
                return (
                  <button
                    key={thread.id}
                    className={`w-full p-3.5 text-left flex flex-col gap-1 transition-colors relative ${
                      isSelected
                        ? "bg-surface-container-lowest border-l-3 border-stitch-primary shadow-xs"
                        : "hover:bg-surface-container-low/60"
                    }`}
                    type="button"
                    onClick={() => setSelectedThreadId(thread.id)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-on-surface truncate max-w-[170px]">
                        {thread.visitor_name}
                      </span>
                      <span className="text-[10px] text-on-surface-variant font-mono">
                        {new Date(thread.last_message_at).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    <p className="text-[11px] text-on-surface-variant truncate leading-snug">
                      {thread.latest_message}
                    </p>

                    <div className="flex items-center justify-between pt-0.5">
                      <span className="text-[10px] text-on-surface-variant truncate max-w-[160px] font-mono">
                        {thread.visitor_contact || "Website Guest"}
                      </span>
                      {thread.unread_count > 0 && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-stitch-primary text-white">
                          {thread.unread_count} new
                        </span>
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Conversation Thread & Reply Panel */}
        <div className="flex-1 flex flex-col bg-surface min-w-0">
          {selectedThread ? (
            <>
              {/* Thread Header */}
              <div className="px-5 py-3.5 border-b border-surface-container-highest flex items-center justify-between bg-surface-container-lowest">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-surface-container-low border border-surface-container-highest text-stitch-primary flex items-center justify-center font-serif font-bold text-sm">
                    {selectedThread.visitor_name.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-serif font-semibold text-sm text-stitch-primary">
                      {selectedThread.visitor_name}
                    </span>
                    <span className="text-xs text-on-surface-variant font-mono">
                      {selectedThread.visitor_contact || "Online Visitor"}
                    </span>
                  </div>
                </div>

                {selectedThread.visitor_contact && (
                  <a
                    className="px-3 py-1.5 rounded-lg bg-[#25D366]/15 text-[#0d472a] hover:bg-[#25D366] hover:text-white transition-colors text-xs font-semibold flex items-center gap-1.5"
                    href={`https://wa.me/${selectedThread.visitor_contact.replace(/[^0-9]/g, "")}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="material-symbols-outlined text-sm">chat</span>
                    <span>Chat on WhatsApp</span>
                  </a>
                )}
              </div>

              {/* Messages Stream */}
              <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-3.5 bg-surface-container-low/30">
                {isLoadingMessages ? (
                  <div className="py-12 text-center text-xs text-on-surface-variant">
                    Loading messages...
                  </div>
                ) : messages.length === 0 ? (
                  <div className="py-12 text-center text-xs text-on-surface-variant">
                    No messages in this chat yet.
                  </div>
                ) : (
                  messages.map((msg) => {
                    const isAdmin = msg.sender_type === "admin";
                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col max-w-[80%] ${
                          isAdmin ? "items-end self-end" : "items-start self-start"
                        }`}
                      >
                        <div
                          className={`p-3.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                            isAdmin
                              ? "rounded-tr-sm bg-stitch-primary text-white"
                              : "rounded-tl-sm bg-surface-container-lowest border border-surface-container-highest text-on-surface"
                          }`}
                        >
                          <span className="font-bold block mb-1 text-[10px] opacity-80 uppercase tracking-wider">
                            {isAdmin ? "You (Admin)" : selectedThread.visitor_name}
                          </span>
                          {msg.content}
                        </div>
                        <span className="text-[10px] text-on-surface-variant font-mono mt-1 px-1">
                          {new Date(msg.created_at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Canned Quick Replies */}
              <div className="px-4 py-2 border-t border-surface-container-highest bg-surface-container-lowest flex items-center gap-2 overflow-x-auto scrollbar-none">
                <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant whitespace-nowrap">
                  Click to reply fast:
                </span>
                {cannedResponses.map((canned, i) => (
                  <button
                    key={i}
                    className="px-2.5 py-1 rounded bg-surface-container-low hover:bg-surface-container text-stitch-primary text-[11px] whitespace-nowrap transition-colors border border-surface-container-highest font-medium"
                    type="button"
                    onClick={() => setReplyText(canned)}
                  >
                    {canned.substring(0, 36)}...
                  </button>
                ))}
              </div>

              {/* Reply Input Bar */}
              <div className="p-3.5 border-t border-surface-container-highest bg-surface-container-lowest flex items-center gap-2">
                <textarea
                  className="flex-1 px-3 py-2 rounded-lg bg-surface-container-low border border-surface-container-highest text-xs text-on-surface outline-none focus:border-stitch-primary resize-none placeholder:text-on-surface-variant"
                  placeholder="Type your message to the visitor here..."
                  rows={1}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendReply();
                    }
                  }}
                />
                <button
                  className="px-4 py-2 rounded-lg bg-stitch-primary hover:bg-stitch-primary-container text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors disabled:opacity-50 shrink-0 shadow-sm"
                  disabled={isPending || !replyText.trim()}
                  type="button"
                  onClick={handleSendReply}
                >
                  <span>Send</span>
                  <span className="material-symbols-outlined text-sm">send</span>
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-on-surface-variant gap-3">
              <div className="w-14 h-14 rounded-2xl bg-surface-container-low text-stitch-secondary flex items-center justify-center shadow-xs">
                <span className="material-symbols-outlined text-3xl">chat_bubble</span>
              </div>
              <div className="flex flex-col gap-1 max-w-sm">
                <p className="text-sm font-semibold text-on-surface">Concierge Inbox Ready</p>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  No active visitor conversations yet. When visitors click the concierge chat bubble on your website, their questions and details will arrive here in real time.
                </p>
              </div>
              <a
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stitch-primary text-white text-xs font-semibold hover:bg-stitch-primary-container transition-colors mt-1"
                href="/"
                target="_blank"
              >
                <span>Preview Public Chat Bubble</span>
                <span className="material-symbols-outlined text-xs">open_in_new</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
