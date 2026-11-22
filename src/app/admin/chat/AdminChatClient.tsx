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
    "Thank you for contacting Ethiopian Signature Coffee! How can we assist with your venue concept?",
    "Our Barista Academy cohorts run every month. Would you like to reserve a seat in the upcoming class?",
    "For catering inquiries, please share your expected guest count and event date so we can prepare a quote.",
  ];

  return (
    <div className="h-[750px] max-h-[80vh] rounded-2xl bg-stone-900 border border-stone-800 overflow-hidden flex flex-col sm:flex-row shadow-sm">
      {/* Threads Sidebar */}
      <div className="w-full sm:w-80 border-r border-stone-800 bg-stone-950/40 flex flex-col shrink-0">
        <div className="p-4 border-b border-stone-800 flex items-center justify-between">
          <span className="font-serif font-bold text-sm text-white">
            Concierge Conversations
          </span>
          <span className="text-xs text-stone-400 font-mono">
            {threads.length} Total
          </span>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-stone-800/60">
          {threads.length === 0 ? (
            <div className="p-6 text-center text-xs text-stone-500">
              No chat conversations initiated yet. Visitor messages from the public site will arrive here.
            </div>
          ) : (
            threads.map((thread) => {
              const isSelected = thread.id === selectedThreadId;
              return (
                <button
                  key={thread.id}
                  className={`w-full p-4 text-left flex flex-col gap-1.5 transition-colors relative ${
                    isSelected
                      ? "bg-brand-green/15 border-l-2 border-brand-yellow"
                      : "hover:bg-stone-800/40"
                  }`}
                  type="button"
                  onClick={() => setSelectedThreadId(thread.id)}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-white truncate max-w-[170px]">
                      {thread.visitor_name}
                    </span>
                    <span className="text-[10px] text-stone-500 font-mono">
                      {new Date(thread.last_message_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  <p className="text-[11px] text-stone-400 truncate leading-snug">
                    {thread.latest_message}
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-stone-500 truncate max-w-[160px]">
                      {thread.visitor_contact || "Anonymous Guest"}
                    </span>
                    {thread.unread_count > 0 && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-brand-yellow text-stone-950">
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
      <div className="flex-1 flex flex-col bg-stone-900 min-w-0">
        {selectedThread ? (
          <>
            {/* Thread Header */}
            <div className="px-6 py-4 border-b border-stone-800 flex items-center justify-between bg-stone-900/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-green/20 border border-brand-green/40 text-brand-yellow flex items-center justify-center font-bold text-sm">
                  {selectedThread.visitor_name.substring(0, 2).toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <span className="font-serif font-bold text-sm text-white">
                    {selectedThread.visitor_name}
                  </span>
                  <span className="text-xs text-stone-400 font-mono">
                    {selectedThread.visitor_contact || "Contact not provided yet"}
                  </span>
                </div>
              </div>

              {selectedThread.visitor_contact && (
                <a
                  className="px-3 py-1.5 rounded-lg bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors text-xs font-semibold flex items-center gap-1.5"
                  href={`https://wa.me/${selectedThread.visitor_contact.replace(/[^0-9]/g, "")}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="material-symbols-outlined text-sm">chat</span>
                  <span>WhatsApp Visitor</span>
                </a>
              )}
            </div>

            {/* Messages Stream */}
            <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4 bg-stone-950/20">
              {isLoadingMessages ? (
                <div className="py-12 text-center text-xs text-stone-500">
                  Loading conversation history...
                </div>
              ) : messages.length === 0 ? (
                <div className="py-12 text-center text-xs text-stone-500">
                  No messages exchanged in this thread yet.
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
                        className={`p-4 rounded-2xl text-xs leading-relaxed shadow-sm ${
                          isAdmin
                            ? "rounded-tr-sm bg-brand-green text-white"
                            : "rounded-tl-sm bg-stone-800 border border-stone-700 text-stone-100"
                        }`}
                      >
                        <span className="font-semibold block mb-1 text-[11px] opacity-80">
                          {isAdmin ? "You (Admin Desk)" : selectedThread.visitor_name}
                        </span>
                        {msg.content}
                      </div>
                      <span className="text-[10px] text-stone-500 mt-1 px-1">
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

            {/* Canned Responses */}
            <div className="px-6 py-2 bg-stone-950/40 border-t border-stone-800/80 flex items-center gap-2 overflow-x-auto scrollbar-none">
              <span className="text-[10px] uppercase font-bold text-stone-500 shrink-0">Quick Canned:</span>
              {cannedResponses.map((cr, idx) => (
                <button
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-stone-800 hover:bg-stone-700 text-stone-300 text-[11px] whitespace-nowrap transition-colors border border-stone-700 shrink-0"
                  type="button"
                  onClick={() => setReplyText(cr)}
                >
                  <span>{cr.substring(0, 32)}...</span>
                </button>
              ))}
            </div>

            {/* Reply Input Bar */}
            <div className="p-4 bg-stone-900 border-t border-stone-800 flex items-center gap-3">
              <input
                className="flex-1 px-4 py-3 rounded-xl bg-stone-800 border border-stone-700 text-xs text-white placeholder:text-stone-500 outline-none focus:border-brand-yellow transition-all"
                disabled={isPending}
                placeholder="Type your response to the visitor..."
                type="text"
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
                className="px-6 py-3 rounded-xl bg-brand-yellow hover:bg-brand-yellow-light text-stone-950 font-bold text-xs uppercase tracking-wider transition-all shadow-cozy flex items-center gap-2 active:scale-95 disabled:opacity-50 shrink-0"
                disabled={!replyText.trim() || isPending}
                type="button"
                onClick={handleSendReply}
              >
                <span>{isPending ? "Sending..." : "Send Reply"}</span>
                <span className="material-symbols-outlined text-base">send</span>
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-xs text-stone-500">
            Select a conversation on the left to review messages and reply.
          </div>
        )}
      </div>
    </div>
  );
}
