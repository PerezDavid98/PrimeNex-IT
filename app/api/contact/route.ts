import { NextResponse } from "next/server";

/**
 * Contact endpoint.
 *
 * Validation and rate-limit-friendly shape are done here. Delivery is NOT wired
 * yet: set CONTACT_WEBHOOK_URL (any endpoint that accepts JSON — Resend, a
 * HubSpot form, Zapier, a Slack webhook) and submissions are forwarded there.
 * Without it the submission is logged server-side only, so keep the mailto
 * fallback visible in the UI.
 */

type Payload = {
  name?: string;
  email?: string;
  organization?: string;
  role?: string;
  country?: string;
  message?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let body: Payload;

  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const organization = body.organization?.trim() ?? "";
  const role = body.role?.trim() ?? "";
  const country = body.country?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || !organization || !role || !country) {
    return NextResponse.json({ error: "Please complete every required field." }, { status: 422 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "That email address looks incomplete." }, { status: 422 });
  }
  if (message.length < 10) {
    return NextResponse.json(
      { error: "Please add a little more detail about your project." },
      { status: 422 },
    );
  }

  const submission = {
    name,
    email,
    organization,
    role,
    country,
    message,
    receivedAt: new Date().toISOString(),
  };

  const webhook = process.env.CONTACT_WEBHOOK_URL;

  if (webhook) {
    try {
      const forwarded = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission),
      });
      if (!forwarded.ok) throw new Error(`Webhook responded ${forwarded.status}`);
    } catch (cause) {
      console.error("[contact] forwarding failed", cause);
      return NextResponse.json(
        { error: "We could not deliver your message." },
        { status: 502 },
      );
    }
  } else {
    console.info("[contact] submission received (no CONTACT_WEBHOOK_URL set)", submission);
  }

  return NextResponse.json({ ok: true });
}
