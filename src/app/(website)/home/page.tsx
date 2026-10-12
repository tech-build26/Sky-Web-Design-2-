import type { Metadata } from "next";
import { Hero } from "@/components/hero/Hero";
import { PageDestinations } from "@/components/sections/PageDestinations";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ScrollReveals } from "@/components/site/ScrollReveals";
import { RopeTechnician } from "@/components/site/RopeTechnician";
import { ScrollToTop } from "@/components/site/ScrollToTop";

export const metadata: Metadata = {
  title: "Skyriders | Industrial Rope Access, Inspection & Maintenance",
  description: "Skyriders provides industrial rope access, inspection and NDT, concrete care, maintenance and drone inspection for complex structures in South Africa.",
  alternates: { canonical: "/home" },
  openGraph: { title: "Skyriders | Access Beyond Limits", description: "Industrial rope access, inspection and maintenance for complex South African structures.", url: "/home", images: [{ url: "/images/hero/hero-sa-industrial-tower-02.webp", width: 1672, height: 941, alt: "Skyriders rope access inspection at an industrial tower" }] },
  twitter: { card: "summary_large_image" },
};

export default function Home() {
  return (
    <>
      <ScrollReveals />
      <RopeTechnician />
      <main id="main">
        <Hero />
        <PageDestinations />
      </main>
      <SiteFooter />
      <ScrollToTop />
    </>
  );
}
