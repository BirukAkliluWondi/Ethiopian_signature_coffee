"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      if (pathname === "/") {
        const sectionIds = ["home", "services", "process", "origins", "projects", "about", "contact"];
        const scrollPos = window.scrollY + 220;

        for (let i = sectionIds.length - 1; i >= 0; i--) {
          const el = document.getElementById(sectionIds[i]);
          if (el && el.offsetTop <= scrollPos) {
            const current = sectionIds[i];
            if (current === "process") {
              setActiveSection("services");
            } else if (current === "about") {
              setActiveSection("projects");
            } else {
              setActiveSection(current);
            }
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const isServicesPage = pathname.startsWith("/services");
  const isTrainingPage = pathname.startsWith("/training");

  const items = [
    { id: "home", label: "Home", href: pathname === "/" ? "#home" : "/", icon: "local_cafe" },
    { id: "services", label: "Services", href: "/services", icon: "corporate_fare" },
    { id: "training", label: "Training", href: "/training", icon: "school" },
    { id: "origins", label: "Origins", href: pathname === "/" ? "#origins" : "/#origins", icon: "spa" },
    { id: "projects", label: "Projects", href: pathname === "/" ? "#projects" : "/#projects", icon: "foundation" },
    { id: "contact", label: "Contact", href: pathname === "/" ? "#contact" : "/#contact", icon: "alternate_email" },
  ];

  return (
    <nav
      aria-label="Mobile and Tablet Navigation"
      className="mount-mobile-nav lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface-cream/95 backdrop-blur-xl border-t border-border-subtle shadow-[0_-4px_16px_rgba(36,20,10,0.06)] pb-safe transition-all"
    >
      <div className="flex items-center justify-around h-14 max-w-lg mx-auto px-2">
        {items.map((item) => {
          const isActive =
            (item.id === "services" && isServicesPage) ||
            (item.id === "training" && isTrainingPage) ||
            (pathname === "/" && activeSection === item.id);

          return (
            <Link
              key={item.id}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-all active:scale-95 relative ${
                isActive ? "text-brand-green font-bold" : "text-text-muted hover:text-brand-green font-medium"
              }`}
              href={item.href}
            >
              <span className={`material-symbols-outlined text-[20px] ${isActive ? "text-brand-green" : ""}`}>
                {item.icon}
              </span>
              <span className="text-[9.5px] mt-0.5 tracking-tight font-medium">
                {item.label}
              </span>
              {isActive && (
                <span className="absolute bottom-0 w-3 h-0.5 bg-brand-yellow rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
