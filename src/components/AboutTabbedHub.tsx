"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import About from "./About";
import SingleOrigins from "./SingleOrigins";
import Projects from "./Projects";

type AboutTab = "story" | "origins" | "projects";

export default function AboutTabbedHub() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<AboutTab>("story");

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "story" || tabParam === "origins" || tabParam === "projects") {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const tabs: Array<{ id: AboutTab; label: string; icon: string }> = [
    { id: "story", label: "Our Organization", icon: "auto_stories" },
    { id: "origins", label: "Direct-Trade Origins", icon: "eco" },
    { id: "projects", label: "Executed Projects", icon: "workspace_premium" },
  ];

  return (
    <div className="flex flex-col gap-8 sm:gap-10">
      {/* Interactive Tab Bar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border-subtle pb-4">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 border ${
                isActive
                  ? "bg-brand-green text-white border-brand-green shadow-cozy-sm"
                  : "bg-surface-white text-text-muted border-border-subtle hover:text-brand-green hover:border-brand-green/40"
              }`}
              type="button"
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="material-symbols-outlined text-base">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Tab Content */}
      {activeTab === "story" && (
        <div className="animate-in fade-in duration-300">
          <About />
        </div>
      )}

      {activeTab === "origins" && (
        <div className="animate-in fade-in duration-300">
          <SingleOrigins />
        </div>
      )}

      {activeTab === "projects" && (
        <div className="animate-in fade-in duration-300">
          <Projects />
        </div>
      )}
    </div>
  );
}
