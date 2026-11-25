"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileBottomNav() {
  const pathname = usePathname();

  const items = [
    { id: "home", label: "Home", href: "/", icon: "local_cafe" },
    { id: "services", label: "Services", href: "/services", icon: "corporate_fare" },
    { id: "training", label: "Training", href: "/training", icon: "school" },
    { id: "about", label: "About", href: "/about", icon: "auto_stories" },
    { id: "contact", label: "Contact", href: "/contact", icon: "chat" },
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
              <span className={`material-symbols-outlined text-[20px] ${isActive ? "text-brand-green" : ""}`}>
                {item.icon}
              </span>
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
