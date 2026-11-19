import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Monorepo / parent lockfiles: trace from this app root */
  outputFileTracingRoot: process.cwd(),
  async headers() {
    return [
      {
        source: "/downloads/:file",
        headers: [
          {
            key: "Content-Disposition",
            value: 'attachment; filename=":file"',
          },
        ],
      },
    ];
  },
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
