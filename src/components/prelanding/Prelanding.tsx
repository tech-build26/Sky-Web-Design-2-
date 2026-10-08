"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    SkyridersPrelanding?: { init(scope?: Document | HTMLElement): () => void };
  }
}

export function Prelanding({ markup }: { markup: string }) {
  const container = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready && container.current) {
      return window.SkyridersPrelanding?.init(container.current);
    }
  }, [ready]);

  return (
    <>
      <div ref={container} dangerouslySetInnerHTML={{ __html: markup }} />
      <Script src="/pre-landing/prelanding.js" strategy="afterInteractive" onReady={() => setReady(true)} />
    </>
  );
}
