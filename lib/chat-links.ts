import { products } from "./products";
import { site } from "./site";

/**
 * Turns the plain text of an assistant answer into text and links, so that
 * whatever the answer mentions can be acted on where it is read: a phone
 * number calls, an email opens mail, the plant's address opens the map, a
 * web address opens, and a pack name opens that pack's page.
 *
 * It runs on the text as rendered, so it covers the grounded answers and the
 * model's answers alike, without either having to be written with markup.
 */
export type Segment = string | { text: string; href: string };

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const slugByName = new Map(products.map((p) => [p.name.toLowerCase(), p.slug]));

// Longest first, so "Bloom Compost Culture" is never cut short by a shorter name.
const names = [...slugByName.keys()].sort((a, b) => b.length - a.length).map(escape);

// No lookbehind: Safari before 16.4 rejects it, and a regex that fails to
// parse takes the whole chat down with it.
const pattern = new RegExp(
  [
    String.raw`(?<email>[\w.%+-]+@[\w-]+(?:\.[\w-]+)+)`,
    String.raw`(?<url>https?:\/\/[^\s<>()]+|www\.[^\s<>()]+)`,
    String.raw`(?<address>Assessment Number 10[^\n]{0,120}?577102)`,
    String.raw`(?<phone>(?:\+91[\s-]?|\b)[6-9]\d{4}[\s-]?\d{5}\b)`,
    String.raw`(?<product>\b(?:${names.join("|")})\b)`,
  ].join("|"),
  "gi",
);

export function linkify(text: string): Segment[] {
  const out: Segment[] = [];
  let last = 0;
  for (const m of text.matchAll(pattern)) {
    const g = m.groups ?? {};
    let raw = m[0];
    let href: string | undefined;

    if (g.email) href = `mailto:${raw}`;
    else if (g.url) {
      // A sentence ending in a web address keeps its full stop.
      raw = raw.replace(/[.,;:!?'"]+$/, "");
      href = raw.startsWith("http") ? raw : `https://${raw}`;
      // This site's own address stays in this tab.
      if (href.startsWith(site.website)) href = href.slice(site.website.length) || "/";
    } else if (g.address) href = site.maps;
    else if (g.phone) href = `tel:+91${raw.replace(/\D/g, "").slice(-10)}`;
    else if (g.product) {
      const slug = slugByName.get(raw.toLowerCase());
      if (slug) href = `/products/${slug}`;
    }

    if (!href) continue;
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push({ text: raw, href });
    last = m.index + raw.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

/** Leaves this site, or hands off to another app: open it in a new tab. */
export function isExternal(href: string) {
  return /^https?:/i.test(href);
}

/** Calls or mails: no navigation at all. */
export function isHandoff(href: string) {
  return /^(tel|mailto):/i.test(href);
}
