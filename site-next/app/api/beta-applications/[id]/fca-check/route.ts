import { isFunnelAdmin } from "../../../../azure-auth";
import { getApplication } from "@/lib/azure-storage";
import { runFcaCheck } from "@/lib/fca";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  if (!(await isFunnelAdmin())) {
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
