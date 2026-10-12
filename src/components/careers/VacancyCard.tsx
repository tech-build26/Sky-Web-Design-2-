"use client";

import type { CSSProperties } from "react";
import type { Vacancy } from "@/lib/careers";
import { Arrow } from "@/components/site/Icons";
import { AnimatedDisclosure } from "./AnimatedDisclosure";
import { VacancyDetail } from "./VacancyDetail";
import styles from "./careers.module.css";

export function VacancyCard({ vacancy: v, index = 0, onApply, preview = false }: {
  vacancy: Vacancy; index?: number; onApply?: () => void; preview?: boolean;
}) {
  return <div className={styles.roleEntrance} data-reveal={preview ? undefined : "bottom"} style={{ "--reveal-delay": `${Math.min(index, 4) * 90}ms` } as CSSProperties}>
    <AnimatedDisclosure id={`vacancy-${v.id}`} className={styles.role} contentClassName={styles.detail} summary={<>
      <div className={styles.roleReference}><span className={styles.roleRef}>{v.reference}</span><span className={styles.liveBadge}><i aria-hidden="true" />{preview ? "Preview only" : "Applications open"}</span></div>
      <div className={styles.roleSummary}><h3>{v.title}</h3><p>{v.site}, {v.region}</p><div className={styles.roleTags}><span>{v.level}</span><span>{v.contract}</span><span>{v.sector}</span></div></div>
      <span className={styles.roleToggle} aria-hidden="true">+</span>
    </>}>
      <VacancyDetail vacancy={v} />
      {onApply && <button type="button" className={styles.primary} data-button onClick={onApply}>Apply for this role <Arrow /></button>}
    </AnimatedDisclosure>
  </div>;
}
