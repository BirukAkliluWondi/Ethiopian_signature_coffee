"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(Math.max(progress, 0), 100));
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const navLinks = [
    { id: "home", label: "Home", href: "/" },
    { id: "services", label: "Services", href: "/services" },
    { id: "training", label: "Training", href: "/training" },
    { id: "about", label: "About", href: "/about" },
    { id: "contact", label: "Contact", href: "/contact" },
  ];

  const isLinkActive = (id: string) => {
    if (id === "home") return pathname === "/";
    return pathname.startsWith(`/${id}`);
  };

  return (
    <header
      className={`mount-header fixed top-1 w-full z-50 pt-safe border-b border-border-subtle transition-all duration-300 ${
        isScrolled
          ? "bg-[#FBF9F5] shadow-[0_4px_20px_rgba(36,20,10,0.08)]"
          : "bg-[#FBF9F5] shadow-[0_2px_12px_rgba(36,20,10,0.04)]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Header Row */}
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Branding */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3.5 group shrink-0">
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
          </Link>

          {/* Desktop Navigation Links (Full Desktop Only: lg and up, 1024px+) */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
            {navLinks.map((link) => {
              const isActive = isLinkActive(link.id);

              return (
                <Link
                  key={link.id}
                  className={`text-[13px] tracking-wide py-1 transition-all relative ${
                    isActive
                      ? "text-brand-green font-bold"
                      : "text-text-muted hover:text-brand-green font-medium"
                  }`}
                  href={link.href}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-yellow rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Direct Consultation Action CTA */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <Link
              className="btn-shimmer h-10 px-5 rounded-xl bg-brand-green hover:bg-brand-green-dark text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center shadow-cozy-sm hover:shadow-cozy transition-all active:scale-95 whitespace-nowrap"
              href="/contact"
            >
              Book Advisory
            </Link>
          </div>
        </div>
      </div>

      {/* Header Reading Progress Line */}
      <div className="w-full h-[2.5px] bg-transparent relative overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-brand-green via-brand-yellow to-brand-green-light transition-[width] duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </header>
  );
}
