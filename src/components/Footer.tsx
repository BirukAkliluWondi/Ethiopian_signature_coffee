export default function Footer() {
  return (
    <footer className="bg-brand-green-dark text-white border-t border-brand-green/40 mt-12 relative overflow-hidden">
      {/* Subtle Background Watermark Logo Behind Typography */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-[0.06]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          className="w-[480px] h-[480px] sm:w-[620px] sm:h-[620px] object-contain brightness-0 invert scale-125 translate-y-4"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVGdMLvm7cdqUrGHWpdNQhrRzkiXAIUefB5waMuZVNpKSYJK9djSqpMmraBGiO69PGClOSLjIebLEKsMP28psqrRRZ7ruqU8HrOR8qblIEVsgmefxkBJ9dSynoEEHbqZ_iOVQV_9gPo5XIBSSYZ8A7KlmhMBDO5l-W5ShQxQKXBW0Bytvubwlbiuam7Nr44kXjWnI20WUSLARG0IRiupi7x9opX2d8s7XerGo47sfegBJN8R_TmNp5"
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-12 relative z-10 flex flex-col items-center text-center gap-8">
        {/* Grand Brand Heading Over Watermark */}
        <div className="flex flex-col items-center gap-2.5 max-w-2xl">
          <span className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wide uppercase">
            Ethiopian Signature Coffee
          </span>
          <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-brand-yellow font-bold">
            Beyond Coffee, Building Coffee Businesses
          </span>
        </div>

        {/* Evocative Heritage & Advisory Statement (Zero repetitive menu links) */}
        <p className="text-xs sm:text-sm md:text-base text-white/80 max-w-2xl leading-relaxed font-normal">
          Rooted in the ancestral highlands of Ethiopia, we partner with café entrepreneurs, roasters, and hospitality leaders worldwide to build enduring coffee institutions through turnkey setups and professional mastery.
        </p>

        {/* Clean Subtle Horizontal Divider */}
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-brand-yellow/60 to-transparent" />

        {/* Advisory Coordinates & Contact Channels */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-xs text-white/85">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-brand-yellow text-base">location_on</span>
            <span>Bole Sub-City, Atlas District, Addis Ababa, Ethiopia</span>
          </div>
          <div className="hidden sm:inline text-white/30">·</div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-brand-yellow text-base">mail</span>
            <span>advisory@ethiopiansignature.com</span>
          </div>
        </div>

        {/* Advisory Direct Actions (WhatsApp & Telegram) */}
        <div className="flex items-center gap-3 pt-1">
          <a
            className="h-9 px-4 rounded-full bg-white/10 hover:bg-brand-green text-xs font-semibold text-white flex items-center gap-2 transition-all border border-white/15 shadow-sm active:scale-95"
            href="https://wa.me/251925451711"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.25-1.49-1.4-1.74-.14-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.43 1.03 2.6.13.17 1.78 2.72 4.31 3.81.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.3z" />
            </svg>
            <span>Chat on WhatsApp</span>
          </a>
          <a
            className="h-9 px-4 rounded-full bg-white/10 hover:bg-sky-600 text-xs font-semibold text-white flex items-center gap-2 transition-all border border-white/15 shadow-sm active:scale-95"
            href="https://t.me/+251925451711"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
            </svg>
            <span>Telegram Desk</span>
          </a>
        </div>

        {/* Dignified Heritage Credit & Copyright */}
        <div className="pt-8 border-t border-white/10 w-full flex flex-col sm:flex-row items-center justify-between text-xs text-white/55 gap-3 text-center sm:text-left">
          <span>&copy; 2026 ETHIOPIAN SIGNATURE COFFEE. All rights reserved.</span>
          <span>Crafted in the Cradle of Coffee · Addis Ababa, Ethiopia</span>
        </div>
      </div>
    </footer>
  );
}
