"use client";

import Script from "next/script";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { availabilityOptions, contactOptions, levelOptions, MAX_CV_BYTES, type Vacancy } from "@/lib/careers";
import styles from "./careers.module.css";

type Turnstile = {
  render: (element: HTMLElement, options: { sitekey: string; action: string; callback: (token: string) => void; "expired-callback": () => void; "error-callback": () => void }) => string;
  remove: (id: string) => void; reset: (id: string) => void;
};
declare global { interface Window { turnstile?: Turnstile } }

export function ApplicationForm({ vacancies, selected, onSelect, siteKey, accepting }: { vacancies: Vacancy[]; selected: string; onSelect: (id: string) => void; siteKey: string; accepting: boolean }) {
  const captchaContainer = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [captcha, setCaptcha] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [reference, setReference] = useState("");
  useEffect(() => {
    if (!ready || !captchaContainer.current || !window.turnstile) return;
    widget.current = window.turnstile.render(captchaContainer.current, { sitekey: siteKey, action: "careers-apply", callback: setCaptcha, "expired-callback": () => setCaptcha(""), "error-callback": () => { setCaptcha(""); setError("The security check could not load. Please refresh and try again."); } });
    return () => { if (widget.current) window.turnstile?.remove(widget.current); widget.current = null; };
  }, [ready, siteKey]);
  useEffect(() => { if (error || reference) statusRef.current?.focus(); }, [error, reference]);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const cv = data.get("cv");
    setError("");
    if (!(cv instanceof File) || cv.size === 0 || cv.size > MAX_CV_BYTES || !/\.pdf$/i.test(cv.name) || cv.type !== "application/pdf") { setError("Attach one PDF CV, up to 5 MB. Export it as a PDF first."); return; }
    if (!captcha) { setError("Please complete the security check before submitting."); return; }
    data.set("captcha", captcha);
    setBusy(true);
    try {
      const response = await fetch("/api/careers/apply", { method: "POST", body: data });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error || "We could not confirm your application. Please try again.");
      setReference(result.reference); form.reset(); setCaptcha("");
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : "We could not confirm your application. Please retry with the same details and PDF.");
      setCaptcha(""); if (widget.current) window.turnstile?.reset(widget.current);
    } finally { setBusy(false); }
  }
  const vacancy = vacancies.find(v => v.id === selected);
  return <section id="application" className={styles.application} aria-labelledby="application-heading">
    <p className={styles.eyebrow}>Your next assignment starts here</p><h3 id="application-heading">Apply for a published role.</h3>
    <p>Read the full description and requirements before applying. Send one focused application for the role that matches your experience.</p>
    {reference ? <div className={styles.success} role="status" tabIndex={-1} ref={statusRef}><strong>Application accepted for email delivery.</strong><p>Your reference is <strong>{reference}</strong>. Keep it for follow-up. Our email service has accepted your application addressed to reception@ropeaccess.co.za; this does not confirm an interview or appointment.</p></div>
      : !accepting ? <p className={styles.error}>Online applications are temporarily unavailable. Please check back before the advertised closing date.</p>
      : <form onSubmit={submit} aria-busy={busy}>
        <div className={styles.honeypot} aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
        <div className={styles.formGrid}>
          <label className={`${styles.field} ${styles.full}`}>Advertised position<select name="vacancy" value={selected} onChange={event => onSelect(event.target.value)} required><option value="">Select a vacancy</option>{vacancies.map(v => <option key={v.id} value={v.id}>{v.reference} — {v.title} — {v.site}</option>)}</select>{vacancy && <small>{vacancy.level} · {vacancy.contract} · {vacancy.region}</small>}</label>
          <label className={styles.field}>Full name<input name="name" autoComplete="name" required maxLength={100} /></label>
          <label className={styles.field}>Email address<input type="email" name="email" autoComplete="email" required maxLength={254} /></label>
          <label className={styles.field}>Phone / WhatsApp number<input type="tel" name="phone" autoComplete="tel" required maxLength={40} placeholder="e.g. +27 82 123 4567" /><small>Include the country code. Use your WhatsApp number if that is your preferred contact method.</small></label>
          <label className={styles.field}>Preferred contact method<select name="contact" required><option value="">Choose how we can reach you</option>{contactOptions.map(v => <option key={v}>{v}</option>)}</select></label>
          <label className={styles.field}>Current town / province<input name="location" autoComplete="address-level2" required maxLength={200} /></label>
          <label className={styles.field}>When can you start?<select name="availability" required><option value="">Choose your availability</option>{availabilityOptions.map(v => <option key={v}>{v}</option>)}</select></label>
          <label className={styles.field}>Current rope-access level<select name="level" required><option value="">Choose your level</option>{levelOptions.map(v => <option key={v}>{v}</option>)}</select><small>For “Other” or a notice period, explain in your cover letter.</small></label>
          <label className={styles.field}>CV — PDF only, maximum 5 MB<input type="file" name="cv" accept="application/pdf,.pdf" required /><small>One unencrypted PDF. Do not include ID copies, medical reports or diagnoses.</small></label>
          <label className={`${styles.field} ${styles.full}`}>Cover letter<textarea name="cover" rows={6} required minLength={40} maxLength={4000} placeholder="Tell us how your qualifications, site experience and availability meet this role’s requirements." /><small>40–4,000 characters. Address the requirements directly.</small></label>
        </div>
        <label className={styles.checkbox}><input type="checkbox" name="consent" required /><span>I have read the <a href="#recruitment-privacy">recruitment privacy notice</a> and agree that Skyriders may process my application, send it to its reception mailbox and contact me about this advertised role.</span></label>
        {siteKey && <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onReady={() => setReady(true)} />}
        <div ref={captchaContainer} style={{ margin: "24px 0", minHeight: 65 }} />
        {error && <div className={styles.error} role="alert" tabIndex={-1} ref={statusRef}>{error}</div>}
        <button type="submit" className={styles.primary} disabled={busy}>{busy ? "Checking & sending…" : "Send application"}<span aria-hidden="true">↗</span></button>
      </form>}
    <div id="recruitment-privacy" className={styles.privacy}><strong>Recruitment privacy notice</strong><p>Skyriders Access Specialists (Pty) Ltd uses your contact details, cover letter and CV to assess this application and contact you about this advertised role. Your PDF is processed temporarily by the website and a private security-check service, then emailed to reception@ropeaccess.co.za through our email delivery provider. We do not save CVs or applications in the website database or offer a CV bank. The email provider and reception mailbox retain the email under their retention arrangements.</p><p>Provide only information relevant to the role. Certificates, identity and occupational fitness checks are arranged later if required. Limited, hashed identifiers are used to prevent abuse. For access, correction or withdrawal, <a href="/contact#project-enquiry">contact Skyriders</a> and quote your application reference. Please do not attach another CV unless requested.</p></div>
  </section>;
}
