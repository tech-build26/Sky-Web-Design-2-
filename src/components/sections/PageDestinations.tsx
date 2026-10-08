import { industries } from "@/lib/site-content";
import { IndustryIcon } from "../site/Icons";
import styles from "./sections.module.css";
import { About } from "./About";
import { Services } from "./Services";
import { SafetyQuality } from "./SafetyQuality";
import { SkyIDivision } from "./SkyIDivision";
import { Contact } from "./Contact";

export function PageDestinations() {
  return <>
    <About />
    <Services />
    <SafetyQuality />
    <section id="industries" tabIndex={-1} className={`${styles.section} ${styles.industries}`} aria-labelledby="industries-heading">
      <p className={`${styles.eyebrow} type-label`} data-reveal="left">Industries we serve</p><h2 id="industries-heading" data-type-reveal><span className="type-line">Different structures.</span>{" "}<span className="type-line">The same <em>attention</em> to detail.</span></h2>
      <div className={styles.industryGrid}>{industries.map((industry, index) => <div key={industry.title} data-reveal="bottom" data-delay={index}><IndustryIcon name={industry.icon} /><h3>{industry.title}</h3></div>)}</div>
    </section>
    <SkyIDivision />
    <Contact />
  </>;
}
