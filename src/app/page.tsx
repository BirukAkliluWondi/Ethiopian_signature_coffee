import TopAccentLine from "@/components/TopAccentLine";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Training from "@/components/Training";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import StickyChatButton from "@/components/StickyChatButton";

export default function Home() {
  return (
    <>
      {/* Top Brand Accent Line */}
      <TopAccentLine />

      {/* Responsive Header with Active Chapter Navigation */}
      <Header />

      {/* Main Content Container with Warm Porcelain Base */}
      <main className="flex-1 w-full pt-10 sm:pt-14 md:pt-16 pb-28 md:pb-20 bg-surface-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-14 sm:gap-20 md:gap-28">
          <Hero />
          <About />
          <Services />
          <Training />
          <Projects />
          <Contact />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Sticky Bottom-Right WhatsApp Chat Action */}
      <StickyChatButton />

      {/* Mobile Bottom App Navigation */}
      <MobileBottomNav />
    </>
  );
}
