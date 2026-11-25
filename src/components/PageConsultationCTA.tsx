import Link from "next/link";

export default function PageConsultationCTA({
  kicker = "READY TO START?",
  title = "Discuss Your Coffee Venue, Training, or Catering Needs",
  subtitle = "Connect with our Addis Ababa hospitality consultants directly through our consultation desk or instant WhatsApp.",
}: {
  kicker?: string;
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl bg-brand-green-dark text-white border border-brand-green shadow-cozy-lg flex flex-col lg:flex-row lg:items-center justify-between gap-6">
      <div className="flex flex-col gap-1.5 max-w-2xl">
        <span className="text-[11px] uppercase tracking-widest text-brand-yellow font-bold">
          {kicker}
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-snug">
          {title}
        </h2>
        <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
          {subtitle}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
        <Link
          className="btn-shimmer h-12 px-6 sm:px-7 rounded-xl bg-brand-yellow hover:bg-brand-yellow-light text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-cozy transition-all active:scale-95 whitespace-nowrap"
          href="/contact"
        >
          <span>Open Booking Desk</span>
          <span className="material-symbols-outlined text-base">arrow_forward</span>
        </Link>
        <a
          className="h-12 px-6 rounded-xl border border-white/25 bg-white/8 hover:bg-[#25D366] hover:border-[#25D366] text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 whitespace-nowrap"
          href="https://wa.me/251925451711"
          rel="noopener noreferrer"
          target="_blank"
        >
          <span>WhatsApp +251 925 451 711</span>
        </a>
      </div>
    </section>
  );
}
