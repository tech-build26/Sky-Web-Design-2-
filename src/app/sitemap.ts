import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = getSiteUrl();
  return url ? [{ url: url.href }, { url: new URL("home", url).href }, { url: new URL("industries", url).href }, { url: new URL("about", url).href }, { url: new URL("contact", url).href }, { url: new URL("careers", url).href }, { url: new URL("services/inspection-concrete-access", url).href }, { url: new URL("services/maintenance-confined-space-drone", url).href }] : [];
}
