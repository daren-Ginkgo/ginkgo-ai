import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Azure App Service runs the self-contained Node server produced here.
  output: "standalone",
};

export default nextConfig;
