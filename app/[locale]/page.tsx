import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { countryOptions } from "@/lib/i18n/countries";
import { site, whatsappHref } from "@/lib/content";
import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { Statement } from "@/components/statement";
import { Services } from "@/components/services";
import { Capabilities } from "@/components/capabilities";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { SiteFooter } from "@/components/site-footer";
import { ChannelDock } from "@/components/ui/channels";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  const dict = getDictionary(locale);
  const waHref = whatsappHref(dict.whatsapp.prefill);

  // Resolved on the server so the option list is in the HTML: the form works
  // before hydration, and server and client can never disagree about it.
  const countries = countryOptions(locale);

  return (
    <>
      <SiteHeader
        locale={locale}
        nav={dict.nav}
        cta={dict.cta}
        a11y={dict.a11y}
        phone={site.phone}
        email={site.email}
      />

      <main id="main">
        <Hero
          hero={dict.hero}
          practiceIndex={dict.practiceIndex}
          facts={dict.facts}
          cta={dict.cta}
          a11y={dict.a11y}
        />
        <Statement statement={dict.statement} />
        <Services services={dict.services} a11y={dict.a11y} />
        <Capabilities capabilities={dict.capabilities} />
        <About about={dict.about} />
        <Contact
          contact={dict.contact}
          countries={countries}
          site={site}
          whatsappHref={waHref}
        />
      </main>

      <SiteFooter
        locale={locale}
        footer={dict.footer}
        nav={dict.nav}
        serviceTabs={dict.services.groups.map((g) => g.tab)}
        whatsappHref={waHref}
        whatsappLabel={dict.whatsapp.label}
      />

      <ChannelDock whatsappHref={waHref} whatsappLabel={dict.whatsapp.label} a11y={dict.a11y} />
    </>
  );
}
