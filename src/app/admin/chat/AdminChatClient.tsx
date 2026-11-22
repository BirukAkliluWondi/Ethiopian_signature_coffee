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
    <div className="h-[750px] max-h-[80vh] rounded-xl bg-surface-container-lowest border border-surface-container-highest overflow-hidden flex flex-col sm:flex-row shadow-sm">
      {/* Threads Sidebar */}
      <div className="w-full sm:w-80 border-r border-surface-container-highest bg-surface-container-low/40 flex flex-col shrink-0">
        <div className="p-3.5 border-b border-surface-container-highest bg-surface-container-lowest flex items-center justify-between">
          <span className="font-serif font-semibold text-xs text-stitch-primary uppercase tracking-wider">
            Concierge Conversations
          </span>
          <span className="text-[11px] text-on-surface-variant font-mono font-bold">
            {threads.length} Total
          </span>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-surface-container-highest">
          {threads.length === 0 ? (
            <div className="p-6 text-center text-xs text-on-surface-variant">
              No chat conversations initiated yet. Visitor messages from the public site will arrive here.
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
                      {thread.visitor_contact || "Anonymous Guest"}
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
                    {selectedThread.visitor_contact || "Contact not provided yet"}
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
                  <span>WhatsApp Visitor</span>
                </a>
              )}
            </div>

            {/* Messages Stream */}
            <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-3.5 bg-surface-container-low/30">
              {isLoadingMessages ? (
                <div className="py-12 text-center text-xs text-on-surface-variant">
                  Loading conversation history...
                </div>
              ) : messages.length === 0 ? (
                <div className="py-12 text-center text-xs text-on-surface-variant">
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
                        className={`p-3.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                          isAdmin
                            ? "rounded-tr-sm bg-stitch-primary text-white"
                            : "rounded-tl-sm bg-surface-container-lowest border border-surface-container-highest text-on-surface"
                        }`}
                      >
                        <span className="font-bold block mb-1 text-[10px] opacity-80 uppercase tracking-wider">
                          {isAdmin ? "You (Admin Desk)" : selectedThread.visitor_name}
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
                Quick Reply:
              </span>
              {cannedResponses.map((canned, i) => (
                <button
                  key={i}
                  className="px-2.5 py-1 rounded bg-surface-container-low hover:bg-surface-container text-stitch-primary text-[11px] whitespace-nowrap transition-colors border border-surface-container-highest font-medium"
                  type="button"
                  onClick={() => setReplyText(canned)}
                >
                  {canned.substring(0, 32)}...
                </button>
              ))}
            </div>

            {/* Reply Input Bar */}
            <div className="p-3.5 border-t border-surface-container-highest bg-surface-container-lowest flex items-center gap-2">
              <textarea
                className="flex-1 px-3 py-2 rounded-lg bg-surface-container-low border border-surface-container-highest text-xs text-on-surface outline-none focus:border-stitch-primary resize-none placeholder:text-on-surface-variant"
                placeholder="Type your response to the visitor (they will receive it asynchronously)..."
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
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-on-surface-variant">
            <span className="material-symbols-outlined text-4xl text-outline mb-2">forum</span>
            <p className="text-sm font-semibold text-on-surface">No Conversation Selected</p>
            <p className="text-xs text-on-surface-variant mt-1 max-w-xs">
              Select a visitor conversation from the left inbox to view messages and reply.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
