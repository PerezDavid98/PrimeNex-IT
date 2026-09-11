import { NextResponse } from "next/server";

/**
 * Contact endpoint.
 *
 * Validation happens here regardless. Delivery has three tiers, tried in
 * order, so the form degrades instead of failing:
 *
 *   1. RESEND_API_KEY set  → emailed to CONTACT_TO_EMAIL via Resend.
 *   2. CONTACT_WEBHOOK_URL → posted as JSON (Zapier, Make, n8n, Slack…).
 *   3. Neither             → logged server-side only. The form still answers
 *                            the visitor, and the UI keeps a visible mailto
 *                            fallback so a lead is never silently lost.
 *
 * Tier 3 notifies nobody. Set one of the first two before launch.
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

const TO = process.env.CONTACT_TO_EMAIL ?? "davidjperezca@gmail.com";
const FROM = process.env.CONTACT_FROM_EMAIL ?? "PrimeNex IT <onboarding@resend.dev>";

export async function POST(request: Request) {
  let body: Payload;

  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  const field = (value?: string) => (value ?? "").trim();
  const name = field(body.name);
  const email = field(body.email);
  const organization = field(body.organization);
  const role = field(body.role);
  const country = field(body.country);
  const message = field(body.message);

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

  const submission = { name, email, organization, role, country, message };

  try {
    if (process.env.RESEND_API_KEY) {
      await sendWithResend(submission);
    } else if (process.env.CONTACT_WEBHOOK_URL) {
      await forwardToWebhook(process.env.CONTACT_WEBHOOK_URL, submission);
    } else {
      console.info("[contact] received — no delivery configured, nobody notified", submission);
    }
  } catch (cause) {
    console.error("[contact] delivery failed", cause);
    return NextResponse.json({ error: "We could not deliver your message." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

type Submission = Record<"name" | "email" | "organization" | "role" | "country" | "message", string>;

async function sendWithResend(submission: Submission) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      // Replying goes straight back to the person who wrote in.
      reply_to: submission.email,
      subject: `New enquiry — ${submission.organization}`,
      text: [
        `Name:         ${submission.name}`,
        `Email:        ${submission.email}`,
        `Organization: ${submission.organization}`,
        `Job title:    ${submission.role}`,
        `Country:      ${submission.country}`,
        "",
        submission.message,
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend responded ${response.status}: ${await response.text()}`);
  }
}

async function forwardToWebhook(url: string, submission: Submission) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(submission),
  });

  if (!response.ok) throw new Error(`Webhook responded ${response.status}`);
}
