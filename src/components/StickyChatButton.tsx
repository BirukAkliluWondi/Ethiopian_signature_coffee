"use client";

import { useState, useEffect } from "react";

export default function StickyChatButton() {
  const [shouldHide, setShouldHide] = useState(false);

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
    <aside
      aria-label="Direct advisory chat"
      className={`fixed bottom-24 lg:bottom-6 right-4 sm:right-6 lg:right-6 z-40 flex items-center group transition-all duration-300 ${
        shouldHide
          ? "opacity-0 pointer-events-none translate-y-3"
          : "opacity-100 pointer-events-auto translate-y-0"
      }`}
    >
      <a
        aria-label="Chat with Ethiopian Signature Coffee on WhatsApp"
        className="relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-[0_4px_14px_rgba(37,211,102,0.35)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.45)] border border-white/30 hover:scale-105 active:scale-95 transition-all duration-300"
        href="https://wa.me/251925451711"
        rel="noopener noreferrer"
        target="_blank"
      >
        {/* Crisp Solid Minimalist WhatsApp Icon */}
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 fill-current shrink-0"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>

        {/* Minimalist Desktop Hover Tooltip (Never covers text; only appears on hover) */}
        <span className="pointer-events-none absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md bg-stone-900/95 text-white text-[11px] font-medium tracking-wide shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block">
          WhatsApp
        </span>
      </a>
    </aside>
  );
}
