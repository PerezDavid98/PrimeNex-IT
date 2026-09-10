import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { Capabilities } from "@/components/capabilities";
import { Statement } from "@/components/statement";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Statement />
        <Services />
        <Capabilities />
        <About />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
