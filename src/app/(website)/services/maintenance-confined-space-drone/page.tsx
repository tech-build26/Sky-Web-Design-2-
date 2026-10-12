import type { Metadata } from "next";
import { ServiceLanding } from "@/components/sections/ServiceLanding";
import { ServicePageShell, servicePageJsonLd } from "@/components/sections/ServicePageShell";

export const metadata: Metadata = {
  title: "Maintenance, Confined Space & Drone Inspection | Skyriders",
  description: "Explore industrial maintenance and cleaning, confined-space rescue standby, and indoor or outdoor drone inspection from Skyriders in South Africa.",
  alternates: { canonical: "/services/maintenance-confined-space-drone" },
  openGraph: { title: "Maintenance, Confined Space & Drone Inspection | Skyriders", description: "Asset care, confined-space support and remote visual inspection for demanding industrial environments.", url: "/services/maintenance-confined-space-drone", images: [{ url: "/images/services/drone-inspection.webp", width: 1672, height: 941, alt: "Collision-tolerant drone inspecting an industrial boiler interior" }] },
  twitter: { card: "summary_large_image" },
};

export default function Page() {
  return <ServicePageShell jsonLd={servicePageJsonLd("operations")}><ServiceLanding pageKey="operations" /></ServicePageShell>;
}
