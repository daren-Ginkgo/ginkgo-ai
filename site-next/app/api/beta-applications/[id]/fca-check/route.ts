import { headers } from "next/headers";
import { isFunnelAdmin } from "../../../../azure-auth";
import { isEngineCallerId } from "@/lib/engine-caller";
import { getApplication } from "@/lib/azure-storage";
import { runFcaCheck } from "@/lib/fca";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  // Daren on /funnel, or the Advice Engine as itself (lib/engine-caller.ts), so its pop-up
  // can show the same register check beside an application before Daren approves it.
  const engine = isEngineCallerId((await headers()).get("x-ms-client-principal-id"));
  if (!engine && !(await isFunnelAdmin())) {
    return Response.json({ error: "Not authorised" }, { status: 403 });
  }

  const { id } = await context.params;
  if (!/^[a-f0-9]{64}$/.test(id)) {
    return Response.json({ error: "Invalid application id" }, { status: 400 });
  }

  const application = await getApplication(id);
  if (!application) {
    return Response.json({ error: "Application not found" }, { status: 404 });
  }

  const result = await runFcaCheck(application.firmName, application.firmReference);
  return Response.json(result);
}
