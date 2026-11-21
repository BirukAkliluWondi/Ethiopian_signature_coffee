export default function Footer() {
  return (
    <footer
      className="bg-brand-green-dark text-white border-t border-brand-green/40 mt-16 sm:mt-24 relative overflow-hidden"
      id="footer"
    >
      {/* Top Subtle Heritage Accent Ribbon */}
      <div className="w-full h-1 bg-gradient-to-r from-brand-green via-brand-yellow to-brand-red opacity-80" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-16 pb-24 sm:pb-14 relative z-10">
        {/* 4-Column Enterprise Luxury Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          {/* Column 1: Identity & Headquarters (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <a href="#home" className="flex items-center gap-3 group shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Ethiopian Signature Coffee Logo"
                className="h-10 sm:h-11 w-auto object-contain shrink-0 transition-transform group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVGdMLvm7cdqUrGHWpdNQhrRzkiXAIUefB5waMuZVNpKSYJK9djSqpMmraBGiO69PGClOSLjIebLEKsMP28psqrRRZ7ruqU8HrOR8qblIEVsgmefxkBJ9dSynoEEHbqZ_iOVQV_9gPo5XIBSSYZ8A7KlmhMBDO5l-W5ShQxQKXBW0Bytvubwlbiuam7Nr44kXjWnI20WUSLARG0IRiupi7x9opX2d8s7XerGo47sfegBJN8R_TmNp5"
              />
              <div className="flex flex-col justify-center">
                <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-white leading-none">
                  ETHIOPIAN SIGNATURE
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-brand-yellow font-bold mt-1">
                  Building Coffee Businesses
                </span>
              </div>
            </a>

            <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-sm">
              Turnkey café execution, specialty barista certification, and direct-trade highland coffee allocations for modern hospitality enterprises.
            </p>

            <div className="flex flex-col gap-2 pt-2 text-xs text-white/80">
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-brand-yellow text-base shrink-0 mt-0.5">location_on</span>
                <span>Atlas District, Bole Sub-City, Addis Ababa, Ethiopia</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-brand-yellow text-base shrink-0">call</span>
                <a
                  className="hover:text-brand-yellow transition-colors font-semibold tracking-wide"
                  href="tel:+251925451711"
                >
                  +251 925 451 711
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-brand-yellow text-base shrink-0">mail</span>
                <a
                  className="hover:text-brand-yellow transition-colors"
                  href="mailto:advisory@ethiopiansignature.com"
                >
                  advisory@ethiopiansignature.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-white/55 text-[11px] pt-1">
                <span className="material-symbols-outlined text-brand-yellow text-sm shrink-0">schedule</span>
                <span>Mon – Sat: 8:30 AM – 6:30 PM (EAT / UTC+3)</span>
              </div>
            </div>
          </div>

          {/* Column 2: Services & Advisory (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-3.5">
            <h3 className="text-xs uppercase tracking-wider text-brand-yellow font-bold">
              Services &amp; Advisory
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-white/75">
              <li>
                <a className="hover:text-white transition-colors flex items-center gap-2 group" href="#services">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow/60 group-hover:bg-brand-yellow transition-colors" />
                  <span>1. Coffee Shop Setup &amp; Organization</span>
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors flex items-center gap-2 group" href="#training">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow/60 group-hover:bg-brand-yellow transition-colors" />
                  <span>2. Barista &amp; Sensory Academy</span>
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors flex items-center gap-2 group" href="#services">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow/60 group-hover:bg-brand-yellow transition-colors" />
                  <span>3. Business Consultancy &amp; Feasibility</span>
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors flex items-center gap-2 group" href="#services">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow/60 group-hover:bg-brand-yellow transition-colors" />
                  <span>4. Operations &amp; Workflow Systems</span>
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors flex items-center gap-2 group" href="#services">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow/60 group-hover:bg-brand-yellow transition-colors" />
                  <span>5. Menu Engineering &amp; Profitability</span>
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors flex items-center gap-2 group" href="#services">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow/60 group-hover:bg-brand-yellow transition-colors" />
                  <span>6. Turnkey Opening Launch Support</span>
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors flex items-center gap-2 group" href="#catering">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow/60 group-hover:bg-brand-yellow transition-colors" />
                  <span>7. Catering Services &amp; Events</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Single Origins (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-3.5">
            <h3 className="text-xs uppercase tracking-wider text-brand-yellow font-bold">
              Single Origins
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-white/75">
              <li>
                <a className="hover:text-white transition-colors flex flex-col" href="#origins">
                  <span className="font-semibold text-white">Yirgacheffe</span>
                  <span className="text-[11px] text-white/50">Floral &amp; Delicate</span>
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors flex flex-col" href="#origins">
                  <span className="font-semibold text-white">Sidama</span>
                  <span className="text-[11px] text-white/50">Complex &amp; Balanced</span>
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors flex flex-col" href="#origins">
                  <span className="font-semibold text-white">Guji</span>
                  <span className="text-[11px] text-white/50">Lush &amp; Exotic</span>
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors flex flex-col" href="#origins">
                  <span className="font-semibold text-white">Harrar</span>
                  <span className="text-[11px] text-white/50">Wild &amp; Sun-Dried</span>
                </a>
              </li>
              <li className="pt-1">
                <a
                  className="hover:text-brand-yellow transition-colors text-xs text-brand-yellow/90 font-medium flex items-center gap-1"
                  href="#contact"
                >
                  <span>Cooperative Allocations</span>
                  <span className="text-[10px]">→</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Direct Channels & Consultation CTA (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-3.5">
            <h3 className="text-xs uppercase tracking-wider text-brand-yellow font-bold">
              Direct Channels
            </h3>
            <p className="text-xs text-white/70 leading-relaxed">
              Connect directly with our senior café consultants and green coffee advisors.
            </p>

            <div className="flex flex-col gap-2.5 pt-1">
              <a
                className="h-10 px-3.5 rounded-xl bg-white/10 hover:bg-[#25D366] hover:text-white text-xs font-semibold text-white flex items-center justify-between transition-all border border-white/15 shadow-sm active:scale-95 group"
                href="https://wa.me/251925451711"
                rel="noopener noreferrer"
                target="_blank"
              >
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 fill-current text-[#25D366] group-hover:text-white transition-colors" viewBox="0 0 24 24">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.25-1.49-1.4-1.74-.14-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.43 1.03 2.6.13.17 1.78 2.72 4.31 3.81.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.3z" />
                  </svg>
                  <span>WhatsApp Advisory</span>
                </div>
                <span className="text-[11px] text-white/50 group-hover:text-white/95 font-mono">+251 925 451 711</span>
              </a>

              <a
                className="h-10 px-3.5 rounded-xl bg-white/10 hover:bg-[#229ED9] hover:text-white text-xs font-semibold text-white flex items-center justify-between transition-all border border-white/15 shadow-sm active:scale-95 group"
                href="https://t.me/+251925451711"
                rel="noopener noreferrer"
                target="_blank"
              >
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 fill-current text-[#229ED9] group-hover:text-white transition-colors" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                  </svg>
                  <span>Telegram Desk</span>
                </div>
                <span className="text-[11px] text-white/50 group-hover:text-white/95">@ethiopiansignature</span>
              </a>

              <a
                className="btn-shimmer mt-1 h-11 px-5 rounded-xl bg-brand-yellow hover:bg-brand-yellow-light text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-cozy hover:shadow-cozy-float active:scale-95 transition-all text-center hover:-translate-y-0.5 duration-200"
                href="#contact"
              >
                <span>Book Setup Advisory</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>

        {/* Sub-Footer Legal & Location Coordinates */}
        <div className="pt-8 mt-12 sm:mt-16 border-t border-white/10 w-full flex flex-col md:flex-row items-center justify-between text-xs text-white/60 gap-4 text-center md:text-left">
          <span>&copy; 2026 ETHIOPIAN SIGNATURE COFFEE PLC. All rights reserved.</span>
          <span className="text-[11px] text-white/45">
            Direct-Trade Highland Sourcing &middot; Addis Ababa, Ethiopia
          </span>
          <div className="flex items-center gap-4 text-white/60 text-[11px]">
            <a className="hover:text-white transition-colors" href="#home">
              Back to Top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
