import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { getSiteUrl } from "@/lib/site-url";

const inter = localFont({ src: "./fonts/inter-latin-variable.woff2", weight: "100 900", display: "swap", variable: "--font-body" });
const archivo = localFont({ src: "./fonts/archivo-latin-variable.woff2", weight: "100 900", display: "swap", variable: "--font-display" });

const siteUrl = getSiteUrl();
const indexable = Boolean(siteUrl) && process.env.NODE_ENV === "production";
export const metadata: Metadata = {
  metadataBase: siteUrl ?? new URL("http://localhost:3000"),
  title: "Skyriders | Access Beyond Limits",
  description: "Skyriders Access Specialists: industrial rope access, inspection and maintenance in South Africa.",
  applicationName: "Skyriders",
  alternates: siteUrl ? { canonical: "/" } : undefined,
  openGraph: { title: "Skyriders | Access Beyond Limits", description: "Specialist rope access, inspection and maintenance. South African expertise since 1999.", siteName: "Skyriders", locale: "en_ZA", type: "website", ...(siteUrl ? { url: "/" } : {}) },
  twitter: { card: "summary_large_image", title: "Skyriders | Access Beyond Limits", description: "Specialist rope access, inspection and maintenance in South Africa." },
  robots: { index: indexable, follow: indexable },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-ZA" className={`${inter.variable} ${archivo.variable}`}>
      <body>
        <a className="skip-link" href="#hero-heading">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
