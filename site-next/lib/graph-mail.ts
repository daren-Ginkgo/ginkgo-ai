// Outbound mail over Microsoft Graph, app-only (client credentials).
//
// Same transport the engine already uses for owner notifications (notify.py in
// daren-Ginkgo/ginkgo-advice-engine-demo), so there is one mail route across both
// apps and no third-party mail provider to add.
//
// Setup: on the app registration grant Microsoft Graph -> Application permissions
// -> Mail.Send, admin-consent it, then set these app settings on
// advice-engine-marketing:
//   NOTIFY_TENANT_ID, NOTIFY_CLIENT_ID, NOTIFY_CLIENT_SECRET
//   NOTIFY_FROM_EMAIL   the mailbox mail is sent AS (must be a real mailbox in the
//                       tenant, e.g. hello@theadviceengine.ai)
//   NOTIFY_BCC_EMAIL    optional, a copy of every applicant email to the owner
// Any of the first four unset = mail silently off, exactly as the engine behaves.
//
// Application Mail.Send covers every mailbox in the tenant by default; scope it to
// the one mailbox with an Exchange Online ApplicationAccessPolicy if that sits better.

const TIMEOUT_MS = 10_000;

export function mailConfigured() {
  return Boolean(
    process.env.NOTIFY_TENANT_ID &&
    process.env.NOTIFY_CLIENT_ID &&
    process.env.NOTIFY_CLIENT_SECRET &&
    process.env.NOTIFY_FROM_EMAIL,
  );
}

async function token() {
  const response = await fetch(
    `https://login.microsoftonline.com/${process.env.NOTIFY_TENANT_ID}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.NOTIFY_CLIENT_ID as string,
        client_secret: process.env.NOTIFY_CLIENT_SECRET as string,
        scope: "https://graph.microsoft.com/.default",
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    },
  );
  if (!response.ok) throw new Error(`Graph token request failed: ${response.status}`);
  const body = await response.json() as { access_token?: string };
  if (!body.access_token) throw new Error("Graph token response carried no access_token.");
  return body.access_token;
}

// Graph's sendMail carries ONE body with one contentType - there is no multipart
// text alternative - so the body is HTML and the copy is written plainly enough to
// read as text if a client strips it.
// bcc: false leaves out NOTIFY_BCC_EMAIL, for mail that already goes to the owner.
export type Mail = { to: string; subject: string; html: string; bcc?: boolean };

/**
 * Send one message. Returns true on success, false otherwise, and NEVER throws:
 * mail is a courtesy on top of an approval that has already been recorded, so a
 * mail failure must not fail the approval or lose it. The caller reports the
 * outcome to the admin screen so a silent failure is still visible to a human.
 */
export async function sendMail({ to, subject, html, bcc: withBcc = true }: Mail): Promise<boolean> {
  if (!mailConfigured()) return false;
  try {
    const from = process.env.NOTIFY_FROM_EMAIL as string;
    const bcc = withBcc ? (process.env.NOTIFY_BCC_EMAIL ?? "").trim() : "";
    const response = await fetch(
      `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(from)}/sendMail`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${await token()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: {
            subject,
            body: { contentType: "HTML", content: html },
            toRecipients: [{ emailAddress: { address: to } }],
            ...(bcc ? { bccRecipients: [{ emailAddress: { address: bcc } }] } : {}),
            replyTo: [{ emailAddress: { address: process.env.NOTIFY_REPLY_TO ?? from } }],
          },
          saveToSentItems: true,
        }),
        signal: AbortSignal.timeout(TIMEOUT_MS),
      },
    );
    return response.ok;
  } catch {
    return false;
  }
}
