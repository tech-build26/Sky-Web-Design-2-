import type { Metadata } from "next";
import Image from "next/image";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ScrollToTop } from "@/components/site/ScrollToTop";
import { ScrollReveals } from "@/components/site/ScrollReveals";
import { RopeTechnician } from "@/components/site/RopeTechnician";
import { Arrow } from "@/components/site/Icons";
import { CareersFaq } from "@/components/careers/CareersFaq";
import { VacancyBoard } from "@/components/careers/VacancyBoard";
import { listVacancies } from "@/lib/careers-server";
import styles from "@/components/careers/careers.module.css";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Careers at Skyriders | Your next assignment",
  description: "Explore current Skyriders rope access, trade and project vacancies. Read the site requirements and apply with a PDF CV for an advertised role.",
  alternates: { canonical: "/careers" },
  openGraph: { title: "Careers at Skyriders | Your next assignment", description: "Skilled people. Demanding sites. Find your next assignment with Skyriders.", url: "/careers", images: [{ url: "/images/hero/hero-sa-steel-structure-03.webp", width: 1672, height: 941, alt: "Technicians working at an industrial steel structure" }] },
};
const steps = [
  ["Apply", "Find a role that fits and send us your application. We review every single one."],
  ["Chat", "A quick conversation to get to know each other and see if there’s a mutual fit."],
  ["Prove It", "A short practical task or technical assessment relevant to the role you applied for."],
  ["Level Up", "Welcome to the team. Onboarding, gear, and your first assignment await."],
];
export default async function CareersPage() {
  const board = await listVacancies();
  const accepting = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.CAREERS_RATE_LIMIT_SECRET && process.env.RESEND_API_KEY && process.env.CAREERS_FROM_EMAIL && process.env.CV_SCANNER_URL && process.env.CV_SCANNER_TOKEN && process.env.TURNSTILE_SECRET_KEY && process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && process.env.SITE_URL);
  return <>
    <ScrollReveals /><RopeTechnician />
    <main id="main">
      <section className={styles.hero} aria-labelledby="hero-heading">
        <div className={styles.heroStage}>
          <SiteHeader active="careers" />
          <div className={styles.heroImage} aria-hidden="true"><Image src="/images/hero/hero-sa-steel-structure-03.webp" alt="" fill sizes="(max-width: 900px) 100vw, (max-width: 1840px) 54vw, 994px" preload /></div>
          <svg className={styles.heroBlueprint} viewBox="0 0 1840 690" preserveAspectRatio="none" aria-hidden="true"><g fill="none" stroke="#8fbde2" opacity=".36"><path d="M0 128h1840M0 600h1840M660 0 330 690M1090 0 760 690" /><circle cx="670" cy="490" r="90" /><circle cx="670" cy="490" r="110" /></g><path data-ambient="trace" d="M520 0 190 690M940 0 610 690" fill="none" stroke="#168cf0" opacity=".32" /></svg>
          <div className={styles.heroInner}>
            <p className={styles.eyebrow} data-reveal="left">Skyriders / Careers / Built on competence</p>
            <h1 id="hero-heading" tabIndex={-1} data-type-reveal><span className="type-line">Good people.</span><span className="type-line">Higher <em>standards.</em></span></h1>
            <p className={styles.lead} data-reveal="left" data-delay="2">Big sites need capable teams. Bring your trade, your training and your respect for the work. We’ll bring the next challenge.</p>
            <div data-reveal="bottom" data-delay="3"><a className={styles.heroAction} href="#open-roles" data-button>Find your next assignment <Arrow /></a></div>
            <p className={styles.heroCaption} data-reveal="right" data-delay="3">Different projects.<br />One commitment to safe delivery.</p>
          </div>
        </div>
      </section>
      <div className={styles.strip}><div data-reveal="bottom"><span>01</span><div><strong>Skills that travel.</strong><p>Trade expertise, backed by access competence.</p></div></div><div data-reveal="bottom" data-delay="1"><span>02</span><div><strong>Projects with purpose.</strong><p>Temporary, fixed-term and permanent roles when advertised.</p></div></div><div data-reveal="bottom" data-delay="2"><span>03</span><div><strong>Safety before speed.</strong><p>Clear requirements. Proper site readiness.</p></div></div></div>
      <VacancyBoard {...board} accepting={accepting} siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""} />
      <section id="hiring-process" className={styles.hiring} aria-labelledby="hiring-heading"><p className={styles.eyebrow} data-reveal="left">02 / How we hire</p><h2 id="hiring-heading" data-type-reveal><span className="type-line">From first contact</span><span className="type-line">to <em>first assignment.</em></span></h2><div className={styles.steps}>{steps.map(([title, copy], index) => <div key={title} className={styles.step} data-reveal="bottom" data-delay={index}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></div>)}</div></section>
      <CareersFaq />
    </main>
    <SiteFooter /><ScrollToTop />
  </>;
}
