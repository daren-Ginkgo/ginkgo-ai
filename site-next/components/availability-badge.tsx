export type Availability = { total: number; active: number; remaining: number };

// Presentational only, safe in both server and client trees. When the real
// count is not known it shows no number rather than a wrong one.
export function AvailabilityBadge({
  availability,
  variant = "default",
}: {
  availability: Availability | null;
  variant?: "default" | "announcement" | "kicker";
}) {
  if (!availability) {
    if (variant === "announcement") {
      return <span className="beta-availability beta-availability-announcement">Limited founding places</span>;
    }
    return <span className={`beta-availability beta-availability-${variant}`}><span>Limited founding places</span></span>;
  }

  const label = availability.remaining === 1 ? "founding place remaining" : "founding places remaining";
  if (variant === "announcement") {
    return <span className="beta-availability beta-availability-announcement"><strong>{availability.remaining}</strong> {label}</span>;
  }

  return (
    <span className={`beta-availability beta-availability-${variant}`}>
      <strong>{availability.remaining}</strong>
      <span>{availability.remaining > 0 ? label : "places filled · waiting list open"}</span>
    </span>
  );
}
