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
      <p className={styles.eyebrow}>Industries we serve</p><h2 id="industries-heading">Different structures.<br />The same attention to detail.</h2>
      <div className={styles.industryGrid} data-reveal>{industries.map((industry) => <div key={industry.title}><IndustryIcon name={industry.icon} /><h3>{industry.title}</h3></div>)}</div>
    </section>
    <SkyIDivision />
    <Contact />
  </>;
}
