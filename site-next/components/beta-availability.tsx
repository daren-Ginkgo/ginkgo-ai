import { cache } from "react";
import { connection } from "next/server";
import { betaAvailability } from "@/lib/azure-storage";
import { AvailabilityBadge, type Availability } from "@/components/availability-badge";

const LOOKUP_TIMEOUT_MS = 2000;

// Deduped per request: the badge appears more than once on most pages.
const loadAvailability = cache(() =>
  Promise.race<Availability | null>([
    betaAvailability().catch(() => null),
    new Promise<null>((resolve) => setTimeout(() => resolve(null), LOOKUP_TIMEOUT_MS)),
  ]),
);

// Server-rendered so the first paint carries the real figure, not a hardcoded
// 15 that hydration then corrects in front of the visitor. `connection()`
// keeps the count out of the build-time HTML.
export async function BetaAvailability({ variant = "default" }: { variant?: "default" | "announcement" | "kicker" }) {
  await connection();
  const availability = await loadAvailability();
  return <AvailabilityBadge variant={variant} availability={availability} />;
}
