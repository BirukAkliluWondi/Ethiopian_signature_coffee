export default function Training() {
  return (
    <section
      className="p-5 sm:p-8 md:p-10 lg:p-12 rounded-2xl sm:rounded-3xl text-white shadow-cozy-lg bg-brand-green-dark border border-brand-green flex flex-col gap-6 sm:gap-8 scroll-mt-28 relative section-transition-glow ring-1 ring-brand-green/30"
      id="training"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4">
        <div className="flex flex-col gap-1.5 sm:gap-2">
          <span className="text-xs uppercase tracking-widest text-brand-yellow font-bold">
            Barista &amp; Staff Training
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-bold">
            Professional Barista Curriculum
          </h2>
        </div>
        <p className="text-xs sm:text-sm md:text-base text-white/80 max-w-md">
          A structured four-stage training program designed to prepare baristas and café teams for operational excellence.
        </p>
      </div>

      {/* 4-Stage Progression */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Stage 01 */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-yellow/80 hover:bg-white/[0.08] shadow-cozy-sm transition-all flex flex-col gap-2.5 sm:gap-3">
          <span className="text-brand-yellow text-xs font-bold tracking-widest">STAGE 01</span>
          <h4 className="font-serif text-lg sm:text-xl font-bold text-white">Espresso Calibration</h4>
          <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
            Dose accuracy, grind size adjustments, brew ratios, channeling diagnosis, and extraction control.
          </p>
        </div>

        {/* Stage 02 */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-yellow/80 hover:bg-white/[0.08] shadow-cozy-sm transition-all flex flex-col gap-2.5 sm:gap-3">
          <span className="text-brand-yellow text-xs font-bold tracking-widest">STAGE 02</span>
          <h4 className="font-serif text-lg sm:text-xl font-bold text-white">Milk Chemistry &amp; Art</h4>
          <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
            Microfoam texturing, steaming temperature management, symmetry, and foundational latte art patterns.
          </p>
        </div>

        {/* Stage 03 */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-yellow/80 hover:bg-white/[0.08] shadow-cozy-sm transition-all flex flex-col gap-2.5 sm:gap-3">
          <span className="text-brand-yellow text-xs font-bold tracking-widest">STAGE 03</span>
          <h4 className="font-serif text-lg sm:text-xl font-bold text-white">Sensory Cupping</h4>
          <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
            Standard cupping scoring, aroma evaluation, body and acidity balance, and Ethiopian regional flavor profiles.
          </p>
        </div>

        {/* Stage 04 */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-yellow/80 hover:bg-white/[0.08] shadow-cozy-sm transition-all flex flex-col gap-2.5 sm:gap-3">
          <span className="text-brand-yellow text-xs font-bold tracking-widest">STAGE 04</span>
          <h4 className="font-serif text-lg sm:text-xl font-bold text-white">Hospitality &amp; Service</h4>
          <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
            Bar workflow speed, order queue management, guest origin storytelling, and station hygiene etiquette.
          </p>
        </div>
      </div>

      {/* Action Banner with Responsive Button Pair */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
        <div className="flex items-center gap-2.5 text-xs sm:text-sm text-white/90">
          <span className="material-symbols-outlined text-lg sm:text-xl text-brand-yellow shrink-0">
            verified
          </span>
          <span>Comprehensive Hands-on Practice with Certificate of Completion</span>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          {/* Secondary Outline on Left */}
          <a
            className="group w-full sm:w-auto h-12 px-6 sm:px-8 rounded-xl border border-white/30 text-white hover:bg-white/10 font-semibold text-xs uppercase tracking-wider text-center whitespace-nowrap active:scale-95 transition-all shadow-cozy-sm flex items-center justify-center"
            href="#contact"
          >
            <span>View Syllabus</span>
          </a>
          {/* Primary Solid Confirmation on Right */}
          <a
            className="group w-full sm:w-auto h-12 px-6 sm:px-8 rounded-xl bg-brand-yellow hover:bg-brand-yellow-light text-black font-bold text-xs uppercase tracking-wider text-center whitespace-nowrap active:scale-95 transition-all shadow-cozy hover:shadow-cozy-float flex items-center justify-center"
            href="#contact"
          >
            <span>Enroll in Academy</span>
          </a>
        </div>
      </div>
    </section>
  );
}
