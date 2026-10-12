import type { Metadata } from "next";
import { IndustriesPage } from "@/components/sections/IndustriesPage";
import { ScrollReveals } from "@/components/site/ScrollReveals";
import { RopeTechnician } from "@/components/site/RopeTechnician";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ScrollToTop } from "@/components/site/ScrollToTop";
import { industryDetails } from "@/lib/industry-pages";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Industries We Serve | Skyriders Access Specialists",
  description: "Specialist access, inspection and maintenance for buildings, civil infrastructure, energy, industrial plant, mining and petrochemical assets in South Africa.",
  alternates: { canonical: "/industries" },
  openGraph: { title: "Industries We Serve | Skyriders", description: "Explore how Skyriders approaches difficult access across five industry environments.", url: "/industries", images: [{ url: "/images/industries/industries-bridge-access.webp", width: 1672, height: 941, alt: "Illustrative rope access inspection beneath a concrete bridge" }] },
  twitter: { card: "summary_large_image" },
};

export default function Industries() {
  const base = getSiteUrl();
  const jsonLd = base ? {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: new URL("home", base).href },
        { "@type": "ListItem", position: 2, name: "Industries", item: new URL("industries", base).href },
      ] },
      { "@type": "ItemList", name: "Industries we serve", itemListElement: industryDetails.map((industry, index) => ({
        "@type": "ListItem", position: index + 1, name: industry.title, url: new URL(`industries#${industry.id}`, base).href,
      })) },
    ],
  } : null;
  return <>
    <ScrollReveals />
    <RopeTechnician />
    <main id="main">{jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />}<IndustriesPage /></main>
    <SiteFooter />
    <ScrollToTop />
  </>;
}
