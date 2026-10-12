import Link from "next/link";
import type { ComponentProps } from "react";

// Keep contact/external/hash actions native; internal pages share the Next router.
export function SiteLink({ href, prefetch = false, ...props }: ComponentProps<"a"> & { prefetch?: boolean }) {
  if (href?.startsWith("/") && !href.startsWith("//")) return <Link href={href} prefetch={prefetch} {...props} />;
  return <a href={href} {...props} />;
}
