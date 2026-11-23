import TopAccentLine from "@/components/TopAccentLine";
import Header from "@/components/Header";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import StickyChatButton from "@/components/StickyChatButton";
import ScrollRevealInit from "@/components/ScrollRevealInit";
import Link from "next/link";

export const metadata = {
  title: "Services & Commercial Packages | Ethiopian Signature Coffee",
  description:
    "Comprehensive turnkey café setup, espresso machine calibration, signature menu development, barista academy, quality auditing, and luxury event catering.",
};

export default function ServicesPage() {
  return (
    <>
      <ScrollRevealInit />
      <TopAccentLine />
      <Header />

      <main className="flex-1 w-full pt-20 sm:pt-24 md:pt-28 pb-28 lg:pb-20 bg-surface-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12 sm:gap-16">
          {/* Breadcrumb Navigation & Page Banner */}
          <div className="flex flex-col gap-3 border-b border-border-subtle pb-6 sm:pb-8">
            <div className="flex items-center gap-2 text-xs text-text-muted">
              <Link className="hover:text-brand-green transition-colors" href="/">
                Home
              </Link>
              <span>/</span>
              <span className="text-brand-green font-semibold">Services &amp; Packages</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-yellow">
                  COMMERCIAL SERVICES &amp; ADVISORY CATALOG
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brand-green">
                  Our Services &amp; Packages
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-text-muted max-w-lg leading-relaxed">
                Explore our full suite of 6 specialized hospitality practices, transparent commercial service packages with deliverables, and luxury event catering in Addis Ababa.
              </p>
            </div>
          </div>

          {/* Full Services Suite with Dynamic Packages & Catering */}
          <Services />

          {/* Direct Booking Desk */}
          <Contact />
        </div>
      </main>

      <Footer />
      <StickyChatButton />
      <MobileBottomNav />
    </>
  );
}
