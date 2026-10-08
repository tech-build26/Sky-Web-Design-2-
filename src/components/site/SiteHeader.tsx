import Image from "next/image";
import { HUB_URL, industries, navigation, services } from "@/lib/site-content";
import { Arrow, Chevron } from "./Icons";
import { NavigationDisclosure } from "./NavigationDisclosure";
import styles from "../hero/hero.module.css";

function HubLink() {
  return <a href={HUB_URL} target="_blank" rel="noopener noreferrer">Hub<span className="sr-only"> (opens in a new tab)</span></a>;
}

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <a className={styles.brand} href="#home" aria-label="Skyriders home">
        <Image src="/images/brand/sky-logo.png" alt="" width={1500} height={1250} className={styles.brandImage} unoptimized />
      </a>
      <nav className={styles.desktopNav} aria-label="Main navigation">
        <NavigationDisclosure className={styles.dropdown} label={<>Services <Chevron /></>}>
          <div className={styles.dropdownPanel}>
            <a href="#services">All services <Arrow /></a>
            {services.map((service) => <a key={service.id} href={`#${service.id}`}>{service.title}</a>)}
          </div>
        </NavigationDisclosure>
        <NavigationDisclosure className={styles.dropdown} label={<>Industries <Chevron /></>}>
          <div className={styles.dropdownPanel}>
            <a href="#industries">Industries we serve <Arrow /></a>
            {industries.map((industry) => <a key={industry.title} href="#industries">{industry.title}</a>)}
          </div>
        </NavigationDisclosure>
        {navigation.slice(2).map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}
        <HubLink />
      </nav>
      <a href="#contact" className={`button ${styles.headerCta}`}>Get in Touch <Arrow /></a>
      <NavigationDisclosure className={styles.mobileMenu} label={<>Menu <span className={styles.menuLines} aria-hidden="true"><i /><i /></span></>}>
        <nav aria-label="Mobile navigation" className={styles.mobilePanel}>
          {navigation.map((link) => <a key={link.label} href={link.href}>{link.label}<Arrow /></a>)}
          <HubLink />
          <a href="#contact">Get in Touch<Arrow /></a>
        </nav>
      </NavigationDisclosure>
    </header>
  );
}
