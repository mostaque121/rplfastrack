import { LEGACY_REDIRECTS } from "./src/config/redirects";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Google-hosted images (e.g., Google profile pictures)
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // Cloudinary images
      },
    ],
  },
  async redirects() {
    return LEGACY_REDIRECTS.map(({ from, to }) => ({
      source: from,
      destination: to,
      permanent: true,
    }));
  },
};

export default nextConfig;
