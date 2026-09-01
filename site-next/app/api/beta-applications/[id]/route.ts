import { isFunnelAdmin } from "../../../azure-auth";
import { updateApplicationStatus, type ApplicationStatus } from "@/lib/azure-storage";
import { BETA_STATUSES } from "@/lib/beta";

export const dynamic = "force-dynamic";

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!(await isFunnelAdmin())) {
    return Response.json({ error: "Not authorised" }, { status: 403 });
  }

  const { id } = await context.params;
  const payload = await request.json() as { status?: string };
  if (!/^[a-f0-9]{64}$/.test(id) || !BETA_STATUSES.includes(payload.status as typeof BETA_STATUSES[number])) {
    return Response.json({ error: "Invalid application update" }, { status: 400 });
  }

  try {
    await updateApplicationStatus(id, payload.status as ApplicationStatus);
    return Response.json({ updated: true, status: payload.status });
  } catch (error) {
    const statusCode = error && typeof error === "object" && "statusCode" in error
      ? (error as { statusCode?: unknown }).statusCode
      : undefined;
    if (statusCode === 404) return Response.json({ error: "Application not found" }, { status: 404 });
    return Response.json({ error: "Application update failed" }, { status: 500 });
  }
}
