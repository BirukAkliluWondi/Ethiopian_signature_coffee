"use client";

import { useState } from "react";
import Link from "next/link";
import TrainingSchedules from "./TrainingSchedules";

export default function Training() {
  const [activeTab, setActiveTab] = useState<"curriculum" | "schedules">("curriculum");

  return (
    <section
      className="reveal-on-scroll p-5 sm:p-8 md:p-10 lg:p-12 rounded-2xl sm:rounded-3xl text-white shadow-cozy-lg bg-brand-green-dark border border-brand-green flex flex-col gap-6 sm:gap-8 scroll-mt-28 relative section-transition-glow ring-1 ring-brand-green/30"
      id="training"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4">
        <div className="flex flex-col gap-1.5 sm:gap-2">
          <span className="text-xs uppercase tracking-widest text-brand-yellow font-bold">
            Barista &amp; Staff Training
          </span>
          <div className="mask-reveal-wrap">
            <h2 className="mask-reveal-content font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-bold">
              Barista Academy &amp; Schedules
            </h2>
          </div>
        </div>
        <p className="text-xs sm:text-sm md:text-base text-white/80 max-w-md">
          Structured barista certification, sensory analysis, and café team operational excellence with live cohort scheduling.
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        <button
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
            activeTab === "curriculum"
              ? "bg-brand-yellow text-stone-900 border-brand-yellow shadow-cozy-sm"
              : "bg-white/5 text-white/70 border-white/10 hover:text-white hover:bg-white/10"
          }`}
          type="button"
          onClick={() => setActiveTab("curriculum")}
        >
          <span>Curriculum Pillars</span>
        </button>
        <button
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border flex items-center gap-2 ${
            activeTab === "schedules"
              ? "bg-brand-yellow text-stone-900 border-brand-yellow shadow-cozy-sm"
              : "bg-white/5 text-white/70 border-white/10 hover:text-white hover:bg-white/10"
          }`}
          type="button"
          onClick={() => setActiveTab("schedules")}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow animate-pulse" />
          <span>Upcoming Cohorts &amp; Dates</span>
        </button>
      </div>

      {/* Tab 1: 4-Stage Progression */}
      {activeTab === "curriculum" && (
        <div className="flex flex-col gap-6 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {/* Stage 01 */}
            <div className="spotlight-card p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-yellow/80 hover:bg-white/[0.09] hover:-translate-y-1.5 shadow-cozy-sm transition-all duration-300 flex flex-col gap-2.5 sm:gap-3 group">
              <span className="text-brand-yellow text-xs font-bold tracking-widest">STAGE 01</span>
              <h4 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-brand-yellow transition-colors">
                Espresso Calibration
              </h4>
              <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                Dose accuracy, grind size adjustments, brew ratios, channeling diagnosis, and extraction control.
              </p>
            </div>

            {/* Stage 02 */}
            <div className="spotlight-card p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-yellow/80 hover:bg-white/[0.09] hover:-translate-y-1.5 shadow-cozy-sm transition-all duration-300 flex flex-col gap-2.5 sm:gap-3 group">
              <span className="text-brand-yellow text-xs font-bold tracking-widest">STAGE 02</span>
              <h4 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-brand-yellow transition-colors">
                Milk Chemistry &amp; Art
              </h4>
              <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                Microfoam texturing, steaming temperature management, symmetry, and foundational latte art patterns.
              </p>
            </div>

            {/* Stage 03 */}
            <div className="spotlight-card p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-yellow/80 hover:bg-white/[0.09] hover:-translate-y-1.5 shadow-cozy-sm transition-all duration-300 flex flex-col gap-2.5 sm:gap-3 group">
              <span className="text-brand-yellow text-xs font-bold tracking-widest">STAGE 03</span>
              <h4 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-brand-yellow transition-colors">
                Sensory Cupping
              </h4>
              <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                Standard cupping scoring, aroma evaluation, body and acidity balance, and Ethiopian regional flavor profiles.
              </p>
            </div>

            {/* Stage 04 */}
            <div className="spotlight-card p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-yellow/80 hover:bg-white/[0.09] hover:-translate-y-1.5 shadow-cozy-sm transition-all duration-300 flex flex-col gap-2.5 sm:gap-3 group">
              <span className="text-brand-yellow text-xs font-bold tracking-widest">STAGE 04</span>
              <h4 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-brand-yellow transition-colors">
                Hospitality &amp; Service
              </h4>
              <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                Bar workflow speed, order queue management, guest origin storytelling, and station hygiene etiquette.
              </p>
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
              <button
                className="group w-full sm:w-auto h-12 px-6 sm:px-8 rounded-xl border border-white/30 text-white hover:bg-white/10 font-semibold text-xs uppercase tracking-wider text-center whitespace-nowrap active:scale-95 transition-all shadow-cozy-sm flex items-center justify-center hover:-translate-y-0.5 duration-200"
                type="button"
                onClick={() => setActiveTab("schedules")}
              >
                <span>View Live Cohorts</span>
              </button>
              <Link
                className="group btn-shimmer w-full sm:w-auto h-12 px-6 sm:px-8 rounded-xl bg-brand-yellow hover:bg-brand-yellow-light text-black font-bold text-xs uppercase tracking-wider text-center whitespace-nowrap active:scale-95 transition-all shadow-cozy hover:shadow-cozy-float flex items-center justify-center hover:-translate-y-0.5 duration-200"
                href="/contact?service=Barista%20%26%20Staff%20Training"
              >
                <span>Enroll in Academy</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Live Cohorts & Schedules */}
      {activeTab === "schedules" && (
        <div className="animate-in fade-in duration-300">
          <TrainingSchedules />
        </div>
      )}
    </section>
  );
}
