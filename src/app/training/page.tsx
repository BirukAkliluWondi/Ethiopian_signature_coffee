import Link from "next/link";
import TopAccentLine from "@/components/TopAccentLine";
import Header from "@/components/Header";
import Training from "@/components/Training";
import PageConsultationCTA from "@/components/PageConsultationCTA";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import StickyChatButton from "@/components/StickyChatButton";
import ScrollRevealInit from "@/components/ScrollRevealInit";

export const metadata = {
  title: "Specialty Barista Academy | Ethiopian Signature Coffee",
  description:
    "Professional barista certification, sensory analysis & cupping, café management, and roasting courses in Addis Ababa, Ethiopia.",
};

export default function TrainingPage() {
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
              <span className="text-brand-green font-semibold">Barista Academy</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-yellow">
                  SPECIALTY BARISTA ACADEMY &amp; CERTIFICATION
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brand-green">
                  Barista Training &amp; Academy
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-text-muted max-w-lg leading-relaxed">
                Elevating hospitality standards from the birthplace of Arabica. Master sensory cupping, milk microfoam science, and espresso chemistry through intensive hands-on cohorts.
              </p>
            </div>
          </div>

          {/* Full Barista Academy Suite with Cohorts & Dynamic Courses */}
          <Training />

          {/* Compact Consultation CTA */}
          <PageConsultationCTA
            kicker="TEAM & CORPORATE TRAINING"
            subtitle="Have questions about group team training or private café staff certification in Addis Ababa? Reach our academy advisors directly."
            title="Schedule Private Barista Certification for Your Café Team"
          />
        </div>
      </main>

      <Footer />
      <StickyChatButton />
      <MobileBottomNav />
    </>
  );
}
