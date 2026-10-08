"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Native disclosures keep navigation usable even before hydration or without JS.
export function NavigationDisclosure({ label, className, children, hoverOpen = false }: { label: ReactNode; className: string; children: ReactNode; hoverOpen?: boolean }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function cancelClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    if (ref.current) delete ref.current.dataset.closing;
  }

  function close(smooth = false) {
    cancelClose();
    const details = ref.current;
    if (!details?.open) return;
    if (!smooth || !hoverOpen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      details.open = false;
      return;
    }
    details.dataset.closing = "true";
    closeTimer.current = setTimeout(() => {
      details.open = false;
      delete details.dataset.closing;
    }, 260);
  }

  useEffect(() => {
    const outside = (event: PointerEvent) => {
      const details = ref.current;
      if (details && event.target instanceof Node && !details.contains(event.target)) {
        details.open = false;
        delete details.dataset.closing;
      }
    };
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("pointerdown", outside);
      if (closeTimer.current) clearTimeout(closeTimer.current);
      if (leaveTimer.current) clearTimeout(leaveTimer.current);
    };
  }, []);

  return (
    <details
      ref={ref}
      className={className}
      data-hover-open={hoverOpen || undefined}
      onPointerEnter={(event) => {
        if (!hoverOpen || event.pointerType !== "mouse" || !window.matchMedia("(hover: hover)").matches) return;
        cancelClose();
        const details = event.currentTarget;
        details.parentElement?.querySelectorAll<HTMLDetailsElement>("details[data-hover-open][open]").forEach((other) => {
          if (other !== details) { other.open = false; delete other.dataset.closing; }
        });
        details.open = true;
      }}
      onPointerLeave={(event) => {
        if (!hoverOpen || event.pointerType !== "mouse") return;
        if (event.currentTarget.contains(document.activeElement) && document.activeElement?.matches(":focus-visible")) return;
        // A short grace period keeps the panel usable while moving onto its links.
        leaveTimer.current = setTimeout(() => close(true), 160);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && ref.current?.open) {
          close();
          ref.current.querySelector("summary")?.focus();
          event.stopPropagation();
        }
      }}
      onBlur={(event) => {
        if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget as Node)) {
          close(true);
        }
      }}
      onClick={(event) => {
        if ((event.target as HTMLElement).closest("a")) close();
      }}
    >
      <summary>{label}</summary>
      {children}
    </details>
  );
}
