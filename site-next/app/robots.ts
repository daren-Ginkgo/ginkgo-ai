import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /funnel is owner-only behind Easy Auth and must not be advertised.
        disallow: ["/funnel", "/api"],
      },
    ],
    sitemap: "https://theadviceengine.ai/sitemap.xml",
  };
}
