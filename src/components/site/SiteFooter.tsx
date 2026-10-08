import Image from "next/image";
import { HUB_URL } from "@/lib/site-content";
import { CONTACT_EMAIL, WHATSAPP_URL } from "@/lib/contact";
import { Arrow } from "./Icons";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return <footer className={styles.footer}>
    <div className={styles.inner}>
      <div className={styles.topline}><p data-type-reveal><span className="type-line">Access beyond</span>{" "}<strong className="type-line">limits.</strong></p><a href="#contact">Let’s discuss your next project <Arrow /></a></div>
      <div className={styles.main}>
        <div className={styles.brand}>
          <a href="#home" aria-label="Skyriders — back to top"><Image src="/images/brand/sky-logo.png" alt="" width={1500} height={1250} unoptimized /></a>
          <p>Specialist access. Practical solutions.<br />South African expertise since 1999.</p><span className={styles.location}>MIDRAND · eMALAHLENI · SOUTH AFRICA</span>
        </div>
        <div><p className={styles.title}>Explore</p><nav className={styles.links} aria-label="Footer navigation"><a href="#about">Who we are</a><a href="#services">How we help</a><a href="#industries">Industries</a><a href="#safety">Safety &amp; quality</a><a href="#contact">Contact</a><a href={HUB_URL} target="_blank" rel="noopener noreferrer">Team Hub <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a></nav></div>
        <div className={styles.contact}><p className={styles.title}>Connect with the team</p><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a><a href="tel:+27861000759">0861 000 759</a><a href="tel:+27136925219">013 692 5219</a><a className={styles.whatsapp} href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">Project enquiries on WhatsApp <Arrow /><span className="sr-only"> (opens in a new tab)</span></a></div>
        <div className={styles.division}>
          <p className={styles.title}>A different perspective</p>
          <a href="http://skyi.co.za/" className={styles.skyLogo} aria-label="Visit the Sky I website"><Image src="/images/brand/sky-i-logo.png" alt="Sky I" width={1254} height={1254} unoptimized /></a>
          <p>Industrial drone inspection.</p><a href="http://skyi.co.za/" className={styles.skyLink}>Visit Sky I <Arrow /></a>
        </div>
      </div>
      <div className={styles.bottom}><span>© 2026 Skyriders Access Specialists (Pty) Ltd.</span><span>Planning. Precision. Possibility.</span><a href="#home">Back to top <span aria-hidden="true">↑</span></a></div>
    </div>
  </footer>;
}
