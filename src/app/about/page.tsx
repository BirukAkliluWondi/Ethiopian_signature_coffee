import { Suspense } from "react";
import Link from "next/link";
import TopAccentLine from "@/components/TopAccentLine";
import Header from "@/components/Header";
import AboutTabbedHub from "@/components/AboutTabbedHub";
import PageConsultationCTA from "@/components/PageConsultationCTA";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import StickyChatButton from "@/components/StickyChatButton";
import ScrollRevealInit from "@/components/ScrollRevealInit";

export const metadata = {
  title: "About, Direct-Trade Origins & Portfolio | Ethiopian Signature Coffee",
  description:
    "Explore Ethiopian Signature Coffee's mission, direct-trade single origins from Yirgacheffe, Sidama, Guji & Harrar, and our launched commercial coffee venues.",
};

export default function AboutPage() {
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
              <span className="text-brand-green font-semibold">About &amp; Origins</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-yellow">
                  HERITAGE, TERROIR &amp; TRACK RECORD
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brand-green">
                  Our Story, Origins &amp; Projects
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-text-muted max-w-lg leading-relaxed">
                From highland smallholder cooperatives to modern commercial venues across Addis Ababa—discover our standards, coffee terroirs, and executed works.
              </p>
            </div>
          </div>

          {/* Interactive Tabbed About Hub */}
          <Suspense
            fallback={
              <div className="p-8 text-center text-xs text-text-muted">
                Loading heritage showcase...
              </div>
            }
          >
            <AboutTabbedHub />
          </Suspense>

          {/* Compact Consultation CTA */}
          <PageConsultationCTA />
        </div>
      </main>

      <Footer />
      <StickyChatButton />
      <MobileBottomNav />
    </>
  );
}
