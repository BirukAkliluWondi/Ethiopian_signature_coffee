export default function Services() {
  return (
    <section className="flex flex-col gap-8 sm:gap-10 scroll-mt-28 relative section-transition-glow" id="services">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4">
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-brand-green font-bold">
          Our Services
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-text-muted max-w-md">
          Professional advisory, training, and operational support designed for sustainable café profitability and growth.
        </p>
      </div>

      {/* Prominent Flagship Service (Given Extra Visual Space) */}
      <article className="p-5 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl bg-surface-white border border-border-warm shadow-roast-bloom flex flex-col lg:grid lg:grid-cols-12 gap-6 sm:gap-8 items-center ring-1 ring-border-subtle">
        {/* Flagship Image (5 cols) */}
        <div className="w-full lg:col-span-5 relative rounded-xl sm:rounded-2xl overflow-hidden bg-stone-900 aspect-video lg:aspect-[4/3] shadow-cozy group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Coffee Shop Setup & Organization"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBupxs9yDUXKNBndzW61BwaixUDoqz_FHq_DZORO1tvFV6TiAu1ihaQrr7RvkPMcZV_2lHl8Zpnjb-IITPCjuET2UL7AdHY_jGfNuE3b9emmCyx2fF9hvo82XPbgrRYBrzhvcqNYZWsEuO1_uzJT6iDdIKpbaWEEssY-Gbu9T6Ho3St9i25qi2EwjsuuUtxlLIXBjuGxy1l4e5qRQi0Xsddj8vXp1woaUMj96B4XfzwHI206gmPLA_u"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <span className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 px-3 py-1 rounded-full bg-brand-red text-white text-[10px] sm:text-[11px] font-bold tracking-wider uppercase shadow-cozy-sm">
            FLAGSHIP SERVICE
          </span>
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
            <div className="p-3 sm:p-3.5 rounded-xl bg-surface-subtle border border-border-subtle shadow-cozy-sm flex flex-col gap-0.5 sm:gap-1">
              <span className="text-xs text-text-main font-bold">Bar Ergonomics</span>
              <span className="text-[11px] text-text-muted">High-volume drink flow layout</span>
            </div>
            <div className="p-3 sm:p-3.5 rounded-xl bg-surface-subtle border border-border-subtle shadow-cozy-sm flex flex-col gap-0.5 sm:gap-1">
              <span className="text-xs text-text-main font-bold">Equipment Selection</span>
              <span className="text-[11px] text-text-muted">Commercial machines &amp; grinders</span>
            </div>
            <div className="p-3 sm:p-3.5 rounded-xl bg-surface-subtle border border-border-subtle shadow-cozy-sm flex flex-col gap-0.5 sm:gap-1">
              <span className="text-xs text-text-main font-bold">Opening Launch</span>
              <span className="text-[11px] text-text-muted">On-site team operational readiness</span>
            </div>
          </div>

          <div className="pt-1 sm:pt-2">
            <a
              className="group inline-flex items-center justify-center gap-2 h-12 w-full sm:w-auto px-6 sm:px-8 rounded-xl bg-brand-green hover:bg-brand-green-dark text-white font-semibold text-sm whitespace-nowrap shadow-cozy hover:shadow-cozy-float active:scale-95 transition-all text-center"
              href="#contact"
            >
              <span>Book Setup Consultation</span>
              <span className="material-symbols-outlined text-lg transition-transform duration-300 group-hover:translate-x-0.5">
                arrow_forward
              </span>
            </a>
          </div>
        </div>
      </article>

      {/* Sourcing Highlight Banner */}
      <div className="p-5 sm:p-8 rounded-2xl bg-brand-green-dark text-white flex flex-col md:flex-row items-stretch md:items-center justify-between gap-5 sm:gap-6 shadow-cozy-lg border border-brand-green">
        <div className="flex items-start sm:items-center gap-3.5 sm:gap-4">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20 shadow-cozy-sm">
            <span className="material-symbols-outlined text-brand-yellow text-xl sm:text-2xl">
              local_cafe
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-brand-yellow text-black text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">
                SPECIALTY SUPPLY
              </span>
              <span className="text-xs text-white/80 font-semibold">Direct Trade</span>
            </div>
            <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-bold">
              Premium Ethiopian Coffee Sourcing
            </h3>
            <p className="text-xs sm:text-sm text-white/80 max-w-2xl leading-relaxed">
              Specialty micro-lots and roasted coffee products sourced directly from Yirgacheffe, Sidama, Guji, and Harrar farm cooperatives.
            </p>
          </div>
        </div>
        <a
          className="group whitespace-nowrap h-11 w-full md:w-auto px-6 rounded-xl bg-brand-yellow hover:bg-brand-yellow-light text-black font-bold text-xs uppercase tracking-wider shadow-cozy active:scale-95 transition-all flex items-center justify-center gap-2 text-center"
          href="#contact"
        >
          <span>Inquire Beans</span>
          <span className="material-symbols-outlined text-base transition-transform duration-300 group-hover:translate-x-0.5">
            arrow_forward
          </span>
        </a>
      </div>

      {/* 5 Additional Core Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Service 2: Barista Training */}
        <article className="flex flex-col rounded-2xl bg-surface-white border border-border-subtle overflow-hidden shadow-cozy hover:shadow-cozy-lg transition-all">
          <div className="relative w-full aspect-video overflow-hidden bg-stone-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Barista Training"
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-brand-green text-white text-[10px] font-bold uppercase tracking-wider shadow-cozy-sm">
              TRAINING
            </span>
          </div>
          <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 gap-4 sm:gap-5">
            <div className="flex flex-col gap-1.5 sm:gap-2">
              <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-text-main">
                2. Barista Training
              </h3>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                Professional training covering espresso extraction science, milk texturing, latte art, station ergonomics, and guest hospitality ethics.
              </p>
            </div>
            <a
              className="group w-full h-11 px-5 rounded-xl border border-brand-green text-brand-green font-bold text-xs uppercase tracking-wider hover:bg-brand-green hover:text-white transition-all shadow-cozy-sm flex items-center justify-center gap-2 whitespace-nowrap"
              href="#training"
            >
              <span>View Curriculum</span>
              <span className="material-symbols-outlined text-base transition-transform duration-300 group-hover:translate-x-0.5">
                arrow_forward
              </span>
            </a>
          </div>
        </article>

        {/* Service 3: Menu & Recipe Development */}
        <article className="flex flex-col rounded-2xl bg-surface-white border border-border-subtle overflow-hidden shadow-cozy hover:shadow-cozy-lg transition-all">
          <div className="relative w-full aspect-video overflow-hidden bg-stone-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Menu & Recipe Development"
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-brand-yellow text-black text-[10px] font-bold uppercase tracking-wider shadow-cozy-sm">
              BEVERAGE DESIGN
            </span>
          </div>
          <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 gap-4 sm:gap-5">
            <div className="flex flex-col gap-1.5 sm:gap-2">
              <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-text-main">
                3. Menu &amp; Recipe Development
              </h3>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                Crafting signature coffee beverages, indigenous botanical infusions, recipe standardization, and seasonal drink promotions.
              </p>
            </div>
            <a
              className="group w-full h-11 px-5 rounded-xl border border-brand-green text-brand-green font-bold text-xs uppercase tracking-wider hover:bg-brand-green hover:text-white transition-all shadow-cozy-sm flex items-center justify-center gap-2 whitespace-nowrap"
              href="#contact"
            >
              <span>Inquire Menus</span>
              <span className="material-symbols-outlined text-base transition-transform duration-300 group-hover:translate-x-0.5">
                arrow_forward
              </span>
            </a>
          </div>
        </article>

        {/* Service 4: Coffee Business Consulting */}
        <article className="flex flex-col rounded-2xl bg-surface-white border border-border-subtle overflow-hidden shadow-cozy hover:shadow-cozy-lg transition-all">
          <div className="relative w-full aspect-video overflow-hidden bg-stone-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Coffee Business Consulting"
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=800&auto=format&fit=crop"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-brand-green text-white text-[10px] font-bold uppercase tracking-wider shadow-cozy-sm">
              CONSULTING
            </span>
          </div>
          <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 gap-4 sm:gap-5">
            <div className="flex flex-col gap-1.5 sm:gap-2">
              <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-text-main">
                4. Coffee Business Consulting
              </h3>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                Financial feasibility modeling, brand positioning, commercial site assessment, and scalable operational roadmaps.
              </p>
            </div>
            <a
              className="group w-full h-11 px-5 rounded-xl border border-brand-green text-brand-green font-bold text-xs uppercase tracking-wider hover:bg-brand-green hover:text-white transition-all shadow-cozy-sm flex items-center justify-center gap-2 whitespace-nowrap"
              href="#contact"
            >
              <span>Book Advisory</span>
              <span className="material-symbols-outlined text-base transition-transform duration-300 group-hover:translate-x-0.5">
                arrow_forward
              </span>
            </a>
          </div>
        </article>

        {/* Service 5: Coffee Shop Operations Management */}
        <article className="flex flex-col rounded-2xl bg-surface-white border border-border-subtle overflow-hidden shadow-cozy hover:shadow-cozy-lg transition-all">
          <div className="relative w-full aspect-video overflow-hidden bg-stone-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Coffee Shop Operations Management"
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=800&auto=format&fit=crop"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-brand-yellow text-black text-[10px] font-bold uppercase tracking-wider shadow-cozy-sm">
              OPERATIONS
            </span>
          </div>
          <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 gap-4 sm:gap-5">
            <div className="flex flex-col gap-1.5 sm:gap-2">
              <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-text-main">
                5. Coffee Shop Operations Management
              </h3>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                Real-time inventory management protocols, waste minimization, daily shift checklists, and quality maintenance standards.
              </p>
            </div>
            <a
              className="group w-full h-11 px-5 rounded-xl border border-brand-green text-brand-green font-bold text-xs uppercase tracking-wider hover:bg-brand-green hover:text-white transition-all shadow-cozy-sm flex items-center justify-center gap-2 whitespace-nowrap"
              href="#contact"
            >
              <span>View Operations</span>
              <span className="material-symbols-outlined text-base transition-transform duration-300 group-hover:translate-x-0.5">
                arrow_forward
              </span>
            </a>
          </div>
        </article>

        {/* Service 6: Menu Engineering & Profitability Improvement */}
        <article className="flex flex-col rounded-2xl bg-surface-white border border-border-subtle overflow-hidden shadow-cozy hover:shadow-cozy-lg transition-all md:col-span-2 lg:col-span-1">
          <div className="relative w-full aspect-video overflow-hidden bg-stone-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Menu Engineering & Profitability"
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1559496417-e7f25cb247f3?q=80&w=800&auto=format&fit=crop"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-brand-red text-white text-[10px] font-bold uppercase tracking-wider shadow-cozy-sm">
              PROFITABILITY
            </span>
          </div>
          <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 gap-4 sm:gap-5">
            <div className="flex flex-col gap-1.5 sm:gap-2">
              <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-text-main">
                6. Menu Engineering &amp; Profitability
              </h3>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                Margin analysis per beverage, high-profit signature drink architecture, pricing strategies, and waste reduction optimization.
              </p>
            </div>
            <a
              className="group w-full h-11 px-5 rounded-xl border border-brand-green text-brand-green font-bold text-xs uppercase tracking-wider hover:bg-brand-green hover:text-white transition-all shadow-cozy-sm flex items-center justify-center gap-2 whitespace-nowrap"
              href="#contact"
            >
              <span>Improve Margins</span>
              <span className="material-symbols-outlined text-base transition-transform duration-300 group-hover:translate-x-0.5">
                arrow_forward
              </span>
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
