/**
 * Who is enquiring. Asked once, in the contact form, and nowhere else.
 * Shared by the server-rendered /enquire page and the client form, so it must
 * not live in a "use client" module.
 */
export const audiences = ["Farmer", "Distributor", "Retailer", "Other"] as const;

export type Audience = (typeof audiences)[number];

/** ?audience=distributor → "Distributor". Unknown values fall back to Farmer. */
export function audienceFromSlug(slug?: string): Audience {
  const key = (slug ?? "").toLowerCase();
  const found = audiences.find((a) => a.toLowerCase() === key);
  if (found) return found;
  if (key === "dealer") return "Retailer";
  return "Farmer";
}
