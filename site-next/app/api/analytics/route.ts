import { recordConversion } from "@/lib/azure-storage";

export const dynamic = "force-dynamic";

const allowedEvents = new Set([
  "page_view",
  "beta_cta_click",
  "demo_cta_click",
  "engine_signin_click",
  "microsoft_page_click",
  "gap_scanner_click",
  "beta_form_started",
]);

export async function POST(request: Request) {
  try {
    const payload = await request.json() as { event?: string; path?: string; context?: unknown };
    const event = typeof payload.event === "string" ? payload.event : "";
    const path = typeof payload.path === "string" ? payload.path.slice(0, 240) : "/";
    if (!allowedEvents.has(event) || !path.startsWith("/")) {
      return Response.json({ error: "Invalid event" }, { status: 400 });
    }

    const context = payload.context === undefined ? "" : JSON.stringify(payload.context).slice(0, 600);
    await recordConversion(event, path, context);
    return new Response(null, { status: 204 });
  } catch {
    return new Response(null, { status: 204 });
  }
}
