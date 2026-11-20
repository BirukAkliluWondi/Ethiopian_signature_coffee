export default function SingleOrigins() {
  const origins = [
    {
      tag: "Floral & Delicate",
      name: "Yirgacheffe",
      description: "Jasmine blossoms, sweet bergamot, lemongrass, crisp citrus finish.",
    },
    {
      tag: "Complex & Balanced",
      name: "Sidama",
      description: "Bright Meyer lemon, ripe apricot, cane sugar, silky caramel body.",
    },
    {
      tag: "Lush & Exotic",
      name: "Guji",
      description: "White peach, honeyed lavender, dark plum, sparkling acidity.",
    },
    {
      tag: "Wild & Sun-Dried",
      name: "Harrar",
      description: "Wild blueberry compote, baker's chocolate, spicy cinnamon undertones.",
    },
  ];

  return (
    <section
      className="reveal-on-scroll flex flex-col gap-6 sm:gap-8 scroll-mt-28 relative section-transition-glow"
      id="origins"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-brand-yellow font-bold">
            The Birthplace of Arabica
          </span>
          <div className="mask-reveal-wrap">
            <h2 className="mask-reveal-content font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-green mt-1">
              Direct-Trade Single Origins
            </h2>
          </div>
        </div>
        <p className="text-xs sm:text-sm md:text-base text-text-muted max-w-md">
          Our client cafés receive direct allocations from certified highland cooperatives.
        </p>
      </div>

      {/* 4-Card Terroir Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {origins.map((origin, index) => {
          const delays = ["delay-100", "delay-200", "delay-300", "delay-400"];
          return (
            <div
              key={origin.name}
              className={`reveal-on-scroll ${delays[index % 4]} spotlight-card p-5 sm:p-6 rounded-2xl bg-surface-white border border-border-subtle shadow-cozy-sm hover:shadow-roast-bloom hover:-translate-y-2 hover:ring-1 hover:ring-brand-yellow/40 transition-all duration-300 flex flex-col justify-between group ring-1 ring-border-subtle/50`}
            >
              <div>
                <span className="text-[10px] sm:text-xs font-bold text-brand-yellow uppercase tracking-widest">
                  {origin.tag}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-green mt-1.5 group-hover:text-brand-green-light transition-colors">
                  {origin.name}
                </h3>
                <p className="text-xs sm:text-sm text-text-muted mt-2.5 leading-relaxed">
                  {origin.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
