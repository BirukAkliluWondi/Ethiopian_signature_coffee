"use client";

import { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "What is included in the Turnkey Café Setup & Organization package?",
      a: "Our turnkey package covers the complete journey from bare space to grand opening: commercial bar ergonomic CAD workflow design, equipment procurement (commercial espresso machines, grinders, water filtration systems), plumbing and electrical spec calibration, barista recruitment, foundational menu engineering, and 14 days of dedicated on-site launch support.",
    },
    {
      q: "Can you train our staff on-site at our own café or hotel venue?",
      a: "Yes. In addition to our dedicated specialty academy in Addis Ababa, our master trainers conduct intensive on-site training at client venues throughout Ethiopia and regional hospitality hubs, tailoring the curriculum to your exact equipment and service workflow.",
    },
    {
      q: "How do direct-trade green coffee allocations work for roasters?",
      a: "We work directly with certified smallholder cooperatives and private washing stations in Yirgacheffe, Sidama, Guji, and Harrar. We arrange export-grade micro-lot sample cupping, provide full SCA score documentation, manage moisture analysis, and oversee export logistics.",
    },
    {
      q: "What is the typical timeline from venue lease signing to opening day?",
      a: "Standard turnkey executions typically span 4 to 8 weeks depending on equipment availability and venue lease readiness. We run bar workflow design, machine procurement, and barista training in parallel sprints to eliminate idle delays.",
    },
    {
      q: "Do you offer post-opening operational management and quality audits?",
      a: "Yes. Many of our client venues partner with us for ongoing monthly operational retainers, including secret-shopper quality audits, seasonal menu updates, espresso recipe recalibration, and barista refresher certifications.",
    },
  ];

  return (
    <section className="flex flex-col gap-6 sm:gap-8 scroll-mt-28 relative section-transition-glow" id="faq">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4">
        <div>
          <div className="inline-flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-brand-yellow font-bold">
              Client Advisory Clarity
            </span>
            <span className="hidden sm:inline-block text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-yellow/15 text-brand-yellow font-semibold">
              Frequently Asked
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-green mt-1">
            Frequently Asked Questions
          </h2>
        </div>
        <p className="text-xs sm:text-sm md:text-base text-text-muted max-w-md">
          Key considerations for café owners, hotel beverage directors, and green coffee sourcing partners.
        </p>
      </div>

      {/* Accordion Drawer List */}
      <div className="flex flex-col gap-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={faq.q}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isOpen
                  ? "bg-surface-white border-brand-yellow/60 shadow-cozy ring-1 ring-brand-yellow/20"
                  : "bg-surface-white/80 border-border-subtle hover:border-border-warm shadow-cozy-sm"
              }`}
            >
              <button
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                type="button"
              >
                <span className="font-serif text-base sm:text-lg md:text-xl font-bold text-text-main">
                  {faq.q}
                </span>
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen ? "bg-brand-yellow text-stone-950 rotate-180" : "bg-surface-subtle text-text-muted"
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">
                    {isOpen ? "remove" : "add"}
                  </span>
                </span>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 text-xs sm:text-sm text-text-muted leading-relaxed border-t border-border-subtle/50 mt-1">
                  <p className="pt-3">{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
