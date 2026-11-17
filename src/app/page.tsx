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

export default function Home() {
  return (
    <>
      {/* Top Brand Accent Line */}
      <TopAccentLine />

      {/* Responsive Header */}
      <Header />

      {/* Main Content Container */}
      <main className="flex-1 w-full pt-20 sm:pt-24 md:pt-28 pb-28 md:pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12 sm:gap-16 md:gap-24">
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

      {/* Mobile Bottom App Navigation */}
      <MobileBottomNav />
    </>
  );
}
