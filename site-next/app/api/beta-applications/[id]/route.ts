import { isFunnelAdmin } from "../../../azure-auth";
import { buildApprovalEmail } from "@/lib/approval-email";
import { markApprovalEmailed, recordConversion, updateApplication, type ApplicationStatus, type StoredApplication } from "@/lib/azure-storage";
import { BETA_STATUSES } from "@/lib/beta";
import { mailConfigured, sendMail } from "@/lib/graph-mail";
import { expiryFrom, isTestApplicant } from "@/lib/test-applicants";

export const dynamic = "force-dynamic";

/**
 * The adviser's welcome email, sent because the status just became "approved".
 *
 * Setting an application to approved IS the access switch - the engine grants that
 * work domain a trial at the adviser's next sign-in (beta_grants.py) - so until this
 * ran, approval happened entirely in silence and the adviser had no way to know.
 *
 * Guards, in order, so nobody is mailed twice or by accident:
 *   - only on a real transition INTO approved, never on a re-save of an approved row
 *   - never for a test row
 *   - never twice: the row is stamped approvalEmailedAt once the mail has gone
 *
 * Returns what happened, for the admin screen. It never throws: the approval is
 * already recorded and must not be undone by a mail failure, but a silent failure
 * would leave an adviser waiting, so the outcome goes back to the human who clicked.
 */
async function emailOnApproval(
  before: StoredApplication,
  nextStatus: ApplicationStatus | undefined,
): Promise<"sent" | "failed" | "not-configured" | null> {
  if (nextStatus !== "approved" || before.status === "approved") return null;
  // A test row is never mailed, except one from a TEST_APPLICANT_EMAILS address,
  // which exists so Daren can rehearse the whole journey including this email.
  if (before.isTest && !isTestApplicant(before.workEmail)) return null;
  if (before.approvalEmailedAt) return null;
  if (!mailConfigured()) return "not-configured";

  const { subject, html } = buildApprovalEmail({ ...before, status: "approved" });
  const sent = await sendMail({ to: before.workEmail, subject, html });
  if (!sent) return "failed";

  try {
    await markApprovalEmailed(before.id);
  } catch {
    // The adviser has the email, which is what matters; the stamp is only the
    // guard against a second one. Worst case a later re-approval mails again.
  }
  try {
    await recordConversion("approval_email_sent", "/funnel", before.workEmail.split("@")[1] ?? "");
  } catch {
    // Analytics, never a dependency.
  }
  return "sent";
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!(await isFunnelAdmin())) {
    return Response.json({ error: "Not authorised" }, { status: 403 });
  }

  const { id } = await context.params;
  // expiring: true sets the row to delete itself TEST_ROW_DAYS from now; false clears it.
  const payload = await request.json() as { status?: string; isTest?: boolean; expiring?: boolean };
  const statusValid = payload.status === undefined || BETA_STATUSES.includes(payload.status as typeof BETA_STATUSES[number]);
  const isTestValid = payload.isTest === undefined || typeof payload.isTest === "boolean";
  const expiringValid = payload.expiring === undefined || typeof payload.expiring === "boolean";
  const hasChange = payload.status !== undefined || payload.isTest !== undefined || payload.expiring !== undefined;
  if (!/^[a-f0-9]{64}$/.test(id) || !statusValid || !isTestValid || !expiringValid || !hasChange) {
    return Response.json({ error: "Invalid application update" }, { status: 400 });
  }
  const expiresAt = payload.expiring === undefined ? undefined
    : payload.expiring ? expiryFrom(new Date().toISOString())
    : "";

  try {
    const before = await updateApplication(id, {
      status: payload.status as ApplicationStatus | undefined,
      isTest: payload.isTest,
      expiresAt,
    });
    const email = await emailOnApproval(before, payload.status as ApplicationStatus | undefined);
    return Response.json({ updated: true, status: payload.status, isTest: payload.isTest, expiresAt, email });
  } catch (error) {
    const statusCode = error && typeof error === "object" && "statusCode" in error
      ? (error as { statusCode?: unknown }).statusCode
      : undefined;
    if (statusCode === 404) return Response.json({ error: "Application not found" }, { status: 404 });
    return Response.json({ error: "Application update failed" }, { status: 500 });
  }
}
