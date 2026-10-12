import Image from "next/image";
import { HUB_URL } from "@/lib/site-content";
import { CONTACT_EMAIL, WHATSAPP_URL } from "@/lib/contact";
import { Arrow } from "./Icons";
import styles from "./SiteFooter.module.css";

const facebookUrl = "https://web.facebook.com/SkyridersIndustrialRopeAccess";
const linkedInUrl = "https://za.linkedin.com/company/skyriders-access-specialists-pty-ltd";
const certificationUrl = "https://ropeaccess.co.za/certifications/";

function SocialIcon({ kind }: { kind: "facebook" | "linkedin" }) {
  return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{kind === "facebook"
    ? <path d="M13.6 22v-9.1H16l.4-3.1h-2.8V7.9c0-.9.3-1.5 1.5-1.5h1.5V3.6c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 4v2.3H8v3.1h2.5V22h3.1Z" />
    : <path d="M5.2 8.3a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6ZM3.6 9.8h3.2V20H3.6V9.8Zm5.2 0h3.1v1.4h.1c.4-.8 1.5-1.7 3.1-1.7 3.3 0 3.9 2.1 3.9 4.8V20h-3.3v-5.1c0-1.2 0-2.7-1.7-2.7s-1.9 1.3-1.9 2.6V20H8.8V9.8Z" />}</svg>;
}

function FooterIcon({ kind }: { kind: "mail" | "phone" | "mobile" | "pin" | "chat" }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{kind === "mail" && <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 7 8-7" /></>}{kind === "phone" && <path d="m6 2 4 4-2 3c2 3 4 5 7 7l3-2 4 4-3 4c-5 1-10-3-14-7S0 6 2 5l4-3Z" />}{kind === "mobile" && <><rect x="6" y="2" width="12" height="20" rx="2" /><path d="M10 18h4" /></>}{kind === "pin" && <><path d="M19 10c0 5-7 12-7 12S5 15 5 10a7 7 0 0 1 14 0Z" /><circle cx="12" cy="10" r="2.5" /></>}{kind === "chat" && <><path d="M12 2a10 10 0 0 0-8.5 15.3L2 22l5-1.3A10 10 0 1 0 12 2Z" /><path d="M8 8c-1 1 0 4 3 6s5 3 6 2l-2-2-2 1-4-4 1-2-2-1Z" /></>}</svg>;
}

export function SiteFooter() {
  return <footer className={styles.footer}>
    <div className={styles.callout}>
      <div className={styles.calloutInner}>
        <p className={styles.calloutBrand}>Access beyond <span /> <strong>limits</strong></p>
        <p className={styles.calloutCopy}><strong>Ready to talk about your project?</strong><span>Our team is here to discuss practical solutions for complex access challenges.</span></p>
        <a href="/contact#project-enquiry" className={styles.calloutAction}>Let’s get started <Arrow /></a>
      </div>
    </div>
    <div className={styles.inner}>
      <div className={styles.main}>
        <div className={styles.brand} data-reveal="left">
          <a href="/home" aria-label="Skyriders home"><Image src="/images/brand/sky-logo.png" alt="" width={1500} height={1250} unoptimized /></a>
          <p>Specialist access. Practical solutions.<br />South African expertise since 1999.</p>
          <nav className={styles.socials} aria-label="Social media"><a href={linkedInUrl} target="_blank" rel="noopener noreferrer" aria-label="Skyriders on LinkedIn"><SocialIcon kind="linkedin" /></a><a href={facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Skyriders on Facebook"><SocialIcon kind="facebook" /></a></nav>
        </div>
        <div data-reveal data-delay="1"><h2 className={styles.title}>Explore</h2><nav className={styles.links} aria-label="Footer navigation">
          <a href="/about">Who we are <Arrow /></a><a href="/services/inspection-concrete-access#service-index">All services <Arrow /></a><a href="/services/inspection-concrete-access">Inspection, concrete &amp; access <Arrow /></a><a href="/services/maintenance-confined-space-drone">Maintenance, confined space &amp; drones <Arrow /></a><a href="/industries">Industries <Arrow /></a><a href="/home/#safety">Safety &amp; quality <Arrow /></a><a href="/about#credentials">Certifications <Arrow /></a><a href="/careers">Careers <Arrow /></a><a href="/contact">Contact <Arrow /></a><a href={HUB_URL} target="_blank" rel="noopener noreferrer">Team Hub <Arrow /><span className="sr-only"> (opens in a new tab)</span></a>
        </nav></div>
        <div className={styles.contact} data-reveal data-delay="2"><h2 className={styles.title}>Contact</h2><a href={`mailto:${CONTACT_EMAIL}`}><span><FooterIcon kind="mail" /></span>{CONTACT_EMAIL}</a><a href="tel:+27861000759"><span><FooterIcon kind="phone" /></span>0861 000 759</a><a href="tel:+27136925219"><span><FooterIcon kind="mobile" /></span>013 692 5219</a><a href="/contact#location-map"><span><FooterIcon kind="pin" /></span>Find our offices</a><a className={styles.whatsapp} href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"><span><FooterIcon kind="chat" /></span>Project enquiries on WhatsApp <Arrow /><span className="sr-only"> (opens in a new tab)</span></a></div>
        <div className={styles.division} data-reveal="right" data-delay="2"><h2 className={styles.title}>A different perspective</h2><a href="https://skyi.co.za/" target="_blank" rel="noopener noreferrer" className={styles.skyLogo} aria-label="Visit the Sky I website"><Image src="/images/brand/sky-i-logo.png" alt="Sky I" width={1254} height={1254} unoptimized /></a><p>Industrial drone inspection.</p><a href="https://skyi.co.za/" target="_blank" rel="noopener noreferrer" className={styles.skyLink}>Visit Sky I <Arrow /><span className="sr-only"> (opens in a new tab)</span></a></div>
        <div className={styles.certifications} data-reveal="right" data-delay="3"><h2 className={styles.title}>Our certifications</h2><div className={styles.badges} aria-label="Documents listed in the company certification library"><span><b>ISO</b>9001</span><span><b>ISO</b>45001</span><span><b>IWH</b>Industry</span><span><b>COIDA</b>Good standing</span></div><a href={certificationUrl} target="_blank" rel="noopener noreferrer">View certification library <Arrow /><span className="sr-only"> (opens in a new tab)</span></a></div>
      </div>
      <div className={styles.bottom}><span>© 2026 Skyriders Access Specialists (Pty) Ltd.</span><span>Planning · Precision · Possibility</span><a href="#main">Back to top <span aria-hidden="true">↑</span></a></div>
    </div>
  </footer>;
}
