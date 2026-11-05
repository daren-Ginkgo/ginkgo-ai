// The email an applicant receives the moment their application on /start is saved.
//
// The wording is firm-facing, so it is Daren's (signed off 4 Oct 2026; draft in
// Advice Engine\Status and handovers; revised 5 Nov 2026 for the 30-day trial). Edit the copy here; the send rules below and
// the route stay as they are.
//
// Kept free of runtime imports (types only) so it runs under plain Node in
// tests/acknowledgement-email.test.mjs. The booking link and the send function are
// passed in, so the link has one home (approval-email.ts) and the test can mock mail.
//
// Rules:
//  - never for a duplicate (they were acknowledged the first time)
//  - never for a suspected-spam row: the address may not belong to whoever typed it
//  - no BCC: Daren already gets his own "New application" email
//  - NEVER throws: the application is saved, and a mail failure must not fail it

import type { StoredApplication } from "@/lib/azure-storage";
import type { NotificationOutcome, SendFn } from "@/lib/application-notification";

const CONTACT_EMAIL = "hello@theadviceengine.ai";

function firstName(fullName: string) {
  const first = (fullName ?? "").trim().split(/\s+/)[0] ?? "";
  return first || "there";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const SIGN_OFF = `<p style="margin:0 0 4px">Daren Wallbank</p>
  <p style="margin:0;color:#52606d">The Advice Engine &middot;
    <a href="https://theadviceengine.ai" style="color:#52606d">theadviceengine.ai</a></p>`;

const CORRECTIONS = `<p style="margin:0 0 16px">If anything in your application needs correcting, just reply
    to this email or write to <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>.</p>`;

function wrap(body: string) {
  return `<!DOCTYPE html>
<html lang="en-GB"><body style="margin:0;padding:0;background:#ffffff">
<div style="max-width:560px;margin:0 auto;padding:24px;font-family:Segoe UI,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.55;color:#1f2933">
${body}
</div></body></html>`;
}

export function buildAcknowledgementEmail(application: StoredApplication, bookingUrl: string) {
  const name = escapeHtml(firstName(application.fullName));
  const firm = escapeHtml((application.firmName ?? "").trim());
  const onBehalf = firm ? ` on behalf of ${firm}` : "";

  if (application.status === "waitlist") {
    return {
      subject: "You are on The Advice Engine waiting list",
      html: wrap(`  <p style="margin:0 0 16px">${name},</p>

  <p style="margin:0 0 16px">Thank you for applying${onBehalf}. The 15 founding places are
    currently allocated, so you are on the waiting list. If a place is released, I will contact
    applicants in the order they applied.</p>

  <p style="margin:0 0 16px">There is nothing you need to do in the meantime.</p>

  ${CORRECTIONS}

  ${SIGN_OFF}`),
    };
  }

  return {
    subject: "We have your Advice Engine application",
    html: wrap(`  <p style="margin:0 0 16px">${name},</p>

  <p style="margin:0 0 16px">Thank you for applying for access to The Advice
    Engine${onBehalf}. This is just to confirm your application has reached me.</p>

  <p style="margin:0 0 8px"><strong>What happens next</strong></p>
  <ol style="margin:0 0 16px;padding-left:20px">
    <li style="margin:0 0 6px">I check your firm on the FCA register, usually
      within two working days.</li>
    <li style="margin:0 0 6px">You then get a second email with everything you need to sign
      in using your existing Microsoft 365 work account.</li>
    <li>Your 30 free days start at your first sign-in, not before. There are no card details
      to give and no commitment.</li>
  </ol>

  <p style="margin:0 0 16px">There is no checkout, and nothing to pay or install. Please don't
    send any client information before your access is confirmed.</p>

  <p style="margin:0 0 16px">If you would like a walkthrough first,
    <a href="${bookingUrl}">choose a time in my diary here</a>.</p>

  ${CORRECTIONS}

  ${SIGN_OFF}`),
  };
}

export async function acknowledgeApplication(
  result: { duplicate: boolean; application: StoredApplication },
  bookingUrl: string,
  send: SendFn,
): Promise<NotificationOutcome> {
  if (result.duplicate || result.application.suspectedSpam) return "skipped";
  try {
    const { subject, html } = buildAcknowledgementEmail(result.application, bookingUrl);
    return (await send({ to: result.application.workEmail, subject, html, bcc: false })) ? "sent" : "failed";
  } catch {
    return "failed";
  }
}
