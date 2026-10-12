export const CONSENT_KEY = "skyriders.cookie-consent";
export const CONSENT_VERSION = 1;
export const CONSENT_MAX_AGE = 180 * 24 * 60 * 60 * 1000;
export const CONSENT_CHANGE_EVENT = "skyriders:consent-change";
export const CONSENT_SETTINGS_EVENT = "skyriders:consent-settings";

// Only expose purposes actually used by this site. Add new purposes and update
// the notice/version before introducing analytics, advertising or other vendors.
export type ConsentCategory = "externalMedia";
export type ConsentPreferences = Record<ConsentCategory, boolean>;
export type CookieConsent = ConsentPreferences & {
  version: number;
  savedAt: number;
  expiresAt: number;
};

export function parseConsent(raw: string | null, now = Date.now()): CookieConsent | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw);
    if (!value || value.version !== CONSENT_VERSION || typeof value.externalMedia !== "boolean"
      || !Number.isFinite(value.savedAt) || !Number.isFinite(value.expiresAt)
      || value.savedAt > now || value.savedAt < 0 || value.expiresAt <= now
      || value.expiresAt <= value.savedAt || value.expiresAt - value.savedAt > CONSENT_MAX_AGE) return null;
    return { version: value.version, savedAt: value.savedAt, expiresAt: value.expiresAt, externalMedia: value.externalMedia };
  } catch {
    return null;
  }
}

let cachedRaw: string | null | undefined;
let cachedConsent: CookieConsent | null = null;
let sessionConsent: CookieConsent | null = null;

export function getConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  if (sessionConsent) {
    if (sessionConsent.expiresAt > Date.now()) return sessionConsent;
    sessionConsent = null;
  }
  let raw: string | null;
  try { raw = window.localStorage.getItem(CONSENT_KEY); } catch { return null; }
  if (raw !== cachedRaw || (cachedConsent && cachedConsent.expiresAt <= Date.now())) {
    cachedRaw = raw;
    cachedConsent = parseConsent(raw);
  }
  return cachedConsent;
}

export function saveConsent(preferences: ConsentPreferences): boolean {
  const now = Date.now();
  const consent: CookieConsent = { version: CONSENT_VERSION, savedAt: now, expiresAt: now + CONSENT_MAX_AGE, externalMedia: preferences.externalMedia };
  let persisted = true;
  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    sessionConsent = null;
  } catch {
    // Apply an explicit choice for this page even when browser storage is blocked.
    // A quota error may allow removal: discard an older opt-in so a rejected
    // choice cannot accidentally restore it on the next page.
    try { window.localStorage.removeItem(CONSENT_KEY); } catch { /* Storage can be entirely unavailable. */ }
    sessionConsent = consent;
    persisted = false;
  }
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
  return persisted;
}

export function subscribeConsent(listener: () => void): () => void {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const refresh = () => {
    clearTimeout(timer);
    listener();
    const consent = getConsent();
    if (consent) timer = setTimeout(refresh, Math.min(consent.expiresAt - Date.now() + 1, 2_147_483_647));
  };
  const storage = (event: StorageEvent) => {
    if (event.key !== null && event.key !== CONSENT_KEY) return;
    sessionConsent = null;
    refresh();
  };
  window.addEventListener("storage", storage);
  window.addEventListener("focus", refresh);
  window.addEventListener(CONSENT_CHANGE_EVENT, refresh);
  refresh();
  return () => {
    clearTimeout(timer);
    window.removeEventListener("storage", storage);
    window.removeEventListener("focus", refresh);
    window.removeEventListener(CONSENT_CHANGE_EVENT, refresh);
  };
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(CONSENT_SETTINGS_EVENT));
}
