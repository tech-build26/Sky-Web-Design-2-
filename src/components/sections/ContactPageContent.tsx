
import { SiteLink } from "../site/SiteLink";
import Image from "next/image";
import { CONTACT_EMAIL, WHATSAPP_URL } from "@/lib/contact";
import { SiteHeader } from "../site/SiteHeader";
import { Arrow } from "../site/Icons";
import { ContactPageForm } from "./ContactPageForm";
import { OfficeMap } from "./OfficeMap";
import styles from "./contact-page.module.css";

function ContactIcon({ kind }: { kind: "mail" | "phone" | "pin" | "chat" }) {
  return <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {kind === "mail" && <><rect x="4" y="7" width="24" height="18" rx="2" /><path d="m5 9 11 9L27 9" /></>}
    {kind === "phone" && <path d="M9 4 5 8c-1 1 1 7 7 13s12 8 13 7l4-4-7-6-4 3a22 22 0 0 1-7-7l3-4-5-6Z" />}
    {kind === "pin" && <><path d="M25 13c0 7-9 16-9 16S7 20 7 13a9 9 0 1 1 18 0Z" /><circle cx="16" cy="13" r="3" /></>}
    {kind === "chat" && <><path d="M16 4a12 12 0 0 0-10.2 18.3L4 29l7-1.8A12 12 0 1 0 16 4Z" /><path d="M11 11c-2 1-1 5 2 8s6 4 8 2l-3-2-2 1-4-4 1-2-2-3Z" /></>}
  </svg>;
}

function ContactHero() {
  return <section id="home" className={styles.hero} aria-labelledby="hero-heading">
    <div className={styles.heroStage}>
      <SiteHeader active="contact" />
      <svg className={styles.heroLines} viewBox="0 0 1672 560" preserveAspectRatio="none" aria-hidden="true"><g fill="none" stroke="#98c9ed" strokeWidth="1" opacity=".66"><path d="M0 145h1672M0 535h1672M158 0 0 250M830 0 508 560M1060 0 738 560M1578 0 1258 560" /><circle cx="843" cy="228" r="67" /><circle cx="843" cy="228" r="94" /><path d="M800 228h86M843 185v86" /></g><path d="M220 0 0 340M1170 560l196-560" fill="none" stroke="#0078ee" strokeWidth="1.5" opacity=".55" /></svg>
      <div className={styles.heroCopy}>
        <p className={styles.eyebrow} data-reveal="left">Get in touch <span aria-hidden="true" /></p>
        <h1 id="hero-heading" tabIndex={-1} data-type-reveal><span className="type-line">Let’s discuss</span><span className="type-line">your <em>next project.</em></span></h1>
        <p data-reveal="left" data-delay="2">Whether you need a site assessment, technical input or a detailed quotation, our team is ready to help. Tell us about your project and we’ll get back to you promptly.</p>
        <SiteLink href="#project-enquiry" className={styles.heroAction} data-reveal="left" data-delay="3">Start your enquiry <Arrow /></SiteLink>
      </div>
      <div className={styles.heroPhoto} data-reveal="right" data-delay="1"><Image src="/images/contact/contact-industrial-rope-hero.webp" alt="Rope-access technician working among steel trusses and rigging lines." fill preload sizes="(max-width: 800px) 100vw, 55vw" /></div>
      <p className={styles.heroWords} aria-hidden="true"><span>Access</span><span>Inspection</span><span>Maintenance</span><span>Installation</span></p>
    </div>
  </section>;
}

function ContactMethods() {
  return <div className={styles.methods}>
    <div className={styles.panelHeading}><p>02 / Contact details</p><h2 id="other-ways-heading">Other ways to reach us.</h2><span>Prefer to speak to someone directly? Use the details below.</span></div>
    <div className={styles.methodList}>
      <SiteLink href={`mailto:${CONTACT_EMAIL}`} className={styles.method}><span className={styles.methodIcon}><ContactIcon kind="mail" /></span><span><small>Email</small><strong>{CONTACT_EMAIL}</strong><em>General enquiries and quotations.</em></span><Arrow /></SiteLink>
      <SiteLink href="tel:+27861000759" className={styles.method}><span className={styles.methodIcon}><ContactIcon kind="phone" /></span><span><small>Phone</small><strong>0861 000 759</strong><em>Speak to our team.</em></span><Arrow /></SiteLink>
      <SiteLink href="#location-map" className={styles.method}><span className={styles.methodIcon}><ContactIcon kind="pin" /></span><span><small>Offices</small><strong>Midrand &amp; eMalahleni</strong><em>Site visits by arrangement.</em></span><Arrow /></SiteLink>
      <SiteLink href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={`${styles.method} ${styles.whatsapp}`}><span className={styles.methodIcon}><ContactIcon kind="chat" /></span><span><small>WhatsApp</small><strong>Project enquiries</strong><em>Start a conversation with our team.</em></span><Arrow /><span className="sr-only"> (opens in a new tab)</span></SiteLink>
    </div>
  </div>;
}

export function ContactPageContent({ emailDeliveryEnabled }: { emailDeliveryEnabled: boolean }) {
  return <>
    <ContactHero />
    <section className={styles.contactArea} aria-label="Contact Skyriders">
      <div className={styles.board}>
        <ContactPageForm emailDeliveryEnabled={emailDeliveryEnabled} />
        <ContactMethods />
        <div className={styles.location}><div className={styles.panelHeading}><p>03 / Our location</p><h2>Find us.</h2><span>Based in Midrand, with project coverage across South Africa.</span></div><OfficeMap /></div>
      </div>
    </section>
    <section className={styles.nextSteps} aria-labelledby="next-steps-heading">
      <div className={styles.stepsInner}>
        <div><p className={styles.eyebrow} data-reveal="left">Make the first call count <span aria-hidden="true" /></p><h2 id="next-steps-heading" data-reveal="mask">A clear brief gets the<br /><em>right people moving.</em></h2></div>
        <div className={styles.steps}>
          <p data-reveal="bottom" data-delay="1"><b>01</b><strong>Tell us about the asset</strong><span>Structure, site location and the area that needs access.</span></p>
          <p data-reveal="bottom" data-delay="2"><b>02</b><strong>Share the constraints</strong><span>Operating hours, permits, shutdown windows and known hazards.</span></p>
          <p data-reveal="bottom" data-delay="3"><b>03</b><strong>Agree the next step</strong><span>We’ll discuss the scope and whether a site walkdown is needed.</span></p>
        </div>
      </div>
    </section>
  </>;
}
