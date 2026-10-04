import { acknowledgeApplication } from "@/lib/acknowledgement-email";
import { notifyNewApplication } from "@/lib/application-notification";
import { BOOKING_URL } from "@/lib/approval-email";
import { purgeExpiredApplications, recordConversion, submitBetaApplication } from "@/lib/azure-storage";
import { betaApplicationSchema } from "@/lib/beta";
import { sendMail } from "@/lib/graph-mail";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const payload = await request.json() as Record<string, unknown>;
    // The hidden trap field. Browser autofill can fill it as well as bots, so a
    // submission that is otherwise valid is saved and flagged for /funnel rather
    // than dropped; anything that fails validation is still dropped quietly.
    const trapped = typeof payload.website === "string" && Boolean(payload.website.trim());

    const parsed = betaApplicationSchema.safeParse(trapped ? { ...payload, website: undefined } : payload);
    if (!parsed.success) {
      if (trapped) return Response.json({ received: true, waitlist: false }, { status: 201 });
      return Response.json(
        { error: parsed.error.issues[0]?.message ?? "Please check the application and try again." },
        { status: 400 },
      );
    }

    const input = parsed.data;
    // Expired test rows go first, so they never sit in the founding-places count.
    await purgeExpiredApplications().catch(() => undefined);
    const result = await submitBetaApplication({
      fullName: input.fullName,
      workEmail: input.workEmail,
      phone: input.phone,
      firmName: input.firmName,
      firmReference: input.firmReference,
      adviserCount: input.adviserCount,
      microsoft365: input.microsoft365,
      bottleneck: input.bottleneck,
    }, { suspectedSpam: trapped });
    if (!result.duplicate) {
      await recordConversion(
        trapped ? "beta_application_trapped" : "beta_application_submitted",
        "/start",
        result.application.status,
      );
    }

    // Saved first; the email to Daren and the applicant's acknowledgement are a
    // courtesy on top and never fail the application. Log lines carry no
    // applicant details.
    const [notified, acknowledged] = await Promise.all([
      notifyNewApplication(result, process.env.FUNNEL_ADMIN_EMAIL ?? "", sendMail),
      acknowledgeApplication(result, BOOKING_URL, sendMail),
    ]);
    if (notified === "failed") console.error("New-application notification email was not sent.");
    if (acknowledged === "failed") console.error("Applicant acknowledgement email was not sent.");

    return Response.json({
      received: true,
      duplicate: result.duplicate,
      waitlist: result.application.status === "waitlist",
      availability: result.availability,
    }, { status: 201 });
  } catch {
    return Response.json(
      { error: "We could not save your application just now. Please try again or email hello@theadviceengine.ai." },
      { status: 500 },
    );
  }
}
