import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    const tasksApiUrl = (
      process.env.TASKS_API_URL ?? "http://localhost:8000"
    ).replace(/\/$/, "")

    return [
      {
        source: "/api/:path*",
        destination: `${tasksApiUrl}/:path*`,
      },
    ]
  },
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
