import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";
import "./prelanding.css";

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
    <html lang="en-ZA">
      <head>
        <link rel="preload" href="/pre-landing/fonts/jost.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/pre-landing/fonts/cormorant.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        {/* Preserve the approved standalone stylesheet and cascade without bundler changes. */}
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/pre-landing/styles.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
