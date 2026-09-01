import { recordConversion, submitBetaApplication } from "@/lib/azure-storage";
import { betaApplicationSchema } from "@/lib/beta";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const payload = await request.json() as Record<string, unknown>;
    if (typeof payload.website === "string" && payload.website.trim()) {
      return Response.json({ received: true, waitlist: false }, { status: 201 });
    }

    const parsed = betaApplicationSchema.safeParse(payload);
    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.issues[0]?.message ?? "Please check the application and try again." },
        { status: 400 },
      );
    }

    const input = parsed.data;
    const result = await submitBetaApplication({
      fullName: input.fullName,
      workEmail: input.workEmail,
      firmName: input.firmName,
      firmReference: input.firmReference,
      adviserCount: input.adviserCount,
      microsoft365: input.microsoft365,
      bottleneck: input.bottleneck,
    });
    if (!result.duplicate) {
      await recordConversion("beta_application_submitted", "/start", result.application.status);
    }

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
