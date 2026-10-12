"use client";

import { useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import { AnimatedDisclosure } from "./AnimatedDisclosure";
import styles from "./careers.module.css";

const categories = [
  { label: "Finding a role", items: [
    ["Are temporary roles available?", "Yes, when advertised. Projects, shutdowns and client scopes can require additional personnel for a defined period. Each advert states the contract, anticipated duration, site and working pattern. A temporary assignment does not imply permanent employment."],
    ["Is a listed vacancy still available?", "If a vacancy is still listed here, it is still accepting applications. We remove closed roles and adverts with expired closing dates. An open listing does not guarantee that every applicant will be interviewed or appointed."],
    ["Can I send a CV when no roles are advertised?", "Please do not email a CV when there are no advertised positions. Unsolicited CV emails will not be considered. Return to this page and apply against a role that matches your experience."],
    ["Where will I work?", "The site or area appears in the advert. Projects may involve travel, accommodation, shift work or rotation. Read those details before applying; client names may remain confidential until the appropriate recruitment stage."],
  ] },
  { label: "Qualifications & safety", items: [
    ["Do all roles require Level 3?", "No. The required level and certification scheme are specified for each vacancy. Level 3 supervision, a trade qualification and specialist inspection competence are different requirements; one does not replace the others."],
    ["What certificates should I have ready?", "Refer to the advert. Requirements may include a current rope-access certificate and logbook, a trade test, coded welding or NDT qualifications, rescue training and client-specific site clearance. State your relevant qualifications and validity in your CV."],
    ["Should I upload a medical report or ID?", "No. Submit only your CV in this form. Do not include identity documents, diagnoses or medical reports. If a role requires an occupational fitness certificate, verification will be arranged privately at the appropriate stage before mobilisation."],
    ["What if a certificate is about to expire?", "Be clear about its expiry date in your application. The recruitment team will assess it against the deployment dates and site requirements. Do not describe an expired qualification as current."],
  ] },
  { label: "Your application", items: [
    ["What should my cover letter include?", "Explain how you meet the advertised requirements, your relevant site and trade experience, your current rope-access level and when you can start. Specific evidence helps us assess your fit for the assignment."],
    ["Which CV format can I upload?", "One unencrypted PDF, up to 5 MB. Export your CV as a PDF rather than renaming a Word file. Avoid attaching additional certificates or medical documents at this stage."],
    ["How will the team contact me?", "Choose email, phone call or WhatsApp and provide accurate details. For WhatsApp, supply the number registered to your WhatsApp account, including the country code. Keep those channels available after applying."],
    ["What happens if my upload fails?", "Your application is only confirmed when a reference appears on screen. Check the file format, size and security check, then retry with the same details and PDF. If the role closes before acceptance, your CV will not be sent."],
  ] },
  { label: "Process & privacy", items: [
    ["How does Skyriders hire?", "Apply against a published vacancy, then the team reviews your suitability. Shortlisted candidates may have a conversation and a role-relevant practical or technical assessment. Appointment remains subject to verification, project requirements and the agreed employment terms."],
    ["Does the website keep my CV?", "No. The website processes your CV temporarily for a security check and email delivery to reception@ropeaccess.co.za. It does not save your CV or application in the website database. The email delivery provider and reception mailbox process and hold the email under their own retention arrangements."],
    ["How do I correct or withdraw my application?", "Use the Skyriders contact page and quote your application reference and vacancy reference. Do not attach another CV unless the recruitment team requests one. Requests about personal information are handled through the same channel."],
    ["Is applying a guarantee of work?", "No. An application is an expression of interest in a specific advertised vacancy. Site clearance, qualification verification, client needs and agreed terms must be completed before deployment."],
  ] },
];

export function CareersFaq() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const panelSlot = useRef<HTMLDivElement>(null);
  const previousHeight = useRef<number | null>(null);
  const animations = useRef<Animation[]>([]);

  function selectCategory(index: number) {
    if (index === active) return;
    previousHeight.current = panelSlot.current?.getBoundingClientRect().height ?? null;
    setActive(index);
  }

  useLayoutEffect(() => {
    const slot = panelSlot.current;
    const height = previousHeight.current;
    animations.current.forEach(animation => animation.cancel());
    animations.current = [];
    if (!slot || height === null || typeof slot.animate !== "function" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const nextHeight = slot.getBoundingClientRect().height;
    const panel = slot.querySelector<HTMLElement>("[role=tabpanel]:not([hidden])");
    animations.current.push(slot.animate([{ height: `${height}px` }, { height: `${nextHeight}px` }], {
      duration: 360, easing: "cubic-bezier(.22, 1, .36, 1)",
    }));
    if (panel) animations.current.push(panel.animate([
      { opacity: 0, transform: "translateY(10px)" }, { opacity: 1, transform: "translateY(0)" },
    ], { duration: 320, easing: "cubic-bezier(.22, 1, .36, 1)" }));
    previousHeight.current = null;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const settle = () => { if (preference.matches) animations.current.forEach(animation => animation.finish()); };
    const resized = () => animations.current.forEach(animation => animation.finish());
    preference.addEventListener("change", settle);
    window.addEventListener("resize", resized);
    return () => { preference.removeEventListener("change", settle); window.removeEventListener("resize", resized); animations.current.forEach(animation => animation.cancel()); };
  }, [active]);
  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (["ArrowRight", "ArrowDown"].includes(event.key)) next = (index + 1) % categories.length;
    else if (["ArrowLeft", "ArrowUp"].includes(event.key)) next = (index + categories.length - 1) % categories.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = categories.length - 1;
    else return;
    event.preventDefault(); selectCategory(next); tabs.current[next]?.focus();
  }
  return <section className={styles.section} aria-labelledby="careers-faq-heading">
    <p className={styles.eyebrow} data-reveal="left">Before you make your next move</p><h2 id="careers-faq-heading" data-type-reveal><span className="type-line">Good questions.</span><span className="type-line"><em>Clear answers.</em></span></h2>
    <div className={styles.faqLayout}>
      <div className={styles.tabs} role="tablist" aria-label="Careers FAQ categories" data-reveal="left">
        {categories.map((category, index) => <button key={category.label} type="button" role="tab" ref={element => { tabs.current[index] = element; }} id={`faq-tab-${index}`} aria-controls={`faq-panel-${index}`} aria-selected={active === index} tabIndex={active === index ? 0 : -1} onClick={() => selectCategory(index)} onKeyDown={event => navigate(event, index)}><span>0{index + 1}</span>{category.label}<span className={styles.tabArrow} aria-hidden="true">↗</span></button>)}
      </div>
      <div className={styles.faqSlot} ref={panelSlot}>
        {categories.map((category, index) => <div key={category.label} role="tabpanel" id={`faq-panel-${index}`} aria-labelledby={`faq-tab-${index}`} hidden={active !== index} className={styles.faqPanel} tabIndex={0}>
          <h3>{category.label}</h3>{category.items.map(([question, answer]) => <AnimatedDisclosure key={question} className={styles.faqItem} exclusive summary={<><span>{question}</span><span className={styles.faqToggle} aria-hidden="true">+</span></>} contentClassName={styles.faqAnswer}><p>{answer}</p></AnimatedDisclosure>)}
        </div>)}
      </div>
    </div>
  </section>;
}
