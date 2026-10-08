import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  const url = getSiteUrl();
  return url && process.env.NODE_ENV === "production"
    ? { rules: { userAgent: "*", allow: "/" }, sitemap: new URL("sitemap.xml", url).href }
    : { rules: { userAgent: "*", disallow: "/" } };
}
