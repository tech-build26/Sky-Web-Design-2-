import Image from "next/image";
import { Arrow } from "../site/Icons";
import styles from "./safety-quality.module.css";
import buttons from "../site/ActionButtons.module.css";

const artwork = "/images/safety/safety-quality-artwork.webp";
const steps = [
  { title: "Understand", subtitle: "Start with the site.", description: "Define the structure, work scope and environment before choosing the access approach." },
  { title: "Prepare", subtitle: "Plan the work.", description: "Discuss access, task requirements and rescue standby needs with the project team." },
  { title: "Assess", subtitle: "Get useful information.", description: "Choose suitable inspection and testing methods to support maintenance and repair decisions." },
] as const;

export function SafetyQuality() {
  return (
    <section id="safety" tabIndex={-1} className={styles.safety} aria-labelledby="safety-heading">
      <div className={styles.stage}>
        <div className={styles.referenceArt} data-reveal="right">
          <Image src={artwork} alt="Rope-access technician inspecting an industrial concrete tower, wearing a helmet and safety harness." fill sizes="(min-width: 1840px) 1840px, 100vw" unoptimized />
          <p className={styles.captionTop} data-reveal="mask" data-delay="3"><span>Safety builds</span><strong>confidence.</strong><span>Quality builds</span><strong>trust.</strong></p>
          <p className={styles.captionBottom} data-reveal="mask" data-delay="4"><span>Safe people.</span><span>Quality work.</span><em>Lasting results.</em></p>
        </div>

        <svg className={styles.paper} viewBox="0 0 1778 885" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="safety-paper" x1="0" y1="0" x2="1000" y2="885" gradientUnits="userSpaceOnUse">
              <stop stopColor="#f7fbff" /><stop offset=".45" stopColor="#f8fcff" /><stop offset="1" stopColor="#f3f9ff" />
            </linearGradient>
          </defs>
          <path d="M0 0H1029L863 394H944L977 430H1184L1355 751L1276 885H0Z" fill="url(#safety-paper)" />
          <g data-ambient="trace" fill="none" stroke="#d5e6f5" strokeWidth="1" opacity=".85">
            <path d="M40 0V885M0 86H993M0 394H863M893 0 740 394M0 822H1312M1086 820 1052 885" />
            <path d="m462 451 84 231m277-231 83 231" />
          </g>
          <g data-ambient="pulse" fill="#0085ff"><circle cx="507" cy="574" r="2" /><circle cx="867" cy="574" r="2" /></g>
          <circle cx="1086" cy="822" r="1.6" fill="#a6c5df" />
        </svg>

        <div className={styles.copy}>
          <p className={`${styles.eyebrow} type-label`} data-reveal="left">Safety &amp; quality<span aria-hidden="true" /></p>
          <h2 id="safety-heading" data-type-reveal><span className="type-line">Careful planning.</span>{" "}<span className="type-line">Considered execution.</span></h2>
          <p className={styles.intro} data-reveal data-delay="2">The access method is one part of the job. The environment, task<br className={styles.desktopBreak} /> and rescue arrangements belong in the plan from the start.</p>
        </div>

        <ol className={styles.steps} aria-label="Our planning process">
          {steps.map((step, index) => (
            <li key={step.title} className={styles.step} data-reveal="bottom" data-delay={index + 1}>
              <div className={`${styles.icon} ${styles[`icon${index}`]}`} aria-hidden="true">
                <Image src={artwork} alt="" width={1778} height={885} unoptimized />
              </div>
              <div className={styles.stepCopy}>
                <p className={styles.stepNumber}>0{index + 1}<span aria-hidden="true"> /</span></p>
                <h3>{step.title}</h3>
                <p className={styles.subtitle}>{step.subtitle}</p>
                <p className={styles.description}>{step.description}</p>
                <span className={styles.stepRule} aria-hidden="true" />
              </div>
            </li>
          ))}
        </ol>

        <div className={styles.contact} data-reveal data-delay="3">
          <a href="#contact" className={buttons.expanding} aria-label="Talk through your site requirements" title="Talk through your site requirements">
            <span className={buttons.sign} aria-hidden="true"><Arrow /></span>
            <span className={buttons.expandingText}>Talk through your site requirements</span>
          </a>
        </div>
      </div>
    </section>
  );
}
