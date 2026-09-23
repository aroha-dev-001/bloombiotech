import manifest from "./media-manifest.json";

/**
 * Where the heavy media is served from.
 *
 * The home page film and the gallery clips are not in the repo and not on
 * Netlify. They are deployed to a Cloudflare Pages project (scripts/media.mjs)
 * and served from Cloudflare's edge: Netlify's free plan pays for bandwidth in
 * credits, and one visit to the home page can stream tens of megabytes.
 *
 * NEXT_PUBLIC_MEDIA_URL is that host, e.g. https://bloom-biotech-media.pages.dev.
 * Files there carry their content hash in their name so they can be cached for
 * a year; the committed manifest maps each plain path to its hashed name.
 *
 * Unset (local dev), paths resolve to this site's own /public, unhashed.
 */
export const MEDIA_URL = (process.env.NEXT_PUBLIC_MEDIA_URL ?? "").replace(/\/+$/, "");

const hashed: Record<string, string> = manifest;

export function media(path: string) {
  const key = path.startsWith("/") ? path : `/${path}`;
  return MEDIA_URL ? `${MEDIA_URL}${hashed[key] ?? key}` : key;
}

/** The media host's origin, for preconnecting, or null when serving locally. */
export const MEDIA_ORIGIN = MEDIA_URL ? new URL(MEDIA_URL).origin : null;
