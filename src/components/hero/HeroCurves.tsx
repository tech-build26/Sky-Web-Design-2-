import { heroGeometry } from "@/lib/hero-geometry";
import styles from "./hero.module.css";

export function HeroCurves({ prefix }: { prefix: string }) {
  return (
    <svg className={styles.curves} viewBox="0 0 1672 941" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <clipPath id={`${prefix}-main`} clipPathUnits="objectBoundingBox"><path d={heroGeometry.mainPhoto} /></clipPath>
        <clipPath id={`${prefix}-support`} clipPathUnits="objectBoundingBox"><path d={heroGeometry.supportPhoto} /></clipPath>
        <linearGradient id={`${prefix}-sweep`}><stop stopColor="#071c35" /><stop offset="1" stopColor="#0a2949" /></linearGradient>
      </defs>
      <path d={heroGeometry.divisionSweep} fill={`url(#${prefix}-sweep)`} stroke="#5bcaff" strokeWidth="1.3" />
      <g fill="none" stroke="#cddfeb" strokeWidth=".75" opacity=".6">
        <path d="M33 0V941M1647 0V941M0 93H1672M0 815H927M936 0 692 584M874 584 946 941" />
        <path d="M672 119h187M617 205h207M584 486h149M715 92 540 584" />
      </g>
      <g fill="none" stroke="#087cfa" strokeWidth="1.1" className={styles.titleOrnament}>
        <path d={heroGeometry.titleCurve} /><circle cx="632" cy="254" r="12" fill="#f7fbff" />
      </g>
    </svg>
  );
}
