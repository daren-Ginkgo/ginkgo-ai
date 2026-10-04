// The email Daren receives the moment someone applies on /start.
//
// Until this existed an application was saved in silence and only seen if someone
// opened /funnel, while the page promised the applicant a personal call.
//
// Kept free of runtime imports (types only) so it runs under plain Node in
// tests/application-notification.test.mjs without the Next toolchain. The send
// function is passed in, which is also what lets the test use a mock sender.
//
// Rules:
//  - never for a duplicate (the applicant already has a row, Daren already knows)
//  - never for a suspected-spam row (the hidden trap field was filled); those are
//    kept and flagged in /funnel instead, see submitBetaApplication
//  - NEVER throws: the application is already saved, and a mail failure must not
//    turn it into an error for the applicant. The caller logs a failure without
//    any applicant details.

import type { StoredApplication } from "@/lib/azure-storage";

const FUNNEL_URL = "https://theadviceengine.ai/funnel";

export type NotificationOutcome = "sent" | "failed" | "skipped";
export type SendFn = (mail: { to: string; subject: string; html: string; bcc: boolean }) => Promise<boolean>;

const MICROSOFT_365: Record<string, string> = { yes: "Yes", no: "No", "not-sure": "Not sure" };

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Subject lines are a header: a stray line break in a name must not reach it.
function oneLine(value: string) {
  return (value ?? "").replace(/[\r\n]+/g, " ").trim();
}

export function londonTime(iso: string) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(new Date(iso));
}

export function shouldNotify(result: { duplicate: boolean; application: Pick<StoredApplication, "suspectedSpam"> }) {
  return !result.duplicate && !result.application.suspectedSpam;
}

export function buildApplicationNotification(application: StoredApplication) {
  const waitlist = application.status === "waitlist";
  const who = `${oneLine(application.fullName)}, ${oneLine(application.firmName)}`;
  const subject = waitlist ? `New waiting-list request: ${who}` : `New founding application: ${who}`;

  const supplied = (value: string) => escapeHtml((value ?? "").trim()) || "<em>not supplied</em>";
  const rows: [string, string][] = [
    ["Name", supplied(application.fullName)],
    ["Work email", supplied(application.workEmail)],
    ["Phone", supplied(application.phone)],
    ["Firm", supplied(application.firmName)],
    ["FCA reference", supplied(application.firmReference)],
    ["Advisers", supplied(application.adviserCount)],
    ["Microsoft 365", supplied(MICROSOFT_365[application.microsoft365] ?? application.microsoft365)],
    ["Paperwork bottleneck", supplied(application.bottleneck).replace(/\n/g, "<br>")],
    ["Submitted", escapeHtml(londonTime(application.createdAt))],
    ["Place", waitlist ? "Waiting list (all founding places are allocated)" : "Founding place (pending your review)"],
  ];

  const html = `<!DOCTYPE html>
<html lang="en-GB"><body style="margin:0;padding:0;background:#ffffff">
<div style="max-width:600px;margin:0 auto;padding:24px;font-family:Segoe UI,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.55;color:#1f2933">
  <p style="margin:0 0 16px">${waitlist ? "A new waiting-list request" : "A new founding application"} has come in on theadviceengine.ai/start.
    The applicant has been told you will contact them personally.</p>
  <table style="border-collapse:collapse;width:100%;margin:0 0 16px">
${rows.map(([label, value]) => `    <tr><td style="padding:6px 12px 6px 0;vertical-align:top;color:#52606d;white-space:nowrap">${label}</td><td style="padding:6px 0;vertical-align:top">${value}</td></tr>`).join("\n")}
  </table>
  <p style="margin:0">Review, check the FCA register and set the status in <a href="${FUNNEL_URL}">${FUNNEL_URL}</a>.</p>
</div></body></html>`;

  return { subject, html };
}

export async function notifyNewApplication(
  result: { duplicate: boolean; application: StoredApplication },
  to: string,
  send: SendFn,
): Promise<NotificationOutcome> {
  if (!to || !shouldNotify(result)) return "skipped";
  try {
    const { subject, html } = buildApplicationNotification(result.application);
    // No BCC: the BCC copy exists for applicant-facing mail, and it goes to the
    // same owner, so it would only deliver this one twice.
    return (await send({ to, subject, html, bcc: false })) ? "sent" : "failed";
  } catch {
    return "failed";
  }
}
