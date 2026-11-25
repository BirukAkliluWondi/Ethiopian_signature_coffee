import Link from "next/link";
import PageConsultationCTA from "./PageConsultationCTA";

const GATEWAY_CARDS = [
  {
    kicker: "COMMERCIAL ADVISORY & HOSPITALITY",
    title: "Services, Packages & Catering",
    description:
      "Turnkey café setup, commercial espresso systems, menu engineering, 4-stage project methodology, and luxury event catering.",
    image: "/coffee-shop-setup.jpg",
    href: "/services",
    ctaLabel: "Explore Services",
    highlights: ["6 Core Practices", "Transparent Packages", "Event Catering"],
  },
  {
    kicker: "CERTIFICATION & SENSORY LAB",
    title: "Specialty Barista Academy",
    description:
      "Hands-on espresso chemistry, milk microfoam art, Ethiopian regional cupping calibration, and live upcoming cohort schedules.",
    image:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop",
    href: "/training",
    ctaLabel: "View Academy",
    highlights: ["4-Stage Curriculum", "Live Cohort Dates", "Online Application"],
  },
  {
    kicker: "HERITAGE, TERROIR & PORTFOLIO",
    title: "Origins, Story & Venues",
    description:
      "Direct-trade allocations from Yirgacheffe, Sidama, Guji, and Harrar paired with our mission and launched commercial hospitality venues.",
    image: "/catering-services.jpg",
    href: "/about",
    ctaLabel: "Discover Our Story",
    highlights: ["4 Highland Origins", "Executed Venues", "Our Organization"],
  },
];

export default function HomeGateway() {
  return (
    <div className="flex flex-col gap-10 sm:gap-14">
      <section className="flex flex-col gap-6 sm:gap-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-brand-yellow font-bold block mb-1">
              EXPLORE BY DOMAIN
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-brand-green font-bold">
              What We Offer
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-text-muted max-w-md">
            Navigate directly to the dedicated division tailored to your café launch, barista team certification, or event hospitality needs.
          </p>
        </div>

        {/* Clean 3-Card Gateway Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GATEWAY_CARDS.map((card) => (
            <Link
              key={card.href}
              className="spotlight-card group flex flex-col rounded-2xl bg-surface-white border border-border-subtle overflow-hidden shadow-cozy hover:shadow-roast-bloom hover:-translate-y-1.5 hover:border-brand-yellow/60 transition-all duration-300"
              href={card.href}
            >
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-stone-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={card.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                <span className="absolute bottom-3 left-4 text-[10px] font-bold uppercase tracking-widest text-brand-yellow">
                  {card.kicker}
                </span>
              </div>

              <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 gap-4">
                <div className="flex flex-col gap-2">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-text-main group-hover:text-brand-green transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-border-subtle/70 flex flex-col gap-3">
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-semibold text-text-muted">
                    {card.highlights.map((item) => (
                      <span key={item} className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow" />
                        <span>{item}</span>
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-brand-green pt-1">
                    <span>{card.ctaLabel}</span>
                    <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <PageConsultationCTA />
    </div>
  );
}
