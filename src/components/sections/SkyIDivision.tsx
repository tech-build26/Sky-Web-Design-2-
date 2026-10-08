"use client";

import Image from "next/image";
import { useEffect, useRef, type MouseEvent } from "react";
import { Arrow } from "../site/Icons";
import styles from "./SkyIDivision.module.css";

export function SkyIDivision() {
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useRef(false);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      reducedMotion.current = preference.matches;
      if (preference.matches) section.dataset.flight = "arrived";
    };
    updatePreference();
    preference.addEventListener("change", updatePreference);
    let observer: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window) {
      if (!preference.matches) section.dataset.flight = "pending";
      observer = new IntersectionObserver(([entry]) => {
        section.dataset.inView = String(entry.isIntersecting);
        if (entry.isIntersecting) section.dataset.flight = "arrived";
      }, { threshold: 0.2 });
      observer.observe(section);
    }
    return () => {
      observer?.disconnect();
      preference.removeEventListener("change", updatePreference);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  function moveDrone(event: MouseEvent<HTMLElement>) {
    if (reducedMotion.current) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 48;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 32;
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      parallaxRef.current?.style.setProperty("--drone-x", `${x}px`);
      parallaxRef.current?.style.setProperty("--drone-y", `${y}px`);
      parallaxRef.current?.style.setProperty("--drone-roll", `${x * 0.1}deg`);
      frameRef.current = null;
    });
  }

  function resetDrone() {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
    parallaxRef.current?.style.setProperty("--drone-x", "0px");
    parallaxRef.current?.style.setProperty("--drone-y", "0px");
    parallaxRef.current?.style.setProperty("--drone-roll", "0deg");
  }

  return (
    <section ref={sectionRef} id="sky-i" tabIndex={-1} className={styles.section}
      aria-labelledby="sky-heading"
      onMouseMove={moveDrone} onMouseLeave={resetDrone}>
      <Image className={styles.background} src="/images/sky-i/inspection-panorama.webp"
        alt="" fill sizes="100vw" />
      <div className={styles.shade} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={`${styles.eyebrow} type-label`}><span />The Sky I division</p>
          <h2 id="sky-heading" data-type-reveal><span className={`${styles.perspective} type-line`}>A different <em>perspective.</em></span>{" "}<span className={`${styles.precision} type-line`}>The same precision.</span></h2>
          <p className={styles.description}>A closer look. Even in the hardest places to reach. Sky I brings industrial drone inspection into complex structures and confined spaces, helping you see the condition of your assets from a new perspective.</p>
          <ul className={styles.applications} aria-label="Inspection applications">
            <li>Internal inspections</li><li>Confined spaces</li><li>Industrial assets</li>
          </ul>
          <a href="http://skyi.co.za/" className={styles.visit}>
            <span>Visit Sky I</span><span className={styles.visitArrow}><Arrow /></span>
          </a>
        </div>
        <div className={styles.stage}>
          <div className={styles.target} aria-hidden="true"><span /><span /><span /><span /></div>
          <div className={styles.arrival}>
            <div ref={parallaxRef} className={styles.parallax}>
              <div className={styles.hover}>
                <Image className={styles.drone} src="/images/sky-i/elios_3.png"
                  alt="Elios 3 inspection drone inside its protective spherical cage"
                  width={1600} height={1000} sizes="(max-width: 700px) 150vw, 850px" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottomLine} aria-hidden="true"><span>SKY I / INDUSTRIAL DRONE INSPECTION</span><span>A NEW ANGLE ON ACCESS</span></div>
    </section>
  );
}
