import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 365,
    qualities: [50, 65, 75, 80, 85, 90, 95],
  },
};

export default nextConfig;
