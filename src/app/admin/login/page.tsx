"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { loginAdminAction } from "@/app/actions/admin-auth";

export default function AdminLoginPage() {
  const [passcode, setPasscode] = useState("");
  const [showPasscode, setShowPasscode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      const res = await loginAdminAction(passcode);
      if (res.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(res.error || "Invalid passcode.");
      }
    });
  };

  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center p-4 selection:bg-brand-yellow selection:text-stone-950">
      <div className="w-full max-w-md bg-stone-900 border border-stone-800 rounded-3xl p-8 sm:p-10 shadow-2xl flex flex-col gap-8 relative overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-green/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none" />

        {/* Brand Header */}
        <div className="flex flex-col items-center text-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-brand-green border border-brand-green-light/40 flex items-center justify-center text-brand-yellow shadow-lg shadow-brand-green/30">
            <span className="material-symbols-outlined text-2xl">admin_panel_settings</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] uppercase tracking-widest text-brand-yellow font-bold">
              Management Portal
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
              Ethiopian Signature
            </h1>
            <p className="text-xs text-stone-400 mt-1">
              Enter your authorized administrator master passcode to access the operations suite.
            </p>
          </div>
        </div>

        {/* Login Form */}
        <form className="flex flex-col gap-5" onSubmit={handleLogin}>
          {error && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-center gap-2">
              <span className="material-symbols-outlined text-base shrink-0">error</span>
              <span>{error}</span>
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-stone-300" htmlFor="admin-passcode">
              Master Passcode
            </label>
            <div className="relative">
              <input
                autoFocus
                className="w-full px-4 py-3 rounded-xl bg-stone-800/80 border border-stone-700 text-sm text-white placeholder:text-stone-500 focus:border-brand-yellow focus:bg-stone-800 outline-none transition-all pr-10"
                id="admin-passcode"
                placeholder="Enter access passcode..."
                required
                type={showPasscode ? "text" : "password"}
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
              />
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white transition-colors"
                type="button"
                onClick={() => setShowPasscode(!showPasscode)}
              >
                <span className="material-symbols-outlined text-lg">
                  {showPasscode ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          <button
            className="group btn-shimmer w-full h-12 rounded-xl bg-brand-yellow hover:bg-brand-yellow-light text-stone-950 font-bold text-xs uppercase tracking-wider transition-all shadow-cozy flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95 duration-200"
            disabled={isPending || !passcode}
            type="submit"
          >
            <span>{isPending ? "Verifying Credentials..." : "Unlock Dashboard"}</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
        </form>

        {/* Footer info */}
        <div className="flex items-center justify-between text-[11px] text-stone-500 border-t border-stone-800/80 pt-5">
          <span>Protected Administrative Zone</span>
          <a className="hover:text-stone-300 transition-colors" href="/">
            Back to Public Site &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
