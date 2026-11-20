"use client";

import { useState } from "react";

export default function Training() {
  const [activeStage, setActiveStage] = useState(1);

  const stages = [
    {
      stageNum: 1,
      badge: "STAGE 01",
      title: "Espresso Calibration",
      shortDesc: "Dose accuracy, grind size adjustments, brew ratios, channeling diagnosis, and extraction control.",
      hours: "14 Practical Lab Hours",
      equipment: "Commercial Double-Boiler Espresso Machine, On-Demand Grinders, Acaia Precision Scales",
      certification: "Extraction Chemistry & Ratio Mastery",
      milestones: [
        "Dialing in micro-grind adjustments under peak speed",
        "TDS extraction yield calculation & refractometer readings",
        "Channelling prevention and 20g portafilter distribution",
        "Water pressure & flow rate profiling diagnosis",
      ],
    },
    {
      stageNum: 2,
      badge: "STAGE 02",
      title: "Milk Chemistry & Art",
      shortDesc: "Microfoam texturing, steaming temperature management, symmetry, and foundational latte art patterns.",
      hours: "16 Steaming & Texturing Hours",
      equipment: "Commercial High-Pressure Steam Wands, Pitcher Geometry, Cold Milk Chemistry Stations",
      certification: "Dairy Microfoam & Latte Art Symmetry",
      milestones: [
        "Milk protein denaturation temperature management (60°C - 65°C)",
        "Silky velvet microfoam consistency with zero visible bubbles",
        "Foundational pouring: Heart, Tulip, and Rosetta symmetry",
        "Alternative milk steaming (Oat, Almond, Soy) foaming stability",
      ],
    },
    {
      stageNum: 3,
      badge: "STAGE 03",
      title: "Sensory Cupping",
      shortDesc: "Standard cupping scoring, aroma evaluation, body and acidity balance, and Ethiopian regional flavor profiles.",
      hours: "12 Sensory Cupping Hours",
      equipment: "Standard SCA Cupping Bowls, Silver Spoons, Roast Profile Color Trackers, Flavor Wheel",
      certification: "SCA Sensory Protocol & Highland Origin Profiling",
      milestones: [
        "Dry fragrance, wet aroma, break, and crust evaluation",
        "Distinguishing Yirgacheffe floral from Harrar wild berry notes",
        "Acidity scoring: Phosphoric, Citric, and Malic identification",
        "Commercial defect recognition (quakers, fermented, sour)",
      ],
    },
    {
      stageNum: 4,
      badge: "STAGE 04",
      title: "Hospitality & Service",
      shortDesc: "Bar workflow speed, order queue management, guest origin storytelling, and station hygiene etiquette.",
      hours: "18 High-Volume Rush Simulation Hours",
      equipment: "POS Ticket Workflow Simulator, Dual-Barista Synchronized Stations, Speed Racks",
      certification: "High-Volume Barista Hospitality Excellence",
      milestones: [
        "Simultaneous 4-drink order execution under 3 minutes",
        "Highland coffee origin storytelling & guest engagement",
        "Ergonomic bar speed positioning & non-verbal team coordination",
        "End-of-day chemical backflushing & food safety protocols",
      ],
    },
  ];

  const current = stages.find((s) => s.stageNum === activeStage) || stages[0];

  return (
    <section
      className="p-5 sm:p-8 md:p-10 lg:p-12 rounded-2xl sm:rounded-3xl text-white shadow-cozy-lg bg-brand-green-dark border border-brand-green flex flex-col gap-6 sm:gap-8 scroll-mt-28 relative section-transition-glow ring-1 ring-brand-green/30"
      id="training"
    >
      {/* Header with Interactive Hint */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4">
        <div className="flex flex-col gap-1.5 sm:gap-2">
          <div className="inline-flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-brand-yellow font-bold">
              Barista &amp; Staff Training
            </span>
            <span className="hidden sm:inline-block text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-yellow/20 text-brand-yellow font-semibold">
              Interactive Curriculum
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-bold">
            Professional Barista Curriculum
          </h2>
        </div>
        <p className="text-xs sm:text-sm md:text-base text-white/80 max-w-md">
          A structured four-stage training program designed to prepare baristas and café teams for operational excellence. Click any stage to inspect specific competencies.
        </p>
      </div>

      {/* 4-Stage Interactive Selector Stepper */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {stages.map((stage) => {
          const isActive = activeStage === stage.stageNum;
          return (
            <button
              key={stage.stageNum}
              className={`p-5 sm:p-6 rounded-2xl text-left transition-all flex flex-col justify-between group cursor-pointer relative ${
                isActive
                  ? "bg-white/15 border-2 border-brand-yellow shadow-cozy ring-2 ring-brand-yellow/30 -translate-y-1"
                  : "bg-white/5 border border-white/10 hover:border-brand-yellow/60 hover:bg-white/[0.08] shadow-cozy-sm"
              }`}
              onClick={() => setActiveStage(stage.stageNum)}
              type="button"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-brand-yellow text-xs font-bold tracking-widest">
                    {stage.badge}
                  </span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse" />
                  )}
                </div>
                <h4 className="font-serif text-lg sm:text-xl font-bold text-white mt-1.5">
                  {stage.title}
                </h4>
                <p className="text-xs sm:text-sm text-white/75 mt-2 leading-relaxed">
                  {stage.shortDesc}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-[11px]">
                <span className="text-white/60">{stage.hours}</span>
                <span
                  className={`font-semibold flex items-center gap-1 transition-colors ${
                    isActive ? "text-brand-yellow" : "text-white/50 group-hover:text-brand-yellow"
                  }`}
                >
                  {isActive ? "Active Stage" : "View Details →"}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Interactive Curriculum Deep-Dive Drawer */}
      <div className="p-5 sm:p-7 rounded-2xl bg-white/[0.07] border border-white/15 shadow-cozy flex flex-col lg:grid lg:grid-cols-12 gap-6 items-start">
        {/* Stage Overview & Milestones (7 cols) */}
        <div className="w-full lg:col-span-7 flex flex-col gap-3.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-brand-yellow/20 text-brand-yellow font-bold text-xs uppercase tracking-wider">
              {current.badge} Curriculum
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 text-white font-medium text-xs">
              {current.hours}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 text-white font-medium text-xs">
              {current.certification}
            </span>
          </div>

          <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
            Practical Competencies for {current.title}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {current.milestones.map((m) => (
              <div
                key={m}
                className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white/90 flex items-start gap-2"
              >
                <span className="material-symbols-outlined text-brand-yellow text-sm shrink-0 mt-0.5">
                  check_circle
                </span>
                <span className="leading-snug">{m}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Equipment & Practical Station Readiness (5 cols) */}
        <div className="w-full lg:col-span-5 flex flex-col gap-3 p-5 rounded-xl bg-black/20 border border-white/10">
          <span className="text-xs uppercase tracking-wider text-brand-yellow font-bold">
            Lab &amp; Equipment Environment
          </span>
          <p className="text-xs text-white/80 leading-relaxed">
            {current.equipment}
          </p>
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-white/70">
            <span>Certification Alignment:</span>
            <strong className="text-white font-semibold">Specialty Standards</strong>
          </div>
          <a
            className="mt-1 h-10 px-4 rounded-xl bg-brand-yellow hover:bg-brand-yellow-light text-stone-950 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-cozy active:scale-95 transition-all text-center"
            href="#contact"
          >
            <span>Inquire About {current.title}</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>
      </div>

      {/* Action Banner with Responsive Button Pair */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
        <div className="flex items-center gap-2.5 text-xs sm:text-sm text-white/90">
          <span className="material-symbols-outlined text-lg sm:text-xl text-brand-yellow shrink-0">
            verified
          </span>
          <span>Comprehensive Hands-on Practice with Certificate of Completion</span>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          {/* Secondary Outline on Left */}
          <a
            className="group w-full sm:w-auto h-12 px-6 sm:px-8 rounded-xl border border-white/30 text-white hover:bg-white/10 font-semibold text-xs uppercase tracking-wider text-center whitespace-nowrap active:scale-95 transition-all shadow-cozy-sm flex items-center justify-center"
            href="#contact"
          >
            <span>View Syllabus</span>
          </a>
          {/* Primary Solid Confirmation on Right */}
          <a
            className="group w-full sm:w-auto h-12 px-6 sm:px-8 rounded-xl bg-brand-yellow hover:bg-brand-yellow-light text-black font-bold text-xs uppercase tracking-wider text-center whitespace-nowrap active:scale-95 transition-all shadow-cozy hover:shadow-cozy-float flex items-center justify-center"
            href="#contact"
          >
            <span>Enroll in Academy</span>
          </a>
        </div>
      </div>
    </section>
  );
}
