import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
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
    <div className="min-h-screen bg-surface text-on-surface flex flex-col md:flex-row antialiased selection:bg-stitch-primary-fixed selection:text-stitch-primary">
      {/* Desktop Sidebar Navigation (Hidden on Mobile) */}
      <aside className="w-64 bg-surface-container-lowest border-r border-surface-container-highest hidden md:flex md:flex-col justify-between shrink-0 min-h-screen sticky top-0 h-screen">
        <div className="flex flex-col">
          {/* Brand Header */}
          <div className="p-5 border-b border-surface-container-highest flex items-center justify-between">
            <Link className="flex items-center gap-3 group" href="/admin">
              <div className="w-10 h-10 rounded-xl bg-white border border-border-subtle flex items-center justify-center p-1.5 shadow-sm group-hover:scale-105 transition-transform shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.png"
                  alt="Ethiopian Signature Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-semibold text-sm text-stitch-primary tracking-tight">
                  Ethiopian Signature
                </span>
                <span className="text-[10px] uppercase tracking-wider text-stitch-secondary font-bold">
                  Operations Suite
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <AdminSidebarNav />
        </div>

        {/* Bottom Live Website Shortcut */}
        <div className="p-4 border-t border-surface-container-highest flex flex-col gap-2 text-xs">
          <Link
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-on-surface-variant hover:text-stitch-primary hover:bg-surface-container-low transition-colors font-medium"
            href="/"
            target="_blank"
          >
            <span className="material-symbols-outlined text-base text-outline">public</span>
            <span>View Live Website</span>
            <span className="material-symbols-outlined text-xs ml-auto text-outline">arrow_outward</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <main className="flex-1 flex flex-col min-w-0 bg-surface">
        {/* Top Header Bar */}
        <header className="h-16 px-4 sm:px-6 md:px-8 bg-surface/90 backdrop-blur-xl border-b border-surface-container-highest flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-stitch-primary-fixed-dim animate-pulse" />
            <span className="text-xs font-semibold text-stitch-primary uppercase tracking-wider">
              Live Site Connected
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <AdminCopilotTrigger />

            <Link
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-low text-on-surface-variant hover:text-stitch-primary hover:bg-surface-container text-xs font-semibold transition-colors"
              href="/"
              target="_blank"
            >
              <span className="material-symbols-outlined text-sm">visibility</span>
              <span>Public Site</span>
            </Link>

            <AdminHeaderActions />

            <div className="pl-1 flex items-center gap-2">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-surface-container-highest shrink-0 bg-surface-container">
                <Image
                  alt="Henok Tessma"
                  className="object-cover"
                  fill
                  src="/admin/avatar.jpg"
                />
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-bold text-on-surface leading-tight">Henok Tessma</span>
                <span className="text-[10px] text-on-surface-variant leading-tight">henoktessma111@gmail.com</span>
              </div>
            </div>
          </div>
        </header>

        {/* View Body Container */}
        <div className="p-4 sm:p-6 md:p-8 flex-1 pb-24 md:pb-8 w-full max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation Bar (< md) */}
      <AdminSidebarNav isMobileNav />
    </div>
  );
}
