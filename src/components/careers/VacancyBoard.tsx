"use client";

import { useRef, useState } from "react";
import type { Vacancy } from "@/lib/careers";
import { ApplicationForm } from "./ApplicationForm";
import { VacancyCard } from "./VacancyCard";
import styles from "./careers.module.css";

export function VacancyBoard({ vacancies, unavailable, accepting, siteKey }: { vacancies: Vacancy[]; unavailable: boolean; accepting: boolean; siteKey: string }) {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [contract, setContract] = useState("");
  const [selected, setSelected] = useState("");
  const formAnchor = useRef<HTMLDivElement>(null);
  const filtered = vacancies.filter(v => (!region || v.region === region) && (!contract || v.contract === contract) && `${v.title} ${v.site} ${v.level} ${v.reference} ${v.sector}`.toLowerCase().includes(search.toLowerCase()));
  function choose(id: string) {
    setSelected(id);
    formAnchor.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
    formAnchor.current?.querySelector<HTMLSelectElement>("select")?.focus({ preventScroll: true });
  }
  return <section id="open-roles" className={styles.section} aria-labelledby="roles-heading">
    <p className={styles.eyebrow} data-reveal="left">01 / Current opportunities</p>
    <div className={styles.boardHeading}><h2 id="roles-heading" data-type-reveal><span className="type-line">The project changes.</span><span className="type-line"><em>The standards don’t.</em></span></h2><span className={styles.count} data-reveal="fade">{unavailable ? "Please check back" : `${vacancies.length} open ${vacancies.length === 1 ? "role" : "roles"}`}</span></div>
    <p className={styles.notice} data-reveal="bottom">If a vacancy is still listed here, it is still available for applications. Closed roles are removed. An open advert is not a guarantee of appointment.</p>
    {unavailable ? <div className={styles.empty} role="status" data-reveal="bottom"><span className={styles.emptyMark} aria-hidden="true">↗</span><div><h3>We couldn’t load the vacancy board.</h3><p>Please try again shortly. This does not mean there are no vacancies.</p><a href="/careers">Reload current opportunities ↗</a></div></div>
      : vacancies.length === 0 ? <div className={styles.empty} data-reveal="bottom"><span className={styles.emptyMark} aria-hidden="true">↗</span><div><p className={styles.eyebrow}>Between assignments. Always moving forward.</p><h3>No positions advertised right now.</h3><p>As new projects take shape, we advertise the people and skills needed to deliver them. Check this page for the next opportunity.</p><p><strong>Please do not send CVs by email when no positions are advertised.</strong> Unsolicited CV emails will not be considered.</p><a href="#hiring-process">Understand how we hire ↗</a></div></div>
      : <>
        <div className={styles.filters}><label className={styles.field}>Find your role<input type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Role, site, skill or reference" maxLength={160} /></label><label className={styles.field}>Province / region<select value={region} onChange={event => setRegion(event.target.value)}><option value="">All locations</option>{[...new Set(vacancies.map(v => v.region))].map(v => <option key={v}>{v}</option>)}</select></label><label className={styles.field}>Contract<select value={contract} onChange={event => setContract(event.target.value)}><option value="">All contracts</option>{[...new Set(vacancies.map(v => v.contract))].map(v => <option key={v}>{v}</option>)}</select></label></div>
        <p className={styles.notice} role="status">{filtered.length} {filtered.length === 1 ? "role matches" : "roles match"} your selection.</p>
        {filtered.length === 0 && <p>No matching roles. <button type="button" className={styles.secondary} onClick={() => { setSearch(""); setRegion(""); setContract(""); }}>Clear filters</button></p>}
        <div className={styles.roleList}>{filtered.map((v, index) => <VacancyCard key={v.id} vacancy={v} index={index} onApply={() => choose(v.id)} />)}</div>
        <p className={styles.notice}>Apply using the form below against an advertised vacancy. Unsolicited CV emails sent when no positions are advertised will not be considered.</p>
        <div ref={formAnchor}><ApplicationForm vacancies={vacancies} selected={selected} onSelect={setSelected} siteKey={siteKey} accepting={accepting} /></div>
      </>}
  </section>;
}
