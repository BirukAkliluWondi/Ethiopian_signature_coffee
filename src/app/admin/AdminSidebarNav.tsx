"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logoutAdminAction } from "@/app/actions/admin-auth";

const navItems = [
  {
    label: "Home",
    fullTitle: "Dashboard",
    href: "/admin",
    icon: "space_dashboard",
  },
  {
    label: "Messages",
    fullTitle: "Contact Messages",
    href: "/admin/leads",
    icon: "mark_email_unread",
  },
  {
    label: "Photos",
    fullTitle: "Media Studio",
    href: "/admin/media",
    icon: "photo_library",
  },
  {
    label: "Offerings",
    fullTitle: "Services & Training",
    href: "/admin/training",
    icon: "workspace_premium",
  },
  {
    label: "Chat",
    fullTitle: "Visitor Chat",
    href: "/admin/chat",
    icon: "forum",
  },
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
        className="fixed bottom-0 inset-x-0 h-16 bg-white/95 backdrop-blur-xl border-t border-slate-200 z-50 flex items-center justify-around px-1 pb-safe md:hidden shadow-[0_-4px_16px_rgba(6,43,24,0.06)]"
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              className={`relative flex-1 flex flex-col items-center justify-center gap-0.5 h-12 transition-colors ${
                isActive
                  ? "text-[#062b18] font-bold"
                  : "text-slate-500 hover:text-[#062b18]"
              }`}
              href={item.href}
            >
              {isActive && (
                <span className="absolute -top-2 w-6 h-0.5 bg-[#d48800] rounded-sm" />
              )}
              <span className={`material-symbols-outlined text-[20px] ${isActive ? "text-[#062b18]" : ""}`}>
                {item.icon}
              </span>
              <span className="text-[10px] tracking-tight font-semibold">
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
    <div className="p-3.5 flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <span className="px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-200/50 mb-1.5">
          Workspace
        </span>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] transition-all relative ${
                  isActive
                    ? "bg-white/15 text-white font-semibold shadow-xs ring-1 ring-white/15"
                    : "text-emerald-100/75 hover:text-white hover:bg-white/8 font-medium"
                }`}
                href={item.href}
              >
                {isActive && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 bg-[#fbbc0e] rounded-r" />
                )}
                <span
                  className={`material-symbols-outlined text-[19px] shrink-0 ${
                    isActive ? "text-[#fbbc0e]" : "text-emerald-200/60"
                  }`}
                >
                  {item.icon}
                </span>
                <span className="truncate">{item.fullTitle}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Sign Out Button */}
      <div className="pt-3 border-t border-white/10">
        <button
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium text-rose-200/80 hover:text-white hover:bg-rose-500/20 transition-colors text-left"
          type="button"
          onClick={handleLogout}
        >
          <span className="material-symbols-outlined text-[19px]">logout</span>
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}
