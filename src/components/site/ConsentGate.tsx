"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { getConsent, subscribeConsent, type ConsentCategory, type CookieConsent } from "@/lib/cookie-consent";

const serverConsent = (): CookieConsent | null | undefined => undefined;

export function useCookieConsent() {
  return useSyncExternalStore(subscribeConsent, getConsent, serverConsent);
}

// The denied branch renders on the server too: no optional resource URL, script,
// iframe or vendor component mounts until this purpose has explicit consent.
export function ConsentGate({ category, children, fallback = null }: { category: ConsentCategory; children: ReactNode; fallback?: ReactNode }) {
  const consent = useCookieConsent();
  return consent?.[category] === true ? children : fallback;
}
