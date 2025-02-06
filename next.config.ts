import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
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
      {
        source: '/about',
        destination: '/ui/about',
      }
    ];
  },
};

export default nextConfig;
