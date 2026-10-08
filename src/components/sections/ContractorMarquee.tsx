"use client";

import Image from "next/image";
import { useEffect, useRef, type PointerEvent, type KeyboardEvent } from "react";
import { contractors } from "@/lib/contractors";
import styles from "./Contact.module.css";

export function ContractorMarquee() {
  const viewport = useRef<HTMLDivElement>(null);
  const group = useRef<HTMLDivElement>(null);
  const hovered = useRef(false);
  const focused = useRef(false);
  const dragging = useRef(false);
  const dragPosition = useRef(0);

  useEffect(() => {
    const element = viewport.current;
    const firstGroup = group.current;
    if (!element || !firstGroup) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let previous = 0;
    let fractionalTravel = 0;
    let visible = false;
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    observer.observe(element);
    const tick = (time: number) => {
      const elapsed = previous ? Math.min(time - previous, 48) : 0;
      previous = time;
      if (!preference.matches && visible && !hovered.current && !focused.current && !dragging.current) {
        // Carry fractional distance so high-refresh displays don't round every frame to zero.
        const distance = elapsed * 0.035 + fractionalTravel;
        const pixels = Math.floor(distance);
        fractionalTravel = distance - pixels;
        element.scrollLeft += pixels;
        if (element.scrollLeft >= firstGroup.offsetWidth) element.scrollLeft -= firstGroup.offsetWidth;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); };
  }, []);

  function move(distance: number) {
    const element = viewport.current;
    const width = group.current?.offsetWidth;
    if (!element || !width) return;
    element.scrollLeft = (element.scrollLeft + distance + width) % width;
  }

  function pointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") { dragging.current = true; return; }
    if (event.button !== 0) return;
    dragging.current = true;
    dragPosition.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.dataset.dragging = "true";
  }

  function pointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!dragging.current || event.pointerType === "touch") return;
    move(dragPosition.current - event.clientX);
    dragPosition.current = event.clientX;
  }

  function pointerUp(event: PointerEvent<HTMLDivElement>) {
    dragging.current = false;
    event.currentTarget.dataset.dragging = "false";
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }

  function keyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    move(event.key === "ArrowRight" ? 200 : -200);
  }

  return <div className={styles.contractors}>
    <div className={styles.contractorHead}>
      <div><p className={styles.eyebrow}>Experience across industry</p><h3>Working alongside industry leaders.</h3></div>
    </div>
    <div ref={viewport} className={styles.marquee} tabIndex={0} role="region" aria-label="Contractor logos. Use left and right arrow keys to browse."
      onMouseEnter={() => { hovered.current = true; }} onMouseLeave={() => { hovered.current = false; }}
      onFocus={() => { focused.current = true; }} onBlur={() => { focused.current = false; }}
      onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={pointerUp} onKeyDown={keyDown}>
      <div className={styles.track}>
        {[0, 1].map((copy) => <div key={copy} ref={copy === 0 ? group : undefined} className={styles.logoGroup} aria-hidden={copy === 1 ? true : undefined}>
          {contractors.map((contractor) => <div className={styles.logo} key={contractor.src}><Image src={contractor.src} alt={copy === 0 ? contractor.name : ""} width={300} height={150} unoptimized draggable={false} /></div>)}
        </div>)}
      </div>
    </div>
  </div>;
}
