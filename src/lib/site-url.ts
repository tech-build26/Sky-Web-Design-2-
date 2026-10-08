// A deployment origin is supplied by the operator, never inferred from the old site.
export function getSiteUrl(): URL | undefined {
  const value = process.env.SITE_URL?.trim();
  if (!value) return undefined;
  const url = new URL(value);
  if (url.protocol !== "https:" || url.username || url.password || url.pathname !== "/" || url.search || url.hash) {
    throw new Error("SITE_URL must be the verified HTTPS origin, without a path, credentials, query or fragment.");
  }
  return url;
}
