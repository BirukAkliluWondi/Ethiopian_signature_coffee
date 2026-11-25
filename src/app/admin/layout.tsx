import { ReactNode } from "react";
import Link from "next/link";
import { isAdminAuthenticated } from "@/app/actions/admin-auth";
import AdminLoginPage from "./login/page";
import AdminSidebarNav from "./AdminSidebarNav";
import AdminCopilotTrigger from "@/components/admin/AdminCopilotTrigger";
import AdminHeaderActions from "@/components/admin/AdminHeaderActions";

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
    <div className="min-h-screen bg-[#F4F6F5] text-slate-900 font-sans flex flex-col md:flex-row antialiased selection:bg-[#062b18]/15 selection:text-[#062b18]">
      {/* Desktop Sidebar Navigation (Hidden on Mobile) */}
      <aside className="w-64 bg-[#062b18] text-white border-r border-white/10 hidden md:flex md:flex-col justify-between shrink-0 min-h-screen sticky top-0 h-screen shadow-lg">
        <div className="flex flex-col">
          {/* Brand Header */}
          <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
            <Link className="flex items-center gap-3 group" href="/admin">
              <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center p-1 shadow-sm group-hover:scale-105 transition-transform shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.png"
                  alt="Ethiopian Signature Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-bold text-sm text-white tracking-tight leading-tight">
                  Ethiopian Signature
                </span>
                <span className="text-[10px] uppercase tracking-[0.16em] text-[#fbbc0e] font-semibold mt-0.5">
                  Executive Suite
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <AdminSidebarNav />
        </div>

        {/* Bottom Live Website Shortcut */}
        <div className="p-4 border-t border-white/10 flex flex-col gap-2 text-xs">
          <Link
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-emerald-100/80 hover:text-white hover:bg-white/10 transition-colors font-medium"
            href="/"
            target="_blank"
          >
            <span className="material-symbols-outlined text-[18px] text-[#fbbc0e]">public</span>
            <span>Open Live Website</span>
            <span className="material-symbols-outlined text-xs ml-auto opacity-70">arrow_outward</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#F4F6F5]">
        {/* Top Header Bar */}
        <header className="h-16 px-4 sm:px-6 md:px-8 bg-white/95 backdrop-blur-md border-b border-slate-200/80 flex items-center justify-between sticky top-0 z-40 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          <div className="flex items-center gap-3">
            <Link className="md:hidden flex items-center gap-2" href="/admin">
              <div className="w-7 h-7 rounded-md bg-[#062b18] p-1 flex items-center justify-center shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.png" alt="Logo" className="w-full h-full object-contain brightness-0 invert" />
              </div>
            </Link>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-slate-700 tracking-wide">
                Live Operations Connected
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <AdminCopilotTrigger />

            <Link
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 hover:text-[#062b18] hover:bg-slate-100 text-xs font-semibold transition-colors"
              href="/"
              target="_blank"
            >
              <span className="material-symbols-outlined text-[16px]">visibility</span>
              <span>Public Site</span>
            </Link>

            <AdminHeaderActions />

            <div className="pl-2 ml-0.5 border-l border-slate-200 flex items-center gap-2.5">
              <div
                aria-label="Henok Tessma"
                className="w-8 h-8 rounded-full bg-[#062b18] text-[#fbbc0e] border border-[#fbbc0e]/40 shrink-0 flex items-center justify-center font-bold text-xs tracking-tight shadow-2xs"
              >
                HT
              </div>
              <div className="hidden lg:flex flex-col text-left">
                <span className="text-xs font-bold text-slate-900 leading-tight">Henok Tessma</span>
                <span className="text-[10px] text-slate-500 leading-tight font-medium">Executive Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* View Body Container */}
        <div className="p-4 sm:p-6 md:p-8 flex-1 pb-24 md:pb-10 w-full max-w-[1400px] mx-auto">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation Bar (< md) */}
      <AdminSidebarNav isMobileNav />
    </div>
  );
}
