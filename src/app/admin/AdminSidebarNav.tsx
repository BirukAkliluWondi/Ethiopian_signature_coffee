"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logoutAdminAction } from "@/app/actions/admin-auth";

export default function AdminSidebarNav() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { label: "Dashboard Overview", href: "/admin", icon: "dashboard" },
    { label: "Inquiries & CRM", href: "/admin/leads", icon: "contacts" },
    { label: "CMS Media Studio", href: "/admin/media", icon: "perm_media" },
    { label: "Training & Cohorts", href: "/admin/training", icon: "school" },
    { label: "Concierge Chat", href: "/admin/chat", icon: "chat" },
  ];

  const handleLogout = async () => {
    await logoutAdminAction();
    router.refresh();
  };

  return (
    <nav className="p-4 flex flex-col gap-1.5">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              isActive
                ? "bg-brand-green text-white shadow-cozy-sm font-bold"
                : "text-stone-400 hover:text-white hover:bg-stone-800"
            }`}
            href={item.href}
          >
            <span
              className={`material-symbols-outlined text-lg ${
                isActive ? "text-brand-yellow" : "text-stone-400"
              }`}
            >
              {item.icon}
            </span>
            <span>{item.label}</span>
          </Link>
        );
      })}

      <div className="pt-4 mt-2 border-t border-stone-800">
        <button
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-left"
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
