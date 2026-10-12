import type { Vacancy } from "@/lib/careers";
import styles from "./careers.module.css";

export function VacancyDetail({ vacancy: v }: { vacancy: Vacancy }) {
  const facts = [["Site / location", `${v.site}, ${v.region}`], ["Contract", v.contract], ["Rope-access level", v.level], ["Certification", v.scheme], ["Start window", v.start], ["Duration", v.duration], ["Working pattern", v.rotation], ["Positions", String(v.headcount)], ["Applications close", v.closing_at ? new Date(v.closing_at).toLocaleDateString("en-ZA", { timeZone: "Africa/Johannesburg", day: "numeric", month: "long", year: "numeric" }) : "Open until filled / advert removed"]];
  return <>
    <dl className={styles.facts}>{facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
    <h4>Description</h4><p className={styles.description}>{v.description}</p>
    <h4>Requirements</h4><ul>{v.requirements.map(item => <li key={item}>{item}</li>)}</ul>
    {v.additional_requirements && <p className={styles.description}>{v.additional_requirements}</p>}
    <p className={styles.advice}>This position includes <strong>Description and Requirements</strong>. Reading everything thoroughly gives you a significant advantage — candidates who address the requirements directly in their cover letter are far more likely to be interviewed.</p>
  </>;
}
