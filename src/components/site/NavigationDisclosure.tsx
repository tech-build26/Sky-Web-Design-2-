"use client";

import { useRef, type ReactNode } from "react";

// Native disclosures keep navigation usable even before hydration or without JS.
export function NavigationDisclosure({ label, className, children }: { label: ReactNode; className: string; children: ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);
  return (
    <details
      ref={ref}
      className={className}
      onKeyDown={(event) => {
        if (event.key === "Escape" && ref.current?.open) {
          ref.current.open = false;
          ref.current.querySelector("summary")?.focus();
          event.stopPropagation();
        }
      }}
      onBlur={(event) => {
        if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget as Node)) {
          event.currentTarget.open = false;
        }
      }}
      onClick={(event) => {
        if ((event.target as HTMLElement).closest("a") && ref.current) ref.current.open = false;
      }}
    >
      <summary>{label}</summary>
      {children}
    </details>
  );
}
