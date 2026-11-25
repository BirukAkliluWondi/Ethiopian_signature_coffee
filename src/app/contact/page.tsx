import { Suspense } from "react";
import Link from "next/link";
import TopAccentLine from "@/components/TopAccentLine";
import Header from "@/components/Header";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import StickyChatButton from "@/components/StickyChatButton";
import ScrollRevealInit from "@/components/ScrollRevealInit";

export const metadata = {
  title: "Contact & Direct Advisory Desk | Ethiopian Signature Coffee",
  description:
    "Book a café setup advisory, barista team training, luxury catering reservation, or direct-trade Ethiopian green coffee inquiry in Addis Ababa (+251925451711).",
};

export default function ContactPage() {
  return (
    <>
      <ScrollRevealInit />
      <TopAccentLine />
      <Header />

      <main className="flex-1 w-full pt-20 sm:pt-24 md:pt-28 pb-28 lg:pb-20 bg-surface-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10 sm:gap-12">
          {/* Breadcrumb Navigation & Page Banner */}
          <div className="flex flex-col gap-3 border-b border-border-subtle pb-6 sm:pb-8">
            <div className="flex items-center gap-2 text-xs text-text-muted">
              <Link className="hover:text-brand-green transition-colors" href="/">
                Home
              </Link>
              <span>/</span>
              <span className="text-brand-green font-semibold">Contact Desk</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-yellow">
                  DIRECT CONSULTATION &amp; RESERVATIONS
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brand-green">
                  Contact &amp; Advisory Desk
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-text-muted max-w-lg leading-relaxed">
                Reach our Addis Ababa hospitality team directly via our consultation form, WhatsApp (+251 925 451 711), or Telegram.
              </p>
            </div>
          </div>

          {/* Dedicated Contact Form & Channels */}
          <Suspense
            fallback={
              <div className="p-10 rounded-2xl bg-surface-white border border-border-subtle text-center text-xs text-text-muted">
                Loading advisory desk...
              </div>
            }
          >
            <Contact />
          </Suspense>
        </div>
      </main>

      <Footer />
      <StickyChatButton />
      <MobileBottomNav />
    </>
  );
}
