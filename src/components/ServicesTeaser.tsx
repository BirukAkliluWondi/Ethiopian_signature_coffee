import Link from "next/link";

export default function ServicesTeaser() {
  return (
    <section className="reveal-on-scroll flex flex-col gap-8 sm:gap-10 scroll-mt-28 relative section-transition-glow" id="services">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4">
        <div className="mask-reveal-wrap">
          <span className="text-[10px] sm:text-xs uppercase tracking-widest text-brand-yellow font-bold block mb-1">
            TURNKEY VENUES &amp; HOSPITALITY ADVISORY
          </span>
          <h2 className="mask-reveal-content font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-brand-green font-bold">
            Our Core Practices
          </h2>
        </div>
        <p className="text-xs sm:text-sm md:text-base text-text-muted max-w-md">
          Professional advisory, training, and operational support designed for sustainable café profitability and highland coffee excellence.
        </p>
      </div>

      {/* Prominent Flagship Service Article */}
      <article className="spotlight-card p-5 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl bg-surface-white border border-border-warm shadow-roast-bloom flex flex-col lg:grid lg:grid-cols-12 gap-6 sm:gap-8 items-center ring-1 ring-border-subtle hover:-translate-y-1 hover:shadow-cozy-lg transition-all duration-300">
        {/* Flagship Image (5 cols) */}
        <div className="w-full lg:col-span-5 relative rounded-xl sm:rounded-2xl overflow-hidden bg-stone-900 aspect-video lg:aspect-[4/3] shadow-cozy group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Coffee Shop Setup & Organization"
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            src="/coffee-shop-setup.jpg"
          />
        </div>

        {/* Flagship Details (7 cols) */}
        <div className="w-full lg:col-span-7 flex flex-col gap-4 sm:gap-5">
          <div className="flex flex-col gap-1.5 sm:gap-2">
            <span className="text-xs uppercase tracking-wider text-brand-green font-bold">
              Flagship Turnkey Project Management
            </span>
            <h3 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-text-main">
              1. Coffee Shop Setup &amp; Organization
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-text-muted leading-relaxed">
              Complete turnkey advisory for opening new specialty venues and expanding café brands. We handle ergonomic bar workflow design, commercial espresso machine procurement, water filtration calibration, and team operational readiness.
            </p>
          </div>

          {/* Key Scope Elements */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-1">
            <div className="p-3 sm:p-3.5 rounded-xl bg-surface-subtle border border-border-subtle shadow-cozy-sm flex flex-col gap-0.5 sm:gap-1 hover:-translate-y-0.5 transition-all">
              <span className="text-xs text-text-main font-bold">Bar Ergonomics</span>
              <span className="text-[11px] text-text-muted">High-volume drink flow layout</span>
            </div>
            <div className="p-3 sm:p-3.5 rounded-xl bg-surface-subtle border border-border-subtle shadow-cozy-sm flex flex-col gap-0.5 sm:gap-1 hover:-translate-y-0.5 transition-all">
              <span className="text-xs text-text-main font-bold">Equipment Selection</span>
              <span className="text-[11px] text-text-muted">Commercial machines &amp; grinders</span>
            </div>
            <div className="p-3 sm:p-3.5 rounded-xl bg-surface-subtle border border-border-subtle shadow-cozy-sm flex flex-col gap-0.5 sm:gap-1 hover:-translate-y-0.5 transition-all">
              <span className="text-xs text-text-main font-bold">Opening Launch</span>
              <span className="text-[11px] text-text-muted">On-site team operational readiness</span>
            </div>
          </div>

          {/* Dual Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1 sm:pt-2">
            <Link
              className="group btn-shimmer inline-flex items-center justify-center h-12 px-6 sm:px-8 rounded-xl bg-brand-green hover:bg-brand-green-dark text-white font-semibold text-sm whitespace-nowrap shadow-cozy hover:shadow-cozy-float active:scale-95 transition-all text-center hover:-translate-y-0.5 duration-200"
              href="/contact"
            >
              <span>Book Setup Consultation</span>
            </Link>
            <Link
              className="inline-flex items-center justify-center h-12 px-6 rounded-xl border border-brand-green/40 hover:border-brand-green text-brand-green bg-white hover:bg-brand-green/5 font-semibold text-sm transition-all text-center"
              href="/services"
            >
              <span>Explore All Services &amp; Packages &rarr;</span>
            </Link>
          </div>
        </div>
      </article>

      {/* Overview Teaser Banner linking to full Services Catalog */}
      <div className="p-6 sm:p-8 rounded-2xl bg-surface-subtle border border-border-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-cozy-sm">
        <div className="flex flex-col gap-1.5 max-w-2xl">
          <span className="text-xs font-bold text-brand-green uppercase tracking-wider">
            Dedicated Practices &amp; Pricing Catalog
          </span>
          <h4 className="font-serif text-lg sm:text-xl font-bold text-text-main">
            Need Barista Training, Menu Engineering, or Catering?
          </h4>
          <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
            All 6 specialized advisory practices, transparent commercial service packages, pricing models, and luxury event catering are hosted on our dedicated Services page.
          </p>
        </div>
        <Link
          className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-brand-green hover:bg-brand-green-dark text-white font-bold text-xs uppercase tracking-wider whitespace-nowrap shadow-cozy hover:shadow-cozy-float transition-all shrink-0 active:scale-95"
          href="/services"
        >
          <span>View All Services &amp; Pricing &rarr;</span>
        </Link>
      </div>
    </section>
  );
}
