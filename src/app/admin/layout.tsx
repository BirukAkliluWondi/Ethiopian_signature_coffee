import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
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
    <div className="min-h-screen bg-surface text-on-surface flex flex-col md:flex-row antialiased selection:bg-stitch-primary-fixed selection:text-stitch-primary">
      {/* Desktop Sidebar Navigation (Hidden on Mobile) */}
      <aside className="w-64 bg-surface-container-lowest border-r border-surface-container-highest hidden md:flex md:flex-col justify-between shrink-0 min-h-screen sticky top-0 h-screen">
        <div className="flex flex-col">
          {/* Brand Header */}
          <div className="p-5 border-b border-surface-container-highest flex items-center justify-between">
            <Link className="flex items-center gap-3 group" href="/admin">
              <div className="w-9 h-9 rounded-lg bg-stitch-primary text-stitch-tertiary-fixed flex items-center justify-center font-serif font-bold text-base shadow-sm group-hover:scale-105 transition-transform">
                ES
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
            <Link
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-low text-on-surface-variant hover:text-stitch-primary hover:bg-surface-container text-xs font-semibold transition-colors"
              href="/"
              target="_blank"
            >
              <span className="material-symbols-outlined text-sm">visibility</span>
              <span>Public Site</span>
            </Link>

            <div className="flex items-center gap-1 text-on-surface-variant">
              <button
                aria-label="Quick Actions"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-surface-container-low text-on-surface-variant hover:text-stitch-primary transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">tune</span>
              </button>
              <button
                aria-label="Notifications"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-surface-container-low text-on-surface-variant hover:text-stitch-primary transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">notifications</span>
              </button>
            </div>

            <div className="pl-1 flex items-center gap-2">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-surface-container-highest shrink-0 bg-surface-container">
                <Image
                  alt="Admin Profile"
                  className="object-cover"
                  fill
                  src="/admin/avatar.jpg"
                />
              </div>
              <div className="hidden lg:flex flex-col text-left">
                <span className="text-xs font-bold text-on-surface leading-tight">Executive Admin</span>
                <span className="text-[10px] text-on-surface-variant leading-tight">Addis Ababa</span>
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
