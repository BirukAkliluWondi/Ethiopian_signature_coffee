"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (pathname === "/") {
        const sectionIds = ["home", "services", "process", "origins", "projects", "about", "contact"];
        const scrollPos = window.scrollY + 220;

        for (let i = sectionIds.length - 1; i >= 0; i--) {
          const el = document.getElementById(sectionIds[i]);
          if (el && el.offsetTop <= scrollPos) {
            const current = sectionIds[i];
            if (current === "process") {
              setActiveSection("services");
            } else if (current === "origins" || current === "projects") {
              setActiveSection("about");
            } else {
              setActiveSection(current);
            }
            break;
          }
        }
      }

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(Math.max(progress, 0), 100));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const isServicesPage = pathname.startsWith("/services");
  const isTrainingPage = pathname.startsWith("/training");

  const navLinks = [
    { id: "home", label: "Home", href: pathname === "/" ? "#home" : "/" },
    { id: "services", label: "Services", href: "/services" },
    { id: "training", label: "Training", href: "/training" },
    { id: "about", label: "About", href: pathname === "/" ? "#about" : "/#about" },
    { id: "contact", label: "Contact", href: pathname === "/" ? "#contact" : "/#contact" },
  ];

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
          <Link href={pathname === "/" ? "#home" : "/"} className="flex items-center gap-2.5 sm:gap-3.5 group shrink-0">
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
              const isActive =
                (link.id === "services" && isServicesPage) ||
                (link.id === "training" && isTrainingPage) ||
                (pathname === "/" && activeSection === link.id);

              return (
                <Link
                  key={link.id}
                  className={`text-[13px] tracking-wide py-1 transition-all relative ${
                    isActive
                      ? "text-brand-green font-semibold after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-4 after:h-[2px] after:bg-brand-yellow after:rounded-full"
                      : "text-text-muted font-medium hover:text-brand-green"
                  }`}
                  href={link.href}
                >
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Reading Progress Indicator Bar */}
      <div
        className="absolute bottom-0 left-0 h-[2.5px] bg-gradient-to-r from-brand-yellow via-amber-400 to-brand-green transition-all duration-150 ease-out pointer-events-none"
        style={{ width: `${scrollProgress}%` }}
      />
    </header>
  );
}
