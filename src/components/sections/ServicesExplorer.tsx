"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import { servicePages } from "@/lib/service-pages";
import { services } from "@/lib/site-content";
import { Arrow } from "../site/Icons";
import styles from "./services-catalogue.module.css";

const details = [...servicePages.structures.services, ...servicePages.operations.services];

export default function ServicesExplorer({ onNavigate }: { onNavigate: () => void }) {
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const detail = details[selected];
  const service = services[selected];

  function choose(index: number) {
    setSelected(index);
  }

  function navigateTabs(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next = event.key === "ArrowDown" || event.key === "ArrowRight" ? (index + 1) % services.length
      : event.key === "ArrowUp" || event.key === "ArrowLeft" ? (index + services.length - 1) % services.length
      : event.key === "Home" ? 0 : event.key === "End" ? services.length - 1 : null;
    if (next === null) return;
    event.preventDefault();
    choose(next);
    tabs.current[next]?.focus({ preventScroll: true });
  }

  return <div className={styles.explorer}>
    <div className={styles.choices}>
      <p className={styles.chooseLabel}>Choose your challenge</p>
      <div className={styles.tabs} role="tablist" aria-label="Explore specialist services" aria-orientation="vertical">
        {services.map((item, index) => <button key={item.id} ref={element => { tabs.current[index] = element; }} type="button" role="tab"
          id={`capability-tab-${item.id}`} aria-selected={selected === index} aria-controls="capability-preview" tabIndex={selected === index ? 0 : -1}
          onClick={() => choose(index)} onKeyDown={event => navigateTabs(event, index)}>
          <span className={styles.number}>0{index + 1}</span><span><small>{item.label}</small><strong>{item.title}</strong></span><Arrow />
        </button>)}
      </div>
      <p className={styles.choiceNote}>From understanding the asset to reaching the work.</p>
    </div>
    <section id="capability-preview" role="tabpanel" aria-labelledby={`capability-tab-${service.id}`} tabIndex={0} className={styles.preview}>
      <div key={detail.id} className={styles.previewContent}>
        <div className={styles.photo}>
          <Image src={detail.image} alt={detail.alt} fill sizes="(max-width: 760px) 90vw, 700px" loading="eager" />
          <div className={styles.photoCaption}><span>0{selected + 1} / 06</span><span>{selected < 3 ? "Structures & access" : "Operations & insight"}</span></div>
        </div>
        <div className={styles.detail}>
          <p className={styles.eyebrow}>{detail.kicker}</p><h3>{detail.title}</h3><p className={styles.lead}>{detail.lead}</p>
          <ul className={styles.capabilities}>{detail.capabilities.slice(0, 3).map(capability => <li key={capability}>{capability}</li>)}</ul>
          <div className={styles.actions}><Link href={service.href} onClick={onNavigate}>Explore this service <Arrow /></Link><Link href={`/contact?service=${encodeURIComponent(detail.enquiryService)}#project-enquiry`} onClick={onNavigate}>Discuss your project <Arrow /></Link></div>
          {detail.id === "installations" && <Link className={styles.specialist} href="/services/inspection-concrete-access#netting" onClick={onNavigate}>Also explore: specialist netting systems <Arrow /></Link>}
        </div>
      </div>
    </section>
  </div>;
}
