export default function Hero() {
  return (
    <section
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center scroll-mt-28 relative section-transition-glow"
      id="home"
    >
      {/* Story, Headline & CTAs (Left Column: 6 cols on desktop, compact & crisp) */}
      <div className="lg:col-span-6 flex flex-col gap-5 sm:gap-6 order-2 lg:order-1 z-10">
        <div className="flex flex-col gap-2 sm:gap-2.5">
          <span className="text-[11px] sm:text-xs md:text-sm uppercase tracking-widest text-brand-yellow font-bold">
            Beyond Coffee, Building Coffee Businesses
          </span>
          <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-brand-green leading-[1.18] sm:leading-[1.15] tracking-tight">
            Discover the Excellence of Ethiopian Coffee
          </h1>
        </div>

        <p className="text-sm sm:text-base md:text-lg text-text-muted leading-relaxed max-w-xl font-normal">
          We bring together premium Ethiopian coffee, professional coffee training, business consultancy, and innovative café solutions. From centuries-old ceremonial roots to modern commercial venues, we help coffee businesses achieve excellence.
        </p>

        {/* CTAs: Secondary Outline on Left, Primary Main Action on Right (Fully responsive) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1 sm:pt-2 w-full sm:w-auto">
          {/* Secondary Outline Action (Left) */}
          <a
            className="group h-12 w-full sm:w-auto px-6 sm:px-8 rounded-xl border-2 border-brand-green text-brand-green bg-white hover:bg-brand-green/5 text-center font-semibold text-sm whitespace-nowrap active:scale-95 transition-all shadow-cozy-sm hover:shadow-cozy flex items-center justify-center"
            href="#services"
          >
            <span>Explore Services</span>
          </a>
          {/* Primary Solid Confirmation Action (Right) */}
          <a
            className="group h-12 w-full sm:w-auto px-6 sm:px-8 rounded-xl bg-brand-green hover:bg-brand-green-dark text-white text-center font-semibold text-sm shadow-cozy hover:shadow-cozy-float whitespace-nowrap active:scale-95 transition-all flex items-center justify-center"
            href="#contact"
          >
            <span>Start Advisory</span>
          </a>
        </div>
      </div>

      {/* Right Column: Authentic Blended Ceremony Showcase (Anchored to right, expands leftward, positioned gracefully below header) */}
      <div className="lg:col-span-6 order-1 lg:order-2 flex items-center justify-center lg:justify-end">
        <div className="relative w-full max-w-[460px] sm:max-w-[520px] lg:max-w-[640px] xl:max-w-[700px] aspect-[584/638] max-h-[500px] sm:max-h-[540px] lg:max-h-[580px] flex items-center justify-center lg:justify-end lg:translate-y-6 xl:translate-y-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Traditional Ethiopian Coffee Ceremony"
            className="w-full h-full object-contain object-center lg:object-right transition-transform duration-700 hover:scale-[1.01]"
            src="/ceremony-blended.png"
          />
        </div>
      </div>
    </section>
  );
}
