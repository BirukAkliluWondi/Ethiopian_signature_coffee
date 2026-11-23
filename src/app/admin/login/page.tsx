"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginAdminAction } from "@/app/actions/admin-auth";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      const res = await loginAdminAction(email, password);
      if (res.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(res.error || "The email or password you entered was incorrect. Please try again.");
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#F9F7F2] flex flex-col justify-between items-center p-4 sm:p-6 relative overflow-hidden selection:bg-brand-yellow/30 selection:text-brand-green-dark">
      {/* Ambient Lighting & Atmosphere */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-brand-green/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#0b4627_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.035] pointer-events-none" />

      {/* Top Brand Ambient Bar */}
      <div className="w-full max-w-5xl flex items-center justify-between py-2 relative z-10">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-xs font-medium text-text-muted hover:text-brand-green transition-colors"
        >
          <span className="material-symbols-outlined text-sm group-hover:-translate-x-0.5 transition-transform">
            arrow_back
          </span>
          <span>Back to Ethiopian Signature</span>
        </Link>
        <span className="text-[11px] text-text-muted/70 tracking-wide font-medium">
          Official Support: +251925451711
        </span>
      </div>

      {/* Main Luxury Login Card */}
      <div className="w-full max-w-[440px] my-auto relative z-10">
        <div className="bg-white/95 backdrop-blur-xl border border-border-subtle rounded-3xl p-7 sm:p-9 shadow-[0_20px_50px_-10px_rgba(20,9,3,0.12),0_4px_24px_rgba(212,136,0,0.06)] relative overflow-hidden ring-1 ring-black/[0.03]">
          {/* Top Hairline Amber Accent Line */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-brand-yellow to-transparent" />

          {/* Brand Header & Official Logo */}
          <div className="flex flex-col items-center text-center">
            {/* Logo Emblem Container */}
            <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl bg-gradient-to-b from-[#FDFBF7] to-white border border-border-subtle/80 flex items-center justify-center p-2.5 shadow-sm mb-3.5 transition-transform hover:scale-105 duration-300">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="Ethiopian Signature Coffee Logo"
                className="w-full h-full object-contain"
              />
            </div>

            <span className="text-[10px] uppercase tracking-[0.24em] text-brand-yellow font-bold">
              Executive Portal
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-green-dark tracking-tight mt-1 leading-tight">
              Ethiopian Signature
            </h1>
            <span className="text-[10px] uppercase tracking-[0.2em] text-text-muted/80 font-bold mt-1">
              Building Coffee Businesses
            </span>
            <p className="text-xs text-text-muted mt-2 max-w-xs leading-relaxed">
              Sign in with your administrative credentials to manage training cohorts, services, client inquiries, and media.
            </p>
          </div>

          {/* Login Form */}
          <form className="mt-6 flex flex-col gap-4" onSubmit={handleLogin}>
            {error && (
              <div className="p-3.5 rounded-xl bg-red-50/90 border border-red-200/80 text-red-800 text-xs flex items-center gap-2.5 shadow-sm animate-fadeIn">
                <span className="material-symbols-outlined text-lg text-red-600 shrink-0">error</span>
                <span className="font-medium leading-relaxed">{error}</span>
              </div>
            )}

            {/* Admin Email Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-text-main" htmlFor="admin-email">
                Admin Email Address
              </label>
              <div className="relative">
                <input
                  id="admin-email"
                  type="email"
                  autoComplete="email"
                  autoFocus
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your admin email..."
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl bg-stone-50/70 border border-border-subtle text-sm text-text-main placeholder:text-text-muted/40 focus:bg-white focus:border-brand-green focus:ring-2 focus:ring-brand-green/15 outline-none transition-all duration-200"
                />
                <span className="material-symbols-outlined text-stone-400 text-lg absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  mail
                </span>
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-text-main" htmlFor="admin-password">
                  Master Password
                </label>
                <span className="text-[10px] text-text-muted/80 font-medium">Confidential Access</span>
              </div>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter master password..."
                  className="w-full pl-10 pr-11 py-2.5 sm:py-3 rounded-xl bg-stone-50/70 border border-border-subtle text-sm text-text-main placeholder:text-text-muted/40 focus:bg-white focus:border-brand-green focus:ring-2 focus:ring-brand-green/15 outline-none transition-all duration-200"
                />
                <span className="material-symbols-outlined text-stone-400 text-lg absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  lock
                </span>
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-brand-green transition-colors p-1"
                >
                  <span className="material-symbols-outlined text-lg">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              type="submit"
              disabled={isPending || !email || !password}
              className="group btn-shimmer w-full h-12 rounded-xl bg-brand-green-dark hover:bg-brand-green text-white font-bold text-xs uppercase tracking-[0.16em] transition-all shadow-md shadow-brand-green-dark/20 hover:shadow-lg hover:shadow-brand-green-dark/30 flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.99] duration-200 mt-2 relative overflow-hidden"
            >
              {isPending ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin shrink-0" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <span className="material-symbols-outlined text-base group-hover:translate-x-0.5 transition-transform">
                    arrow_forward
                  </span>
                </>
              )}
            </button>
          </form>

          {/* Card Footer Security & Navigation */}
          <div className="flex items-center justify-between text-[11px] text-text-muted border-t border-border-subtle/80 pt-4 mt-6">
            <div className="flex items-center gap-1.5 text-text-muted/90">
              <span className="material-symbols-outlined text-[15px] text-brand-green">verified_user</span>
              <span>Encrypted 256-Bit Session</span>
            </div>
            <Link
              href="/"
              className="hover:text-brand-green transition-colors font-medium flex items-center gap-1"
            >
              <span>Public Website</span>
              <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Sub-Footer Accreditation */}
      <div className="w-full max-w-5xl text-center py-2 relative z-10">
        <p className="text-[11px] text-text-muted/60">
          Ethiopian Signature Coffee Advisory &middot; Addis Ababa, Ethiopia &middot; All Rights Reserved
        </p>
      </div>
    </div>
  );
}
