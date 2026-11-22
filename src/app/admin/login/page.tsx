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
        setError(res.error || "The passcode you entered was incorrect. Please try again.");
      }
    });
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4 selection:bg-stitch-primary-fixed selection:text-stitch-primary">
      <div className="w-full max-w-md bg-surface-container-lowest border border-surface-container-highest rounded-2xl p-7 sm:p-9 shadow-xl shadow-stone-200/50 flex flex-col gap-5 relative overflow-hidden">
        {/* Subtle Ambient Decorative Circles */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-stitch-primary-fixed/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-stitch-tertiary-fixed/30 rounded-full blur-3xl pointer-events-none" />

        {/* Brand Header */}
        <div className="flex flex-col items-center text-center gap-2.5">
          <div className="w-12 h-12 rounded-xl bg-stitch-primary text-stitch-tertiary-fixed flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-2xl">admin_panel_settings</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-stitch-secondary font-bold">
              Website Admin Portal
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-stitch-primary mt-0.5">
              Ethiopian Signature
            </h1>
            <p className="text-xs text-on-surface-variant mt-1 max-w-xs leading-relaxed">
              Sign in below to change website photos, schedule barista training classes, and message clients.
            </p>
          </div>
        </div>

        {/* Simple Step Guide */}
        <div className="p-3 rounded-lg bg-surface-container-low border border-surface-container-highest flex flex-col gap-1.5 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-stitch-primary text-white text-[10px] font-bold flex items-center justify-center shrink-0">
              1
            </span>
            <span className="text-on-surface">Type your admin passcode in the box below.</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-stitch-primary text-white text-[10px] font-bold flex items-center justify-center shrink-0">
              2
            </span>
            <span className="text-on-surface">Click &ldquo;Unlock Dashboard&rdquo; to start managing your site.</span>
          </div>
        </div>

        {/* Login Form */}
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          {error && (
            <div className="p-3 rounded-lg bg-error-container text-on-error-container text-xs flex items-center gap-2">
              <span className="material-symbols-outlined text-base shrink-0">error</span>
              <span>{error}</span>
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-on-surface" htmlFor="admin-passcode">
              Admin Passcode:
            </label>
            <div className="relative">
              <input
                autoFocus
                className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container-low border border-surface-container-highest text-sm text-on-surface placeholder:text-on-surface-variant focus:border-stitch-primary outline-none transition-all pr-10"
                id="admin-passcode"
                placeholder="Enter passcode..."
                required
                type={showPasscode ? "text" : "password"}
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
              />
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-stitch-primary transition-colors"
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
            className="group btn-shimmer w-full h-11 rounded-lg bg-stitch-primary hover:bg-stitch-primary-container text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95 duration-200"
            disabled={isPending || !passcode}
            type="submit"
          >
            <span>{isPending ? "Verifying..." : "Unlock Dashboard"}</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
        </form>

        {/* Footer info */}
        <div className="flex items-center justify-between text-[11px] text-on-surface-variant border-t border-surface-container-highest pt-3">
          <span>Protected Admin Area</span>
          <a className="hover:text-stitch-primary transition-colors font-medium flex items-center gap-1" href="/">
            <span>Back to Public Website</span>
            <span className="material-symbols-outlined text-xs">arrow_forward</span>
          </a>
        </div>
      </div>
    </div>
  );
}
