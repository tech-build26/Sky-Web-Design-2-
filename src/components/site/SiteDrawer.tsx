"use client";

import { SiteLink } from "./SiteLink";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { HUB_URL } from "@/lib/site-content";
import { CONTACT_EMAIL } from "@/lib/contact";
import { Arrow } from "./Icons";
import styles from "./SiteDrawer.module.css";

type IconName = "home" | "services" | "industries" | "about" | "careers" | "safety" | "certifications" | "hub" | "contact";

const links: { label: string; href: string; icon: IconName; external?: boolean }[] = [
  { label: "Home", href: "/home", icon: "home" },
  { label: "Services", href: "/services/inspection-concrete-access#service-index", icon: "services" },
  { label: "Industries", href: "/industries", icon: "industries" },
  { label: "About", href: "/about", icon: "about" },
  { label: "Careers", href: "/careers", icon: "careers" },
  { label: "Safety & Quality", href: "/home/#safety", icon: "safety" },
  { label: "Certifications", href: "/about#credentials", icon: "certifications" },
  { label: "Team Hub", href: HUB_URL, icon: "hub", external: true },
  { label: "Contact", href: "/contact", icon: "contact" },
];

function MenuIcon({ name }: { name: IconName }) {
  const paths: Record<IconName, ReactNode> = {
    careers: <><rect x="3" y="7" width="18" height="14" rx="2" /><path d="M8 7V3h8v4M3 12h18M10 12v3h4v-3" /></>,
    home: <><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V10Z" /></>,
    services: <><circle cx="12" cy="12" r="3" /><path d="M10 2h4l.7 2.4 2 1.2 2.4-.6 2 3.4-1.7 1.8v2.4l1.7 1.8-2 3.4-2.4-.6-2 1.2L14 22h-4l-.7-2.4-2-1.2-2.4.6-2-3.4 1.7-1.8v-2.4L2.9 9.6l2-3.4 2.4.6 2-1.2L10 2Z" /></>,
    industries: <><path d="M2 21h20M4 21V8l6-3v16m0-10 5-2v12m0-7 5-2v9M7 9v2m0 3v2m5-2v2m6 1v2" /></>,
    about: <><circle cx="9" cy="8" r="3" /><path d="M2.5 20v-2a6.5 6.5 0 0 1 13 0v2H2.5ZM17 5a3 3 0 0 1 0 6m1.5 3a5.5 5.5 0 0 1 3 5v1h-4" /></>,
    safety: <><path d="m12 2 8 3v6c0 5-3 8-8 11-5-3-8-6-8-11V5l8-3Z" /><path d="m8.5 12 2.4 2.4 4.8-5" /></>,
    certifications: <><path d="M5 2h10l4 4v15H5V2Zm10 0v5h4M8 11h7M8 14h5" /><circle cx="17" cy="17" r="3" /></>,
    hub: <><circle cx="8" cy="8" r="2.5" /><circle cx="16" cy="8" r="2.5" /><path d="M2 20v-2a6 6 0 0 1 12 0v2H2Zm8 0v-2a6 6 0 0 1 12 0v2H10Z" /></>,
    contact: <><rect x="2" y="5" width="20" height="14" rx="1" /><path d="m3 7 9 7 9-7" /></>,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function SocialIcon({ kind }: { kind: "facebook" | "linkedin" }) {
  return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{kind === "facebook"
    ? <path d="M13.6 22v-9.1H16l.4-3.1h-2.8V7.9c0-.9.3-1.5 1.5-1.5h1.5V3.6c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 4v2.3H8v3.1h2.5V22h3.1Z" />
    : <path d="M5.2 8.3a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6ZM3.6 9.8h3.2V20H3.6V9.8Zm5.2 0h3.1v1.4h.1c.4-.8 1.5-1.7 3.1-1.7 3.3 0 3.9 2.1 3.9 4.8V20h-3.3v-5.1c0-1.2 0-2.7-1.7-2.7s-1.9 1.3-1.9 2.6V20H8.8V9.8Z" />}</svg>;
}

export function SiteDrawer() {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previousOverflow = useRef("");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 110);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
      if (dialog?.open) document.body.style.overflow = previousOverflow.current;
    };
  }, []);

  useEffect(() => {
    const phone = window.matchMedia("(max-width: 767px)");
    const closeOnPhone = () => {
      const dialog = dialogRef.current;
      if (!phone.matches || !dialog?.open) return;
      if (closeTimer.current) clearTimeout(closeTimer.current);
      closeTimer.current = null;
      dialog.close();
      delete dialog.dataset.closing;
      document.body.style.overflow = previousOverflow.current;
      setOpen(false);
    };
    phone.addEventListener("change", closeOnPhone);
    return () => phone.removeEventListener("change", closeOnPhone);
  }, []);

  function openDrawer() {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    previousOverflow.current = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    setOpen(true);
  }

  function finishClose(restoreFocus = true) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
    const dialog = dialogRef.current;
    if (dialog?.open) dialog.close();
    if (dialog) delete dialog.dataset.closing;
    document.body.style.overflow = previousOverflow.current;
    setOpen(false);
    if (restoreFocus) triggerRef.current?.focus();
  }

  function closeDrawer() {
    const dialog = dialogRef.current;
    if (!dialog?.open || dialog.dataset.closing) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finishClose();
      return;
    }
    dialog.dataset.closing = "true";
    closeTimer.current = setTimeout(() => finishClose(), 440);
  }

  return <>
    <button ref={triggerRef} type="button" className={styles.trigger} data-scrolled={scrolled} aria-label="Open navigation menu" aria-haspopup="dialog" aria-controls="site-drawer" aria-expanded={open} onClick={openDrawer}>
      <span className={styles.triggerText}>Menu</span><span className={styles.hamburger} aria-hidden="true"><i /><i /><i /></span>
    </button>
    <dialog ref={dialogRef} id="site-drawer" className={styles.dialog} aria-label="Site navigation" onCancel={(event) => { event.preventDefault(); closeDrawer(); }}>
      <button type="button" className={styles.scrim} aria-label="Close navigation menu" onClick={closeDrawer} tabIndex={-1} />
      <div className={styles.panel}>
        <div className={styles.panelHead}>
          <SiteLink href="/home" className={styles.logo} aria-label="Skyriders home" onClick={() => finishClose(false)}><Image src="/images/brand/sky-logo.png" alt="" width={1500} height={1250} sizes="150px" /></SiteLink>
          <button type="button" className={styles.close} aria-label="Close navigation menu" autoFocus onClick={closeDrawer}><span /><span /></button>
        </div>
        <div className={styles.panelScroll}>
          <p className={styles.overline}>Explore Skyriders <span>01 / {String(links.length).padStart(2, "0")}</span></p>
          <nav className={styles.nav} aria-label="Site navigation">
            {links.map((link, index) => {
              const active = link.icon === "services" ? pathname.startsWith("/services") : link.icon === "home" ? pathname === "/home" : link.icon === "industries" ? pathname === "/industries" : link.icon === "about" ? pathname === "/about" : link.icon === "careers" ? pathname === "/careers" : link.icon === "contact" ? pathname === "/contact" : false;
              return <SiteLink key={link.label} href={link.href} aria-current={active ? "page" : undefined} target={link.external ? "_blank" : undefined} rel={link.external ? "noopener noreferrer" : undefined} onClick={() => finishClose(false)} style={{ animationDelay: `${index * 35}ms` }}><MenuIcon name={link.icon} /><span>{link.label}</span>{link.external && <span className="sr-only"> (opens in a new tab)</span>}<Arrow className={styles.linkArrow} /></SiteLink>;
            })}
          </nav>
          <SiteLink className={styles.netting} href="/services/inspection-concrete-access#netting" onClick={() => finishClose(false)}><span><small>Featured capability</small>Netting systems</span><Arrow /></SiteLink>
          <div className={styles.contactBlock}>
            <SiteLink href="/contact#project-enquiry" className={styles.cta} onClick={() => finishClose(false)}>Get in touch <Arrow /></SiteLink>
            <SiteLink href="tel:+27861000759" className={styles.contactLink}><span aria-hidden="true">↗</span>0861 000 759</SiteLink>
            <SiteLink href={`mailto:${CONTACT_EMAIL}`} className={styles.contactLink}><MenuIcon name="contact" />{CONTACT_EMAIL}</SiteLink>
          </div>
          <div className={styles.socialBlock}>
            <p>Follow us</p>
            <div><SiteLink href="https://za.linkedin.com/company/skyriders-access-specialists-pty-ltd" target="_blank" rel="noopener noreferrer" aria-label="Skyriders on LinkedIn"><SocialIcon kind="linkedin" /></SiteLink><SiteLink href="https://web.facebook.com/SkyridersIndustrialRopeAccess" target="_blank" rel="noopener noreferrer" aria-label="Skyriders on Facebook"><SocialIcon kind="facebook" /></SiteLink></div>
          </div>
        </div>
      </div>
    </dialog>
  </>;
}
