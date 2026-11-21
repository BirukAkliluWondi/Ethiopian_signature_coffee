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

      {/* 4-Step Process Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {steps.map((item, index) => {
          const delays = ["delay-100", "delay-200", "delay-300", "delay-400"];
          return (
            <div
              key={item.step}
              className={`reveal-on-scroll ${delays[index % 4]} spotlight-card p-5 sm:p-6 rounded-2xl bg-surface-white border border-border-subtle shadow-cozy-sm hover:shadow-roast-bloom hover:-translate-y-2 hover:border-brand-yellow/50 transition-all duration-300 flex flex-col justify-between group ring-1 ring-border-subtle/50`}
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between border-b border-border-subtle pb-3">
                  <span className="text-xs font-bold text-brand-yellow uppercase tracking-widest">
                    {item.phase}
                  </span>
                  <span className="font-serif text-xl sm:text-2xl font-bold text-text-muted/40 group-hover:text-brand-green/70 transition-colors">
                    {item.step}
                  </span>
                </div>

                <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-green group-hover:text-brand-green-light transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-text-muted leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-border-subtle/60 flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-wider text-text-muted/80 font-semibold">
                  Key Deliverable:
                </span>
                <span className="text-[11.5px] font-medium text-brand-green leading-tight">
                  {item.deliverable}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
