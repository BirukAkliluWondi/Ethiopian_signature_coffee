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
      {/* Main Chat Interface */}
      <div className="h-[calc(100vh-12rem)] min-h-[540px] max-h-[780px] rounded-xl bg-white border border-slate-200/80 overflow-hidden flex flex-col sm:flex-row shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
        {/* Threads Sidebar */}
        <div className="w-full sm:w-80 border-r border-slate-200/80 bg-slate-50/50 flex flex-col shrink-0">
          <div className="p-4 border-b border-slate-100 bg-white flex items-center justify-between">
            <span className="font-bold text-xs text-slate-900 uppercase tracking-wider">
              Conversations
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[11px] font-bold">
              {threads.length}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {threads.length === 0 ? (
              <div className="p-8 text-center flex flex-col items-center justify-center gap-2 text-slate-500">
                <span className="material-symbols-outlined text-2xl text-slate-300">mark_chat_read</span>
                <span className="text-xs font-semibold text-slate-700">No Active Chats</span>
                <span className="text-[11px] text-slate-400 leading-relaxed">
                  Incoming visitor questions will appear here.
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
                        ? "bg-white border-l-3 border-[#062b18] shadow-2xs"
                        : "hover:bg-slate-100/70"
                    }`}
                    type="button"
                    onClick={() => setSelectedThreadId(thread.id)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-slate-900 truncate max-w-[170px]">
                        {thread.visitor_name}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {new Date(thread.last_message_at).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 truncate leading-snug">
                      {thread.latest_message}
                    </p>

                    <div className="flex items-center justify-between pt-0.5">
                      <span className="text-[10px] text-slate-400 truncate max-w-[160px] font-mono">
                        {thread.visitor_contact || "Website Guest"}
                      </span>
                      {thread.unread_count > 0 && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#062b18] text-white">
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
        <div className="flex-1 flex flex-col bg-slate-50/40 min-w-0">
          {selectedThread ? (
            <>
              {/* Thread Header */}
              <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-white">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200 text-[#062b18] flex items-center justify-center font-bold text-xs">
                    {selectedThread.visitor_name.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-sm text-slate-900">
                      {selectedThread.visitor_name}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      {selectedThread.visitor_contact || "Online Visitor"}
                    </span>
                  </div>
                </div>

                {selectedThread.visitor_contact && (
                  <a
                    className="px-3 py-1.5 rounded-lg bg-[#25D366]/12 text-[#062b18] hover:bg-[#25D366] hover:text-white transition-colors text-xs font-semibold flex items-center gap-1.5 border border-[#25D366]/25"
                    href={`https://wa.me/${selectedThread.visitor_contact.replace(/[^0-9]/g, "")}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="material-symbols-outlined text-sm">chat</span>
                    <span>WhatsApp</span>
                  </a>
                )}
              </div>

              {/* Messages Stream */}
              <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-3.5">
                {isLoadingMessages ? (
                  <div className="py-12 text-center text-xs text-slate-400">
                    Loading messages...
                  </div>
                ) : messages.length === 0 ? (
                  <div className="py-12 text-center text-xs text-slate-400">
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
                          className={`p-3.5 rounded-2xl text-xs leading-relaxed shadow-2xs ${
                            isAdmin
                              ? "rounded-tr-sm bg-[#062b18] text-white"
                              : "rounded-tl-sm bg-white border border-slate-200 text-slate-800"
                          }`}
                        >
                          <span className="font-bold block mb-1 text-[10px] opacity-75 uppercase tracking-wider">
                            {isAdmin ? "Admin" : selectedThread.visitor_name}
                          </span>
                          {msg.content}
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono mt-1 px-1">
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
              <div className="px-4 py-2 border-t border-slate-100 bg-white flex items-center gap-2 overflow-x-auto scrollbar-none">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 whitespace-nowrap">
                  Quick Reply:
                </span>
                {cannedResponses.map((canned, i) => (
                  <button
                    key={i}
                    className="px-2.5 py-1 rounded-md bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-[#062b18] text-[11px] whitespace-nowrap transition-colors border border-slate-200 font-medium"
                    type="button"
                    onClick={() => setReplyText(canned)}
                  >
                    {canned.substring(0, 36)}...
                  </button>
                ))}
              </div>

              {/* Reply Input Bar */}
              <div className="p-3.5 border-t border-slate-100 bg-white flex items-center gap-2">
                <textarea
                  className="flex-1 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 outline-none focus:border-[#062b18] focus:bg-white resize-none placeholder:text-slate-400"
                  placeholder="Write a reply..."
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
                  className="px-4 py-2 rounded-lg bg-[#062b18] hover:bg-[#0b4627] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50 shrink-0 shadow-xs"
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
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-500 gap-3">
              <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">chat_bubble</span>
              </div>
              <div className="flex flex-col gap-1 max-w-sm">
                <p className="text-sm font-semibold text-slate-800">Concierge Inbox Ready</p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Incoming visitor concierge messages from your public site will appear here in real time.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
