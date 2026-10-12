"use client";

import { useEffect, useRef, useState } from "react";
import { CONSENT_SETTINGS_EVENT, getConsent, openCookieSettings, saveConsent, type ConsentPreferences } from "@/lib/cookie-consent";
import { useCookieConsent } from "./ConsentGate";
import styles from "./CookieConsent.module.css";

function Shield() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z" /><path d="m8.5 12 2.5 2.5 4.5-5" /></svg>;
}

export function CookieConsent() {
  const consent = useCookieConsent();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const previousOverflow = useRef("");
  const [managing, setManaging] = useState(false);
  const [externalMedia, setExternalMedia] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const dialog = dialogRef.current;
    const open = () => {
      if (!dialog || dialog.open) return;
      returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setExternalMedia(getConsent()?.externalMedia ?? false);
      previousOverflow.current = document.body.style.overflow;
      dialog.showModal();
      document.body.style.overflow = "hidden";
      setManaging(true);
    };
    window.addEventListener(CONSENT_SETTINGS_EVENT, open);
    return () => {
      window.removeEventListener(CONSENT_SETTINGS_EVENT, open);
      if (dialog?.open) {
        dialog.close();
        document.body.style.overflow = previousOverflow.current;
      }
    };
  }, []);

  function closePreferences() {
    dialogRef.current?.close();
  }

  function restorePage() {
    document.body.style.overflow = previousOverflow.current;
    setManaging(false);
    // The banner can disappear on save; restore focus only to a live trigger.
    if (returnFocus.current?.isConnected) returnFocus.current.focus({ preventScroll: true });
  }

  function choose(preferences: ConsentPreferences) {
    const persisted = saveConsent(preferences);
    if (!persisted) setNotice("Your choice applies to this page. Your browser is blocking storage, so we will ask again when you navigate or return.");
    if (dialogRef.current?.open) closePreferences();
  }

  return <>
    {consent === null && !managing && <section className={styles.banner} aria-labelledby="cookie-banner-title" aria-describedby="cookie-banner-description">
      <div className={styles.bannerCopy}>
        <span className={styles.icon}><Shield /></span>
        <div><p className={styles.eyebrow}>Your privacy. Your choice.</p><h2 id="cookie-banner-title">A little control goes a long way.</h2>
          <p id="cookie-banner-description" className={styles.description}>Essential technologies keep this site working. With your permission, Google Maps can load to help you find our offices. Optional content stays off until you choose.</p>
          <a className={styles.policyLink} href="/cookie-policy">Cookie &amp; privacy details <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <div className={styles.bannerActions}>
        <div className={styles.choicePair}><button type="button" className={styles.choice} onClick={() => choose({ externalMedia: true })}>Accept All</button><button type="button" className={styles.choice} onClick={() => choose({ externalMedia: false })}>Reject Optional</button></div>
        <button type="button" className={styles.manage} aria-haspopup="dialog" aria-controls="cookie-preferences" onClick={openCookieSettings}>Manage Preferences <span aria-hidden="true">↗</span></button>
      </div>
    </section>}

    <dialog ref={dialogRef} id="cookie-preferences" className={styles.dialog} aria-labelledby="cookie-preferences-title" aria-describedby="cookie-preferences-description" onClose={restorePage} onClick={event => { if (event.target === event.currentTarget) closePreferences(); }}>
      <div className={styles.dialogHead}><span className={styles.icon}><Shield /></span><button type="button" className={styles.close} aria-label="Close cookie preferences without saving" onClick={closePreferences} autoFocus>×</button></div>
      <p className={styles.eyebrow}>Privacy, on your terms</p>
      <h2 id="cookie-preferences-title">Cookie preferences.</h2>
      <p id="cookie-preferences-description" className={styles.description}>Choose what you allow. You can change your mind at any time using Cookie settings in the footer.</p>
      <div className={styles.categories}>
        <div className={styles.category}><div><h3>Strictly necessary</h3><p>Site functionality, your saved privacy choice, and security checks on application forms.</p></div><span className={styles.required}>Always on</span></div>
        <div className={styles.category}><div><h3 id="external-media-label">External media</h3><p id="external-media-description">Google Maps for office locations. When enabled, Google receives your IP address and browser information and may use cookies or process data outside South Africa or the EEA. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google privacy policy (opens in a new tab)</a>.</p></div>
          <button type="button" role="switch" aria-checked={externalMedia} aria-labelledby="external-media-label" aria-describedby="external-media-description" className={styles.toggle} onClick={() => setExternalMedia(value => !value)}><span /><span className={styles.srOnly}>{externalMedia ? "On" : "Off"}</span></button>
        </div>
      </div>
      <p className={styles.note}>We do not currently use analytics or advertising trackers. Your choice is stored on this device for 180 days. Closing this window leaves your saved choice unchanged.</p>
      <a className={styles.policyLink} href="/cookie-policy">Read our cookie &amp; privacy details <span aria-hidden="true">↗</span></a>
      <div className={styles.dialogActions}><div className={styles.choicePair}><button type="button" className={styles.choice} onClick={() => choose({ externalMedia: true })}>Accept All</button><button type="button" className={styles.choice} onClick={() => choose({ externalMedia: false })}>Reject Optional</button></div><button type="button" className={styles.save} onClick={() => choose({ externalMedia })}>Save Preferences <span aria-hidden="true">↗</span></button></div>
    </dialog>
    {notice && <div className={styles.notice} role="status"><span>{notice}</span><button type="button" aria-label="Dismiss storage notice" onClick={() => setNotice("")}>×</button></div>}
  </>;
}
