import type { CSSProperties } from "react";

export function Arrow({ className, style }: { className?: string; style?: CSSProperties }) {
  return <svg className={className} style={style} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function Chevron() {
  return <svg viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="m3 4.5 3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>;
}

export function IndustryIcon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    building: <><path d="M7 29V10l10-5v24M17 12h8v17M3 29h27M11 13v2m0 4v2m0 4v4m10-12v3m0 3v3" /><path d="M17 3v4" /></>,
    bridge: <><path d="M3 19h26M8 29V8m16 21V8M2 17c3 0 6-3 6-9 2 8 6 10 8 10s6-2 8-10c0 6 3 9 6 9M12 19v10m8-10v10" /></>,
    energy: <path d="m19 2-14 17h10l-2 12 14-19H17l2-10Z" />,
    industry: <><path d="M3 29h27M6 29V18l8-4v7l7-5v13M23 29V9h5v20M8 9h4v8M7 9V6h6v3M23 9V6h5v3M10 24v3m7-3v3" /><path d="M25 3V1" /></>,
    helmet: <><path d="M4 22a12 12 0 0 1 9-12m6 0a12 12 0 0 1 9 12M13 19V7h6v12M3 22h26v5H3zM6 29h20M8 15v7m16-7v7" /></>,
  };
  return <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] ?? paths.building}</svg>;
}
