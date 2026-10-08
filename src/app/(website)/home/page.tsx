import { Hero } from "@/components/hero/Hero";
import { PageDestinations } from "@/components/sections/PageDestinations";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ScrollReveals } from "@/components/site/ScrollReveals";
import { RopeTechnician } from "@/components/site/RopeTechnician";
import { ScrollToTop } from "@/components/site/ScrollToTop";

export default function Home() {
  return (
    <>
      <ScrollReveals />
      <RopeTechnician />
      <main id="main">
        <Hero />
        <PageDestinations />
      </main>
      <SiteFooter />
      <ScrollToTop />
    </>
  );
}
