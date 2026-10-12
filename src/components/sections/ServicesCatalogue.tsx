"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Arrow } from "../site/Icons";
import buttons from "../site/ActionButtons.module.css";
import styles from "./services-catalogue.module.css";

// The explorer and its photographs are requested only when the visitor opens it.
const ServicesExplorer = dynamic(() => import("./ServicesExplorer"), {
  loading: () => <div className={styles.loading} role="status">Preparing your service explorer…<Link href="/services/inspection-concrete-access#service-index">Browse all services <Arrow /></Link></div>,
});

const subscribeToHydration = () => () => {};

export function ServicesCatalogue() {
  const hydrated = useSyncExternalStore(subscribeToHydration, () => true, () => false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previousOverflow = useRef("");
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const element = dialog.current;
    return () => {
      if (timer.current) clearTimeout(timer.current);
      if (element?.open) document.body.style.overflow = previousOverflow.current;
    };
  }, []);

  function finishClose(restoreFocus = true) {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    if (!dialog.current?.open) return;
    dialog.current.close();
    delete dialog.current.dataset.closing;
    document.body.style.overflow = previousOverflow.current;
    setOpened(false);
    if (restoreFocus) trigger.current?.focus({ preventScroll: true });
  }

  function close() {
    if (!dialog.current?.open || timer.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return finishClose();
    dialog.current.dataset.closing = "true";
    timer.current = setTimeout(finishClose, 180);
  }

  function open() {
    if (!dialog.current || dialog.current.open) return;
    previousOverflow.current = document.body.style.overflow;
    dialog.current.showModal();
    document.body.style.overflow = "hidden";
    setOpened(true);
  }

  return <>
    <button ref={trigger} type="button" className={buttons.service} onClick={open} disabled={!hydrated} aria-haspopup="dialog" aria-controls="services-catalogue" aria-expanded={opened}>
      <span>Explore all services</span><span className={buttons.serviceArrow}><Arrow /></span>
    </button>
    <dialog ref={dialog} id="services-catalogue" className={styles.dialog} aria-labelledby="services-catalogue-heading" aria-describedby="services-catalogue-intro"
      onCancel={event => { event.preventDefault(); close(); }}
      onClose={() => { if (!dialog.current?.open) { document.body.style.overflow = previousOverflow.current; setOpened(false); } }}
      onClick={event => { if (event.target === event.currentTarget) close(); }}>
      <div className={styles.panel}>
        <header className={styles.header}>
          <div><p className={styles.eyebrow}>Our capabilities <span>/ 06 specialist services</span></p><h2 id="services-catalogue-heading">More ways to <em>reach further.</em></h2><p id="services-catalogue-intro" className={styles.intro}>Every structure has a different challenge. Find the expertise to meet yours.</p></div>
          <button type="button" className={styles.close} aria-label="Close all services" autoFocus onClick={close}><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" stroke="currentColor" strokeWidth="1.5" /></svg></button>
        </header>
        {opened && <ServicesExplorer onNavigate={() => finishClose(false)} />}
        <footer className={styles.footer}><div><span className={styles.eyebrow}>Start with the site</span><p>Not sure which approach fits?</p></div><Link href="/contact?service=Help%20me%20choose#project-enquiry" onClick={() => finishClose(false)}>Let’s plan it together <Arrow /></Link></footer>
      </div>
    </dialog>
  </>;
}
