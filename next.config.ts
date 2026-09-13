import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["*.trycloudflare.com", "localhost", "127.0.0.1"],
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      {
        source: "/products/arka-microbial-consortium",
        destination: "/products/bio-sanjiveeni",
        permanent: true,
      },
      {
        source: "/products/decomposer",
        destination: "/products/bloom-compost-culture",
        permanent: true,
      },
      { source: "/products/bio-charge", destination: "/products", permanent: true },
      { source: "/products/root-care", destination: "/products", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
