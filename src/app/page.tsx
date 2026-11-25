import TopAccentLine from "@/components/TopAccentLine";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustRibbon from "@/components/TrustRibbon";
import HomeGateway from "@/components/HomeGateway";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import StickyChatButton from "@/components/StickyChatButton";
import ScrollRevealInit from "@/components/ScrollRevealInit";

export default function Home() {
  return (
    <>
      {/* Scroll Reveal Observer Engine */}
      <ScrollRevealInit />

      {/* Top Brand Accent Line */}
      <TopAccentLine />

      {/* Responsive Header with Active Navigation */}
      <Header />

      {/* Main Content Container with Warm Porcelain Base */}
      <main className="flex-1 w-full pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-28 lg:pb-20 bg-surface-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12 sm:gap-16 md:gap-20">
          <Hero />
          <TrustRibbon />
          <HomeGateway />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Sticky Bottom-Right Advisory Chat Action */}
      <StickyChatButton />

      {/* Mobile Bottom App Navigation */}
      <MobileBottomNav />
    </>
  );
}
