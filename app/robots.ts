import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const host = "https://bloom-biotech.vercel.app";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${host}/sitemap.xml`,
    host,
  };
}
