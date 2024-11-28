import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: true,
      },
      {
        source: "/dashboard",
        destination: "/me",
        permanent: true,
      },
      {
        source: "/dashboard/me",
        destination: "/me",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
