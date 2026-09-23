import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

/**
 * Every crawler may read every page. The AI crawlers are also named, so the
 * intent is on record rather than implied by a wildcard: this site wants to be
 * what an assistant quotes when a grower asks about AMC or a Bloom pack. The
 * page-by-page summary they should start from is /llms.txt.
 *
 * Only the API is closed: the chat and the enquiry form post there, and
 * neither has anything to index.
 */
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Amazonbot",
  "meta-externalagent",
  "DuckAssistBot",
  "MistralAI-User",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      { userAgent: aiCrawlers, allow: "/", disallow: "/api/" },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
