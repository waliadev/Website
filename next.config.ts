import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // 🔹 Your backend IP
      {
        protocol: "http",
        hostname: "44.196.216.57",
        port: "8000",
        pathname: "/**",
      },

      // 🔹 Your production domain (if using)
      {
        protocol: "https",
        hostname: "api.brokerdash.in",
        pathname: "/**",
      },

      // 🔹 Unsplash images
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;