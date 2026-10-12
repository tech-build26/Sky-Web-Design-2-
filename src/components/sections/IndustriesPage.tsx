
import { SiteLink } from "../site/SiteLink";
import Image from "next/image";
import { industryDetails, type IndustryDetail } from "@/lib/industry-pages";
import { industries } from "@/lib/site-content";
import { Arrow, IndustryIcon } from "../site/Icons";
import { SiteHeader } from "../site/SiteHeader";
import styles from "./industries-page.module.css";

function IndustryHero() {
  return <section id="home" className={styles.hero} aria-labelledby="hero-heading">
    <div className={styles.heroStage}>
      <SiteHeader active="industries" />
      <div className={styles.heroLines} aria-hidden="true" />
      <div className={styles.heroCopy}>
        <div className={styles.breadcrumb} data-reveal="left"><SiteLink href="/home">Home</SiteLink><span>/</span><span>Industries</span></div>
        <p className={styles.eyebrow} data-reveal="left" data-delay="1">Industries we serve</p>
        <h1 id="hero-heading" tabIndex={-1} data-type-reveal><span className="type-line">Every asset has</span><span className="type-line">a different <em>challenge.</em></span></h1>
        <p className={styles.heroLead} data-reveal="bottom" data-delay="2">From the city skyline to the plant floor, we plan the right access for the structure, the work and the people around it.</p>
        <SiteLink className={styles.heroAction} href="#industry-index" data-reveal="bottom" data-delay="3">Explore the industries <Arrow /></SiteLink>
      </div>
      <div className={styles.heroPhoto} data-reveal="right" data-delay="1">
        <Image src="/images/industries/industries-bridge-access.webp" alt="Illustrative view of rope access technicians inspecting the underside of a concrete bridge." fill preload sizes="(max-width: 900px) 100vw, 53vw" />
        <span className={styles.heroPhotoCaption}>Specialist access / South Africa</span>
      </div>
      <div className={styles.heroFooter} aria-hidden="true"><span>01 — 05</span><span>Structures / systems / sites</span></div>
    </div>
  </section>;
}

function IndustryIndex() {
  return <nav id="industry-index" className={styles.index} aria-label="Industries on this page">
    <div className={styles.indexInner}>
      <div className={styles.indexHeading} data-reveal="fade"><p className={styles.eyebrow}>Find your environment</p><h2>Explore by <em>industry.</em></h2><p>Choose a sector to see the assets, priorities and specialist services that fit.</p></div>
      <div className={styles.indexGrid}>{industryDetails.map((detail, index) => {
        const icon = industries.find((industry) => industry.id === detail.id)?.icon ?? "building";
        return <SiteLink href={`#${detail.id}`} key={detail.id} data-reveal={index % 2 === 0 ? "bottom" : "top"} data-delay={index}>
          <span className={styles.indexTop}><span>0{index + 1}</span><Arrow /></span>
          <IndustryIcon name={icon} />
          <strong>{detail.title}</strong>
          <small>{detail.kicker}</small>
        </SiteLink>;
      })}</div>
    </div>
  </nav>;
}

function IndustrySection({ detail, number }: { detail: IndustryDetail; number: number }) {
  const direction = number % 2 === 0 ? "right" : "left";
  return <section id={detail.id} tabIndex={-1} className={styles.detail} data-tone={number % 2 === 0 ? "soft" : "light"} aria-labelledby={`${detail.id}-heading`}>
    <div className={styles.detailInner}>
      <div className={styles.photo} data-reveal={direction}>
        <Image src={detail.image} alt={detail.alt} fill sizes="(max-width: 900px) 100vw, 44vw" />
        <div className={styles.photoLabel} aria-hidden="true"><span>0{number}</span><small>/ 05</small></div>
      </div>
      <div className={styles.copy}>
        <p className={styles.eyebrow} data-reveal="left">0{number} / {detail.kicker}</p>
        <h2 id={`${detail.id}-heading`} data-type-reveal><span className="type-line">{detail.title}</span></h2>
        <p className={styles.lead} data-reveal="bottom">{detail.lead}</p>
        <p className={styles.body} data-reveal="bottom" data-delay="1">{detail.body}</p>
        <div className={styles.assetBlock} data-reveal="bottom" data-delay="2"><h3>Typical assets</h3><ul>{detail.assets.map((asset) => <li key={asset}>{asset}</li>)}</ul></div>
        <div className={styles.focusGrid}>{detail.focus.map((item, index) => <div key={item.title} data-reveal={index === 0 ? "left" : "right"} data-delay="2"><h3>{item.title}</h3><p>{item.copy}</p></div>)}</div>
        <div className={styles.serviceBlock} data-reveal="bottom" data-delay="3"><h3>Relevant services</h3><div>{detail.services.map((service) => <SiteLink href={service.href} key={service.title}>{service.title} <Arrow /></SiteLink>)}</div></div>
        <p className={styles.planning} data-reveal="bottom" data-delay="4"><strong>Planning focus</strong><span>{detail.planning}</span></p>
      </div>
    </div>
  </section>;
}

function Approach() {
  return <section className={styles.approach} aria-labelledby="approach-heading">
    <div className={styles.approachInner}>
      <div className={styles.approachHeading}><p className={styles.eyebrow} data-reveal="left">One working principle</p><h2 id="approach-heading" data-type-reveal><span className="type-line">The method follows</span><span className="type-line">the <em>asset.</em></span></h2><p data-reveal="bottom">Industry labels are a starting point. A useful plan starts with the actual structure, task and site controls.</p></div>
      <div className={styles.approachSteps}>
        <div data-reveal="bottom"><span>01</span><h3>Understand the brief</h3><p>Identify the asset, its condition, the workface and the evidence or outcome needed.</p></div>
        <div data-reveal="bottom" data-delay="1"><span>02</span><h3>Plan the access</h3><p>Consider rope access, platforms or remote inspection alongside permits, isolation and rescue needs.</p></div>
        <div data-reveal="bottom" data-delay="2"><span>03</span><h3>Deliver the work</h3><p>Carry out the agreed inspection or intervention and give the client clear findings for the next decision.</p></div>
      </div>
    </div>
  </section>;
}

export function IndustriesPage() {
  return <>
    <IndustryHero />
    <IndustryIndex />
    <div className={styles.details}>{industryDetails.map((detail, index) => <IndustrySection key={detail.id} detail={detail} number={index + 1} />)}</div>
    <Approach />
    <section className={styles.closing} aria-labelledby="industries-closing-heading"><div className={styles.closingInner}>
      <div><p className={styles.eyebrow} data-reveal="left">Your project, properly scoped</p><h2 id="industries-closing-heading" data-type-reveal><span className="type-line">Tell us what needs</span><span className="type-line">to be <em>reached.</em></span></h2><p data-reveal="bottom">Share the asset, location, photos or drawings, and any operating constraints. We’ll discuss the most useful next step.</p></div>
      <SiteLink href="/contact#project-enquiry" className={styles.closingAction} data-reveal="zoom">Start a project enquiry <Arrow /></SiteLink>
    </div></section>
  </>;
}
