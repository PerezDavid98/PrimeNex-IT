import { site } from "@/lib/content";
import type { Dictionary } from "@/lib/i18n/dictionaries";

/** WhatsApp glyph. Nominative use, linking to their service. */
export function WhatsAppGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.174-.297-.019-.458.13-.606.134-.133.347-.347.52-.52.174-.174.232-.298.347-.497.115-.198.058-.372-.015-.52-.074-.149-.669-1.612-.916-2.207-.244-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

/** LinkedIn glyph, box-less so it reads as white on the brand blue. */
export function LinkedInGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" className={className}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05A4.2 4.2 0 0 1 17.6 8.7c3 0 3.4 2 3.4 4.6V21h-4v-6.3c0-1.5-.3-2.6-1.8-2.6s-2 1.1-2 2.5V21h-3.2z" />
    </svg>
  );
}

export function ChannelDock({
  whatsappHref,
  whatsappLabel,
  a11y,
}: {
  whatsappHref: string;
  whatsappLabel: string;
  a11y: Dictionary["a11y"];
}) {
  const channels = [
    {
      key: "linkedin",
      label: "LinkedIn",
      aria: a11y.linkedin,
      href: site.linkedin,
      Glyph: LinkedInGlyph,
    },
    {
      key: "whatsapp",
      label: whatsappLabel,
      aria: a11y.whatsapp,
      href: whatsappHref,
      Glyph: WhatsAppGlyph,
    },
  ];

  return (
    <div className="channel-dock">
      {channels.map((channel) => (
        <a
          key={channel.key}
          href={channel.href}
          target="_blank"
          rel="noreferrer"
          aria-label={channel.aria}
          data-channel={channel.key}
          className="channel lifted"
        >
          <span className="channel__label">{channel.label}</span>
          <span className="channel__icon">
            <channel.Glyph className="h-[1.375rem] w-[1.375rem]" />
          </span>
        </a>
      ))}
    </div>
  );
}
