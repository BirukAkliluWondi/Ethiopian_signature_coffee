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

      {/* Artisanal Terroir Ledger (De-Boxed Sensory Palette) */}
      <div className="border-y border-border-subtle/80 divide-y sm:divide-y-0 sm:divide-x divide-border-subtle/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 py-2 sm:py-4">
        {origins.map((origin, index) => {
          const delays = ["delay-100", "delay-200", "delay-300", "delay-400"];
          return (
            <div
              key={origin.name}
              className={`reveal-on-scroll ${delays[index % 4]} flex flex-col justify-between p-4 sm:p-5 lg:p-6 group hover:bg-surface-cream/40 transition-colors duration-300`}
            >
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] sm:text-[10.5px] font-bold text-brand-yellow uppercase tracking-[0.16em]">
                    {origin.tag}
                  </span>
                  <span className="text-[10px] text-text-muted/60 font-mono">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-green group-hover:text-brand-green-light transition-colors mt-1">
                  {origin.name}
                </h3>

                <p className="text-xs sm:text-[13px] text-text-muted leading-relaxed mt-2">
                  {origin.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-border-subtle/50 flex items-center justify-between text-[11px] text-text-muted font-medium">
                <span>Cooperative Lot</span>
                <span className="text-brand-green font-semibold">Direct Allocation</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
