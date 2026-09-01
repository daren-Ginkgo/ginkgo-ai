"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function trackConversion(event: string, path?: string, context?: unknown) {
  if (typeof window === "undefined") return;
  const body = JSON.stringify({ event, path: path ?? window.location.pathname, context });
  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/analytics", new Blob([body], { type: "application/json" }));
    return;
  }
  fetch("/api/analytics", { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true }).catch(() => undefined);
}

export function ConversionTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const campaign = Object.fromEntries(
      ["utm_source", "utm_medium", "utm_campaign"]
        .map((key) => [key, params.get(key)] as const)
        .filter(([, value]) => Boolean(value))
    );
    trackConversion("page_view", pathname, campaign);
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const anchor = target?.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      let eventName = "";
      if (href === "/start" || href.startsWith("/start?")) eventName = "beta_cta_click";
      else if (href === "/demo" || href.startsWith("/demo?")) eventName = "demo_cta_click";
      else if (href.startsWith("https://app.theadviceengine.ai")) eventName = "engine_signin_click";
      else if (href === "/microsoft") eventName = "microsoft_page_click";
      else if (href === "/find.html") eventName = "gap_scanner_click";
      if (eventName) trackConversion(eventName, window.location.pathname, { destination: href.split("?")[0] });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
