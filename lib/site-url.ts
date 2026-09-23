/**
 * The address this build is actually served from, for everything a crawler
 * reads: robots.txt, the sitemap, llms.txt, canonical and social-preview URLs.
 *
 * Not `site.website`. That is the company's own domain, which does not serve
 * this site yet, and a sitemap pointing at a host that is down is ignored.
 *
 *   NEXT_PUBLIC_SITE_URL      wins when set. Set it to the company domain once
 *                             that domain serves this site.
 *   URL (Netlify)             the site's primary address, set on every Netlify
 *                             build; it follows a custom domain automatically.
 *   VERCEL_PROJECT_PRODUCTION_URL   the same, on Vercel (no scheme).
 *
 * Read at build time. Only server code should import this: in the browser the
 * platform variables are not defined and it would fall through to the default.
 */
const fromPlatform =
  (process.env.NETLIFY === "true" && process.env.URL) ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL &&
    `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`);

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  fromPlatform ||
  "https://bloom-biotech.vercel.app"
).replace(/\/+$/, "");
