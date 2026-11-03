import { absoluteUrl } from "@/lib/url";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Optimised image URLs (e.g. ?w=3840) were being indexed as pages.
      disallow: ["/_next/image"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
