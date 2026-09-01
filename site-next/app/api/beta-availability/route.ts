import { betaAvailability } from "@/lib/azure-storage";
import { FOUNDING_PLACES } from "@/lib/beta";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return Response.json(await betaAvailability(), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return Response.json(
      { total: FOUNDING_PLACES, active: 0, remaining: FOUNDING_PLACES },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
