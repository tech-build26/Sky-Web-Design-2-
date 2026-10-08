import Image from "next/image";
import styles from "./hero.module.css";

export function SkyIBadge() {
  return (
    <a href="http://skyi.co.za/" className={styles.skyBadge} aria-label="Visit the Sky I website">
      <div className={styles.skyLogoBacking}><Image src="/images/brand/sky-i-logo.png" alt="" width={1254} height={1254} className={styles.skyLogo} unoptimized /></div>
    </a>
  );
}
