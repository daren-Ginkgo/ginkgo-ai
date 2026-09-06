import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Azure App Service runs the self-contained Node server produced here.
  output: "standalone",
  async redirects() {
    return [
      // The 5 September 2026 cutover from the GitHub Pages site dropped these
      // root .html URLs. Permanent redirects to the closest live equivalent.
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/privacy.html", destination: "/privacy", permanent: true },
      { source: "/demo.html", destination: "/demo", permanent: true },
      // Interim targets pending Daren's confirmation: the old pages were
      // "Terms of use", "Tools and calculators" and "Start your free month".
      { source: "/terms.html", destination: "/", permanent: true },
      { source: "/tools.html", destination: "/product", permanent: true },
      { source: "/trial.html", destination: "/start", permanent: true },
    ];
  },
};

export default nextConfig;
