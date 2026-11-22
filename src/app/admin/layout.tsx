import { ReactNode } from "react";
import Link from "next/link";
import { isAdminAuthenticated } from "@/app/actions/admin-auth";
import AdminLoginPage from "./login/page";
import AdminSidebarNav from "./AdminSidebarNav";

export const metadata = {
  title: "Admin Suite | Ethiopian Signature Coffee",
  description: "Enterprise operations dashboard, dynamic CMS, and concierge chat management.",
};

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const isAuth = await isAdminAuthenticated();

  // If not authenticated, present the passcode login screen directly
  if (!isAuth) {
    return <AdminLoginPage />;
  }

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col md:flex-row antialiased selection:bg-brand-yellow selection:text-stone-950">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-stone-900 border-b md:border-b-0 md:border-r border-stone-800 flex flex-col justify-between shrink-0">
        <div className="flex flex-col">
          {/* Brand Banner */}
          <div className="p-6 border-b border-stone-800 flex items-center justify-between">
            <Link className="flex items-center gap-3 group" href="/admin">
              <div className="w-10 h-10 rounded-xl bg-brand-green border border-brand-green-light/40 flex items-center justify-center text-brand-yellow font-serif font-bold text-lg shadow-cozy-sm group-hover:scale-105 transition-transform">
                ES
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-sm text-white tracking-wide">
                  Ethiopian Signature
                </span>
                <span className="text-[10px] uppercase tracking-widest text-brand-yellow font-bold">
                  Operations Suite
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <AdminSidebarNav />
        </div>

        {/* Bottom Quick Actions */}
        <div className="p-4 border-t border-stone-800 flex flex-col gap-2 text-xs">
          <Link
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            href="/"
            target="_blank"
          >
            <span className="material-symbols-outlined text-base">public</span>
            <span>View Live Website</span>
            <span className="material-symbols-outlined text-xs ml-auto">arrow_outward</span>
          </Link>
        </div>
      </aside>

      {/* Main Content View */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header Bar */}
        <header className="h-16 px-6 bg-stone-900/60 backdrop-blur-md border-b border-stone-800 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-stone-400 font-medium">
              Supabase Live Cloud Connected
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <span className="text-xs font-semibold text-white block">
                Executive Administrator
              </span>
              <span className="text-[10px] text-stone-400">Addis Ababa (UTC+3)</span>
            </div>
            <div className="w-9 h-9 rounded-xl bg-brand-green/20 border border-brand-green/40 text-brand-yellow flex items-center justify-center font-bold text-xs">
              AD
            </div>
          </div>
        </header>

        {/* View Body */}
        <div className="p-6 md:p-8 flex-1">{children}</div>
      </main>
    </div>
  );
}
