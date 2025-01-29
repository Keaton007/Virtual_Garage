import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/login',
        destination: '/ui/login',
      },
      {
        source: '/register',
        destination: '/ui/register',
      },
      {
        source: '/vehicles',
        destination: '/ui/vehicles',
      },
    ];
  },
};

export default nextConfig;
