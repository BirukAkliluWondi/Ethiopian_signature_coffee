export default function Process() {
  const steps = [
    {
      step: "01",
      phase: "Stage 01",
      title: "Concept & Feasibility",
      summary: "Location scouting, commercial budget modeling, demographic analysis, and signature beverage menu concept design.",
      deliverable: "Feasibility blueprint & pro-forma model",
    },
    {
      step: "02",
      phase: "Stage 02",
      title: "Bar Layout & Engineering",
      summary: "High-speed barista workflow CAD design, commercial espresso machine & grinder procurement, water filtration & electrical calibration.",
      deliverable: "Ergonomic CAD plans & equipment spec sheet",
    },
    {
      step: "03",
      phase: "Stage 03",
      title: "Sourcing & Barista Academy",
      summary: "Direct highland cooperative bean allocations, custom roast profile curve development, and rigorous 4-stage barista team certification.",
      deliverable: "Certified team & proprietary roast profile",
    },
    {
      step: "04",
      phase: "Stage 04",
      title: "Launch & Operational SOPs",
      summary: "On-site opening supervision, speed-of-service queue management, daily shift checklists, waste minimization, and margin auditing.",
      deliverable: "Operational SOP manual & ongoing advisory",
    },
  ];

  return (
    <section
      className="reveal-on-scroll flex flex-col gap-6 sm:gap-8 scroll-mt-28 relative section-transition-glow"
      id="process"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-brand-yellow font-bold">
            Turnkey Methodology
          </span>
          <div className="mask-reveal-wrap">
            <h2 className="mask-reveal-content font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-green mt-1">
              How We Build Coffee Businesses
            </h2>
          </div>
        </div>
        <p className="text-xs sm:text-sm md:text-base text-text-muted max-w-md">
          A disciplined, four-stage pathway from initial commercial concept to daily high-volume operational excellence.
        </p>
      </div>

      {/* Continuous Stepped Timeline (De-Boxed Runway) */}
      <div className="relative pt-2">
        {/* Continuous Connecting Line (Desktop) */}
        <div className="hidden lg:block absolute top-[21px] left-6 right-6 h-[1.5px] bg-gradient-to-r from-brand-yellow/80 via-brand-green/60 to-brand-yellow/80 z-0 pointer-events-none" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
          {steps.map((item, index) => {
            const delays = ["delay-100", "delay-200", "delay-300", "delay-400"];
            return (
              <div
                key={item.step}
                className={`reveal-on-scroll ${delays[index % 4]} flex flex-col justify-between group pt-1`}
              >
                <div className="flex flex-col gap-3">
                  {/* Timeline Milestone Header */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-surface-white border-2 border-brand-green/30 group-hover:border-brand-yellow group-hover:shadow-roast-bloom group-hover:scale-105 transition-all flex items-center justify-center font-serif text-sm font-bold text-brand-green shadow-cozy-sm shrink-0">
                      {item.step}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10.5px] font-bold text-brand-yellow uppercase tracking-widest">
                        {item.phase}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-bold text-text-main group-hover:text-brand-green transition-colors leading-snug mt-1">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-[13px] text-text-muted leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                {/* Key Deliverable Note (Clean, borderless typography) */}
                <div className="pt-3 mt-4 border-t border-border-subtle/80 flex flex-col gap-0.5">
                  <span className="text-[10px] uppercase tracking-wider text-text-muted font-bold">
                    Key Deliverable
                  </span>
                  <span className="text-xs font-semibold text-brand-green leading-snug">
                    {item.deliverable}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
