export default function Hero() {
  return (
    <section
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center scroll-mt-28 relative section-transition-glow"
      id="home"
    >
      {/* Story, Headline & CTAs (On mobile: order-2, displays below visual showcase; Desktop: lg:order-1) */}
      <div className="lg:col-span-6 flex flex-col gap-5 sm:gap-6 order-2 lg:order-1">
        <div className="flex flex-col gap-2 sm:gap-2.5">
          <span className="text-[11px] sm:text-xs md:text-sm uppercase tracking-widest text-brand-yellow font-bold">
            Beyond Coffee, Building Coffee Businesses
          </span>
          <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-brand-green leading-[1.18] sm:leading-[1.15] tracking-tight">
            Discover the Excellence of Ethiopian Coffee
          </h1>
        </div>

        <p className="text-sm sm:text-base md:text-lg text-text-muted leading-relaxed max-w-xl lg:max-w-none font-normal">
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

      {/* Right Column: Visual Showcase (On mobile: order-1, displays first; Desktop: lg:order-2) */}
      <div className="lg:col-span-6 order-1 lg:order-2 flex justify-center lg:justify-end">
        <div className="relative w-full max-w-lg lg:max-w-none rounded-2xl sm:rounded-3xl overflow-hidden shadow-roast-bloom border border-border-subtle bg-stone-900 group ring-1 ring-border-subtle">
          <div className="relative w-full aspect-[4/3] sm:aspect-[4/3] lg:aspect-[4/3.5] xl:aspect-[4/3.3] max-h-[480px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Traditional Ethiopian Coffee Ceremony"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDDk-iFEvRORMomf5aJppkPdG4X1Afc0D1RwBOm5ZtWA5r-y2Fyk-Srlgmy6w0-XU6hgHyrtZHntI6m50dGyZiGAT5Z4lVML8lFr_PhoYRLtlSA0cAmeC_YyVt7YCSt2qR49OxsjXxr-zwduJ6SQPKxbroL9vdg2pZU8E_F-s3VpJPowK1lkr1Gms7ycTU43SRwoS98u0CrzuJ3y8S2Ym8a7J-x4IWdPiRIOE_vxRrmiLghhNGr-x5"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
