"use client";

import { useCallback, useEffect, useRef, type MouseEvent, type ReactNode } from "react";

// Native details remain usable before hydration. Enhance only the height change;
// each new click starts at the current visual height, including mid-animation.
export function AnimatedDisclosure({ id, className, summary, children, contentClassName, exclusive = false }: {
  id?: string; className: string; summary: ReactNode; children: ReactNode; contentClassName?: string; exclusive?: boolean;
}) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const summaryRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<Animation | null>(null);
  const intendedOpen = useRef(false);

  const animateTo = useCallback((opening: boolean) => {
    const details = detailsRef.current;
    const summaryElement = summaryRef.current;
    if (!details || !summaryElement) return;
    const start = details.getBoundingClientRect().height;
    intendedOpen.current = opening;
    animationRef.current?.cancel();
    animationRef.current = null;
    details.dataset.expanded = String(opening);
    if (contentRef.current) contentRef.current.inert = !opening;
    if (typeof details.animate !== "function" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) { details.open = opening; return; }

    details.open = true;
    const style = getComputedStyle(details);
    const frame = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth)
      + parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
    const end = opening ? details.getBoundingClientRect().height : summaryElement.getBoundingClientRect().height + frame;
    const animation = details.animate([{ height: `${start}px` }, { height: `${end}px` }], {
      duration: opening ? 380 : 300, easing: "cubic-bezier(.22, 1, .36, 1)", fill: "both",
    });
    animationRef.current = animation;
    animation.onfinish = () => {
      if (animationRef.current !== animation) return;
      details.open = opening;
      animationRef.current = null;
      animation.cancel();
    };
  }, []);

  useEffect(() => {
    const details = detailsRef.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    intendedOpen.current = Boolean(details?.open);
    if (contentRef.current) contentRef.current.inert = !details?.open;
    const settle = () => { if (preference.matches) animationRef.current?.finish(); };
    const close = () => { if (intendedOpen.current) animateTo(false); };
    const resized = () => animationRef.current?.finish();
    preference.addEventListener("change", settle);
    details?.addEventListener("careers-close", close);
    window.addEventListener("resize", resized);
    return () => { preference.removeEventListener("change", settle); window.removeEventListener("resize", resized); details?.removeEventListener("careers-close", close); animationRef.current?.cancel(); };
  }, [animateTo]);

  function toggle(event: MouseEvent<HTMLElement>) {
    const details = detailsRef.current;
    if (!details) return;
    event.preventDefault();
    const opening = animationRef.current ? !intendedOpen.current : !details.open;
    if (opening && exclusive) details.parentElement?.querySelectorAll("details[open]").forEach(other => {
      if (other !== details) other.dispatchEvent(new Event("careers-close"));
    });
    animateTo(opening);
  }

  return <details ref={detailsRef} id={id} className={className}>
    <summary ref={summaryRef} onClick={toggle}>{summary}</summary>
    <div ref={contentRef} className={contentClassName}>{children}</div>
  </details>;
}
