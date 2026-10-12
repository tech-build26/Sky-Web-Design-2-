"use client";

import { useRef, useState } from "react";
import { Arrow } from "../site/Icons";
import styles from "./contact-page.module.css";

const offices = [
  { name: "Midrand head office", short: "Midrand", address: "44 Monte Carlo Crescent, Kyalami Business Park, Midrand, 1685", mapQuery: "Skyriders Access Specialists, 44 Monte Carlo Crescent, Kyalami Business Park, Midrand", phone: "0861 000 759", href: "tel:+27861000759" },
  { name: "eMalahleni office", short: "eMalahleni", address: "Shop 2 & 6, 24 Langa Crescent, Corridor Hill, Zeekoewater, eMalahleni, 1035", mapQuery: "24 Langa Crescent, Zeekoewater, eMalahleni, South Africa", phone: "013 692 5219", href: "tel:+27136925219" },
] as const;

function mapUrl(query: string) {
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=17&output=embed`;
}

function directionsUrl(address: string) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
}

function Pin({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M25 13c0 7-9 16-9 16S7 20 7 13a9 9 0 1 1 18 0Z" /><circle cx="16" cy="13" r="3.5" /></svg>;
}

export function OfficeMap() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState(0);
  const office = offices[active];

  function openMap(index = 0) {
    setActive(index);
    dialog.current?.showModal();
  }

  return <div id="location-map" className={styles.mapCard}>
    <div className={styles.mapPreview}>
      <iframe src={mapUrl(offices[0].mapQuery)} title="Map preview of Skyriders Midrand head office" loading="lazy" tabIndex={-1} aria-hidden="true" referrerPolicy="no-referrer-when-downgrade" />
      <button type="button" className={styles.mapOpen} onClick={() => openMap(0)} aria-label="Expand map and view office locations"><span><Pin /> Midrand head office</span><span className={styles.expandIcon} aria-hidden="true">⛶</span></button>
    </div>
    <div className={styles.mapCaption}><Pin /><span><strong>Midrand &amp; eMalahleni</strong><small>South Africa</small></span><span className={styles.mapDivider} /><span><strong>Project coverage</strong><small>Nationwide</small></span></div>
    <div className={styles.officeList}>{offices.map((item, index) => <button key={item.name} type="button" onClick={() => openMap(index)} aria-label={`View ${item.name} on the map`}><Pin /><span><strong>{item.name}</strong><small>{item.address}</small></span><Arrow /></button>)}</div>
    <dialog ref={dialog} className={styles.mapDialog} aria-label="Skyriders office locations" onClick={(event) => { if (event.target === dialog.current) dialog.current?.close(); }}>
      <div className={styles.dialogPanel}>
        <div className={styles.dialogHeader}><div><p>Skyriders offices</p><h2>Find the right location.</h2></div><button type="button" className={styles.dialogClose} onClick={() => dialog.current?.close()} aria-label="Close map">×</button></div>
        <div className={styles.officeTabs} role="group" aria-label="Choose an office">{offices.map((item, index) => <button key={item.name} type="button" aria-pressed={active === index} onClick={() => setActive(index)}>{item.short}</button>)}</div>
        <div className={styles.dialogMap}><iframe key={office.mapQuery} src={mapUrl(office.mapQuery)} title={`Interactive map of ${office.name}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
        <div className={styles.dialogDetails}><Pin /><div><strong>{office.name}</strong><address>{office.address}</address><a href={office.href}>{office.phone}</a></div><a className={styles.directions} href={directionsUrl(office.address)} target="_blank" rel="noopener noreferrer">Get directions <Arrow /><span className="sr-only"> (opens in a new tab)</span></a></div>
      </div>
    </dialog>
  </div>;
}
