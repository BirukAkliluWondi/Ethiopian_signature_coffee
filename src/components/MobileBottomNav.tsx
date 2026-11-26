"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function NavIcon({ id, className }: { id: string; className?: string }) {
  switch (id) {
    case "home":
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
          <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
          <line x1="6" x2="6" y1="2" y2="4" />
          <line x1="10" x2="10" y1="2" y2="4" />
          <line x1="14" x2="14" y1="2" y2="4" />
        </svg>
      );
    case "services":
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
          <rect height="16" rx="2" width="10" x="3" y="4" />
          <path d="M13 8h5a2 2 0 0 1 2 2v10H13" />
          <path d="M7 8h2M7 12h2M7 16h2M16 12h1M16 16h1" />
        </svg>
      );
    case "training":
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      );
    case "about":
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      );
    default:
      return (
        <svg className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <path d="M8 10h8M8 14h5" />
        </svg>
      );
  }
}

export default function MobileBottomNav() {
  const pathname = usePathname();

  const items = [
    { id: "home", label: "Home", href: "/" },
    { id: "services", label: "Services", href: "/services" },
    { id: "training", label: "Training", href: "/training" },
    { id: "about", label: "About", href: "/about" },
    { id: "contact", label: "Contact", href: "/contact" },
  ];

  const isItemActive = (id: string) => {
    if (id === "home") return pathname === "/";
    return pathname.startsWith(`/${id}`);
  };

  return (
    <nav
      aria-label="Mobile and Tablet Navigation"
      className="mount-mobile-nav lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface-cream/95 backdrop-blur-xl border-t border-border-subtle shadow-[0_-4px_16px_rgba(36,20,10,0.06)] pb-safe transition-all"
    >
      <div className="flex items-center justify-around h-14 max-w-lg mx-auto px-2">
        {items.map((item) => {
          const isActive = isItemActive(item.id);

          return (
            <Link
              key={item.id}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-all active:scale-95 relative ${
                isActive ? "text-brand-green font-bold" : "text-text-muted hover:text-brand-green font-medium"
              }`}
              href={item.href}
            >
              <NavIcon
                id={item.id}
                className={`w-5 h-5 shrink-0 ${isActive ? "text-brand-green" : ""}`}
              />
              <span className="text-[9.5px] mt-0.5 tracking-tight font-medium">
                {item.label}
              </span>
              {isActive && (
                <span className="absolute bottom-0 w-3 h-0.5 bg-brand-yellow rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
