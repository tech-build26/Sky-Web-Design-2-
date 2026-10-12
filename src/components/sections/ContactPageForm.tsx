"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { CONTACT_EMAIL, enquiryServices, enquiryTimings, enquiryText, isValidEnquiry, type ProjectEnquiry } from "@/lib/contact";
import { Arrow } from "../site/Icons";
import styles from "./contact-page.module.css";

export function ContactPageForm({ emailDeliveryEnabled }: { emailDeliveryEnabled: boolean }) {
  const serviceSelect = useRef<HTMLSelectElement>(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [failed, setFailed] = useState(false);
  const [mailLink, setMailLink] = useState("");

  useEffect(() => {
    const requestedService = new URLSearchParams(window.location.search).get("service");
    if (requestedService && enquiryServices.some((service) => service === requestedService) && serviceSelect.current) {
      serviceSelect.current.value = requestedService;
    }
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    if (data.get("website")) return;
    const enquiry: ProjectEnquiry = {
      name: String(data.get("name") || "").trim(),
      company: String(data.get("company") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      location: String(data.get("location") || "").trim(),
      service: String(data.get("service") || ""),
      timing: String(data.get("timing") || ""),
      message: String(data.get("message") || "").trim(),
      consent: data.get("consent") === "on",
    };
    setStatus("");
    setMailLink("");
    setFailed(false);
    if (!isValidEnquiry(enquiry)) {
      setFailed(true);
      setStatus("Please complete the required fields and describe the project in at least ten characters.");
      return;
    }
    const fallback = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Project enquiry — ${enquiry.service}`)}&body=${encodeURIComponent(enquiryText(enquiry))}`;
    if (!emailDeliveryEnabled) {
      setMailLink(fallback);
      setStatus("Your enquiry is ready. Open your email app to review and send it to our team.");
      return;
    }
    setBusy(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...enquiry, website: data.get("website") }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "We couldn’t send your enquiry. Please use email instead.");
      setStatus("Thank you. Your enquiry has been sent to our project team.");
      form.reset();
    } catch (error) {
      setFailed(true);
      setStatus(error instanceof Error ? error.message : "We couldn’t send your enquiry. Please use email instead.");
      setMailLink(fallback);
    } finally {
      setBusy(false);
    }
  }

  return <form id="project-enquiry" className={styles.form} onSubmit={submit}>
    <div className={styles.panelHeading}><p>01 / Send a message</p><h2>Request a callback or quotation.</h2><span>Give us a few details and we’ll get back to you.</span></div>
    <div className={styles.formFields}>
      <label>Your name <b>*</b><input name="name" autoComplete="name" required maxLength={100} placeholder="Full name" /></label>
      <label>Company<input name="company" autoComplete="organization" maxLength={150} placeholder="Company or organisation" /></label>
      <label>Email address <b>*</b><input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="name@company.co.za" /></label>
      <label>Phone number<input name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="+27" /></label>
      <label className={styles.fieldWide}>Project type <b>*</b><select ref={serviceSelect} name="service" required defaultValue=""><option value="" disabled>Select a service</option>{enquiryServices.map((service) => <option key={service}>{service}</option>)}</select></label>
      <label>Site / project location <b>*</b><input name="location" required maxLength={200} placeholder="City, site or facility" /></label>
      <label>Project timing<select name="timing" defaultValue=""><option value="">Select a timeframe</option>{enquiryTimings.map((timing) => <option key={timing}>{timing}</option>)}</select></label>
      <label className={styles.fieldWide}>Message <b>*</b><textarea name="message" required minLength={10} maxLength={3000} rows={4} placeholder="Tell us about the asset, access challenge and any specific requirements…" /></label>
    </div>
    <label className={styles.honeypot} aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
    <label className={styles.consent}><input name="consent" type="checkbox" required /><span>I agree to be contacted by Skyriders about this enquiry.</span></label>
    <div className={styles.formBottom}><button type="submit" disabled={busy}>{busy ? "Sending…" : emailDeliveryEnabled ? "Send message" : "Prepare enquiry email"}<Arrow /></button><span>{emailDeliveryEnabled ? "We’ll respond as soon as we can." : "Review and send in your email app."}</span></div>
    {status && <div className={styles.formStatus} data-error={failed} role={failed ? "alert" : "status"}><p>{status}</p>{mailLink && <a href={mailLink}>Open email app <Arrow /></a>}</div>}
    <noscript><p>Email us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> to discuss your project.</p></noscript>
  </form>;
}
