import type { Dictionary } from "@/lib/i18n/dictionaries";
import { site } from "@/lib/content";
import { SectionHeading } from "./ui/section-heading";
import { WhatsAppGlyph } from "./ui/channels";

/**
 * Contact, without a form.
 *
 * There was a six-field form here with country selection and per-field
 * validation. It is gone, at the client's instruction, and the instruction is
 * right: a form on a site this size asks a stranger to fill in six boxes and
 * then wait, while WhatsApp puts them in a conversation in one tap — on the
 * channel this market actually uses. It also removes the delivery problem
 * entirely. There is no longer anything to configure and nothing that can
 * silently swallow a lead.
 */
export function Contact({
  contact,
  whatsappHref,
  whatsappLabel,
}: {
  contact: Dictionary["contact"];
  whatsappHref: string;
  whatsappLabel: string;
}) {
  const rows = [
    { label: contact.rows.email, value: site.email, href: `mailto:${site.email}` },
    { label: contact.rows.phone, value: site.phone, href: `tel:${site.phoneHref}` },
    { label: contact.rows.linkedin, value: "primenex-it", href: site.linkedin, external: true },
    { label: contact.rows.office, value: site.location },
  ];

  return (
    <section id="contact" className="scroll-mt-20 py-16 md:py-24">
      <div className="shell">
        <SectionHeading title={contact.title}>{contact.lede}</SectionHeading>

        <div className="mt-12 grid gap-x-12 gap-y-12 md:mt-16 lg:grid-cols-[1fr_22rem]">
          {/* The one action, at the size of an action. min-w-0 because a grid
              item defaults to min-width:auto, and without it the longest
              unbreakable string in this column sets the column's width and
              pushes the page off a 320px screen. */}
          <div className="min-w-0">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              /* WhatsApp's darker green. Their #25D366 gives white text 1.98:1
                 and the lighter mid-green 3.03:1 — both fail at this size.
                 This holds 5.42:1 and still reads as the brand. */
              /* Full width on a phone, which is both the convention for a
                 primary action and the only way "Schreiben Sie uns auf
                 WhatsApp" fits a 320px screen. */
              className="flex w-full items-center justify-center gap-3 rounded-[3px] bg-[#0d7a3f] px-6 py-4 text-center text-[1.0625rem] font-semibold text-balance text-white transition-[filter] duration-200 hover:brightness-90 sm:inline-flex sm:w-auto sm:py-3.5"
            >
              <WhatsAppGlyph className="h-5 w-5" />
              {contact.whatsappCta}
            </a>
            <p className="t-body mt-5">{contact.whatsappNote}</p>
          </div>

          {/* Everything else, as an entry list. */}
          <dl className="min-w-0">
            {rows.map((row, i) => (
              <div
                key={row.label}
                className={`grid grid-cols-[5rem_1fr] gap-x-3 px-4 py-3.5 ${
                  i % 2 === 0 ? "bg-band" : ""
                }`}
              >
                <dt className="text-[0.9375rem] font-semibold">{row.label}</dt>
                <dd className="min-w-0 text-[0.9375rem] break-all sm:break-words">
                  {row.href ? (
                    <a
                      href={row.href}
                      target={row.external ? "_blank" : undefined}
                      rel={row.external ? "noreferrer" : undefined}
                      className="link"
                    >
                      {row.value}
                    </a>
                  ) : (
                    row.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
