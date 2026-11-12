// The email an adviser receives the moment their application is set to
// "approved" in /funnel.
//
// The wording is firm-facing, so it is Daren's (ONBOARDING.md: firm-facing wording is
// Daren-only). Edit it here - this module is copy and nothing else, so changing what
// the email says never touches the transport or the approval path.
//
// What it must get right, because approval IS the access switch:
//  - there is nothing to install or pay for: approval already opened the door
//  - there IS one thing to accept: the engine's user agreement, at first sign-in (the
//    gate has been on live since 13 Oct 2026). The five points below are the agreement's
//    own plain-English summary, copied from legal/user-agreement-v0.1.md in the engine
//    repo. When the engine bumps CURRENT_VERSION, check them against the new file.
//  - she signs in at the engine with the SAME work domain she applied with (the grant
//    is by email domain - beta_grants.py in the engine matches on it)
//  - the 31 days start at her FIRST sign-in, not at approval, so nothing is burning
//  - every output is a draft a qualified adviser must review: never imply otherwise

import type { StoredApplication } from "@/lib/azure-storage";

const SIGN_IN_URL = "https://app.theadviceengine.ai";
const CONTACT_EMAIL = "hello@theadviceengine.ai";
const TERMS_URL = "https://theadviceengine.ai/terms";
// The same booking link the site's /demo page and the chat widget use. The TRAILING
// HYPHEN is part of the slug, not a typo - do not tidy it away. Also used by the
// acknowledgement email, so this stays its one home.
export const BOOKING_URL = "https://meetings.hubspot.com/daren8/advice-engine-demo-";

function firstName(fullName: string) {
  const first = (fullName ?? "").trim().split(/\s+/)[0] ?? "";
  return first || "there";
}

function domainOf(workEmail: string) {
  const at = (workEmail ?? "").lastIndexOf("@");
  return at === -1 ? "" : workEmail.slice(at + 1).toLowerCase();
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildApprovalEmail(application: StoredApplication) {
  const name = escapeHtml(firstName(application.fullName));
  const firm = escapeHtml((application.firmName ?? "").trim());
  const domain = escapeHtml(domainOf(application.workEmail));

  const subject = "Your Advice Engine access is open";

  const diaryParagraph = `<p style="margin:0 0 16px">Before you start, put 30 minutes in my
         diary: <a href="${BOOKING_URL}">choose a time here</a>. I would rather walk you through
         your first real job than have you work it out alone. <strong>Bring a case you are going
         to have to draft a report for anyway</strong> - a live suitability, a review, a switch
         or a transfer. We run that one, and you get a usable draft out of the call instead of a
         demonstration.</p>`;

  const html = `<!DOCTYPE html>
<html lang="en-GB"><body style="margin:0;padding:0;background:#ffffff">
<div style="max-width:560px;margin:0 auto;padding:24px;font-family:Segoe UI,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.55;color:#1f2933">

  <p style="margin:0 0 16px">${name},</p>

  <p style="margin:0 0 16px">Thank you for applying${firm ? ` on behalf of ${firm}` : ""}. I have
    checked your firm's position on the FCA register and approved your access, so it is open
    now. There is nothing to install and no payment details are taken.</p>

  <p style="margin:0 0 8px"><strong>To get in</strong></p>
  <p style="margin:0 0 16px">
    Go to <a href="${SIGN_IN_URL}">${SIGN_IN_URL}</a> and sign in with your work Microsoft 365
    account${domain ? ` - the same <strong>@${domain}</strong> address you applied with` : ""}.
    There is no separate password to set. Your firm's trial is created the moment you first sign
    in and runs for 31 days from that point, so nothing is counting down while this email sits in
    your inbox.</p>

  <p style="margin:0 0 8px"><strong>One thing to confirm at your first sign-in</strong></p>
  <p style="margin:0 0 8px">Before the engine opens, you are asked to confirm our user
    agreement. It is a short read and comes down to five points:</p>
  <ol style="margin:0 0 16px;padding-left:20px">
    <li style="margin:0 0 6px">The engine, its prompts, logic, templates, workflows, output
      design and documentation belong to The Advice Engine Ltd. You get a personal right to
      use it for your firm's advice work, nothing more.</li>
    <li style="margin:0 0 6px">You must not copy, extract, reverse engineer or recreate it, or
      help anyone else do so, including by feeding its screens, prompts or outputs into another
      AI tool to rebuild it.</li>
    <li style="margin:0 0 6px">Everything you see about how it works is confidential, and stays
      confidential after you stop using it.</li>
    <li style="margin:0 0 6px">Your log-in is yours alone. Do not share it.</li>
    <li>We monitor use to protect the service, and we can suspend access if we see
      misuse.</li>
  </ol>
  <p style="margin:0 0 16px">The full terms are on screen when you sign in. If you would like
    a copy for your files first, reply to this email and I will send it. Your firm's use of the
    engine is also covered by our <a href="${TERMS_URL}">terms of use</a>.</p>

  ${diaryParagraph}

  <p style="margin:0 0 16px">If you would rather have a look round first, start with the Test
    Drive: a fictitious client through the real pipeline, so you can judge the workflow without
    live client information. Your firm is verified for real client data whenever you are ready
    for it - case material is processed in memory, protected while it is in use and cleared when
    your session ends. It is never stored by the engine and never used to train AI models.</p>

  <p style="margin:0 0 16px">One thing said plainly: every output is a <strong>draft</strong>.
    The engine never gives advice, never approves anything and never certifies compliance. A
    named, qualified adviser at your firm reviews and approves every document before it goes
    anywhere.</p>

  <p style="margin:0 0 16px">I want to know which workflows genuinely save you time and
    where the engine falls short, so tell me when it does. Any
    trouble signing in, reply to this email or write to
    <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>.</p>

  <p style="margin:0 0 4px">Daren Wallbank</p>
  <p style="margin:0;color:#52606d">The Advice Engine &middot;
    <a href="https://theadviceengine.ai" style="color:#52606d">theadviceengine.ai</a></p>

</div></body></html>`;

  return { subject, html };
}
