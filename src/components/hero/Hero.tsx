import Image from "next/image";
import { useId } from "react";
import { industries } from "@/lib/site-content";
import { SiteHeader } from "../site/SiteHeader";
import { Arrow, IndustryIcon } from "../site/Icons";
import { HeroCurves } from "./HeroCurves";
import { HeroMedia } from "./HeroMedia";
import { HeroServices } from "./HeroServices";
import { SkyIBadge } from "./SkyIBadge";
import styles from "./hero.module.css";

export function Hero() {
  const prefix = `hero-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  return (
    <section id="home" className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.stage}>
        <HeroCurves prefix={prefix} />
        <SiteHeader />
        <HeroMedia prefix={prefix} />
        <div className={styles.intro}>
          <p className={styles.eyebrow}>People <span>/</span> Access <span>/</span> Higher standards<i aria-hidden="true" /></p>
          <h1 id="hero-heading" tabIndex={-1} className={styles.headline} data-type-reveal><span className="type-line">Access</span>{" "}<span className={`${styles.blueWord} type-line`}>Beyond</span>{" "}<span className="type-line">Limits</span></h1>
          <p className={styles.description}>Rope access, inspections and maintenance<br className={styles.desktopBreak} /> for the world’s most demanding structures.</p>
          <a className={`button ${styles.primaryCta}`} href="#services">How we help <Arrow /></a>
        </div>
        <p className={styles.specialist}>Specialist<br />access solutions<br />for South Africa’s<br />toughest environments</p>
        <p className={styles.rightCaption}>Difficult<br />places<br />demand<br />a higher<br />standard</p>
        <div className={styles.supportingWindows}>
          <a href="#inspection-ndt" className={`${styles.supportWindow} ${styles.inspectionWindow}`} aria-label="Explore inspection and NDT">
            <div style={{ clipPath: `url(#${prefix}-support)` }}><Image src="/images/hero/hero-support-inspection.webp" alt="" fill sizes="(max-width: 900px) 42vw, 16vw" /><span><Arrow /></span></div>
          </a>
          <a href="#sky-i" className={`${styles.supportWindow} ${styles.droneWindow}`} aria-label="Explore Sky I drone inspection">
            <div style={{ clipPath: `url(#${prefix}-support)` }}><Image src="/images/hero/hero-support-drone.webp" alt="" fill sizes="(max-width: 900px) 42vw, 16vw" /><span><Arrow /></span></div>
          </a>
        </div>
        <HeroServices />
        <div className={styles.industryStrip}>
          <span className={styles.industryIntro}>Trusted across<br />key industries</span>
          {industries.map((industry) => <a key={industry.title} href="#industries" aria-label={`Explore ${industry.title.toLowerCase()}`}>
            <IndustryIcon name={industry.icon} /><span>{industry.short[0]}<br />{industry.short[1]}</span>
          </a>)}
        </div>
        <SkyIBadge />
        <p className={styles.divisionCaption}>Innovation<br />precision<br />access<br />a higher<br />tomorrow</p>
      </div>
    </section>
  );
}
