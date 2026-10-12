
import { SiteLink } from "./SiteLink";
import Image from "next/image";
import { HUB_URL, navigation, services } from "@/lib/site-content";
import { Arrow, Chevron } from "./Icons";
import { NavigationDisclosure } from "./NavigationDisclosure";
import styles from "../hero/hero.module.css";
import buttons from "./ActionButtons.module.css";

function HubLink() {
  return <SiteLink href={HUB_URL} target="_blank" rel="noopener noreferrer">Hub<span className="sr-only"> (opens in a new tab)</span></SiteLink>;
}

export function SiteHeader({ active }: { active?: "contact" | "services" | "industries" | "careers" }) {
  return (
    <header className={styles.header}>
      <SiteLink className={styles.brand} href="/home" aria-label="Skyriders home">
        <Image src="/images/brand/sky-logo.png" alt="" width={1500} height={1250} sizes="150px" loading="eager" className={styles.brandImage} />
      </SiteLink>
      <nav className={styles.desktopNav} aria-label="Main navigation">
        <NavigationDisclosure className={`${styles.dropdown} ${active === "services" ? styles.activeDropdown : ""}`} hoverOpen label={<>Services <Chevron /></>}>
          <div className={styles.dropdownPanel}>
            <SiteLink href="/services/inspection-concrete-access#service-index">All services <Arrow /></SiteLink>
            {services.map((service) => <SiteLink key={service.id} href={service.href}>{service.title}</SiteLink>)}
          </div>
        </NavigationDisclosure>
        <SiteLink href="/industries" aria-current={active === "industries" ? "page" : undefined}>Industries</SiteLink>
        {navigation.slice(2).map((link) => <SiteLink key={link.label} href={link.href} aria-current={active === "careers" && link.label === "Careers" ? "page" : undefined}>{link.label}</SiteLink>)}
        <HubLink />
        <SiteLink href="/contact" aria-current={active === "contact" ? "page" : undefined}>Contact</SiteLink>
      </nav>
      <span className={`${styles.headerCta} ${buttons.tacticalFrame}`}>
        <SiteLink href="/contact" className={buttons.tactical}>Get in Touch</SiteLink>
      </span>
      <NavigationDisclosure className={styles.mobileMenu} label={<>Menu <span className={styles.menuLines} aria-hidden="true"><i /><i /></span></>}>
        <nav aria-label="Mobile navigation" className={styles.mobilePanel}>
          <SiteLink href="/services/inspection-concrete-access#service-index" aria-current={active === "services" ? "page" : undefined}>All services <Arrow /></SiteLink>
          <div className={styles.mobileServiceLinks} aria-label="Individual services">{services.map((service) => <SiteLink key={service.id} href={service.href}>{service.title}<Arrow /></SiteLink>)}</div>
          {navigation.slice(1).map((link) => <SiteLink key={link.label} href={link.href} aria-current={(active === "industries" && link.label === "Industries") || (active === "careers" && link.label === "Careers") ? "page" : undefined}>{link.label}<Arrow /></SiteLink>)}
          <HubLink />
          <SiteLink href="/contact" aria-current={active === "contact" ? "page" : undefined}>Contact<Arrow /></SiteLink>
          <span className={buttons.tacticalFrame}><SiteLink href="/contact" className={buttons.tactical}>Get in Touch</SiteLink></span>
        </nav>
      </NavigationDisclosure>
    </header>
  );
}
