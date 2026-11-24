import type { MetadataRoute } from "next";

const BASE = "https://theadviceengine.ai";

// Every public route, once. /funnel and /api are deliberately absent:
// /funnel is owner-only behind Easy Auth and must not be advertised, and
// /firm-view now redirects to /product (24 Nov 2026).
const publicRoutes = [
  "/",
  "/outputs",
  "/evidence",
  "/compliance",
  "/quilter-data",
  "/security",
  "/pricing",
  "/about",
  "/product",
  "/microsoft",
  "/gap-scanner",
  "/start",
  "/demo",
  "/privacy",
  "/terms",
  "/thank-you",
  "/finprom.html",
  "/quilter.html",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route): MetadataRoute.Sitemap[number] => ({
    url: `${BASE}${route}`,
    changeFrequency: "weekly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
