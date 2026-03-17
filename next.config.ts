import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // This allows ANY HTTPS domain
      },
      {
        protocol: 'http',
        hostname: '**', // This allows ANY HTTP domain
      },
    ],
  },
};

export default nextConfig;
