import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Monorepo / parent lockfiles: trace from this app root */
  outputFileTracingRoot: process.cwd(),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
