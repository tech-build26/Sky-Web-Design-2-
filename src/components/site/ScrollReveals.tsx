"use client";

import { useEffect } from "react";

// Progressive enhancement: the server output remains readable without JavaScript.
export function ScrollReveals() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!("IntersectionObserver" in window)) return;
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal], [data-type-reveal]");
    const arrive = (element: Element) => {
      element.classList.remove("motion-pending");
      element.classList.add(element.hasAttribute("data-type-reveal") ? "type-arrived" : "arrived");
      observer.unobserve(element);
    };
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) arrive(entry.target);
      }
    }, { threshold: .08 });
    const updatePreference = () => {
      document.documentElement.dataset.motion = preference.matches ? "reduced" : "full";
      if (preference.matches) elements.forEach(arrive);
    };
    elements.forEach((element) => {
      if (preference.matches) return;
      element.classList.add("motion-pending");
      observer.observe(element);
    });
    updatePreference();
    // Keyboard navigation and hash links must never land on hidden content.
    const revealDestination = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      elements.forEach((element) => {
        if (element.contains(event.target as Element)) arrive(element);
      });
    };
    preference.addEventListener("change", updatePreference);
    document.addEventListener("focusin", revealDestination);
    const ambientObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.target.setAttribute("data-motion-visible", String(entry.isIntersecting)));
    });
    document.querySelectorAll("main > section, main > section section, footer").forEach((element) => ambientObserver.observe(element));
    return () => {
      observer.disconnect();
      ambientObserver.disconnect();
      preference.removeEventListener("change", updatePreference);
      document.removeEventListener("focusin", revealDestination);
      elements.forEach((element) => element.classList.remove("motion-pending"));
      delete document.documentElement.dataset.motion;
    };
  }, []);
  return null;
}
