import Image from "next/image";
import { Arrow } from "../site/Icons";
import buttons from "../site/ActionButtons.module.css";
import { AssessmentRequest } from "./AssessmentRequest";
import styles from "./about-trust.module.css";

const credentials = [
  { code: "01", mark: "ISO 9001", meta: "2015 / Quality management", detail: "A structured quality system for consistent delivery and continual improvement.", icon: "quality" },
  { code: "02", mark: "ISO 45001", meta: "2018 / Occupational health & safety", detail: "A management framework focused on identifying hazards and controlling work-related risks.", icon: "safety" },
  { code: "03", mark: "IWH", meta: "Institute for Work at Height", detail: "Industry association listed in the Skyriders company documentation as IWH057.", icon: "industry" },
  { code: "04", mark: "COIDA", meta: "Department of Employment & Labour record", detail: "A Letter of Good Standing is listed in the company’s certification library. Request the current copy for your supplier file.", icon: "document" },
] as const;

const pillars = [
  { number: "01", title: "Safety with a track record.", body: "Skyriders reports a zero-fatality record since operations began. Every new site still receives its own risk review, access plan and controls.", image: "/images/about/partner-safety-technician.webp", className: styles.pillarSafety, icon: "shield" },
  { number: "02", title: "Competence at height.", body: "Rope access teams receive intensive training, including Levels 1–3, fall arrest and fall protection planning. Confirm the assigned team’s current cards, including any required IRATA credentials, before mobilisation.", image: "/images/about/partner-industrial-silo.webp", className: styles.pillarTraining, icon: "helmet" },
  { number: "03", title: "A direct technical response.", body: "Talk through the structure, outage window and access constraints with the technical team. They can arrange a site walkdown and define the work before pricing.", image: null, className: styles.pillarResponse, icon: "people" },
  { number: "04", title: "Cover you can verify.", body: "The company’s certification library lists contractors all risks and liability insurance documentation. Ask for the current schedule and limits for your project.", image: "/images/about/assessment-architecture.webp", className: styles.pillarInsurance, icon: "document" },
] as const;

function CredentialSymbol({ kind }: { kind: typeof credentials[number]["icon"] }) {
  if (kind === "quality") return <span className={styles.credentialSymbol} aria-hidden="true"><span className={styles.isoSeal}>ISO<br />9001<span className={styles.sealCheck}>✓</span></span></span>;
  return <span className={styles.credentialSymbol} aria-hidden="true"><svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    {kind === "safety" && <><path d="M40 7 64 17v18c0 17-10 29-24 37C26 64 16 52 16 35V17L40 7Z" /><path d="M27 45h27M30 43v-7a10 10 0 0 1 7-10m6 0a10 10 0 0 1 7 10v7M37 22v13m6-13v13" /><path d="m34 54 5 5 9-10" stroke="#0079ee" strokeWidth="2.5" /></>}
    {kind === "industry" && <><path d="m40 6 29 17v34L40 74 11 57V23L40 6Z" /><path d="m27 55 6 6 9-10" stroke="#0079ee" strokeWidth="2.5" /><text x="40" y="44" textAnchor="middle" fill="currentColor" stroke="none" fontSize="23" fontWeight="700" fontFamily="Arial, sans-serif">IWH</text></>}
    {kind === "document" && <><path d="M24 10h26l9 9v48H24V10Z M50 10v10h9M31 30h20M31 38h20M31 46h15" /><circle cx="54" cy="57" r="13" fill="#0079ee" stroke="#fff" strokeWidth="2" /><path d="m48 57 4 4 8-9" stroke="#fff" strokeWidth="2.5" /></>}
  </svg></span>;
}

function PillarIcon({ kind }: { kind: typeof pillars[number]["icon"] }) {
  return <svg className={styles.pillarIcon} viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {kind === "shield" && <><path d="M20 3 34 9v12c0 9-6 14-14 17C12 35 6 30 6 21V9L20 3Z" /><path d="m13 20 5 5 10-11" /></>}
    {kind === "helmet" && <><path d="M6 23a14 14 0 0 1 28 0M15 18V9m10 0v9M4 23h32v5H4zM10 28v5h20v-5" /></>}
    {kind === "people" && <><circle cx="16" cy="11" r="5" /><circle cx="29" cy="14" r="4" /><path d="M4 32v-3a12 12 0 0 1 24 0v3H4ZM26 22a9 9 0 0 1 10 9v1h-5" /></>}
    {kind === "document" && <><path d="M9 3h18l7 7v27H9V3ZM27 3v8h7M14 17h14M14 23h11" /><path d="m16 30 4 4 8-9" /></>}
  </svg>;
}

function SafetyGuarantee() {
  return <section id="safety-guarantee" className={styles.guarantee} aria-labelledby="guarantee-heading">
    <div className={styles.guaranteeImage} aria-hidden="true"><Image src="/images/about/onsite-assessment.webp" alt="" fill sizes="100vw" /></div>
    <div className={styles.guaranteeWrap}>
      <div className={styles.guaranteeIntro}>
        <p className={styles.kicker} data-reveal="left">01 / Safety &amp; compliance guarantee <i /></p>
        <h2 id="guarantee-heading" data-reveal="mask" data-delay="1">The safe way up starts <em>on the ground.</em></h2>
        <p data-reveal="left" data-delay="2">Before a technician is deployed, the scope needs a defensible method. Our commitment is to plan the work, document the controls and align the team with the site’s requirements.</p>
        <span className={styles.guaranteeRule} data-reveal="mask" data-delay="3">Plan the task. Brief the team. Check the controls.</span>
      </div>
      <div className={styles.process} aria-label="Safety planning sequence">
        <div data-reveal="right" data-delay="1"><span>01</span><h3>Walk down the site</h3><p>Understand the asset, access points, operating constraints and client expectations.</p></div>
        <div data-reveal="right" data-delay="2"><span>02</span><h3>Assess the risks</h3><p>Prepare a task-specific risk assessment and identify the controls needed for work at height or confined spaces.</p></div>
        <div data-reveal="right" data-delay="3"><span>03</span><h3>Set the method</h3><p>Define the safe work procedure, competent supervision, equipment checks and rescue arrangements.</p></div>
        <div data-reveal="right" data-delay="4"><span>04</span><h3>Clear the site interface</h3><p>Coordinate permits, inductions, applicable OHS requirements and the client’s approval process before mobilisation.</p></div>
      </div>
    </div>
  </section>;
}

export function AboutTrust({ emailDeliveryEnabled }: { emailDeliveryEnabled: boolean }) {
  return <>
    <SafetyGuarantee />
    <section className={styles.stats} aria-label="Skyriders at a glance">
      <div className={styles.statsInner}>
        <p className={styles.statsIntro} data-reveal="left"><span className={styles.kicker}>The record &amp; the method</span><strong>Confidence is earned on site.</strong></p>
        <div className={styles.stat} data-reveal="bottom" data-delay="1"><strong>0</strong><span>fatalities reported<br />since founding*</span></div>
        <div className={styles.stat} data-reveal="bottom" data-delay="2"><strong>02</strong><span>ISO management<br />standards named*</span></div>
        <div className={styles.stat} data-reveal="bottom" data-delay="3"><strong>01</strong><span>site-specific plan<br />for every scope</span></div>
      </div>
      <p className={styles.statsNote} data-reveal="mask" data-delay="4">* Company-reported record in the Skyriders 2026 brochure and website. This does not mean zero incidents. Confirm current certification status during onboarding.</p>
    </section>

    <section id="credentials" className={styles.credentials} aria-labelledby="credentials-heading">
      <div className={styles.blueprint} aria-hidden="true"><span /><span /><span /></div>
      <div className={styles.credentialStage}>
        <div className={styles.credentialIntro}>
          <p className={styles.kicker} data-reveal="left">02 / Trust &amp; safety badges <i /></p>
          <h2 id="credentials-heading" data-reveal="mask" data-delay="1">Standards<br />behind the <em>work.</em></h2>
          <p data-reveal="left" data-delay="2">Management systems, industry participation and statutory records give procurement teams a clearer starting point. Verify current certificates and project-specific documents during onboarding.</p>
          <a href="https://ropeaccess.co.za/certifications/" target="_blank" rel="noopener noreferrer" className={buttons.skew} data-reveal="left" data-delay="3"><span>View company certification library <Arrow /></span></a>
          <p className={styles.credentialTagline} data-reveal="mask" data-delay="4">South African expertise <b>/</b> Since 1999</p>
        </div>
        <div className={styles.credentialGrid}>
          {credentials.map((item, index) => <article className={styles.credential} key={item.code} data-reveal="zoom" data-delay={index + 1}>
            <div className={styles.credentialTop}><span><b>{item.code} /</b> Company documentation</span><span className={styles.credentialRule} /></div>
            <CredentialSymbol kind={item.icon} />
            <strong>{item.mark}</strong><p className={styles.credentialMeta}>{item.meta}</p><p className={styles.credentialDetail}>{item.detail}</p>
          </article>)}
        </div>
      </div>
      <span className={styles.credentialCorner} aria-hidden="true" />
    </section>

    <section className={styles.partners} aria-labelledby="partners-heading">
      <div className={styles.partnerSidePhoto} aria-hidden="true"><Image src="/images/about/partner-rope-technician.webp" alt="" fill sizes="25vw" /></div>
      <div className={styles.partnerBlueprint} aria-hidden="true"><span /><span /><span /></div>
      <div className={styles.partnerStage}>
        <p className={styles.partnerVertical}>Industrial access<br />Higher standards</p>
        <div className={styles.partnersHeading}><p className={styles.kicker} data-reveal="left">03 / Your trusted partner <i /></p><h2 id="partners-heading" data-reveal="mask" data-delay="1">Four reasons to<br />bring us <em>in early.</em></h2><p data-reveal="right" data-delay="2">From first scoping call to site handover, the details that matter to your operations team stay in view.</p></div>
        <div className={styles.pillarGrid}>{pillars.map((pillar, index) => <article key={pillar.number} className={`${styles.pillar} ${pillar.className}`} data-reveal="bottom" data-delay={index + 1}>
          {pillar.image && <div className={styles.pillarPhoto} aria-hidden="true"><Image src={pillar.image} alt="" fill sizes="(max-width: 800px) 100vw, 40vw" /></div>}
          <div className={styles.pillarArt} aria-hidden="true" />
          <span className={styles.pillarNumber}>{pillar.number} / 04 <i /></span>
          <div className={styles.pillarCopy}><PillarIcon kind={pillar.icon} /><h3>{pillar.title}</h3><p>{pillar.body}</p><a href="#assessment" className={styles.pillarAction} aria-label={`Discuss ${pillar.title.toLowerCase()} with the technical team`}><Arrow /></a></div>
        </article>)}</div>
        <p className={styles.partnerMarginNote} data-reveal="mask" data-delay="4">People<br />Access<br />Solutions<br />Results</p>
      </div>
    </section>

    <section id="assessment" className={styles.assessment} aria-labelledby="assessment-heading">
      <div className={styles.assessmentImage} aria-hidden="true"><Image src="/images/about/assessment-architecture.webp" alt="" fill sizes="100vw" /></div>
      <div className={styles.assessmentStage}>
        <div className={styles.assessmentIntro}><p className={styles.kicker} data-reveal="left">04 / Site assessment <i /></p><h2 id="assessment-heading" data-reveal="mask" data-delay="1">Book a free<br /><em>onsite</em><br /><span>assessment.</span></h2><p data-reveal="left" data-delay="2">Let our technical team see the asset and the access challenges first. We’ll visit your site, discuss your expectations, assess the scope of work and then prepare a quotation. The initial assessment is at no cost.</p><ol><li data-reveal="left" data-delay="1"><b>01</b><span>Tell us about the site</span></li><li data-reveal="left" data-delay="2"><b>02</b><span>Arrange a technical walkthrough</span></li><li data-reveal="left" data-delay="3"><b>03</b><span>Receive a scoped quotation</span></li></ol></div>
        <div className={styles.assessmentForm} data-reveal="right" data-delay="2"><AssessmentRequest emailDeliveryEnabled={emailDeliveryEnabled} /></div>
      </div>
    </section>
  </>;
}
