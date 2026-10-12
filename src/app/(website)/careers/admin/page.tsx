import type { Metadata } from "next";
import { CareersAdmin } from "@/components/careers/CareersAdmin";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Recruitment administration | Skyriders", robots: { index: false, follow: false }, alternates: { canonical: "/careers/admin" },
};
export default function CareersAdminPage() {
  return <main id="main" tabIndex={-1}><CareersAdmin url={process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""} publicKey={process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""} showEditorPreview={process.env.NODE_ENV === "development"} /></main>;
}
