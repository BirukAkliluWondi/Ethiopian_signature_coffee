"use client";

import { useState } from "react";

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Engagements (14+)" },
    { id: "setup", label: "Turnkey Café Setup" },
    { id: "hospitality", label: "Hospitality & Hotels" },
    { id: "roastery", label: "Roastery & Lab Standards" },
  ];

  const projects = [
    {
      id: "p1",
      category: "setup",
      categoryLabel: "Turnkey Venue Setup",
      title: "Specialty Café Openings",
      location: "Addis Ababa & Regional Hubs",
      icon: "storefront",
      iconColor: "text-brand-green bg-brand-green/10",
      description: "Turnkey espresso bar workflow design, machine procurement, plumbing calibration, and launch team preparation for independent café owners.",
      impact: "14+ Turnkey Locations Launched",
      specs: ["Ergonomic Speed Rail", "Synesso MVP / Dual Grinder", "Water TDS 130ppm"],
    },
    {
      id: "p2",
      category: "hospitality",
      categoryLabel: "Hospitality Training",
      title: "Hotel Beverage Programs",
      location: "Boutique Hotels & Resorts",
      icon: "hotel",
      iconColor: "text-brand-yellow bg-brand-yellow/15",
      description: "Hospitality staff upskilling, signature beverage development, quality consistency SOPs, and tailored roasting profiles for premium hospitality venues.",
      impact: "250+ Hospitality Baristas Certified",
      specs: ["VIP Signature Mocktails", "Room Service Coffee SOPs", "Speed Rush Consistency"],
    },
    {
      id: "p3",
      category: "roastery",
      categoryLabel: "Quality Calibration",
      title: "Roastery Quality Standards",
      location: "Domestic & Export Programs",
      icon: "local_shipping",
      iconColor: "text-brand-red bg-brand-red/10",
      description: "Cupping laboratory configuration, green coffee grading protocols, and roast curve calibration for direct trade shipments.",
      impact: "100% Direct-Trade Origin Traceability",
      specs: ["SCA Cupping Lab Protocol", "Agtron Color Tracking", "Moisture / Water Activity"],
    },
    {
      id: "p4",
      category: "setup",
      categoryLabel: "Turnkey Venue Setup",
      title: "Modern Espresso Bar Ergonomics",
      location: "Bole District Commercial Tower",
      icon: "precision_manufacturing",
      iconColor: "text-brand-green bg-brand-green/10",
      description: "High-throughput linear bar build for 600+ drinks daily, zero barista cross-traffic, and integrated milk jug rinser wells.",
      impact: "38% Faster Order Turnaround",
      specs: ["Dual Under-Counter Steam", "Silent Knock-Box Chute", "Pre-Infusion Pressure Profiling"],
    },
    {
      id: "p5",
      category: "hospitality",
      categoryLabel: "Hospitality Training",
      title: "Resort Barista Academy",
      location: "Lakeside Luxury Resort",
      icon: "school",
      iconColor: "text-brand-yellow bg-brand-yellow/15",
      description: "Full-venue beverage redesign, traditional Ethiopian ceremonial coffee presentation integrated into modern luxury dining.",
      impact: "4.9/5 Guest Experience Rating",
      specs: ["Ancestral Jebena Service", "Artisanal Single-Origin Pairing", "Table-Side Brewing"],
    },
    {
      id: "p6",
      category: "roastery",
      categoryLabel: "Quality Calibration",
      title: "Specialty Micro-Lot Export Lab",
      location: "Oromia / Sidama Sourcing Corridor",
      icon: "science",
      iconColor: "text-brand-red bg-brand-red/10",
      description: "Turnkey installation of green grading moisture analyzers, sample roaster calibration, and sensory cupping table for export lots.",
      impact: "92+ SCA Score Consistency",
      specs: ["Ikawa Sample Roaster Profiles", "Green Bean Screen Grading", "Moisture Retention Control"],
    },
  ];

  const filteredProjects = activeCategory === "all"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section className="flex flex-col gap-6 sm:gap-8 scroll-mt-28 relative section-transition-glow" id="projects">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4">
        <div className="flex flex-col gap-1.5">
          <div className="inline-flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-brand-yellow font-bold">
              Demonstrated Experience
            </span>
            <span className="hidden sm:inline-block text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-yellow/15 text-brand-yellow font-semibold">
              Client Portfolio
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-brand-green font-bold">
            Our Projects &amp; Executed Works
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-text-muted max-w-xl">
            Selected client engagements spanning independent specialty cafés, hospitality venues, and roasting partners. Filter by practice below.
          </p>
        </div>
      </div>

      {/* Interactive Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        {categories.map((cat) => {
          const isSelected = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                isSelected
                  ? "bg-brand-green text-white shadow-cozy-sm"
                  : "bg-surface-white border border-border-subtle text-text-muted hover:border-brand-green/40 hover:text-brand-green"
              }`}
              onClick={() => setActiveCategory(cat.id)}
              type="button"
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Filtered Dynamic Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="p-5 sm:p-6 rounded-2xl bg-surface-white border border-border-subtle flex flex-col justify-between gap-4 shadow-cozy hover:shadow-cozy-lg hover:-translate-y-1.5 transition-all group ring-1 ring-border-subtle/50"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-xl ${project.iconColor} flex items-center justify-center shadow-cozy-sm`}>
                  <span className="material-symbols-outlined text-xl">{project.icon}</span>
                </div>
                <span className="text-[11px] font-bold text-brand-green bg-brand-green/10 px-2.5 py-1 rounded-full">
                  {project.impact}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <h4 className="font-serif text-lg sm:text-xl font-bold text-text-main group-hover:text-brand-green transition-colors">
                  {project.title}
                </h4>
                <span className="text-xs text-brand-yellow font-bold">
                  {project.location}
                </span>
                <p className="text-xs text-text-muted mt-1 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Scope Spec Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {project.specs.map((spec) => (
                  <span
                    key={spec}
                    className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-surface-subtle text-text-muted border border-border-subtle"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-border-subtle text-[11px] sm:text-xs text-text-muted font-medium flex items-center justify-between">
              <span>Category: {project.categoryLabel}</span>
              <a
                className="text-brand-green font-semibold hover:text-brand-yellow transition-colors flex items-center gap-1"
                href="#contact"
              >
                <span>Discuss Venue →</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
