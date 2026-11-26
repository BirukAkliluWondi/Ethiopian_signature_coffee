"use client";

import { useState, useEffect } from "react";
import ConciergeChatModal from "./ConciergeChatModal";

export default function StickyChatButton() {
  const [shouldHide, setShouldHide] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("footer");
    const contact = document.querySelector("#contact");

    const targets = [footer, contact].filter(Boolean) as Element[];
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const isOccluded = entries.some((entry) => entry.isIntersecting);
        setShouldHide(isOccluded);
      },
      { threshold: 0.08 }
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <aside
        aria-label="Direct advisory chat"
        className={`fixed bottom-24 lg:bottom-6 right-4 sm:right-6 lg:right-6 z-40 flex flex-col items-end transition-all duration-300 ${
          shouldHide
            ? "opacity-0 pointer-events-none translate-y-3"
            : "opacity-100 pointer-events-auto translate-y-0"
        }`}
      >
        {/* Expanded Options Menu */}
        {isMenuOpen && (
          <div className="mb-3 flex flex-col gap-2 p-2 bg-surface-white/95 backdrop-blur-md rounded-2xl border border-border-subtle shadow-cozy-lg animate-in fade-in slide-in-from-bottom-2 duration-200 w-56">
            {/* Option 1: On-site Concierge Chat */}
            <button
              className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-surface-cream text-left transition-colors text-text-main group"
              type="button"
              onClick={() => {
                setIsMenuOpen(false);
                setIsChatModalOpen(true);
              }}
            >
              <div className="w-8 h-8 rounded-lg bg-brand-green/10 text-brand-green flex items-center justify-center shrink-0 group-hover:bg-brand-green group-hover:text-white transition-colors">
                <svg aria-hidden="true" className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold leading-tight">Chat on Website</span>
                <span className="text-[10px] text-text-muted leading-tight">Signature Concierge Desk</span>
              </div>
            </button>

            {/* Option 2: WhatsApp Direct */}
            <a
              className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-surface-cream text-left transition-colors text-text-main group"
              href="https://wa.me/251925451711"
              rel="noopener noreferrer"
              target="_blank"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="w-8 h-8 rounded-lg bg-[#25D366]/10 text-[#25D366] flex items-center justify-center shrink-0 group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold leading-tight">Instant WhatsApp</span>
                <span className="text-[10px] text-text-muted leading-tight">+251 925 451 711</span>
              </div>
            </a>
          </div>
        )}

        {/* Dual Action Floating Trigger Button */}
        <button
          aria-label={isMenuOpen ? "Close Advisory Options" : "Open Advisory Help Options"}
          className={`relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/30 text-white shadow-cozy-lg hover:scale-105 active:scale-95 transition-all duration-300 ${
            isMenuOpen
              ? "bg-brand-green-dark rotate-90"
              : "bg-brand-green hover:bg-brand-green-dark"
          }`}
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <svg aria-hidden="true" className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" viewBox="0 0 24 24">
              <line x1="18" x2="6" y1="6" y2="18" />
              <line x1="6" x2="18" y1="6" y2="18" />
            </svg>
          ) : (
            <svg aria-hidden="true" className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.9" viewBox="0 0 24 24">
              <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
              <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
              <path d="M12 22h3a3 3 0 0 0 3-3" />
            </svg>
          )}

          {/* Minimalist Tooltip (Only on hover when closed) */}
          {!isMenuOpen && (
            <span className="pointer-events-none absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md bg-stone-900/95 text-white text-[11px] font-medium tracking-wide shadow-md whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity duration-200 hidden sm:block">
              Advisory &amp; Support
            </span>
          )}
        </button>
      </aside>

      {/* On-Site Concierge Modal */}
      <ConciergeChatModal
        isOpen={isChatModalOpen}
        onClose={() => setIsChatModalOpen(false)}
      />
    </>
  );
}
