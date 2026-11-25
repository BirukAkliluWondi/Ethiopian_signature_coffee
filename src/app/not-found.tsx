import Link from "next/link";
import TopAccentLine from "@/components/TopAccentLine";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";

export default function NotFound() {
  return (
    <>
      <TopAccentLine />
      <Header />

      <main className="flex-1 w-full pt-24 sm:pt-32 pb-28 lg:pb-24 bg-surface-cream flex items-center justify-center px-4 sm:px-6">
        <div className="max-w-xl w-full p-8 sm:p-12 rounded-3xl bg-surface-white border border-border-warm shadow-roast-bloom text-center flex flex-col items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-brand-green/10 border border-brand-green/20 flex items-center justify-center text-brand-green">
            <span className="material-symbols-outlined text-3xl">coffee</span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-brand-yellow">
              404 &middot; PAGE NOT FOUND
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-green">
              This Page Was Not Found
            </h1>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
              The route you requested has moved or is unavailable. Return to the main hospitality showcase or reach our Addis Ababa advisory desk directly.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto pt-2">
            <Link
              href="/"
              className="btn-shimmer h-12 px-7 rounded-xl bg-brand-green hover:bg-brand-green-dark text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-cozy transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-base">home</span>
              <span>Return Home</span>
            </Link>
            <Link
              href="/contact"
              className="h-12 px-7 rounded-xl border border-brand-green text-brand-green hover:bg-brand-green/5 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <span>Contact Desk</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      <MobileBottomNav />
    </>
  );
}
