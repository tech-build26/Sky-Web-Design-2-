"use client";

import { useEffect } from "react";

// Content stays visible without JS. Only arriving sections receive an animation.
export function ScrollReveals() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("arrived");
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: .12 });
    document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
    // Heading-only reveals replay on a new visit; reading text stays in place.
    const typeObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) entry.target.classList.toggle("type-arrived", entry.isIntersecting);
    }, { threshold: .18 });
    document.querySelectorAll("[data-type-reveal]").forEach((element) => typeObserver.observe(element));
    return () => { observer.disconnect(); typeObserver.disconnect(); };
  }, []);
  return null;
}
