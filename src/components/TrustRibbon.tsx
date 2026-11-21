export default function TrustRibbon() {
  const partners = [
    {
      icon: "verified",
      title: "SCA Standards Aligned",
      subtitle: "Specialty extraction & cupping",
    },
    {
      icon: "agriculture",
      title: "Direct Highland Cooperatives",
      subtitle: "Oromia, Sidama & Yirgacheffe",
    },
    {
      icon: "hotel",
      title: "Hospitality & Boutique Hotels",
      subtitle: "Five-star beverage consistency",
    },
    {
      icon: "local_cafe",
      title: "Independent Specialty Cafés",
      subtitle: "Turnkey ergonomics & launches",
    },
    {
      icon: "local_shipping",
      title: "National Export Integrity",
      subtitle: "MoA & ECTA quality grading",
    },
  ];

  return (
    <section
      aria-label="Industry Partnerships and Standards"
      className="reveal-on-scroll py-5 sm:py-6 border-y border-border-subtle/80"
    >
      <div className="flex flex-col gap-4 sm:gap-5">
        <div className="text-center">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-brand-yellow font-bold">
            Trusted Standards &amp; Industry Collaborations
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {partners.map((partner, index) => {
            const delays = ["delay-100", "delay-100", "delay-200", "delay-300", "delay-400"];
            return (
              <div
                key={partner.title}
                className={`reveal-on-scroll ${delays[index % 5]} flex flex-col items-center text-center gap-1.5 py-1 transition-all group hover:-translate-y-0.5`}
              >
                <span className="material-symbols-outlined text-2xl text-brand-green/80 group-hover:text-brand-green group-hover:scale-110 transition-transform">
                  {partner.icon}
                </span>
                <span className="font-serif text-xs sm:text-sm font-bold text-text-main group-hover:text-brand-green transition-colors leading-tight">
                  {partner.title}
                </span>
                <span className="text-[10.5px] sm:text-[11px] text-text-muted leading-tight">
                  {partner.subtitle}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
