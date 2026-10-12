"use client";

import { openCookieSettings } from "@/lib/cookie-consent";
import styles from "./CookieConsent.module.css";

export function CookieSettingsButton({ className, children = "Cookie settings" }: { className?: string; children?: React.ReactNode }) {
  return <button type="button" className={className ?? styles.settingsLink} aria-haspopup="dialog" aria-controls="cookie-preferences" onClick={openCookieSettings}>{children}</button>;
}
