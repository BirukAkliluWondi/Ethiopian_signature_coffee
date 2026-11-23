"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logoutAdminAction } from "@/app/actions/admin-auth";

const navItems = [
  {
    label: "Home",
    fullTitle: "Overview",
    guideHint: "Website stats & quick guide",
    href: "/admin",
    icon: "dashboard",
  },
  {
    label: "Messages",
    fullTitle: "Contact Messages",
    guideHint: "Texts from Contact Me form & WhatsApp",
    href: "/admin/leads",
    icon: "mark_email_unread",
  },
  {
    label: "Photos",
    fullTitle: "Change Photos",
    guideHint: "Upload & replace site pictures",
    href: "/admin/media",
    icon: "photo_library",
  },
  {
    label: "Offerings",
    fullTitle: "Services & Training",
    guideHint: "Courses, service packages & bookings",
    href: "/admin/training",
    icon: "workspace_premium",
  },
  {
    label: "Chat",
    fullTitle: "Visitor Chat",
    guideHint: "Reply to visitors in real time",
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
              <span className={`material-symbols-outlined text-[20px] ${isActive ? "text-stitch-primary font-variation-fill" : ""}`}>
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
    <div className="p-3 flex flex-col gap-3">
      {/* Step by Step Navigation Links */}
      <nav className="flex flex-col gap-1.5">
        {navItems.map((item, idx) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              className={`flex items-start gap-2.5 px-3 py-2.5 rounded-xl text-xs transition-all ${
                isActive
                  ? "bg-stitch-primary text-white font-bold shadow-sm"
                  : "text-on-surface-variant hover:text-stitch-primary hover:bg-surface-container-low"
              }`}
              href={item.href}
            >
              <span
                className={`material-symbols-outlined text-lg mt-0.5 shrink-0 ${
                  isActive ? "text-stitch-primary-fixed-dim" : "text-outline"
                }`}
              >
                {item.icon}
              </span>
              <div className="flex flex-col min-w-0">
                <span className="font-semibold text-xs leading-tight">
                  {item.fullTitle}
                </span>
                <span
                  className={`text-[10px] truncate leading-tight mt-0.5 ${
                    isActive ? "text-white/80" : "text-on-surface-variant/80"
                  }`}
                >
                  {item.guideHint}
                </span>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Sign Out Button */}
      <div className="pt-2 border-t border-surface-container-highest">
        <button
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-error hover:bg-error-container/40 transition-colors text-left"
          type="button"
          onClick={handleLogout}
        >
          <span className="material-symbols-outlined text-lg">logout</span>
          <span>Sign Out Safely</span>
        </button>
      </div>
    </div>
  );
}
