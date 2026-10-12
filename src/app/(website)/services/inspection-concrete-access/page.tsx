import type { Metadata } from "next";
import { ServiceLanding } from "@/components/sections/ServiceLanding";
import { ServicePageShell, servicePageJsonLd } from "@/components/sections/ServicePageShell";

export const metadata: Metadata = {
  title: "Inspection, Concrete Services & Industrial Access | Skyriders",
  description: "Explore Skyriders inspection and NDT, concrete testing and repair, industrial access, netting and height safety installations in South Africa.",
  alternates: { canonical: "/services/inspection-concrete-access" },
  openGraph: { title: "Inspection, Concrete & Industrial Access | Skyriders", description: "Technical inspection, concrete care and engineered access for demanding industrial assets.", url: "/services/inspection-concrete-access", images: [{ url: "/images/services/concrete-services.webp", width: 1672, height: 941, alt: "Concrete core samples and cover meter inspection" }] },
  twitter: { card: "summary_large_image" },
};

export default function Page() {
  return <ServicePageShell jsonLd={servicePageJsonLd("structures")}><ServiceLanding pageKey="structures" /></ServicePageShell>;
}
