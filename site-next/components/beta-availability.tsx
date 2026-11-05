import { AvailabilityBadge } from "@/components/availability-badge";

// The founding-places lookup retired on 5 Nov 2026 with the founding offer, so
// the badge no longer reads the applications table on every page render.
export function BetaAvailability({ variant = "default" }: { variant?: "default" | "announcement" | "kicker" }) {
  return <AvailabilityBadge variant={variant} />;
}
