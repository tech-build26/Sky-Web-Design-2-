"use client";

import { useState, type FormEvent } from "react";
import { ASSESSMENT_EMAIL, assessmentNeeds, assessmentText, contactWindows, isValidAssessment, type AssessmentEnquiry } from "@/lib/assessment";
import styles from "./assessment-request.module.css";

export function AssessmentRequest({ emailDeliveryEnabled }: { emailDeliveryEnabled: boolean }) {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [mailLink, setMailLink] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const fields = new FormData(form);
    if (fields.get("website")) return;
    const data: AssessmentEnquiry = {
      name: String(fields.get("name") || "").trim(), company: String(fields.get("company") || "").trim(),
      email: String(fields.get("email") || "").trim(), phone: String(fields.get("phone") || "").trim(),
      site: String(fields.get("site") || "").trim(), need: String(fields.get("need") || ""),
      window: String(fields.get("window") || ""), method: "Phone call",
      scope: String(fields.get("scope") || "").trim(), consent: fields.get("consent") === "on",
    };
    setError(false); setMessage(""); setMailLink("");
    if (!isValidAssessment(data)) { setError(true); setMessage("Please check the required fields and tell us a little more about the site."); return; }
    const fallback = `mailto:${ASSESSMENT_EMAIL}?subject=${encodeURIComponent("Free onsite assessment request")}&body=${encodeURIComponent(assessmentText(data))}`;
    if (!emailDeliveryEnabled) { setMessage("Your assessment brief is ready. Send it to Ross from your email app."); setMailLink(fallback); window.location.href = fallback; return; }
    setBusy(true);
    try {
      const response = await fetch("/api/assessment", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, website: fields.get("website") }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "We couldn’t send your request. Please use the email option below.");
      setMessage("Your assessment request has reached the technical team. They’ll contact you to arrange the site visit.");
      form.reset();
    } catch (caught) {
      setError(true); setMessage(caught instanceof Error ? caught.message : "We couldn’t send your request. Please use email below."); setMailLink(fallback);
    } finally { setBusy(false); }
  }

  return <form className={styles.form} onSubmit={submit} aria-label="Request a free onsite assessment">
    <div className={styles.header}><span>04 Start here <i /></span><strong>Site assessment brief</strong><p>A few details are enough to start. We&apos;ll follow up to arrange the visit.</p></div>
    <div className={styles.fields}>
      <label>Your name <span>*</span><input name="name" required autoComplete="name" maxLength={100} placeholder="Full name" /></label>
      <label>Company<input name="company" autoComplete="organization" maxLength={150} placeholder="Company or organisation" /></label>
      <label>Work email <span>*</span><input name="email" type="email" required autoComplete="email" maxLength={254} placeholder="name@company.co.za" /></label>
      <label>Phone number <span>*</span><input name="phone" type="tel" required autoComplete="tel" minLength={6} maxLength={40} placeholder="+27" /></label>
      <label className={styles.full}>Site / facility location <span>*</span><input name="site" required maxLength={200} placeholder="Town, city or project location" /></label>
      <label className={styles.full}>What needs assessing? <span>*</span><select name="need" required defaultValue=""><option value="" disabled>Select the main service</option>{assessmentNeeds.map(need => <option key={need}>{need}</option>)}</select></label>
    </div>
    <fieldset className={styles.window}><legend>When can we get in touch? <span>*</span></legend><div className={styles.options}>{contactWindows.map((window,index) => <label key={window}><input type="radio" name="window" value={window} required defaultChecked={index === 1} /><span>{window}</span></label>)}</div></fieldset>
    <label className={styles.brief}>Describe the asset and access challenge <span>*</span><textarea name="scope" required minLength={10} maxLength={2000} rows={3} placeholder="For example: smoke stack inspection at an operating power station, preferred outage window, and any known access constraints." /></label>
    <label className={styles.honeypot} aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
    <label className={styles.consent}><input name="consent" type="checkbox" required /><span>I agree to be contacted about this assessment request.</span></label>
    <div className={styles.footer}>{!emailDeliveryEnabled && <span>Review and send the request to Ross in your email app.</span>}<button type="submit" disabled={busy}>{busy ? "Sending…" : "Request onsite assessment"}<span aria-hidden="true">→</span></button></div>
    {message && <div className={styles.feedback} data-error={error} role={error ? "alert" : "status"}>{message}{mailLink && <a href={mailLink}>Open email app ↗</a>}</div>}
    <noscript><p>Email <a href={`mailto:${ASSESSMENT_EMAIL}`}>{ASSESSMENT_EMAIL}</a> to arrange your assessment.</p></noscript>
  </form>;
}
