"use client";

import { useEffect } from "react";

export default function ScrollRevealInit() {
  useEffect(() => {
    // If user prefers reduced motion, make all elements visible immediately
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
        el.classList.add("reveal-visible");
      });
      document.querySelectorAll(".mask-reveal-content").forEach((el) => {
        el.classList.add("mask-revealed");
      });
      return;
    }

    // Bidirectional Intersection Observer: Elements appear when entering viewport
    // and gently fade away when exiting viewport (up or down).
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            // If the element has a masked text child, trigger reveal
            const maskedChild = entry.target.querySelector(".mask-reveal-content");
            if (maskedChild) {
              maskedChild.classList.add("mask-revealed");
            }
          } else {
            // Bidirectional fade away when scrolled out of view
            entry.target.classList.remove("reveal-visible");
            const maskedChild = entry.target.querySelector(".mask-reveal-content");
            if (maskedChild) {
              maskedChild.classList.remove("mask-revealed");
            }
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "-20px 0px -20px 0px",
      }
    );

    const elements = document.querySelectorAll(".reveal-on-scroll");
    elements.forEach((el) => observer.observe(el));

    // Interactive Cursor Spotlight Glare for .spotlight-card elements
    const spotlightCards = document.querySelectorAll<HTMLElement>(".spotlight-card");
    const handlePointerMove = (e: MouseEvent) => {
      const card = e.currentTarget as HTMLElement;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    };

    spotlightCards.forEach((card) => {
      card.addEventListener("mousemove", handlePointerMove as EventListener, { passive: true });
    });

    return () => {
      observer.disconnect();
      spotlightCards.forEach((card) => {
        card.removeEventListener("mousemove", handlePointerMove as EventListener);
      });
    };
  }, []);

  return null;
}
