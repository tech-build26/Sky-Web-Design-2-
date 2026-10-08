"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import { heroImages } from "@/lib/site-content";
import styles from "./hero.module.css";

const effects = ["tiles", "fade", "diagonal"] as const;
const interval = 6000;
const transitionDuration = 3000;
const columns = 12;
const rows = 8;
const tiles = Array.from({ length: columns * rows }, (_, index) => ({ row: Math.floor(index / columns), column: index % columns }));

function subscribeToMotion(callback: () => void) {
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  preference.addEventListener("change", callback);
  return () => preference.removeEventListener("change", callback);
}
function subscribeToVisibility(callback: () => void) {
  document.addEventListener("visibilitychange", callback);
  return () => document.removeEventListener("visibilitychange", callback);
}

export function HeroMedia({ prefix }: { prefix: string }) {
  const [media, setMedia] = useState({ selected: 0, previous: 0, step: 0, changing: false });
  const [inView, setInView] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const reducedMotion = useSyncExternalStore(subscribeToMotion, () => window.matchMedia("(prefers-reduced-motion: reduce)").matches, () => true);
  const visible = useSyncExternalStore(subscribeToVisibility, () => document.visibilityState === "visible", () => false);
  const running = !reducedMotion && visible && inView;
  const effect = effects[(media.step - 1 + effects.length) % effects.length];
  const previous = heroImages[media.previous];

  useEffect(() => {
    const photo = root.current;
    if (!photo) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: .15 });
    observer.observe(photo);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => setMedia((current) => ({
      selected: (current.selected + 1) % heroImages.length,
      previous: current.selected,
      step: current.step + 1,
      changing: true,
    })), interval);
    return () => window.clearInterval(timer);
  }, [running, media.selected]);

  useEffect(() => {
    if (!media.changing) return;
    const timer = window.setTimeout(() => setMedia((current) => ({ ...current, changing: false })), transitionDuration);
    return () => window.clearTimeout(timer);
  }, [media.changing, media.step]);

  function choose(index: number) {
    setMedia((current) => current.selected === index ? current : ({ selected: index, previous: current.selected, step: current.step + 1, changing: true }));
  }

  return <>
    <div ref={root} className={styles.mainPhoto} style={{ clipPath: `url(#${prefix}-main)`, "--slide-interval": `${interval}ms`, "--tile-columns": columns, "--tile-rows": rows } as CSSProperties}
      data-effect={effect} data-changing={media.changing && !reducedMotion}>
      {heroImages.map((photo, index) => <div key={photo.src} className={styles.slide}
        data-active={media.selected === index} data-previous={media.previous === index} aria-hidden={media.selected !== index}
        style={{ "--photo-position": photo.desktopPosition, "--mobile-photo-position": photo.mobilePosition } as CSSProperties}>
        <Image src={photo.src} alt={media.selected === index ? photo.alt : ""} fill sizes="(max-width: 900px) 100vw, 60vw" preload={index === 0} loading={index === 0 ? undefined : "eager"} className={styles.mainImage} />
      </div>)}
      {media.changing && effect === "tiles" && !reducedMotion && <div key={media.step} className={styles.tileTransition} aria-hidden="true"
        style={{ "--photo-position": previous.desktopPosition, "--mobile-photo-position": previous.mobilePosition } as CSSProperties}>
        {tiles.map(({ row, column }) => <div key={`${row}-${column}`} className={styles.flipTile}
          style={{ "--tile-delay": `${(row + column) * 60}ms` } as CSSProperties}>
          <div className={styles.tileFragment} style={{ left: `${-column * 100}%`, top: `${-row * 100}%` }}>
            <Image src={previous.src} alt="" fill sizes="(max-width: 900px) 100vw, 60vw" className={styles.mainImage} />
          </div>
        </div>)}
      </div>}
      <div className={styles.photoShade} />
    </div>
    <div className={styles.photoControls} role="group" aria-label="Hero slideshow"
      data-autoplay={running ? "running" : "paused"} style={{ "--slide-interval": `${interval}ms` } as CSSProperties}>
      {heroImages.map((photo, index) => <button key={photo.src} type="button"
        aria-label={`Show ${photo.title.toLowerCase()} photograph`} aria-pressed={media.selected === index}
        onClick={() => choose(index)}><span key={`${media.step}-${running}`} className={styles.slideDot} /></button>)}
    </div>
  </>;
}
