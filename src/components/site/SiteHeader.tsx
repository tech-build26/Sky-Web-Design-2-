import Image from "next/image";
import { HUB_URL, navigation, services } from "@/lib/site-content";
import { Arrow, Chevron } from "./Icons";
import { NavigationDisclosure } from "./NavigationDisclosure";
import styles from "../hero/hero.module.css";
import buttons from "./ActionButtons.module.css";

function HubLink() {
  return <a href={HUB_URL} target="_blank" rel="noopener noreferrer">Hub<span className="sr-only"> (opens in a new tab)</span></a>;
}

export function SiteHeader({ active }: { active?: "contact" | "services" | "industries" | "careers" }) {
  return (
    <header className={styles.header}>
      <a className={styles.brand} href="/home" aria-label="Skyriders home">
        <Image src="/images/brand/sky-logo.png" alt="" width={1500} height={1250} className={styles.brandImage} unoptimized />
      </a>
      <nav className={styles.desktopNav} aria-label="Main navigation">
        <NavigationDisclosure className={`${styles.dropdown} ${active === "services" ? styles.activeDropdown : ""}`} hoverOpen label={<>Services <Chevron /></>}>
          <div className={styles.dropdownPanel}>
            <a href="/services/inspection-concrete-access#service-index">All services <Arrow /></a>
            {services.map((service) => <a key={service.id} href={service.href}>{service.title}</a>)}
          </div>
        </NavigationDisclosure>
        <a href="/industries" aria-current={active === "industries" ? "page" : undefined}>Industries</a>
        {navigation.slice(2).map((link) => <a key={link.label} href={link.href} aria-current={active === "careers" && link.label === "Careers" ? "page" : undefined}>{link.label}</a>)}
        <HubLink />
        <a href="/contact" aria-current={active === "contact" ? "page" : undefined}>Contact</a>
      </nav>
      <span className={`${styles.headerCta} ${buttons.tacticalFrame}`}>
        <a href="/contact" className={buttons.tactical}>Get in Touch</a>
      </span>
      <NavigationDisclosure className={styles.mobileMenu} label={<>Menu <span className={styles.menuLines} aria-hidden="true"><i /><i /></span></>}>
        <nav aria-label="Mobile navigation" className={styles.mobilePanel}>
          <a href="/services/inspection-concrete-access#service-index" aria-current={active === "services" ? "page" : undefined}>All services <Arrow /></a>
          <div className={styles.mobileServiceLinks} aria-label="Individual services">{services.map((service) => <a key={service.id} href={service.href}>{service.title}<Arrow /></a>)}</div>
          {navigation.slice(1).map((link) => <a key={link.label} href={link.href} aria-current={(active === "industries" && link.label === "Industries") || (active === "careers" && link.label === "Careers") ? "page" : undefined}>{link.label}<Arrow /></a>)}
          <HubLink />
          <a href="/contact" aria-current={active === "contact" ? "page" : undefined}>Contact<Arrow /></a>
          <span className={buttons.tacticalFrame}><a href="/contact" className={buttons.tactical}>Get in Touch</a></span>
        </nav>
      </NavigationDisclosure>
    </header>
  );
}
