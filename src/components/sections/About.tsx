import Image from "next/image";
import { Arrow } from "../site/Icons";
import styles from "./about.module.css";
import buttons from "../site/ActionButtons.module.css";

// Coordinates are traced from the 2048 × 1143 reference, then mirrored in x.
// The photographs and text themselves are never flipped.
function AboutArtwork() {
  return (
    <div className={styles.artwork}>
      <div className={styles.backdrop} data-reveal="left" aria-hidden="true">
        <Image src="/images/hero/hero-support-team.webp" alt="" fill sizes="(max-width: 700px) 70vw, 34vw" />
        <Image src="/images/hero/hero-sa-urban-facade-01.webp" alt="" fill sizes="(max-width: 700px) 70vw, 34vw" />
        <Image src="/images/hero/hero-sa-steel-structure-03.webp" alt="" fill sizes="(max-width: 700px) 70vw, 34vw" />
      </div>
      <svg className={styles.geometry} viewBox="0 0 1094 1143" fill="none" aria-hidden="true">
        <path data-reveal="top" data-delay="1" data-ambient="float" d="M789 233H855L913 442H848Z" fill="#0076D7" />
        <path data-reveal="bottom" data-delay="2" data-ambient="float" d="M245 358H320L449 862L402 892Z" fill="#0076D7" />
        <path data-reveal="right" data-delay="3" data-ambient="float" d="M807 504H912L948 641H844Z" fill="#A7B2BF" />
        <path data-reveal="left" data-delay="4" data-ambient="float" d="M516 910H811L823 937H533Z" fill="#99A9BB" />
        <g stroke="#8BA4B9" strokeWidth="1" strokeDasharray="3 3" opacity=".75">
          <path d="M558 123H863M808 213H975M938 179V809M821 89L1068 1013M880 954H1083M973 986V1040" />
          <circle data-ambient="pulse" cx="973" cy="906" r="100" />
        </g>
      </svg>
      <div className={styles.mainPhoto} data-reveal="left" data-delay="1">
        <Image src="/images/about/about-concrete-rope-access.webp" alt="Rope-access technician in navy coveralls inspecting a concrete viaduct pillar." fill sizes="(max-width: 700px) 70vw, 34vw" />
      </div>
      <div className={styles.insetFrame} data-reveal="right" data-delay="3">
        <div className={styles.insetPhoto}><Image src="/images/about/about-johannesburg-facade.webp" alt="Rope-access technician working on a glass facade above Johannesburg." fill sizes="(max-width: 700px) 30vw, 16vw" /></div>
      </div>
      <div className={styles.since} data-reveal="zoom" data-delay="4"><span>Since</span><strong>1999</strong></div>
    </div>
  );
}

export function About() {
  return (
    <section id="about" tabIndex={-1} className={styles.about} aria-labelledby="about-heading">
      <div className={styles.stage}>
        <AboutArtwork />
        <div className={styles.copy}>
          <p className={`${styles.eyebrow} type-label`} data-reveal="left">Who we are</p>
          <h2 id="about-heading" data-type-reveal><span className="type-line">Skyriders Access</span>{" "}<span className="type-line">Specialists.</span></h2>
          <p className={styles.statement} data-type-reveal data-delay="1"><span className="type-line">Expertise where <em>access</em></span>{" "}<span className="type-line">is the challenge.</span></p>
          <div className={styles.body} data-reveal data-delay="2">
            <p>Since 1999, Skyriders has brought rope access, inspection and maintenance expertise to demanding industrial environments in South Africa.</p>
            <p>From concrete and steel structures to high-rise facades and confined spaces, the work starts with understanding the site and choosing an appropriate access solution.</p>
          </div>
          <div className={styles.explore} data-reveal data-delay="3">
            <a href="#services" className={buttons.skew}><span>Explore <Arrow /></span></a>
          </div>
        </div>
      </div>
    </section>
  );
}
