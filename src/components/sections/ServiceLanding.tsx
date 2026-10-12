import Image from "next/image";
import { services } from "@/lib/site-content";
import { servicePages, type ServiceDetail } from "@/lib/service-pages";
import { Arrow } from "../site/Icons";
import { SiteHeader } from "../site/SiteHeader";
import styles from "./service-landing.module.css";

type PageKey = keyof typeof servicePages;

function ServiceSection({ service, number }: { service: ServiceDetail; number: number }) {
  return <section id={service.id} tabIndex={-1} className={styles.serviceSection} aria-labelledby={`${service.id}-heading`}>
    <div className={styles.sectionInner}>
      <div className={styles.sectionPhoto} data-reveal={number % 2 === 0 ? "left" : "right"}>
        <Image src={service.image} alt={service.alt} fill sizes="(max-width: 860px) 100vw, 48vw" />
        <span className={styles.photoNumber} aria-hidden="true">0{number}</span>
      </div>
      <div className={styles.sectionCopy}>
        <p className={styles.eyebrow} data-reveal="left">0{number} / {service.kicker}</p>
        <h2 id={`${service.id}-heading`} data-type-reveal><span className="type-line">{service.title}</span></h2>
        <p className={styles.lead} data-reveal="bottom">{service.lead}</p>
        <p className={styles.body} data-reveal="bottom" data-delay="1">{service.body}</p>
        <div className={styles.capabilityBlock} data-reveal="bottom" data-delay="2">
          <h3>What we can do</h3>
          <ul>{service.capabilities.map((capability) => <li key={capability}>{capability}</li>)}</ul>
        </div>
        {service.spotlight && <div id={service.spotlight.id} className={styles.spotlight} data-reveal="bottom" data-delay="2"><span>Specialist application</span><h3>{service.spotlight.title}</h3><p>{service.spotlight.body}</p></div>}
        <div className={styles.application} data-reveal="bottom" data-delay="3"><span>Where it fits</span><p>{service.applications}</p></div>
        <a className={styles.sectionLink} href={`/contact?service=${encodeURIComponent(service.enquiryService)}#project-enquiry`} data-reveal="bottom" data-delay="4">Discuss this service <Arrow /></a>
      </div>
    </div>
  </section>;
}

function ServiceIndex() {
  return <nav id="service-index" className={styles.index} aria-label="All Skyriders services">
    <div className={styles.indexInner}>
      <div className={styles.indexIntro} data-reveal="left"><p className={styles.eyebrow}>Explore the expertise</p><h2>Find your <em>service.</em></h2><p>Choose a service to land directly at the right section.</p></div>
      <div className={styles.indexGroups}>
        <div data-reveal="bottom"><p className={styles.groupLabel}>01 / Structures &amp; access</p>{services.slice(0, 3).map((service, index) => <a href={service.href} key={service.id}><span>0{index + 1}</span>{service.title}<Arrow /></a>)}<a href="/services/inspection-concrete-access#netting"><span>03a</span>Netting systems<Arrow /></a></div>
        <div data-reveal="bottom" data-delay="1"><p className={styles.groupLabel}>02 / Operations &amp; insight</p>{services.slice(3).map((service, index) => <a href={service.href} key={service.id}><span>0{index + 4}</span>{service.title}<Arrow /></a>)}</div>
      </div>
    </div>
  </nav>;
}

export function ServiceLanding({ pageKey }: { pageKey: PageKey }) {
  const page = servicePages[pageKey];
  const other = servicePages[pageKey === "structures" ? "operations" : "structures"];
  const [first, ...rest] = page.title.split(page.accent);
  return <>
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.heroStage}>
        <SiteHeader active="services" />
        <svg className={styles.blueprint} viewBox="0 0 1672 520" preserveAspectRatio="none" aria-hidden="true"><g fill="none" stroke="#a9cde8" opacity=".6"><path d="M0 108h1672M0 476h1672M395 0 90 520M814 0 509 520M1270 0 965 520"/><circle cx="790" cy="290" r="68"/><circle cx="790" cy="290" r="86"/></g><path d="M615 0 310 520M1390 0 1085 520" fill="none" stroke="#1488eb" opacity=".6"/></svg>
        <div className={styles.heroCopy}>
          <div className={styles.breadcrumb} data-reveal="left"><a href="/home">Home</a><span>/</span><span>Services</span></div>
          <p className={styles.eyebrow} data-reveal="left">{page.eyebrow}</p>
          <h1 id="hero-heading" tabIndex={-1} data-type-reveal><span className="type-line">{first}</span><span className="type-line"><em>{page.accent}</em>{rest.join(page.accent)}</span></h1>
          <p data-reveal="left" data-delay="2">{page.intro}</p>
          <a className={styles.heroAction} href={`#${page.services[0].id}`} data-reveal="left" data-delay="3">Explore these services <Arrow /></a>
        </div>
        <div className={styles.heroGallery} aria-label="Service photography">
          {page.services.map((service, index) => <div className={styles.heroPanel} key={service.id} data-reveal="right" data-delay={index + 1}><Image src={service.image} alt="" fill preload={index === 0} sizes="(max-width: 800px) 33vw, 20vw" /><span>0{index + 1} / {service.title}</span></div>)}
        </div>
      </div>
    </section>
    <ServiceIndex />
    <div className={styles.servicesBody}>{page.services.map((service, index) => <ServiceSection key={service.id} service={service} number={index + 1} />)}</div>
    <section className={styles.closing} aria-labelledby="service-closing-heading"><div className={styles.closingInner}>
      <div data-reveal="left"><p className={styles.eyebrow}>The next move</p><h2 id="service-closing-heading">Start with the <em>right conversation.</em></h2><p>Tell us about the asset, the work area and the outcome you need. We&apos;ll help define the next step.</p></div>
      <div className={styles.closingActions} data-reveal="right"><a href="/contact#project-enquiry">Plan your project <Arrow /></a><a href={`${other.path}#service-index`}>Explore the other services <Arrow /></a></div>
    </div></section>
  </>;
}
