import type { Metadata } from "next";
import { ContactPageContent } from "@/components/sections/ContactPageContent";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ScrollReveals } from "@/components/site/ScrollReveals";
import { RopeTechnician } from "@/components/site/RopeTechnician";
import { ScrollToTop } from "@/components/site/ScrollToTop";

export const metadata: Metadata = {
  title: "Contact Skyriders | Plan your next project",
  description: "Contact Skyriders Access Specialists for industrial rope access, inspection and maintenance. Send a project brief or speak to our Midrand and eMalahleni teams.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact Skyriders | Plan your next project", description: "Talk to Skyriders about your site, access challenge and project requirements.", url: "/contact", images: [{ url: "/images/contact/contact-industrial-rope-hero.webp", width: 1600, height: 800, alt: "Industrial rope access among steelwork" }] },
  twitter: { card: "summary_large_image" },
};

export default function ContactPage() {
  const emailDeliveryEnabled = Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_FROM_EMAIL);
  return <>
    <ScrollReveals />
    <RopeTechnician />
    <main id="main"><ContactPageContent emailDeliveryEnabled={emailDeliveryEnabled} /></main>
    <SiteFooter />
    <ScrollToTop />
  </>;
}
