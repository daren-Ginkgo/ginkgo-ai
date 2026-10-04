import { notifyNewApplication } from "@/lib/application-notification";
import { recordConversion, submitBetaApplication } from "@/lib/azure-storage";
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

    // Saved first; the email to Daren is a courtesy on top and never fails the
    // application. The log line carries no applicant details.
    const notified = await notifyNewApplication(result, process.env.FUNNEL_ADMIN_EMAIL ?? "", sendMail);
    if (notified === "failed") console.error("New-application notification email was not sent.");

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
