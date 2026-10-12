import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";
import "./prelanding.css";
import { CookieConsent } from "@/components/site/CookieConsent";
import { CookieSettingsButton } from "@/components/site/CookieSettingsButton";
import consentStyles from "@/components/site/CookieConsent.module.css";

const siteUrl = getSiteUrl();
const indexable = Boolean(siteUrl) && process.env.NODE_ENV === "production";
const title = "Skyriders | Critical reach. Advanced inspection.";
const description = "Critical reach. Advanced inspection. Skilled access. Practical solutions.";

export const metadata: Metadata = {
  metadataBase: siteUrl ?? new URL("https://ropeaccess.co.za/"),
  title,
  description,
  applicationName: "Skyriders",
  alternates: { canonical: "/" },
  icons: { icon: "/pre-landing/favicon.ico" },
  openGraph: { title, description, siteName: "Skyriders", locale: "en_ZA", type: "website", url: "/" },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: indexable, follow: indexable },
};

// An independent root layout preserves the supplied CSS reset and fonts.
export default function PrelandingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-ZA" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/pre-landing/images/variants/hero-bg-1672.webp" as="image" media="(min-width: 1281px)" fetchPriority="high" />
        <link rel="preload" href="/pre-landing/images/variants/hero-bg-1280.webp" as="image" media="(min-width: 769px) and (max-width: 1280px)" fetchPriority="high" />
        <link rel="preload" href="/pre-landing/images/variants/hero-bg-768.webp" as="image" media="(max-width: 768px)" fetchPriority="high" />
        <link rel="preload" href="/pre-landing/fonts/jost.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/pre-landing/fonts/cormorant.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        {/* Preserve the approved standalone stylesheet and cascade without bundler changes. */}
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/pre-landing/styles.css" />
      </head>
      <body suppressHydrationWarning>
        {children}
        <footer className={consentStyles.gatewayFooter}><a href="/cookie-policy">Cookie &amp; privacy details</a><CookieSettingsButton /></footer>
        <CookieConsent />
      </body>
    </html>
  );
}
