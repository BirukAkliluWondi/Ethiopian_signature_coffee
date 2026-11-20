"use client";

import { useState } from "react";

export default function SingleOrigins() {
  const [selectedOrigin, setSelectedOrigin] = useState("Yirgacheffe");

  const origins = [
    {
      name: "Yirgacheffe",
      tag: "Floral & Delicate",
      description: "Jasmine blossoms, sweet bergamot, lemongrass, crisp citrus finish.",
      altitude: "1,850 – 2,200 MASL",
      process: "Fully Washed / Sun-Dried",
      harvest: "Nov – Feb",
      score: "93.5 SCA",
      roastRecommendation: "Light to Medium-Light filter & bright espresso",
      cooperative: "Gedeo Highland Smallholder Union",
      flavorPills: ["Jasmine Blossoms", "Bergamot", "Lemongrass", "Meyer Lemon"],
    },
    {
      name: "Sidama",
      tag: "Complex & Balanced",
      description: "Bright Meyer lemon, ripe apricot, cane sugar, silky caramel body.",
      altitude: "1,750 – 2,100 MASL",
      process: "Washed & Natural Anaerobic",
      harvest: "Oct – Jan",
      score: "92.0 SCA",
      roastRecommendation: "Medium-Light balanced espresso & pour-over",
      cooperative: "Sidama Coffee Farmers Cooperative Union (SCFCU)",
      flavorPills: ["Ripe Apricot", "Cane Sugar", "Meyer Lemon", "Silky Caramel"],
    },
    {
      name: "Guji",
      tag: "Lush & Exotic",
      description: "White peach, honeyed lavender, dark plum, sparkling acidity.",
      altitude: "1,900 – 2,350 MASL",
      process: "Natural Raised Bed & Honey Process",
      harvest: "Dec – Mar",
      score: "94.0 SCA",
      roastRecommendation: "Light roast filter & single-origin pour-over",
      cooperative: "Oromia Highland Guji Micro-Lot Syndicate",
      flavorPills: ["White Peach", "Honeyed Lavender", "Dark Plum", "Sparkling Acidity"],
    },
    {
      name: "Harrar",
      tag: "Wild & Sun-Dried",
      description: "Wild blueberry compote, baker's chocolate, spicy cinnamon undertones.",
      altitude: "1,550 – 1,950 MASL",
      process: "Traditional Sun-Dried Natural",
      harvest: "Oct – Dec",
      score: "91.5 SCA",
      roastRecommendation: "Medium roast rich body espresso & French press",
      cooperative: "Eastern Highlands Historic Heritage Syndicate",
      flavorPills: ["Wild Blueberry", "Baker's Chocolate", "Cardamom", "Cinnamon"],
    },
  ];

  const current = origins.find((o) => o.name === selectedOrigin) || origins[0];

  return (
    <section
      className="flex flex-col gap-6 sm:gap-8 scroll-mt-28 relative section-transition-glow"
      id="origins"
    >
      {/* Section Header with Interactive Hint */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4">
        <div>
          <div className="inline-flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-brand-yellow font-bold">
              The Birthplace of Arabica
            </span>
            <span className="hidden sm:inline-block text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-yellow/15 text-brand-yellow font-semibold">
              Interactive Explorer
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-green mt-1">
            Direct-Trade Single Origins
          </h2>
        </div>
        <p className="text-xs sm:text-sm md:text-base text-text-muted max-w-md">
          Our client cafés receive direct allocations from certified highland cooperatives. Click a terroir below to explore detailed micro-lot specs.
        </p>
      </div>

      {/* 4 Interactive Terroir Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {origins.map((origin) => {
          const isSelected = selectedOrigin === origin.name;
          return (
            <button
              key={origin.name}
              className={`p-5 sm:p-6 rounded-2xl text-left transition-all flex flex-col justify-between group cursor-pointer relative ${
                isSelected
                  ? "bg-surface-white border-2 border-brand-yellow shadow-cozy ring-2 ring-brand-yellow/20 -translate-y-1"
                  : "bg-surface-white/90 border border-border-subtle shadow-cozy-sm hover:shadow-cozy hover:border-border-warm hover:-translate-y-0.5"
              }`}
              onClick={() => setSelectedOrigin(origin.name)}
              type="button"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] sm:text-xs font-bold text-brand-yellow uppercase tracking-widest">
                    {origin.tag}
                  </span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse" />
                  )}
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-green mt-1.5 group-hover:text-brand-green-light transition-colors">
                  {origin.name}
                </h3>
                <p className="text-xs sm:text-sm text-text-muted mt-2 leading-relaxed">
                  {origin.description}
                </p>
              </div>

              {/* Micro-Affordance */}
              <div className="pt-3 mt-3 border-t border-border-subtle/60 flex items-center justify-between text-[11px]">
                <span className="text-text-muted font-medium">{origin.score}</span>
                <span
                  className={`font-semibold flex items-center gap-1 transition-colors ${
                    isSelected ? "text-brand-green" : "text-brand-yellow group-hover:text-brand-green"
                  }`}
                >
                  {isSelected ? "Inspecting" : "Explore Spec →"}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Interactive Terroir Deep-Dive Spec Card (Living Web Panel) */}
      <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-surface-white border border-border-warm shadow-cozy-lg flex flex-col lg:grid lg:grid-cols-12 gap-6 sm:gap-8 items-center ring-1 ring-border-subtle transition-all duration-300">
        {/* Left Column: Terroir Badge & Primary Metrics (7 cols) */}
        <div className="w-full lg:col-span-7 flex flex-col gap-4 sm:gap-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-brand-green/10 text-brand-green font-bold text-xs uppercase tracking-wider">
              {current.name} Highland Lot
            </span>
            <span className="px-3 py-1 rounded-full bg-brand-yellow/15 text-brand-yellow font-bold text-xs uppercase tracking-wider">
              Cupping Grade: {current.score}
            </span>
            <span className="px-3 py-1 rounded-full bg-surface-subtle border border-border-subtle text-text-muted text-xs">
              {current.process}
            </span>
          </div>

          <div>
            <h4 className="font-serif text-2xl sm:text-3xl font-bold text-brand-green">
              {current.name} Sensory &amp; Origin Architecture
            </h4>
            <p className="text-xs sm:text-sm text-text-muted mt-1 leading-relaxed">
              Allocated directly through the {current.cooperative}. Harvested during peak ripening ({current.harvest}) and sorted for maximum cup clarity.
            </p>
          </div>

          {/* Flavor Profile Pills */}
          <div className="flex flex-col gap-1.5 pt-1">
            <span className="text-[11px] uppercase tracking-wider font-bold text-text-muted">
              Dominant Cupping Notes:
            </span>
            <div className="flex flex-wrap gap-2">
              {current.flavorPills.map((note) => (
                <span
                  key={note}
                  className="px-3 py-1.5 rounded-xl bg-surface-subtle border border-border-subtle text-xs font-semibold text-text-main shadow-cozy-sm"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Terroir Specifications & Direct Allocation Button (5 cols) */}
        <div className="w-full lg:col-span-5 flex flex-col gap-4 p-5 sm:p-6 rounded-2xl bg-surface-subtle/80 border border-border-subtle shadow-cozy-sm">
          <span className="text-xs uppercase tracking-wider text-brand-yellow font-bold">
            Highland Lot Specifications
          </span>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex flex-col">
              <span className="text-[11px] text-text-muted">Cultivation Altitude</span>
              <strong className="text-text-main font-semibold mt-0.5">{current.altitude}</strong>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] text-text-muted">Harvest Window</span>
              <strong className="text-text-main font-semibold mt-0.5">{current.harvest}</strong>
            </div>
            <div className="flex flex-col col-span-2 pt-2 border-t border-border-subtle">
              <span className="text-[11px] text-text-muted">Recommended Profile</span>
              <span className="text-text-main font-medium mt-0.5 text-xs">{current.roastRecommendation}</span>
            </div>
          </div>

          <a
            className="mt-2 h-11 px-5 rounded-xl bg-brand-green hover:bg-brand-green-dark text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-cozy hover:shadow-cozy-float active:scale-95 transition-all text-center"
            href="#contact"
          >
            <span>Request {current.name} Allocation Sample</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>
      </div>
    </section>
  );
}
