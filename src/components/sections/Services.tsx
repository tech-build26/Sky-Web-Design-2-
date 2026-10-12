
import { SiteLink } from "../site/SiteLink";
import Image from "next/image";
import { services } from "@/lib/site-content";
import { Arrow } from "../site/Icons";
import styles from "./services.module.css";
import { ServicesCatalogue } from "./ServicesCatalogue";

const upperServices = [services[1], services[4]];
const lowerServices = [services[2], services[0], services[3]];

function ServiceTile({ service, delay }: { service: (typeof services)[number]; delay: number }) {
  return <article id={service.id} tabIndex={-1} className={styles.serviceTile} data-reveal="bottom" data-delay={delay}>
    <p className={styles.tileLabel}>{service.label}</p>
    <h3>{service.title}</h3>
    <p className={styles.tileDescription}>{service.description}</p>
    <SiteLink href={service.href} aria-label={`Explore ${service.title.toLowerCase()}`}>Explore service <Arrow /></SiteLink>
  </article>;
}

export function Services() {
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
          <ServicesCatalogue />
        </div>
      </div>

    </section>
  );
}
