export default function Projects() {
  return (
    <section className="flex flex-col gap-6 sm:gap-8" id="projects">
      <div className="flex flex-col gap-1.5">
        <span className="text-xs uppercase tracking-widest text-brand-yellow font-bold">
          Demonstrated Experience
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-brand-green font-bold">
          Our Projects &amp; Executed Works
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-text-muted max-w-xl">
          Selected client engagements spanning independent specialty cafés, hospitality venues, and roasting partners.
        </p>
      </div>

      {/* 3 Projects */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        {/* Project 1 */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-border-subtle flex flex-col justify-between gap-4 shadow-sm hover:shadow transition-shadow">
          <div className="flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">storefront</span>
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="font-serif text-lg sm:text-xl font-bold text-text-main">
                Specialty Café Openings
              </h4>
              <span className="text-xs text-brand-yellow font-bold">
                Addis Ababa &amp; Regional Hubs
              </span>
              <p className="text-xs text-text-muted mt-1 leading-relaxed">
                Turnkey espresso bar workflow design, machine procurement, plumbing calibration, and launch team preparation for independent café owners.
              </p>
            </div>
          </div>
          <div className="pt-3 border-t border-gray-100 text-[11px] sm:text-xs text-text-muted font-medium">
            Category: Turnkey Venue Setup
          </div>
        </div>

        {/* Project 2 */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-border-subtle flex flex-col justify-between gap-4 shadow-sm hover:shadow transition-shadow">
          <div className="flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-yellow/15 text-brand-yellow flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">hotel</span>
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="font-serif text-lg sm:text-xl font-bold text-text-main">
                Hotel Beverage Programs
              </h4>
              <span className="text-xs text-brand-yellow font-bold">
                Boutique Hotels &amp; Resorts
              </span>
              <p className="text-xs text-text-muted mt-1 leading-relaxed">
                Hospitality staff upskilling, signature beverage development, quality consistency SOPs, and tailored roasting profiles.
              </p>
            </div>
          </div>
          <div className="pt-3 border-t border-gray-100 text-[11px] sm:text-xs text-text-muted font-medium">
            Category: Hospitality Training
          </div>
        </div>

        {/* Project 3 */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-border-subtle flex flex-col justify-between gap-4 shadow-sm hover:shadow transition-shadow">
          <div className="flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">local_shipping</span>
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="font-serif text-lg sm:text-xl font-bold text-text-main">
                Roastery Quality Standards
              </h4>
              <span className="text-xs text-brand-yellow font-bold">
                Domestic &amp; Export Programs
              </span>
              <p className="text-xs text-text-muted mt-1 leading-relaxed">
                Cupping laboratory configuration, green coffee grading protocols, and roast curve calibration for direct trade shipments.
              </p>
            </div>
          </div>
          <div className="pt-3 border-t border-gray-100 text-[11px] sm:text-xs text-text-muted font-medium">
            Category: Quality Calibration
          </div>
        </div>
      </div>
    </section>
  );
}
