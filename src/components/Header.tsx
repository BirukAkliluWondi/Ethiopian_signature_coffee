"use client";

import { useState, useEffect } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = ["home", "about", "services", "training", "projects", "contact"];
      const scrollPos = window.scrollY + 220;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { id: "home", label: "Home", href: "#home" },
    { id: "about", label: "About", href: "#about" },
    { id: "services", label: "Services", href: "#services" },
    { id: "training", label: "Training", href: "#training" },
    { id: "projects", label: "Projects", href: "#projects" },
    { id: "contact", label: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-1 w-full z-50 pt-safe bg-[#FBF9F5]/98 backdrop-blur-lg border-b border-border-subtle shadow-[0_2px_16px_rgba(36,20,10,0.06)] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Header Row */}
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Branding */}
          <a href="#home" className="flex items-center gap-2.5 sm:gap-3.5 group shrink-0">
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

          {/* Desktop Navigation Links (lg and up: 1024px+) - Clean Luxury Editorial */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  className={`text-[13px] tracking-wide py-1 transition-all relative ${
                    isActive
                      ? "text-brand-green font-semibold after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-4 after:h-[2px] after:bg-brand-yellow after:rounded-full"
                      : "text-text-muted font-medium hover:text-brand-green"
                  }`}
                  href={link.href}
                >
                  <span>{link.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Mobile & Tablet Hamburger Menu Button (lg:hidden, 44x44px accessible touch target) */}
          <div className="flex items-center lg:hidden">
            <button
              aria-label="Toggle Navigation Menu"
              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl border border-border-subtle bg-surface-subtle flex items-center justify-center text-text-main hover:bg-surface-muted transition-colors focus:outline-none"
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
          } lg:hidden border-t border-border-subtle py-3 transition-all flex-col gap-1 bg-surface-cream/95`}
          id="mobile-menu-drawer"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? "text-brand-green bg-brand-green/10 font-bold border-l-4 border-brand-green"
                    : "text-text-muted hover:bg-surface-subtle hover:text-brand-green font-medium"
                }`}
                href={link.href}
                onClick={closeMenu}
              >
                {link.label}
              </a>
            );
          })}
          <div className="pt-2 border-t border-border-subtle flex items-center justify-between px-2 text-xs text-text-muted">
            <span>Addis Ababa, Ethiopia</span>
            <span className="text-brand-green font-semibold">+251 92 545 1711</span>
          </div>
        </div>
      </div>
    </header>
  );
}
