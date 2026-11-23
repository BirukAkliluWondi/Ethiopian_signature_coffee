import DynamicServicePackages from "./DynamicServicePackages";

export default function Services() {
  return (
    <section className="reveal-on-scroll flex flex-col gap-8 sm:gap-10 scroll-mt-28 relative section-transition-glow" id="services">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4">
        <div className="mask-reveal-wrap">
          <h2 className="mask-reveal-content font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-brand-green font-bold">
            Our Services
          </h2>
        </div>
        <p className="text-xs sm:text-sm md:text-base text-text-muted max-w-md">
          Professional advisory, training, and operational support designed for sustainable café profitability and growth.
        </p>
      </div>

      {/* Prominent Flagship Service (Given Extra Visual Space) */}
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
              Turnkey Project Management
            </span>
            <h3 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-text-main">
              1. Coffee Shop Setup &amp; Organization
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-text-muted leading-relaxed">
              Complete turnkey advisory for opening new specialty venues and expanding café brands. We handle ergonomic bar workflow design, commercial espresso machine procurement, water filtration calibration, and team readiness.
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

          <div className="pt-1 sm:pt-2">
            <a
              className="group btn-shimmer inline-flex items-center justify-center h-12 w-full sm:w-auto px-6 sm:px-8 rounded-xl bg-brand-green hover:bg-brand-green-dark text-white font-semibold text-sm whitespace-nowrap shadow-cozy hover:shadow-cozy-float active:scale-95 transition-all text-center hover:-translate-y-0.5 duration-200"
              href="#contact"
            >
              <span>Book Setup Consultation</span>
            </a>
          </div>
        </div>
      </article>

      {/* 5 Core Specialized Practices (Balanced 3-top, 2-bottom symmetrical grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-8">
        {/* Service 2: Barista Training */}
        <article className="reveal-on-scroll delay-100 spotlight-card group flex flex-col rounded-2xl bg-surface-white border border-border-subtle overflow-hidden shadow-cozy hover:shadow-roast-bloom hover:-translate-y-1.5 hover:border-brand-yellow/50 transition-all duration-300 lg:col-span-2">
          <div className="relative w-full aspect-video overflow-hidden bg-stone-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Barista Training"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop"
            />
          </div>
          <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 gap-4 sm:gap-5">
            <div className="flex flex-col gap-1.5 sm:gap-2">
              <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-text-main group-hover:text-brand-green transition-colors">
                2. Barista Training
              </h3>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                Professional training covering espresso extraction science, milk texturing, latte art, station ergonomics, and guest hospitality ethics.
              </p>
            </div>
            <a
              className="group w-full h-11 px-5 rounded-xl border border-brand-green text-brand-green font-bold text-xs uppercase tracking-wider hover:bg-brand-green hover:text-white transition-all shadow-cozy-sm flex items-center justify-center whitespace-nowrap active:scale-95"
              href="#training"
            >
              <span>View Curriculum</span>
            </a>
          </div>
        </article>

        {/* Service 3: Menu & Recipe Development */}
        <article className="reveal-on-scroll delay-200 spotlight-card group flex flex-col rounded-2xl bg-surface-white border border-border-subtle overflow-hidden shadow-cozy hover:shadow-roast-bloom hover:-translate-y-1.5 hover:border-brand-yellow/50 transition-all duration-300 lg:col-span-2">
          <div className="relative w-full aspect-video overflow-hidden bg-stone-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Menu & Recipe Development"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop"
            />
          </div>
          <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 gap-4 sm:gap-5">
            <div className="flex flex-col gap-1.5 sm:gap-2">
              <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-text-main group-hover:text-brand-green transition-colors">
                3. Menu &amp; Recipe Development
              </h3>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                Crafting signature coffee beverages, indigenous botanical infusions, recipe standardization, and seasonal drink promotions.
              </p>
            </div>
            <a
              className="group w-full h-11 px-5 rounded-xl border border-brand-green text-brand-green font-bold text-xs uppercase tracking-wider hover:bg-brand-green hover:text-white transition-all shadow-cozy-sm flex items-center justify-center whitespace-nowrap active:scale-95"
              href="#contact"
            >
              <span>Inquire Menus</span>
            </a>
          </div>
        </article>

        {/* Service 4: Coffee Business Consulting */}
        <article className="reveal-on-scroll delay-300 spotlight-card group flex flex-col rounded-2xl bg-surface-white border border-border-subtle overflow-hidden shadow-cozy hover:shadow-roast-bloom hover:-translate-y-1.5 hover:border-brand-yellow/50 transition-all duration-300 lg:col-span-2">
          <div className="relative w-full aspect-video overflow-hidden bg-stone-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Coffee Business Consulting"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=800&auto=format&fit=crop"
            />
          </div>
          <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 gap-4 sm:gap-5">
            <div className="flex flex-col gap-1.5 sm:gap-2">
              <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-text-main group-hover:text-brand-green transition-colors">
                4. Coffee Business Consulting
              </h3>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                Financial feasibility modeling, brand positioning, commercial site assessment, and scalable operational roadmaps.
              </p>
            </div>
            <a
              className="group w-full h-11 px-5 rounded-xl border border-brand-green text-brand-green font-bold text-xs uppercase tracking-wider hover:bg-brand-green hover:text-white transition-all shadow-cozy-sm flex items-center justify-center whitespace-nowrap active:scale-95"
              href="#contact"
            >
              <span>Book Advisory</span>
            </a>
          </div>
        </article>

        {/* Service 5: Coffee Shop Operations Management */}
        <article className="reveal-on-scroll delay-100 spotlight-card group flex flex-col rounded-2xl bg-surface-white border border-border-subtle overflow-hidden shadow-cozy hover:shadow-roast-bloom hover:-translate-y-1.5 hover:border-brand-yellow/50 transition-all duration-300 lg:col-span-3">
          <div className="relative w-full aspect-video overflow-hidden bg-stone-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Coffee Shop Operations Management"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=800&auto=format&fit=crop"
            />
          </div>
          <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 gap-4 sm:gap-5">
            <div className="flex flex-col gap-1.5 sm:gap-2">
              <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-text-main group-hover:text-brand-green transition-colors">
                5. Coffee Shop Operations Management
              </h3>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                Real-time inventory management protocols, waste minimization, daily shift checklists, and quality maintenance standards.
              </p>
            </div>
            <a
              className="group w-full h-11 px-5 rounded-xl border border-brand-green text-brand-green font-bold text-xs uppercase tracking-wider hover:bg-brand-green hover:text-white transition-all shadow-cozy-sm flex items-center justify-center whitespace-nowrap active:scale-95"
              href="#contact"
            >
              <span>View Operations</span>
            </a>
          </div>
        </article>

        {/* Service 6: Menu Engineering & Profitability Improvement */}
        <article className="reveal-on-scroll delay-200 spotlight-card group flex flex-col rounded-2xl bg-surface-white border border-border-subtle overflow-hidden shadow-cozy hover:shadow-roast-bloom hover:-translate-y-1.5 hover:border-brand-yellow/50 transition-all duration-300 md:col-span-2 lg:col-span-3">
          <div className="relative w-full aspect-video overflow-hidden bg-stone-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Menu Engineering & Profitability"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src="https://images.unsplash.com/photo-1559496417-e7f25cb247f3?q=80&w=800&auto=format&fit=crop"
            />
          </div>
          <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 gap-4 sm:gap-5">
            <div className="flex flex-col gap-1.5 sm:gap-2">
              <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-text-main group-hover:text-brand-green transition-colors">
                6. Menu Engineering &amp; Profitability
              </h3>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                Margin analysis per beverage, high-profit signature drink architecture, pricing strategies, and waste reduction optimization.
              </p>
            </div>
            <a
              className="group w-full h-11 px-5 rounded-xl border border-brand-green text-brand-green font-bold text-xs uppercase tracking-wider hover:bg-brand-green hover:text-white transition-all shadow-cozy-sm flex items-center justify-center whitespace-nowrap active:scale-95"
              href="#contact"
            >
              <span>Improve Margins</span>
            </a>
          </div>
        </article>
      </div>

      {/* Featured Service Packages & Transparent Pricing (Dynamic CMS) */}
      <DynamicServicePackages />

      {/* Dedicated Luxury Catering Showcase (Flagship 2) */}
      <article
        id="catering"
        className="spotlight-card p-5 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl bg-surface-white border border-border-warm shadow-roast-bloom flex flex-col lg:grid lg:grid-cols-12 gap-6 sm:gap-8 items-center ring-1 ring-border-subtle hover:-translate-y-1 hover:shadow-cozy-lg transition-all duration-300 scroll-mt-28"
      >
        {/* Dedicated Photo Section (5 cols) */}
        <div className="w-full lg:col-span-5 relative rounded-xl sm:rounded-2xl overflow-hidden bg-stone-900 aspect-video lg:aspect-[4/3] shadow-cozy group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Ethiopian Signature Catering Services & Event Hospitality"
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            src="/catering-services.jpg"
          />
        </div>

        {/* Narrative, 4 Pillars & Booking Actions (7 cols) */}
        <div className="w-full lg:col-span-7 flex flex-col gap-4 sm:gap-5">
          <div className="flex flex-col gap-1.5 sm:gap-2">
            <span className="text-xs uppercase tracking-wider text-brand-green font-bold">
              Luxury Event Hospitality
            </span>
            <h3 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-text-main">
              7. Catering Services &amp; Event Hospitality
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-text-muted leading-relaxed">
              Complete specialty coffee bars, traditional ceremonial service, and culinary catering designed for high-profile gatherings, corporate summits, and intimate celebrations. We bring authentic hospitality, craft beverages, and seamless event coordination to your venue.
            </p>
          </div>

          {/* 4 Core Offerings Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-1">
            <div className="p-3 sm:p-3.5 rounded-xl bg-surface-subtle border border-border-subtle shadow-cozy-sm flex flex-col gap-1 hover:-translate-y-0.5 transition-all">
              <span className="text-xs text-text-main font-bold">Coffee Catering</span>
              <span className="text-[11px] text-text-muted leading-snug">
                Specialty coffee service for meetings, conferences, and special events.
              </span>
            </div>
            <div className="p-3 sm:p-3.5 rounded-xl bg-surface-subtle border border-border-subtle shadow-cozy-sm flex flex-col gap-1 hover:-translate-y-0.5 transition-all">
              <span className="text-xs text-text-main font-bold">Event Catering</span>
              <span className="text-[11px] text-text-muted leading-snug">
                Food and beverage catering for private and corporate functions.
              </span>
            </div>
            <div className="p-3 sm:p-3.5 rounded-xl bg-surface-subtle border border-border-subtle shadow-cozy-sm flex flex-col gap-1 hover:-translate-y-0.5 transition-all">
              <span className="text-xs text-text-main font-bold">Mocktail &amp; Beverage</span>
              <span className="text-[11px] text-text-muted leading-snug">
                Custom mocktails, cold refreshments, and hot beverage service for events.
              </span>
            </div>
            <div className="p-3 sm:p-3.5 rounded-xl bg-surface-subtle border border-border-subtle shadow-cozy-sm flex flex-col gap-1 hover:-translate-y-0.5 transition-all">
              <span className="text-xs text-text-main font-bold">Corporate &amp; Private Events</span>
              <span className="text-[11px] text-text-muted leading-snug">
                Full hospitality service for company functions, birthdays, weddings, and private celebrations.
              </span>
            </div>
          </div>

          {/* Dual Action Buttons: Request a Quote & Make a Reservation */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1 sm:pt-2">
            <a
              className="group btn-shimmer inline-flex items-center justify-center h-12 w-full sm:w-auto px-6 sm:px-8 rounded-xl bg-brand-green hover:bg-brand-green-dark text-white font-semibold text-sm whitespace-nowrap shadow-cozy hover:shadow-cozy-float active:scale-95 transition-all text-center hover:-translate-y-0.5 duration-200"
              href="#contact"
            >
              <span>Request a Quote</span>
            </a>
            <a
              className="inline-flex items-center justify-center h-12 w-full sm:w-auto px-5 sm:px-6 rounded-xl border border-brand-green text-brand-green hover:bg-brand-green/10 font-semibold text-sm active:scale-95 transition-all text-center duration-200 gap-2 whitespace-nowrap"
              href="https://wa.me/251925451711?text=Hello%20Ethiopian%20Signature%20Coffee%2C%20I%20would%20like%20to%20request%20a%20quote%20and%20reserve%20catering%20services%20for%20an%20upcoming%20event."
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="material-symbols-outlined text-base">calendar_month</span>
              <span>Make a Reservation</span>
            </a>
          </div>
        </div>
      </article>
    </section>
  );
}
