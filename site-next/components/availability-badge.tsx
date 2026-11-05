// Presentational only, safe in both server and client trees. It showed the
// founding-places count until 5 Nov 2026, when the founding offer closed and
// the site moved to a straight 30-day free trial; it now carries that offer.
export type Availability = { total: number; active: number; remaining: number };

export function AvailabilityBadge({
  variant = "default",
}: {
  variant?: "default" | "announcement" | "kicker";
}) {
  if (variant === "announcement") {
    return <span className="beta-availability beta-availability-announcement">30 days free · no card details · no commitment</span>;
  }
  return <span className={`beta-availability beta-availability-${variant}`}><span>30 days free · no commitment</span></span>;
}
