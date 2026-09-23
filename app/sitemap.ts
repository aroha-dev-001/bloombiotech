import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { articles } from "@/lib/articles";
import { siteUrl as host } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = [
    "",
    "/about",
    "/products",
    "/solutions",
    "/field",
    "/faq",
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
