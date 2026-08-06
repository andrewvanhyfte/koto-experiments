import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // All media is served from /public — no remote image hosts required.
    remotePatterns: [],
  },
};

export default nextConfig;
