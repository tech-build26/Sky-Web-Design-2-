import type { ReactNode } from "react";
import { servicePages } from "@/lib/service-pages";
import { getSiteUrl } from "@/lib/site-url";
import { ScrollReveals } from "../site/ScrollReveals";
import { RopeTechnician } from "../site/RopeTechnician";
import { SiteFooter } from "../site/SiteFooter";
import { ScrollToTop } from "../site/ScrollToTop";

export function servicePageJsonLd(pageKey: keyof typeof servicePages) {
  const base = getSiteUrl();
  if (!base) return null;
  const page = servicePages[pageKey];
  const pageUrl = new URL(page.path, base).href;
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: new URL("home", base).href },
        { "@type": "ListItem", position: 2, name: "Services", item: pageUrl },
      ] },
      { "@type": "ItemList", name: page.title, itemListElement: page.services.map((service, index) => ({
        "@type": "ListItem", position: index + 1, item: {
          "@type": "Service", name: service.title, description: service.body,
          url: `${pageUrl}#${service.id}`,
          provider: { "@type": "Organization", name: "Skyriders Access Specialists (Pty) Ltd", url: base.href },
          areaServed: { "@type": "Country", name: "South Africa" },
        },
      })) },
    ],
  };
}

export function ServicePageShell({ children, jsonLd }: { children: ReactNode; jsonLd: ReturnType<typeof servicePageJsonLd> }) {
  return <>
    <ScrollReveals />
    <RopeTechnician />
    <main id="main" data-service-page>{jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />}{children}</main>
    <SiteFooter />
    <ScrollToTop />
  </>;
}
