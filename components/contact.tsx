"use client";

import { useRef, useState } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { SectionHeading } from "./ui/section-heading";

type Status = "idle" | "sending" | "sent" | "error";
type FieldName = "name" | "email" | "organization" | "role" | "country" | "message";

const FIELD_ORDER: FieldName[] = [
  "name",
  "email",
  "organization",
  "role",
  "country",
  "message",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function Contact({
  contact,
  countries,
  site,
  whatsappHref,
}: {
  contact: Dictionary["contact"];
  countries: { code: string; name: string }[];
  site: { email: string; phone: string; phoneHref: string; location: string; linkedin: string };
  whatsappHref: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  /** Validated here rather than by the browser, so the message sits with the
   *  field, reads in the visitor's language, and does not vanish on scroll. */
  function validate(data: Record<string, string>) {
    const next: Partial<Record<FieldName, string>> = {};
    if (!data.name?.trim()) next.name = contact.errors.name;
    if (!EMAIL_RE.test(data.email?.trim() ?? "")) next.email = contact.errors.email;
    if (!data.organization?.trim()) next.organization = contact.errors.organization;
    if (!data.role?.trim()) next.role = contact.errors.role;
    if (!data.country?.trim()) next.country = contact.errors.country;
    if ((data.message?.trim().length ?? 0) < 10) next.message = contact.errors.message;
    return next;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    const found = validate(data);
    setErrors(found);
    setFormError(null);

    if (Object.keys(found).length > 0) {
      // Send the keyboard to the first problem instead of making them hunt.
      const first = FIELD_ORDER.find((name) => found[name]);
      if (first) form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error ?? contact.errors.generic);
      }
      form.reset();
      setStatus("sent");
    } catch (cause) {
      setFormError(cause instanceof Error ? cause.message : contact.errors.generic);
      setStatus("error");
    }
  }

  /** Clear a field's error as soon as the visitor starts fixing it. */
  function clearError(name: FieldName) {
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  }

  const rows = [
    { label: contact.rows.whatsapp, value: site.phone, href: whatsappHref, external: true },
    { label: contact.rows.email, value: site.email, href: `mailto:${site.email}` },
    { label: contact.rows.office, value: site.location },
    { label: contact.rows.linkedin, value: "primenex-it", href: site.linkedin, external: true },
  ];

  return (
    <section id="contact" className="scroll-mt-20 py-20 md:py-32">
      <div className="shell">
        <SectionHeading index="04" label={contact.label} title={contact.title}>
          {contact.lede}
        </SectionHeading>

        <div className="grid12 mt-14 md:mt-20">
          <dl className="col-span-12 lg:col-span-3">
            {rows.map((row) => (
              <div key={row.label} className="border-t border-rule py-4 last:border-b">
                <dt className="t-mono">{row.label}</dt>
                <dd className="t-h4 mt-1.5 break-words">
                  {row.href ? (
                    <a
                      href={row.href}
                      target={row.external ? "_blank" : undefined}
                      rel={row.external ? "noreferrer" : undefined}
                      className="link inline-flex min-h-11 items-center"
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

          <div className="col-span-12 mt-12 lg:col-span-8 lg:col-start-5 lg:mt-0">
            {status === "sent" ? (
              <div className="border-t border-ink pt-8">
                <p className="t-mono">{contact.sentLabel}</p>
                <p className="t-h2 mt-5 max-w-xl">{contact.sentTitle}</p>
                <p className="t-lede mt-6 max-w-lg">
                  {contact.sentBody}{" "}
                  <a href={`mailto:${site.email}`} className="link-static">
                    {site.email}
                  </a>
                  .
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="btn btn-outline mt-10"
                >
                  {contact.sendAnother}
                </button>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={onSubmit}
                noValidate
                className="grid gap-x-[var(--column-gap)] gap-y-8 sm:grid-cols-2"
              >
                {(["name", "email", "organization", "role"] as const).map((name) => (
                  <Field
                    key={name}
                    name={name}
                    label={contact.fields[name]}
                    error={errors[name]}
                    onInput={() => clearError(name)}
                  >
                    <input
                      id={`f-${name}`}
                      name={name}
                      type={name === "email" ? "email" : "text"}
                      autoComplete={
                        name === "email"
                          ? "email"
                          : name === "name"
                            ? "name"
                            : name === "organization"
                              ? "organization"
                              : "organization-title"
                      }
                      aria-invalid={errors[name] ? true : undefined}
                      aria-describedby={errors[name] ? `e-${name}` : undefined}
                      className="field mt-2"
                    />
                  </Field>
                ))}

                <Field
                  name="country"
                  label={contact.fields.country}
                  error={errors.country}
                  onInput={() => clearError("country")}
                  className="sm:col-span-2"
                >
                  <select
                    id="f-country"
                    name="country"
                    defaultValue=""
                    aria-invalid={errors.country ? true : undefined}
                    aria-describedby={errors.country ? "e-country" : undefined}
                    className="field field-select mt-2"
                  >
                    <option value="" disabled>
                      {contact.countryPlaceholder}
                    </option>
                    {countries.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field
                  name="message"
                  label={contact.fields.message}
                  error={errors.message}
                  onInput={() => clearError("message")}
                  className="sm:col-span-2"
                >
                  <textarea
                    id="f-message"
                    name="message"
                    rows={4}
                    placeholder={contact.messagePlaceholder}
                    aria-invalid={errors.message ? true : undefined}
                    aria-describedby={errors.message ? "e-message" : undefined}
                    className="field mt-2 resize-y"
                  />
                </Field>

                <div className="flex flex-wrap items-center gap-6 sm:col-span-2">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn btn-solid disabled:cursor-wait disabled:opacity-60"
                  >
                    {status === "sending" ? contact.sending : contact.submit}
                    {status === "sending" ? (
                      <Spinner />
                    ) : (
                      <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
                        <path d="M0 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" />
                      </svg>
                    )}
                  </button>
                  <p className="t-mono max-w-[18rem] normal-case">{contact.requiredNote}</p>
                </div>

                <div aria-live="assertive" className="sm:col-span-2">
                  {formError ? (
                    <p className="t-body border-l-2 border-cyan-deep pl-4 text-ink">
                      {formError} {contact.errors.fallback}{" "}
                      <a href={`mailto:${site.email}`} className="link-static">
                        {site.email}
                      </a>
                      .
                    </p>
                  ) : null}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Label above, control, then the error immediately below the control it belongs to. */
function Field({
  name,
  label,
  error,
  children,
  className = "",
  onInput,
}: {
  name: string;
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
  onInput?: () => void;
}) {
  return (
    <div className={className} onInput={onInput}>
      <label htmlFor={`f-${name}`} className="t-mono">
        {label} <span className="text-cyan-deep">*</span>
      </label>
      {children}
      {/* Reserved by the grid gap rather than by a fixed height, so the
          appearance of a message does not shove the next field down. */}
      {error ? (
        <p id={`e-${name}`} className="mt-2 text-[0.8125rem] leading-snug text-ink">
          <span aria-hidden className="mr-1.5 text-cyan-deep">
            ✕
          </span>
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Spinner() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" aria-hidden className="sending-spin">
      <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2" />
      <path d="M8 1.5A6.5 6.5 0 0 1 14.5 8" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
