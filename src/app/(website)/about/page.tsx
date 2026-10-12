import type { Metadata } from "next";
import { AboutMiniHero } from "@/components/hero/AboutMiniHero";
import { ScrollReveals } from "@/components/site/ScrollReveals";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ScrollToTop } from "@/components/site/ScrollToTop";
import { RopeTechnician } from "@/components/site/RopeTechnician";
import { AboutTrust } from "@/components/sections/AboutTrust";
import { AboutTestimonials } from "@/components/sections/AboutTestimonials";

export const metadata: Metadata = {
  title: "About Skyriders | Built for the hard-to-reach",
  description: "Meet Skyriders Access Specialists, bringing rope access, inspection and maintenance expertise to demanding South African structures since 1999.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About Skyriders | Built for the hard-to-reach", description: "South African rope access, inspection and maintenance expertise since 1999.", url: "/about", images: [{ url: "/images/hero/hero-sa-industrial-tower-02.webp", width: 1672, height: 941, alt: "Skyriders technicians inspecting an industrial tower" }] },
  twitter: { card: "summary_large_image" },
};

export default function AboutPage() {
  return <>
    <ScrollReveals />
    <RopeTechnician />
    <main id="main"><AboutMiniHero /><AboutTrust emailDeliveryEnabled={Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_FROM_EMAIL)} />{process.env.NODE_ENV !== "production" && <AboutTestimonials />}</main>
    <SiteFooter />
    <ScrollToTop />
  </>;
}
