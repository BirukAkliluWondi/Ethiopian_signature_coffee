"use client";

import { useState } from "react";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-1 w-full z-50 pt-safe bg-white/95 backdrop-blur-md border-b border-border-subtle shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Header Row */}
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Branding */}
          <a href="#" className="flex items-center gap-2.5 sm:gap-3.5 group shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Ethiopian Signature Coffee Logo"
              className="h-9 sm:h-11 w-auto object-contain shrink-0 transition-transform group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVGdMLvm7cdqUrGHWpdNQhrRzkiXAIUefB5waMuZVNpKSYJK9djSqpMmraBGiO69PGClOSLjIebLEKsMP28psqrRRZ7ruqU8HrOR8qblIEVsgmefxkBJ9dSynoEEHbqZ_iOVQV_9gPo5XIBSSYZ8A7KlmhMBDO5l-W5ShQxQKXBW0Bytvubwlbiuam7Nr44kXjWnI20WUSLARG0IRiupi7x9opX2d8s7XerGo47sfegBJN8R_TmNp5"
            />
            <div className="flex flex-col justify-center">
              <span className="font-serif text-base sm:text-xl lg:text-2xl font-bold tracking-tight text-brand-green leading-none">
                ETHIOPIAN SIGNATURE
              </span>
              <span className="text-[8px] sm:text-[10px] uppercase tracking-widest text-brand-yellow font-bold mt-0.5 sm:mt-1">
                Building Coffee Businesses
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links (lg and up: 1024px+) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <a
              className="px-3.5 py-2 rounded-lg text-sm font-semibold text-brand-green bg-brand-green/5 hover:bg-brand-green/10 transition-colors"
              href="#"
            >
              Home
            </a>
            <a
              className="px-3.5 py-2 rounded-lg text-sm font-medium text-text-muted hover:text-brand-green hover:bg-gray-50 transition-colors"
              href="#about"
            >
              About Us
            </a>
            <a
              className="px-3.5 py-2 rounded-lg text-sm font-medium text-text-muted hover:text-brand-green hover:bg-gray-50 transition-colors"
              href="#services"
            >
              Our Services
            </a>
            <a
              className="px-3.5 py-2 rounded-lg text-sm font-medium text-text-muted hover:text-brand-green hover:bg-gray-50 transition-colors"
              href="#training"
            >
              Training
            </a>
            <a
              className="px-3.5 py-2 rounded-lg text-sm font-medium text-text-muted hover:text-brand-green hover:bg-gray-50 transition-colors"
              href="#projects"
            >
              Our Projects
            </a>
            <a
              className="px-3.5 py-2 rounded-lg text-sm font-medium text-text-muted hover:text-brand-green hover:bg-gray-50 transition-colors"
              href="#contact"
            >
              Contact Us
            </a>
          </nav>

          {/* Right Header Actions (WhatsApp Button + Mobile/Tablet Hamburger) */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              className="h-9 sm:h-10 px-3.5 sm:px-5 lg:px-6 rounded-full bg-brand-green hover:bg-brand-green-dark text-white flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold shadow-sm hover:shadow whitespace-nowrap active:scale-95 transition-all"
              href="https://wa.me/251911234567"
              rel="noopener noreferrer"
              target="_blank"
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.25-1.49-1.4-1.74-.14-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.43 1.03 2.6.13.17 1.78 2.72 4.31 3.81.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.3z" />
              </svg>
              <span className="hidden xs:inline sm:inline">WhatsApp</span>
              <span className="inline xs:hidden sm:hidden">Chat</span>
            </a>

            {/* Mobile & Tablet Hamburger Menu Button (lg:hidden) */}
            <button
              aria-label="Toggle Navigation Menu"
              className="lg:hidden w-9 h-9 rounded-xl border border-border-subtle bg-gray-50 flex items-center justify-center text-text-main hover:bg-gray-100 transition-colors focus:outline-none"
              id="mobile-menu-btn"
              onClick={toggleMenu}
            >
              <span className="material-symbols-outlined text-2xl" id="menu-icon">
                {isMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile & Tablet Dropdown Menu Drawer (lg:hidden) */}
        <div
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } lg:hidden border-t border-border-subtle py-3 transition-all flex-col gap-1`}
          id="mobile-menu-drawer"
        >
          <a
            className="px-4 py-2.5 rounded-xl text-sm font-semibold text-brand-green bg-brand-green/5"
            href="#"
            onClick={closeMenu}
          >
            Home
          </a>
          <a
            className="px-4 py-2.5 rounded-xl text-sm font-medium text-text-muted hover:bg-gray-50 hover:text-brand-green"
            href="#about"
            onClick={closeMenu}
          >
            About Us
          </a>
          <a
            className="px-4 py-2.5 rounded-xl text-sm font-medium text-text-muted hover:bg-gray-50 hover:text-brand-green"
            href="#services"
            onClick={closeMenu}
          >
            Our Services
          </a>
          <a
            className="px-4 py-2.5 rounded-xl text-sm font-medium text-text-muted hover:bg-gray-50 hover:text-brand-green"
            href="#training"
            onClick={closeMenu}
          >
            Barista Training
          </a>
          <a
            className="px-4 py-2.5 rounded-xl text-sm font-medium text-text-muted hover:bg-gray-50 hover:text-brand-green"
            href="#projects"
            onClick={closeMenu}
          >
            Our Projects
          </a>
          <a
            className="px-4 py-2.5 rounded-xl text-sm font-medium text-text-muted hover:bg-gray-50 hover:text-brand-green"
            href="#contact"
            onClick={closeMenu}
          >
            Contact Us
          </a>
          <div className="pt-2 border-t border-gray-100 flex items-center justify-between px-2 text-xs text-text-muted">
            <span>Addis Ababa, Ethiopia</span>
            <span className="text-brand-green font-semibold">+251 91 123 4567</span>
          </div>
        </div>
      </div>
    </header>
  );
}
