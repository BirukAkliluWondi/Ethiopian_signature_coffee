export default function About() {
  return (
    <section
      className="p-5 sm:p-8 md:p-10 lg:p-12 rounded-2xl sm:rounded-3xl bg-surface-warm/80 border border-border-warm shadow-cozy-lg flex flex-col gap-6 sm:gap-8 scroll-mt-28 relative section-transition-glow"
      id="about"
    >
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <span className="font-serif text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-brand-yellow font-bold">
            CHAPTER II · HERITAGE &amp; MISSION
          </span>
        </div>
        <span className="text-xs uppercase tracking-widest text-brand-green font-bold">
          About Our Organization
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-brand-green">
          About Ethiopian Signature Coffee
        </h2>
      </div>

      {/* Clean 2-Column Mission & Vision Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
        {/* Mission Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-surface-white border border-border-subtle shadow-cozy flex flex-col justify-between gap-5 sm:gap-6 border-l-4 border-l-brand-green hover:shadow-cozy-lg transition-all">
          <div className="flex flex-col gap-2.5 sm:gap-3">
            <span className="text-xs uppercase tracking-wider text-brand-yellow font-bold">
              Our Mission
            </span>
            <p className="font-serif text-xl sm:text-2xl md:text-3xl text-brand-green font-semibold leading-snug">
              “To promote Ethiopian coffee culture and empower coffee businesses to achieve excellence.”
            </p>
          </div>
          <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
            We guide entrepreneurs, roasters, and hospitality operators from concept to execution, honoring the sacred heritage of Ethiopian coffee while applying rigorous modern business standards.
          </p>
        </div>

        {/* Vision & Approach Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-surface-white border border-border-subtle shadow-cozy flex flex-col justify-between gap-5 sm:gap-6 border-l-4 border-l-brand-yellow hover:shadow-cozy-lg transition-all">
          <div className="flex flex-col gap-2.5 sm:gap-3">
            <span className="text-xs uppercase tracking-wider text-brand-yellow font-bold">
              Our Approach
            </span>
            <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-brand-green font-semibold leading-snug">
              Comprehensive Solutions for the Coffee Industry
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-text-muted">
            <div className="flex flex-col gap-1">
              <strong className="text-text-main font-semibold text-xs sm:text-sm">
                Turnkey Execution
              </strong>
              <span>From equipment procurement and bar ergonomics to opening launch support.</span>
            </div>
            <div className="flex flex-col gap-1">
              <strong className="text-text-main font-semibold text-xs sm:text-sm">
                Professional Standards
              </strong>
              <span>Science-backed barista training and operational consistency systems.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
