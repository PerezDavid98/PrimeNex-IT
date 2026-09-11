import { NextResponse, type NextRequest } from "next/server";
import { localeCodes, defaultLocale, isLocale, type Locale } from "@/lib/i18n/config";

export const LOCALE_COOKIE = "pnx_locale";

/**
 * Accept-Language negotiation.
 *
 * Walks the header by descending q-value and truncates subtags, so `es-CR`
 * matches `es` and `zh-Hans-CN` matches `zh`. A hint, never a cage: the cookie
 * set by an explicit choice in the switcher always wins over the header.
 */
function negotiate(header: string | null): Locale {
  if (!header) return defaultLocale;

  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return { tag: tag.trim().toLowerCase(), q: q ? Number(q.split("=")[1]) || 0 : 1 };
    })
    .filter((entry) => entry.tag && entry.q > 0)
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    if (tag === "*") break;
    let candidate = tag;
    while (candidate) {
      const hit = localeCodes.find((code) => code === candidate);
      if (hit) return hit;
      const cut = candidate.lastIndexOf("-");
      if (cut === -1) break;
      candidate = candidate.slice(0, cut);
    }
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  const chosen =
    cookie && isLocale(cookie) ? cookie : negotiate(request.headers.get("accept-language"));

  const url = request.nextUrl.clone();
  url.pathname = `/${chosen}`;

  // 307, not 308: the destination depends on the request. A permanent redirect
  // would be cached by the browser and pin the visitor to one language forever.
  const response = NextResponse.redirect(url, 307);
  response.headers.set("Cache-Control", "no-store");
  response.headers.set("Vary", "Accept-Language, Cookie");
  return response;
}

// Scoped to the bare root only. The proxy therefore never sees a
// locale-prefixed URL, which makes a redirect loop structurally impossible and
// keeps the six locale pages plain cacheable static documents.
export const config = { matcher: "/" };
