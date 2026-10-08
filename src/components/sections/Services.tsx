"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { services } from "@/lib/site-content";
import { Arrow } from "../site/Icons";
import styles from "./services.module.css";

const featuredServices = [services[2], services[0], services[3]];
const additionalServices = services.filter((service) => !featuredServices.some((featured) => featured.id === service.id));

export function Services() {
  const catalogue = useRef<HTMLDialogElement>(null);
  const [catalogueOpen, setCatalogueOpen] = useState(false);

  function openCatalogue() {
    catalogue.current?.showModal();
    setCatalogueOpen(true);
  }

  useEffect(() => {
    function syncDestination() {
      const id = window.location.hash.slice(1);
      if (additionalServices.some((service) => service.id === id)) openCatalogue();
    }
    syncDestination();
    window.addEventListener("hashchange", syncDestination);
    return () => window.removeEventListener("hashchange", syncDestination);
  }, []);

  useEffect(() => {
    if (!catalogueOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [catalogueOpen]);

  return (
    <section id="services" tabIndex={-1} className={styles.services} aria-labelledby="services-heading">
      <div className={styles.photograph} aria-hidden="true">
        <Image src="/images/services/services-cooling-tower.webp" alt="" fill sizes="100vw" />
      </div>
      <div className={styles.stage}>
        <p className={styles.eyebrow}>Our services</p>
        <div className={styles.copy} data-reveal>
          <h2 id="services-heading">Expertise at<br /><span>every elevation.</span></h2>
          <p className={styles.intro}>When access is the challenge, experience is the solution. Explore what we can do for your structure.</p>
        </div>
        <div className={styles.serviceGrid} aria-label="Featured services">
          {featuredServices.map((service) => (
            <article key={service.id} id={service.id} tabIndex={-1} className={styles.serviceTile} data-reveal>
              <p className={styles.tileLabel}>{service.label}</p>
              <h3>{service.title}</h3>
              <p className={styles.tileDescription}>{service.description}</p>
              <a href="#contact" aria-label={`Discuss ${service.title.toLowerCase()}`}>Discuss your project <Arrow /></a>
            </article>
          ))}
        </div>
        <div className={styles.exploreArea}>
          <button type="button" className={styles.explore} onClick={openCatalogue} aria-haspopup="dialog" aria-controls="services-catalogue">
            Explore all services <Arrow />
          </button>
        </div>
      </div>

      {additionalServices.map((service) => <span key={service.id} id={service.id} className={styles.destination} aria-hidden="true" />)}

      <dialog ref={catalogue} id="services-catalogue" className={styles.catalogue} aria-labelledby="services-catalogue-heading" onClose={() => setCatalogueOpen(false)} onClick={(event) => { if (event.target === event.currentTarget) catalogue.current?.close(); }}>
        <div className={styles.cataloguePanel}>
          <div className={styles.catalogueHeader}>
            <div><p className={styles.eyebrow}>Our capabilities</p><h2 id="services-catalogue-heading">More ways to<br /><span>reach further.</span></h2></div>
            <button type="button" className={styles.close} aria-label="Close all services" autoFocus onClick={() => catalogue.current?.close()}><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" stroke="currentColor" strokeWidth="1.5" /></svg></button>
          </div>
          <div className={styles.catalogueList}>
            {services.map((service, index) => <article key={service.id}>
              <span className={styles.catalogueNumber}>0{index + 1}</span>
              <div><p className={styles.catalogueLabel}>{service.label}</p><h3>{service.title}</h3><p>{service.description}</p></div>
              <a href="#contact" aria-label={`Discuss ${service.title.toLowerCase()}`} onClick={() => catalogue.current?.close()}><Arrow /></a>
            </article>)}
          </div>
          <a href="#contact" className={styles.catalogueContact} onClick={() => catalogue.current?.close()}>Have a structure in mind? Let’s talk. <Arrow /></a>
        </div>
      </dialog>
    </section>
  );
}
