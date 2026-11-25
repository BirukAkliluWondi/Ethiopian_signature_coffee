"use client";

import { useState, useEffect } from "react";
import AdminAIAssistantDrawer from "./AdminAIAssistantDrawer";

export default function AdminCopilotTrigger() {
  const [isOpen, setIsOpen] = useState(false);

  // Global keyboard shortcut: Ctrl+Space (or Cmd+Space on Mac) to toggle Copilot drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.code === "Space") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <button
        aria-label="Open Admin AI Copilot"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#062b18] text-white hover:bg-[#0b4627] text-xs font-semibold transition-all shadow-xs group"
        title="Ask anything about your admin operations or live data (Ctrl + Space)"
        type="button"
        onClick={() => setIsOpen(true)}
      >
        <span className="material-symbols-outlined text-[16px] text-[#fbbc0e] group-hover:scale-110 transition-transform">
          auto_awesome
        </span>
        <span className="tracking-tight font-sans">Ask Copilot</span>
        <span className="hidden lg:inline-block text-[10px] px-1.5 py-0.5 rounded bg-white/15 text-emerald-100 font-mono leading-none ml-0.5">
          Ctrl+Space
        </span>
      </button>

      <AdminAIAssistantDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
