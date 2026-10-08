"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./rope-technician.module.css";

export function RopeTechnician() {
  const root = useRef<HTMLDivElement>(null);
  const worker = useRef<HTMLDivElement>(null);
  const workRope = useRef<SVGLineElement>(null);
  const safetyRope = useRef<SVGLineElement>(null);

  useEffect(() => {
    const element = root.current;
    const silhouette = worker.current;
    if (!element || !silhouette) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let viewportHeight = window.innerHeight;
    let width = element.clientWidth;
    let travel = 0;
    let position = 0;

    const measure = () => {
      viewportHeight = window.innerHeight;
      width = element.clientWidth;
      travel = Math.max(0, document.documentElement.scrollHeight - viewportHeight);
    };
    const updatePosition = () => {
      const progress = travel > 0 ? Math.min(1, Math.max(0, window.scrollY / travel)) : 0;
      // The worker moves down the viewport as well as down the document,
      // arriving just above the footer's bottom edge at the end of the page.
      position = progress * Math.max(0, viewportHeight - width * 174 / 134 - 28);
    };
    const draw = (time: number) => {
      const sway = Math.sin(time / 1400) * Math.min(3, width * .08);
      silhouette.style.transform = `translate3d(${sway}px, ${position}px, 0) rotate(${Math.sin(time / 1400) * 1.5}deg)`;
      for (const [rope, anchor] of [[workRope.current, 80 / 134], [safetyRope.current, 94 / 134]] as const) {
        rope?.setAttribute("x1", String(width * anchor));
        rope?.setAttribute("x2", String(width * anchor + sway));
        rope?.setAttribute("y2", String(position + 1));
      }
      frame = window.requestAnimationFrame(draw);
    };
    const restart = () => {
      window.cancelAnimationFrame(frame);
      measure();
      updatePosition();
      if (!motion.matches && document.visibilityState === "visible") {
        frame = window.requestAnimationFrame(draw);
      }
    };
    const resize = new ResizeObserver(() => { measure(); updatePosition(); });
    resize.observe(document.body);
    window.addEventListener("scroll", updatePosition, { passive: true });
    window.addEventListener("resize", restart);
    document.addEventListener("visibilitychange", restart);
    motion.addEventListener("change", restart);
    restart();

    return () => {
      window.cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", restart);
      document.removeEventListener("visibilitychange", restart);
      motion.removeEventListener("change", restart);
    };
  }, []);

  return (
    <div ref={root} className={styles.technician} aria-hidden="true">
      <svg className={styles.ropes}>
        <line ref={workRope} x1="59.7%" x2="59.7%" y1="0" y2="0" />
        <line ref={safetyRope} x1="70.1%" x2="70.1%" y1="0" y2="0" />
      </svg>
      <div ref={worker} className={styles.worker}>
        <Image src="/images/brand/rope-technician.png" alt="" width={134} height={174} unoptimized />
      </div>
    </div>
  );
}
