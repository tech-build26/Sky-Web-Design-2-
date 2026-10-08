import { CONTACT_EMAIL, WHATSAPP_URL } from "@/lib/contact";
import { Arrow } from "../site/Icons";
import { ContactForm } from "./ContactForm";
import { ContractorMarquee } from "./ContractorMarquee";
import styles from "./Contact.module.css";

export function Contact() {
  const emailDeliveryEnabled = Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_FROM_EMAIL);
  return <section id="contact" tabIndex={-1} className={styles.section} aria-labelledby="contact-heading">
    <div className={styles.inner}>
      <div className={styles.header}><p className={`${styles.eyebrow} type-label`}>Let’s talk about your site</p><h2 id="contact-heading" data-type-reveal><span className={`${styles.contactLead} type-line`}>Your next challenge.</span>{" "}<span className={`${styles.contactAccent} type-line`}>Let’s <em>reach it.</em></span></h2><p>From the first conversation to the right access solution.<br />{" "}Bring us your requirements. We’ll help define the way forward.</p></div>
      <div className={styles.contactGrid}>
        <div className={styles.direct}>
          <div className={styles.whatsappCard}>
            <span className={styles.cardTag}>A direct conversation</span>
            <svg className={styles.chatIcon} viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M27 15a11 11 0 0 1-16.6 9.5L5 27l1.6-6A11 11 0 1 1 27 15Z" stroke="currentColor" strokeWidth="1.5" /><path d="M12 10c-2 1-1 5 2 8s7 4 8 2l-3-2-2 1-4-4 1-2-2-3Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>
            <h3>Speak directly with a project manager.</h3>
            <p>Discuss your site, technical requirements and next steps with the team that understands the work.</p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={styles.whatsappLink}>Start a WhatsApp conversation <Arrow /><span className="sr-only"> (opens in a new tab)</span></a>
            <span className={styles.whatsappNumber}>+27 83 289 0077 · WhatsApp only</span>
          </div>
          <div className={styles.emailContact}><span>Prefer email?</span><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}<Arrow /></a></div>
          <div className={styles.offices}>
            <div><p className={styles.officeLabel}>01 / MIDRAND</p><address>44 Monte Carlo Crescent<br />Kyalami Business Park<br />Midrand, 1685</address><a href="tel:+27861000759">0861 000 759 <Arrow /></a></div>
            <div><p className={styles.officeLabel}>02 / eMALAHLENI</p><address>Shop 2 &amp; 6, 24 Langa Crescent<br />Corridor Hill, Zeekoewater<br />eMalahleni, 1035</address><a href="tel:+27136925219">013 692 5219 <Arrow /></a></div>
          </div>
        </div>
        <ContactForm emailDeliveryEnabled={emailDeliveryEnabled} />
      </div>
      <ContractorMarquee />
    </div>
  </section>;
}
