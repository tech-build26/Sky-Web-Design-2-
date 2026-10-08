"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import { heroImages } from "@/lib/site-content";
import styles from "./hero.module.css";

function subscribeToMotion(callback: () => void) {
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  preference.addEventListener("change", callback);
  return () => preference.removeEventListener("change", callback);
}
const motionSnapshot = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function subscribeToVisibility(callback: () => void) {
  document.addEventListener("visibilitychange", callback);
  return () => document.removeEventListener("visibilitychange", callback);
}

export function HeroMedia({ prefix }: { prefix: string }) {
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [engaged, setEngaged] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const reducedMotion = useSyncExternalStore(subscribeToMotion, motionSnapshot, () => true);
  const visible = useSyncExternalStore(subscribeToVisibility, () => document.visibilityState === "visible", () => false);
  const running = !paused && !reducedMotion && visible && inView && !engaged;

  useEffect(() => {
    const hero = root.current?.closest("section");
    if (!hero) return;
    let hovering = hero.matches(":hover");
    let focused = hero.contains(document.activeElement);
    const update = () => setEngaged(hovering || focused);
    const enter = () => { hovering = true; update(); };
    const leave = () => { hovering = false; update(); };
    const focusIn = () => { focused = true; update(); };
    const focusOut = (event: FocusEvent) => { focused = hero.contains(event.relatedTarget as Node | null); update(); };
    hero.addEventListener("mouseenter", enter);
    hero.addEventListener("mouseleave", leave);
    hero.addEventListener("focusin", focusIn);
    hero.addEventListener("focusout", focusOut);
    const observer = new IntersectionObserver(([entry]) => { setInView(entry.isIntersecting); update(); }, { threshold: .15 });
    observer.observe(hero);
    return () => {
      observer.disconnect();
      hero.removeEventListener("mouseenter", enter);
      hero.removeEventListener("mouseleave", leave);
      hero.removeEventListener("focusin", focusIn);
      hero.removeEventListener("focusout", focusOut);
    };
  }, []);

  useEffect(() => {
    if (!running) return;
    // A fresh eight-second interval after each pause avoids abrupt resume changes.
    const timer = window.setInterval(() => setSelected((index) => (index + 1) % heroImages.length), 8000);
    return () => window.clearInterval(timer);
  }, [running]);

  return (
    <>
      <div ref={root} className={styles.mainPhoto} style={{ clipPath: `url(#${prefix}-main)` }}>
        {heroImages.map((photo, index) => <div key={photo.src} className={styles.slide} data-active={selected === index} aria-hidden={selected !== index} style={{ "--photo-position": photo.desktopPosition, "--mobile-photo-position": photo.mobilePosition } as CSSProperties}>
          <Image src={photo.src} alt={selected === index ? photo.alt : ""} fill sizes="(max-width: 900px) 100vw, 60vw" preload={index === 0} className={styles.mainImage} />
        </div>)}
        <div className={styles.photoShade} />
      </div>
      <div className={styles.photoControls} role="group" aria-label="Choose a hero photograph" data-autoplay={running ? "running" : "paused"}>
        {heroImages.map((image, index) => (
          <button key={image.src} type="button" aria-label={`Show ${image.title.toLowerCase()} photograph`} aria-pressed={selected === index} onClick={() => { setSelected(index); setPaused(true); }}>
            <span />
          </button>
        ))}
      </div>
    </>
  );
}
