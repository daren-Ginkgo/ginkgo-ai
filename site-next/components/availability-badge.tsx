// Presentational only, safe in both server and client trees. It showed the
// founding-places count until 5 Nov 2026, when the founding offer closed and
// the site moved to a 30-day free trial; from 24 Nov 2026 it carries pay as you go
// (150 free credits per firm from 1 Dec 2026). No prices here: site pricing withdrawn 17 Nov.
export type Availability = { total: number; active: number; remaining: number };

export function AvailabilityBadge({
  variant = "default",
}: {
  variant?: "default" | "announcement" | "kicker";
}) {
  if (variant === "announcement") {
    return <span className="beta-availability beta-availability-announcement">150 free credits for every firm · no subscription</span>;
  }
  return <span className={`beta-availability beta-availability-${variant}`}><span>150 free credits · no subscription</span></span>;
}
