import Image from "next/image";
import { heroServiceTiles } from "@/lib/site-content";
import { heroGeometry } from "@/lib/hero-geometry";
import { Arrow } from "../site/Icons";
import styles from "./hero.module.css";

export function HeroServices() {
  return (
    <section className={styles.servicesPanel} aria-labelledby="hero-services-heading">
      <svg className={styles.servicesShape} viewBox="-14 0 882 234" preserveAspectRatio="none" aria-hidden="true"><path d={heroGeometry.servicePanel} fill="#f9fcff" stroke="#d7e7f4" strokeWidth="1" /></svg>
      <div className={styles.servicesContent}>
        <div className={styles.servicesHeader}>
          <h2 id="hero-services-heading">Our Services</h2>
          <a href="#services">View all <Arrow /></a>
        </div>
        <div className={styles.serviceTiles}>
          {heroServiceTiles.map((tile) => <a key={tile.href} href={tile.href} className={styles.serviceTile}>
            <div className={styles.tileImage}><Image src={tile.image} alt="" fill sizes="(max-width: 560px) 90vw, (max-width: 900px) 30vw, 16vw" /></div>
            <div className={styles.tileLabel}><span>{tile.title[0]}<br />{tile.title[1]}</span><span className={styles.tileArrow}><Arrow /></span></div>
          </a>)}
        </div>
      </div>
    </section>
  );
}
