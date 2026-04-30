import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Monorepo / parent lockfiles: trace from this app root */
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
