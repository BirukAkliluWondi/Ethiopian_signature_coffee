"use client";

import { useEffect } from "react";

export default function ScrollRevealInit() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const handlePointerMove = (e: MouseEvent) => {
      const card = e.currentTarget as HTMLElement;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    };

    const observer = !prefersReducedMotion
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("reveal-visible");
                const maskedChild = entry.target.querySelector(".mask-reveal-content");
                if (maskedChild) {
                  maskedChild.classList.add("mask-revealed");
                }
              } else {
                entry.target.classList.remove("reveal-visible");
                const maskedChild = entry.target.querySelector(".mask-reveal-content");
                if (maskedChild) {
                  maskedChild.classList.remove("mask-revealed");
                }
              }
            });
          },
          {
            threshold: 0.05,
            rootMargin: "20px 0px 20px 0px",
          }
        )
      : null;

    const observedElements = new WeakSet<Element>();
    const boundSpotlights = new WeakSet<HTMLElement>();

    const scanAndBind = () => {
      document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
        if (prefersReducedMotion) {
          el.classList.add("reveal-visible");
          const maskedChild = el.querySelector(".mask-reveal-content");
          if (maskedChild) maskedChild.classList.add("mask-revealed");
          return;
        }
        if (observer && !observedElements.has(el)) {
          observedElements.add(el);
          observer.observe(el);
          // Immediately reveal if already near/inside viewport on mount or tab change
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add("reveal-visible");
            const maskedChild = el.querySelector(".mask-reveal-content");
            if (maskedChild) maskedChild.classList.add("mask-revealed");
          }
        }
      });

      if (prefersReducedMotion) {
        document.querySelectorAll(".mask-reveal-content").forEach((el) => {
          el.classList.add("mask-revealed");
        });
      }

      document.querySelectorAll<HTMLElement>(".spotlight-card").forEach((card) => {
        if (!boundSpotlights.has(card)) {
          boundSpotlights.add(card);
          card.addEventListener("mousemove", handlePointerMove as EventListener, { passive: true });
        }
      });
    };

    scanAndBind();

    const mutationObserver = new MutationObserver(() => {
      scanAndBind();
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      if (observer) observer.disconnect();
      document.querySelectorAll<HTMLElement>(".spotlight-card").forEach((card) => {
        card.removeEventListener("mousemove", handlePointerMove as EventListener);
      });
    };
  }, []);

  return null;
}
