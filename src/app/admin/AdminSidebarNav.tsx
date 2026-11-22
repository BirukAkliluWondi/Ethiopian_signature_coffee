"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logoutAdminAction } from "@/app/actions/admin-auth";

const navItems = [
  { label: "Overview", fullLabel: "Dashboard Overview", href: "/admin", icon: "dashboard" },
  { label: "Inquiries", fullLabel: "Inquiries & CRM", href: "/admin/leads", icon: "mail" },
  { label: "Media Studio", fullLabel: "Media & Assets", href: "/admin/media", icon: "photo_library" },
  { label: "Academy", fullLabel: "Training & Cohorts", href: "/admin/training", icon: "school" },
  { label: "Concierge", fullLabel: "Concierge Chat", href: "/admin/chat", icon: "forum" },
];

export default function AdminSidebarNav({ isMobileNav = false }: { isMobileNav?: boolean }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAdminAction();
    router.refresh();
  };

  // Mobile Bottom Tab Bar (viewports < md)
  if (isMobileNav) {
    return (
      <nav
        aria-label="Mobile Admin Navigation"
        className="fixed bottom-0 inset-x-0 h-16 bg-surface-container-lowest/95 backdrop-blur-xl border-t border-surface-container-highest z-50 flex items-center justify-around px-1 pb-safe md:hidden shadow-[0_-2px_12px_rgba(13,71,42,0.06)]"
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 h-12 transition-colors ${
                isActive
                  ? "text-stitch-primary font-bold"
                  : "text-on-surface-variant hover:text-stitch-primary"
              }`}
              href={item.href}
            >
              <span className={`material-symbols-outlined text-[22px] ${isActive ? "text-stitch-primary font-variation-fill" : ""}`}>
                {item.icon}
              </span>
              <span className="text-[10px] tracking-tight font-semibold uppercase">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    );
  }

  // Desktop Sidebar Navigation (viewports >= md)
  return (
    <nav className="p-3 flex flex-col gap-1">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs transition-all ${
              isActive
                ? "bg-stitch-primary text-white font-bold shadow-sm"
                : "text-on-surface-variant hover:text-stitch-primary hover:bg-surface-container-low font-medium"
            }`}
            href={item.href}
          >
            <span
              className={`material-symbols-outlined text-lg ${
                isActive ? "text-stitch-primary-fixed-dim" : "text-outline"
              }`}
            >
              {item.icon}
            </span>
            <span>{item.fullLabel}</span>
          </Link>
        );
      })}

      <div className="pt-3 mt-2 border-t border-surface-container-highest">
        <button
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold text-error hover:text-error hover:bg-error-container/40 transition-colors text-left"
          type="button"
          onClick={handleLogout}
        >
          <span className="material-symbols-outlined text-lg">logout</span>
          <span>Sign Out</span>
        </button>
      </div>
    </nav>
  );
}

