"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { services } from "@/lib/site-content";
import { Arrow } from "../site/Icons";
import styles from "./services.module.css";
import buttons from "../site/ActionButtons.module.css";

const upperServices = [services[1], services[4]];
const lowerServices = [services[2], services[0], services[3]];

function ServiceTile({ service, delay }: { service: (typeof services)[number]; delay: number }) {
  return <article id={service.id} tabIndex={-1} className={styles.serviceTile} data-reveal="bottom" data-delay={delay}>
    <p className={styles.tileLabel}>{service.label}</p>
    <h3>{service.title}</h3>
    <p className={styles.tileDescription}>{service.description}</p>
    <a href={service.href} aria-label={`Explore ${service.title.toLowerCase()}`}>Explore service <Arrow /></a>
  </article>;
}

export function Services() {
  const catalogue = useRef<HTMLDialogElement>(null);
  const [catalogueOpen, setCatalogueOpen] = useState(false);

  function openCatalogue() {
    catalogue.current?.showModal();
    setCatalogueOpen(true);
  }

  useEffect(() => {
    if (!catalogueOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [catalogueOpen]);

  return (
    <section id="services" tabIndex={-1} className={styles.services} aria-labelledby="services-heading">
      <div className={styles.photograph} data-reveal="zoom" aria-hidden="true">
        <Image src="/images/services/services-cooling-tower.webp" alt="" fill sizes="100vw" />
      </div>
      <div className={styles.stage}>
        <div className={styles.topRow}>
          <div className={styles.sectionIntro}>
            <p className={`${styles.eyebrow} type-label`} data-reveal="left">Our expertise</p>
            <div className={styles.copy}>
              <h2 id="services-heading" data-type-reveal><span className={`${styles.headingLead} type-line`}>Expertise at</span>{" "}<span className="type-line"><em>every</em>{" "}<span className={styles.elevation}>elevation.</span></span></h2>
              <p className={styles.intro} data-reveal data-delay="2">When access is the challenge, experience is the solution. Explore what we can do for your structure.</p>
            </div>
          </div>
          {upperServices.map((service, index) => <ServiceTile key={service.id} service={service} delay={index + 1} />)}
        </div>
        <div className={styles.serviceGrid} aria-label="Featured services">
          {lowerServices.map((service, index) => <ServiceTile key={service.id} service={service} delay={index + 1} />)}
        </div>
        <div className={styles.exploreArea} data-reveal data-delay="3">
          <button type="button" className={buttons.service} onClick={openCatalogue} aria-haspopup="dialog" aria-controls="services-catalogue">
            <span>Explore all services</span><span className={buttons.serviceArrow}><Arrow /></span>
          </button>
        </div>
      </div>

      <dialog ref={catalogue} id="services-catalogue" className={styles.catalogue} aria-labelledby="services-catalogue-heading" onClose={() => setCatalogueOpen(false)} onClick={(event) => { if (event.target === event.currentTarget) catalogue.current?.close(); }}>
        <div className={styles.cataloguePanel}>
          <div className={styles.catalogueHeader}>
            <div><p className={styles.eyebrow}>Our capabilities</p><h2 id="services-catalogue-heading">More ways to<br /><span>reach further.</span></h2></div>
            <button type="button" className={styles.close} aria-label="Close all services" autoFocus onClick={() => catalogue.current?.close()}><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" stroke="currentColor" strokeWidth="1.5" /></svg></button>
          </div>
          <div className={styles.catalogueList}>
            {services.map((service, index) => <article key={service.id} style={{ animationDelay: `${index * 90}ms` }}>
              <span className={styles.catalogueNumber}>0{index + 1}</span>
              <div><p className={styles.catalogueLabel}>{service.label}</p><h3>{service.title}</h3><p>{service.description}</p></div>
              <a href={service.href} aria-label={`Explore ${service.title.toLowerCase()}`} onClick={() => catalogue.current?.close()}><Arrow /></a>
            </article>)}
          </div>
          <a href="#contact" className={styles.catalogueContact} onClick={() => catalogue.current?.close()}>Have a structure in mind? Let’s talk. <Arrow /></a>
        </div>
      </dialog>
    </section>
  );
}
