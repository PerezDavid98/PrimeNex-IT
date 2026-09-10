"use client";

import { useState } from "react";
import { countries, site, whatsapp, whatsappHref } from "@/lib/content";
import { SectionHeading } from "./ui/section-heading";

type Status = "idle" | "sending" | "sent" | "error";

const fields = [
  { name: "name", label: "Name", type: "text", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "organization", label: "Organization", type: "text", autoComplete: "organization" },
  { name: "role", label: "Job title", type: "text", autoComplete: "organization-title" },
] as const;

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Something went wrong on our side.");
      }

      form.reset();
      setStatus("sent");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unexpected error.");
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="scroll-mt-20 py-20 md:py-32">
      <div className="shell">
        <SectionHeading index="04" label="Contact us" title="Tell us what you are building">
          Describe the problem in your own words. You will hear back from an engineer.
        </SectionHeading>

        <div className="grid12 mt-14 md:mt-20">
          {/* details */}
          <dl className="col-span-12 lg:col-span-3">
            {[
              { label: whatsapp.label, value: site.phone, href: whatsappHref },
              { label: "Email", value: site.email, href: `mailto:${site.email}` },
              { label: "Phone", value: site.phone, href: `tel:${site.phoneHref}` },
              { label: "Office", value: site.location },
              { label: "LinkedIn", value: "primenex-it", href: site.linkedin },
            ].map((row) => (
              <div key={row.label} className="border-t border-rule py-4 last:border-b">
                <dt className="t-mono">{row.label}</dt>
                <dd className="t-h4 mt-1.5 break-words">
                  {row.href ? (
                    <a
                      href={row.href}
                      target={row.href.startsWith("http") ? "_blank" : undefined}
                      rel={row.href.startsWith("http") ? "noreferrer" : undefined}
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

          {/* form */}
          <div className="col-span-12 mt-12 lg:col-span-8 lg:col-start-5 lg:mt-0">
            {status === "sent" ? (
              <div className="panel-enter border-t border-ink pt-8">
                  <p className="t-mono">Received</p>
                  <p className="t-h2 mt-5 max-w-xl">Thank you for reaching out.</p>
                  <p className="t-lede mt-6 max-w-lg">
                    We appreciate your message and will be in touch with you shortly. If it is
                    urgent, write to{" "}
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
                    Send another message
                  </button>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="panel-enter grid gap-x-[var(--column-gap)] gap-y-9 sm:grid-cols-2"
              >
                  {fields.map((field) => (
                    <label key={field.name} className="block">
                      <span className="t-mono">
                        {field.label} <span className="text-cyan-deep">*</span>
                      </span>
                      <input
                        className="field mt-2"
                        name={field.name}
                        type={field.type}
                        autoComplete={field.autoComplete}
                        required
                      />
                    </label>
                  ))}

                  <label className="block sm:col-span-2">
                    <span className="t-mono">
                      Country <span className="text-cyan-deep">*</span>
                    </span>
                    <select
                      name="country"
                      required
                      defaultValue=""
                      className="field field-select mt-2"
                    >
                      <option value="" disabled>
                        Select
                      </option>
                      {countries.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block sm:col-span-2">
                    <span className="t-mono">
                      Brief description <span className="text-cyan-deep">*</span>
                    </span>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      minLength={10}
                      placeholder="What are you trying to build, fix or migrate?"
                      className="field mt-2 resize-y"
                    />
                  </label>

                  <div className="flex flex-wrap items-center gap-6 sm:col-span-2">
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="btn btn-solid disabled:cursor-wait disabled:opacity-60"
                    >
                      {status === "sending" ? "Sending" : "Send message"}
                      {status !== "sending" ? (
                        <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
                          <path
                            d="M0 5h12M9 1l4 4-4 4"
                            stroke="currentColor"
                            strokeWidth="1.2"
                          />
                        </svg>
                      ) : null}
                    </button>
                    <p className="t-mono max-w-[18rem] normal-case">
                      Required fields are marked. We only use your details to answer you.
                    </p>
                  </div>

                  <div aria-live="polite" className="sm:col-span-2">
                    {status === "error" && error ? (
                      <p className="t-body border-l-2 border-cyan-deep pl-4 text-ink">
                        {error} You can also write to{" "}
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
