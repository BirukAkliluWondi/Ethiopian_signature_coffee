export default function About() {
  return (
    <section
      className="reveal-on-scroll flex flex-col gap-8 sm:gap-10 scroll-mt-28 relative section-transition-glow py-2 sm:py-4"
      id="about"
    >
      <div className="flex flex-col gap-1.5">
        <span className="text-xs uppercase tracking-widest text-brand-yellow font-bold">
          About Our Organization
        </span>
        <div className="mask-reveal-wrap">
          <h2 className="mask-reveal-content font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-green">
            About Ethiopian Signature Coffee
          </h2>
        </div>
      </div>

      {/* Typographic Brand Manifesto: Unboxed, Breathing Editorial */}
      <div className="border-l-2 sm:border-l-[3px] border-brand-yellow pl-4 sm:pl-7 py-1">
        <span className="text-[10.5px] uppercase tracking-widest text-brand-yellow font-bold">
          Our Mission &amp; Purpose
        </span>
        <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] text-brand-green font-semibold leading-[1.25] tracking-tight mt-2 max-w-4xl">
          “To promote Ethiopian coffee culture and empower coffee businesses to achieve excellence.”
        </blockquote>
      </div>

      {/* Asymmetric Editorial Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-4 border-t border-border-subtle/80 items-start">
        {/* Left Column: Heritage & Commercial Standards */}
        <div className="lg:col-span-5 flex flex-col gap-2.5">
          <span className="text-xs uppercase tracking-wider text-text-muted font-bold">
            Heritage &amp; Modern Rigor
          </span>
          <p className="text-sm sm:text-base text-text-muted leading-relaxed">
            We guide entrepreneurs, roasters, and hospitality operators from concept to execution, honoring the sacred heritage of Ethiopian coffee while applying rigorous modern business standards.
          </p>
        </div>

        {/* Right Column: 2 Borderless Core Pillars */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-brand-green">
              <span className="material-symbols-outlined text-xl">foundation</span>
              <strong className="text-text-main font-serif text-base sm:text-lg font-bold">
                Turnkey Execution
              </strong>
            </div>
            <p className="text-xs sm:text-[13px] text-text-muted leading-relaxed">
              From equipment procurement and bar ergonomics to opening launch support and operational readiness.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-brand-green">
              <span className="material-symbols-outlined text-xl">verified</span>
              <strong className="text-text-main font-serif text-base sm:text-lg font-bold">
                Professional Standards
              </strong>
            </div>
            <p className="text-xs sm:text-[13px] text-text-muted leading-relaxed">
              Science-backed barista training, extraction calibration, and operational consistency systems.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
