"use client";

import { useState, type FormEvent } from "react";
import { CONTACT_EMAIL, enquiryServices, enquiryTimings, enquiryText, isValidEnquiry, type ProjectEnquiry } from "@/lib/contact";
import { Arrow } from "../site/Icons";
import styles from "./Contact.module.css";

export function ContactForm({ emailDeliveryEnabled }: { emailDeliveryEnabled: boolean }) {
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [mailLink, setMailLink] = useState("");
  const [failed, setFailed] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const enquiry: ProjectEnquiry = {
      name: String(data.get("name") || "").trim(), email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(), company: String(data.get("company") || "").trim(),
      location: String(data.get("location") || "").trim(), service: String(data.get("service") || ""),
      timing: String(data.get("timing") || ""), message: String(data.get("message") || "").trim(),
      consent: data.get("consent") === "on",
    };
    const fallback = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Project enquiry — ${enquiry.service}`)}&body=${encodeURIComponent(enquiryText(enquiry))}`;
    setFailed(false);
    setStatus("");
    setMailLink("");
    if (data.get("website")) return;
    if (!isValidEnquiry(enquiry)) {
      setFailed(true);
      setStatus("Please complete the required fields with your contact details and project scope.");
      return;
    }
    if (!emailDeliveryEnabled) {
      setMailLink(fallback);
      setStatus("Your enquiry is ready. Open your email app below to review and send it to our project team.");
      return;
    }
    setBusy(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...enquiry, website: data.get("website") }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "We couldn’t send your enquiry. Please try again or use email below.");
      setStatus("Thank you. Your enquiry has been sent to our project team. We’ll be in touch to discuss your requirements.");
      form.reset();
    } catch (error) {
      setFailed(true);
      setStatus(error instanceof Error ? error.message : "We couldn’t send your enquiry. Please use email below.");
      setMailLink(fallback);
    } finally {
      setBusy(false);
    }
  }

  return <form id="project-enquiry" className={styles.form} data-reveal="right" data-delay="2" onSubmit={submit}>
    <div className={styles.formHeading}><span className={styles.formNumber}>01 /</span><div><h3>Tell us about your project.</h3><p>The right details help us plan the right approach.</p></div></div>
    <div className={styles.fields}>
      <label>Full name <span>*</span><input name="name" required autoComplete="name" maxLength={100} placeholder="Your name" /></label>
      <label>Email address <span>*</span><input name="email" type="email" required autoComplete="email" maxLength={254} placeholder="you@company.co.za" /></label>
      <label>Company<input name="company" autoComplete="organization" maxLength={150} placeholder="Company name" /></label>
      <label>Contact number<input name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="+27" /></label>
      <label className={styles.wide}>Site / project location <span>*</span><input name="location" required maxLength={200} placeholder="City, facility or site name" /></label>
      <label>Service required <span>*</span><select name="service" required defaultValue=""><option value="" disabled>Select a service</option>{enquiryServices.map(service => <option key={service}>{service}</option>)}</select></label>
      <label>Project timing<select name="timing" defaultValue=""><option value="">Select a timeframe</option>{enquiryTimings.map(timing => <option key={timing}>{timing}</option>)}</select></label>
      <label className={styles.wide}>Project scope <span>*</span><textarea name="message" required minLength={10} maxLength={3000} rows={4} placeholder="Tell us about the structure, access challenge and work you need completed." /></label>
    </div>
    <label className={styles.honeypot} aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
    <label className={styles.consent}><input name="consent" type="checkbox" required /><span>I agree to be contacted by Skyriders about this enquiry.</span></label>
    <div className={styles.formBottom}><span>Fields marked * are required.</span><button className={styles.submit} data-button type="submit" disabled={busy}>{busy ? "Sending…" : emailDeliveryEnabled ? "Send project enquiry" : "Prepare enquiry email"}<Arrow /></button></div>
    {!emailDeliveryEnabled && <p className={styles.deliveryNote}>Your details will be prepared for you to send using your email app.</p>}
    {status && <div className={styles.feedback} data-error={failed} role={failed ? "alert" : "status"}><p>{status}</p>{mailLink && <a href={mailLink}>Open email app <Arrow /></a>}</div>}
    <noscript><p>Please email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> to discuss your project.</p></noscript>
  </form>;
}
