export default function Footer() {
  return (
    <footer className="bg-brand-green-dark text-white border-t border-brand-green pt-12 sm:pt-16 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10 sm:gap-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="flex flex-col gap-3.5 sm:gap-4">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Ethiopian Signature Logo"
                className="h-9 sm:h-10 w-auto brightness-0 invert"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVGdMLvm7cdqUrGHWpdNQhrRzkiXAIUefB5waMuZVNpKSYJK9djSqpMmraBGiO69PGClOSLjIebLEKsMP28psqrRRZ7ruqU8HrOR8qblIEVsgmefxkBJ9dSynoEEHbqZ_iOVQV_9gPo5XIBSSYZ8A7KlmhMBDO5l-W5ShQxQKXBW0Bytvubwlbiuam7Nr44kXjWnI20WUSLARG0IRiupi7x9opX2d8s7XerGo47sfegBJN8R_TmNp5"
              />
              <span className="font-serif text-lg sm:text-xl font-bold text-white">
                ETHIOPIAN SIGNATURE
              </span>
            </div>
            <p className="text-xs text-white/75 leading-relaxed">
              Beyond Coffee, Building Coffee Businesses. Empowering specialty coffee entrepreneurs and hospitality operators across Ethiopia and worldwide.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-brand-green flex items-center justify-center text-white transition-colors"
                href="https://wa.me/251911234567"
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.25-1.49-1.4-1.74-.14-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.43 1.03 2.6.13.17 1.78 2.72 4.31 3.81.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.3z" />
                </svg>
              </a>
              <a
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-sky-600 flex items-center justify-center text-white transition-colors"
                href="https://t.me/ethiopiansignature"
                target="_blank"
                rel="noopener noreferrer"
                title="Telegram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-2.5 sm:gap-3">
            <h5 className="text-xs uppercase tracking-widest text-brand-yellow font-bold">
              Quick Navigation
            </h5>
            <ul className="flex flex-col gap-2 text-xs text-white/80">
              <li>
                <a className="hover:text-brand-yellow transition-colors" href="#">
                  Home
                </a>
              </li>
              <li>
                <a className="hover:text-brand-yellow transition-colors" href="#about">
                  About Our Mission
                </a>
              </li>
              <li>
                <a className="hover:text-brand-yellow transition-colors" href="#services">
                  Our Services
                </a>
              </li>
              <li>
                <a className="hover:text-brand-yellow transition-colors" href="#training">
                  Training Curriculum
                </a>
              </li>
              <li>
                <a className="hover:text-brand-yellow transition-colors" href="#projects">
                  Our Projects
                </a>
              </li>
              <li>
                <a className="hover:text-brand-yellow transition-colors" href="#contact">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="flex flex-col gap-2.5 sm:gap-3">
            <h5 className="text-xs uppercase tracking-widest text-brand-yellow font-bold">
              Our Services
            </h5>
            <ul className="flex flex-col gap-2 text-xs text-white/80">
              <li>Coffee Shop Setup &amp; Organization</li>
              <li>Barista Training</li>
              <li>Menu &amp; Recipe Development</li>
              <li>Coffee Business Consulting</li>
              <li>Coffee Shop Operations Management</li>
              <li>Menu Engineering &amp; Profitability</li>
            </ul>
          </div>

          {/* Contact HQ */}
          <div className="flex flex-col gap-2.5 sm:gap-3">
            <h5 className="text-xs uppercase tracking-widest text-brand-yellow font-bold">
              Headquarters
            </h5>
            <p className="text-xs text-white/80 leading-relaxed">
              Bole Sub-City, Atlas District
              <br />
              Addis Ababa, Ethiopia
            </p>
            <p className="text-xs text-white/80">Phone: +251 91 123 4567</p>
            <p className="text-xs text-white/80">Email: advisory@ethiopiansignature.com</p>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 gap-3 sm:gap-4 text-center sm:text-left">
          <span>&copy; 2026 ETHIOPIAN SIGNATURE COFFEE. All rights reserved.</span>
          <span>Beyond Coffee, Building Coffee Businesses.</span>
        </div>
      </div>
    </footer>
  );
}
