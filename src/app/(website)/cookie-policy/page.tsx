import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { CookieSettingsButton } from "@/components/site/CookieSettingsButton";
import { CONTACT_EMAIL } from "@/lib/contact";
import styles from "./policy.module.css";

export const metadata: Metadata = {
  title: "Cookie & privacy details | Skyriders",
  description: "How Skyriders uses browser storage and optional Google Maps, and how to change or withdraw your consent.",
  alternates: { canonical: "/cookie-policy" },
};

export default function CookiePolicyPage() {
  return <>
    <div className={styles.header}><SiteHeader /></div>
    <main id="main" className={styles.page}>
      <p className={styles.eyebrow}>Skyriders / Privacy</p><h1>Your choice stays yours.</h1>
      <p className={styles.lead}>Cookie &amp; browser storage details</p><p className={styles.updated}>Last updated: 12 October 2026</p>
      <section><h2>What this notice covers</h2><p>Skyriders Access Specialists (Pty) Ltd is responsible for this website. This notice explains browser storage and embedded services used here. Cookies are small files saved by a website; local storage is another way your browser remembers information on your device.</p><p>Optional services remain off unless you explicitly accept them. Scrolling, following a link, or closing the preference window does not give consent. You can use this website, contact us and apply for roles without accepting optional media.</p></section>
      <section><h2>What we use</h2><div className={styles.tableWrap}><table><caption>Website technologies and purposes</caption><thead><tr><th scope="col">Technology / provider</th><th scope="col">Purpose &amp; choice</th><th scope="col">Retention</th></tr></thead><tbody>
        <tr><th scope="row">Privacy preference / Skyriders</th><td><code>skyriders.cookie-consent</code> in first-party local storage remembers your External media choice, the notice version, and when you saved it. This necessary preference is not used for tracking and is not sent to our server.</td><td>Valid for 180 days from your latest choice. An expired record is ignored; saving a new choice replaces it. Clear site data in your browser to remove it sooner.</td></tr>
        <tr><th scope="row">Site functionality &amp; security</th><td>First-party code supports navigation and forms. When online recruitment is enabled, Cloudflare Turnstile checks application submissions for abuse. This security service is necessary to protect the form; it is not an advertising or analytics service. <a href="https://www.cloudflare.com/privacypolicy/">Cloudflare privacy policy</a>.</td><td>Our consent system does not create security cookies. Any security-service storage and processing follow the provider’s settings and privacy terms.</td></tr>
        <tr><th scope="row">External media / Google Maps</th><td>Optional embedded maps display office locations. They load only with your External media consent. Google receives information such as your IP address and browser details and may set or read cookies under its own terms. You can use the displayed addresses without enabling the maps.</td><td>Google controls any cookies it sets, their lifetimes and its data retention. See <a href="https://policies.google.com/technologies/cookies">Google’s cookie information</a> and <a href="https://policies.google.com/privacy">privacy policy</a>.</td></tr>
      </tbody></table></div><p>There are currently no analytics or advertising trackers on this site. Fonts and site images are hosted locally. Links to social networks, directions, WhatsApp and other websites take you to services with their own privacy terms when you choose to follow them.</p></section>
      <section><h2>Change or withdraw your choice</h2><p>Use Cookie settings in any footer, or the button below, to turn External media off and save, or choose Reject Optional. Your change removes embedded maps immediately and prevents them from loading on subsequent pages. Withdrawal does not undo processing that happened while consent was active. This site cannot remove cookies held on Google’s domain; you can remove those in your browser’s site-data settings.</p><CookieSettingsButton className={styles.settings}>Change cookie settings <span aria-hidden="true">↗</span></CookieSettingsButton><p>Choices apply to this browser and device and are shared across pages on this site. We ask again after 180 days, if you clear site data, or if the purposes in this notice change. If your browser blocks local storage, a choice applies to the current page and we ask again when you navigate or return.</p></section>
      <section><h2>Personal information &amp; your rights</h2><p>Optional map processing relies on your consent. Google or Cloudflare may process information outside South Africa or the European Economic Area; their privacy policies describe their processing and transfer arrangements. This preference is separate from any agreement you give when submitting an enquiry or application. See the notice beside each form for its purpose and recipients.</p><p>To ask about your information, request access or correction, or withdraw consent, contact <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Deletion and objection rights apply where provided by POPIA or GDPR. You may raise a concern with the <a href="https://inforegulator.org.za/contact-us/">South African Information Regulator</a>, or your local data protection authority if GDPR applies.</p></section>
    </main>
    <SiteFooter />
  </>;
}
