import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ac.goit.global',
      },

      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },

      {
        protocol: 'https',
        hostname: 'aliiev-lomach.com',
      },
    ],
  },
};

export default nextConfig;
