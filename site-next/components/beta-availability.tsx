"use client";

import { useEffect, useState } from "react";

type Availability = { total: number; active: number; remaining: number };

export function BetaAvailability({ variant = "default" }: { variant?: "default" | "announcement" | "kicker" }) {
  const [availability, setAvailability] = useState<Availability>({ total: 15, active: 0, remaining: 15 });

  useEffect(() => {
    let active = true;
    fetch("/api/beta-availability", { cache: "no-store" })
      .then((response) => response.ok ? response.json() : null)
      .then((data) => { if (active && data) setAvailability(data); })
      .catch(() => undefined);
    return () => { active = false; };
  }, []);

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
