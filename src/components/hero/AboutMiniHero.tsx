import Image from "next/image";
import { SiteHeader } from "../site/SiteHeader";
import { Arrow } from "../site/Icons";
import buttons from "../site/ActionButtons.module.css";
import styles from "./about-mini-hero.module.css";

export function AboutMiniHero() {
  return (
    <section id="home" className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.stage}>
        <SiteHeader />
        <svg className={styles.blueprint} viewBox="0 0 1672 660" preserveAspectRatio="none" aria-hidden="true">
          <g fill="none" stroke="#b9d6e9" strokeWidth="1" opacity=".65">
            <path d="M34 0v660M0 92h1672M0 603h1672M655 0 275 660M914 0 534 660M1350 0l-380 660" />
            <path d="M55 173h270M55 506h385M831 58v95M747 540h156" />
            <circle cx="780" cy="185" r="58" /><circle cx="780" cy="185" r="72" />
          </g>
          <path d="M115 0 0 115M573 660l118-118" fill="none" stroke="#0067e6" strokeWidth="1" opacity=".45" />
        </svg>

        <div className={styles.copy}>
          <p className={styles.eyebrow} data-reveal="left">Who we are <span aria-hidden="true" /></p>
          <h1 id="hero-heading" tabIndex={-1} data-type-reveal>
            <span className="type-line">Built for the</span>
            <span className="type-line">hard-to-<em>reach.</em></span>
          </h1>
          <p className={styles.description} data-reveal="left" data-delay="2">
            Rope access, inspection and maintenance expertise for South Africa&apos;s most demanding structures.
          </p>
          <div className={styles.action} data-reveal="left" data-delay="3">
            <a href="#assessment" className={buttons.skew}><span>Book a free assessment <Arrow /></span></a>
          </div>
          <p className={styles.caption} data-reveal="mask" data-delay="4">South African expertise <span>/</span> Since 1999</p>
        </div>

        <div className={styles.visual}>
          <div className={styles.primaryFrame} data-reveal="right" data-delay="1">
            <Image
              src="/images/hero/hero-sa-industrial-tower-02.webp"
              alt="Two rope-access technicians inspecting a concrete industrial tower in South Africa."
              fill
              preload
              sizes="(max-width: 800px) 100vw, 52vw"
              className={styles.primaryImage}
            />
          </div>
          <div className={styles.supportFrame} data-reveal="bottom" data-delay="3">
            <Image
              src="/images/hero/hero-support-team.webp"
              alt="Rope-access technicians maintaining a high-rise facade."
              fill
              sizes="(max-width: 800px) 40vw, 20vw"
              className={styles.supportImage}
            />
          </div>
          <svg className={styles.geometry} viewBox="0 0 820 660" preserveAspectRatio="none" aria-hidden="true">
            <path data-ambient="float" d="M42 494 209 660H358L156 467Z" fill="#d8ecfa" />
            <path data-ambient="float" d="M15 468 231 660h33L39 443Z" fill="#0067e6" />
            <path data-ambient="trace" d="M43 465 278 660M516 0 297 239" stroke="#5bcaff" strokeWidth="1.5" fill="none" />
          </svg>
        </div>
      </div>
    </section>
  );
}
