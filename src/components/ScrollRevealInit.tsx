"use client";

import { useEffect } from "react";

export default function ScrollRevealInit() {
  useEffect(() => {
    // If user prefers reduced motion, make all elements visible immediately
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
        el.classList.add("reveal-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const elements = document.querySelectorAll(".reveal-on-scroll");
    elements.forEach((el) => observer.observe(el));

    // Fallback timer: ensure all elements are visible after 2.5s even if not scrolled
    const timeout = setTimeout(() => {
      document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
        el.classList.add("reveal-visible");
      });
    }, 2500);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, []);

  return null;
}
