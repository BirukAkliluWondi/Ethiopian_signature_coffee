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
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stitch-primary/10 text-stitch-primary hover:bg-stitch-primary/20 text-xs font-semibold transition-colors border border-stitch-primary/20 shadow-2xs group"
        title="Ask anything about the admin dashboard or code (Ctrl + Space)"
        type="button"
        onClick={() => setIsOpen(true)}
      >
        <span className="material-symbols-outlined text-[16px] text-stitch-tertiary-fixed group-hover:scale-110 transition-transform">
          auto_awesome
        </span>
        <span className="font-serif tracking-tight">Ask Copilot</span>
        <span className="hidden lg:inline-block text-[10px] px-1 py-0.5 rounded bg-white/70 text-outline border border-surface-container-highest font-mono leading-none ml-0.5">
          Ctrl+Space
        </span>
      </button>

      <AdminAIAssistantDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
