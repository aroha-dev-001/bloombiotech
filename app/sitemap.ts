import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { articles } from "@/lib/articles";

const host = "https://bloom-biotech.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = [
    "",
    "/about",
    "/products",
    "/gallery",
    "/journal",
    "/enquire",
    "/assistant",
    "/llm.txt",
    "/llms.txt",
    "/llms-full.txt",
  ].map((path) => ({
    url: `${host}${path}`,
    lastModified: now,
  }));

  return [
    ...staticPages,
    ...products.map((p) => ({
      url: `${host}/products/${p.slug}`,
      lastModified: now,
    })),
    ...articles.map((a) => ({
      url: `${host}/journal/${a.slug}`,
      lastModified: now,
    })),
  ];
}
