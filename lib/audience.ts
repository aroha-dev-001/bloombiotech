/**
 * Who is enquiring. Shared by the server-rendered /enquire page and the client
 * form, so it must not live in a "use client" module.
 */
export const audiences = [
  "Farmer",
  "Dealer",
  "Distributor",
  "Estate / plantation",
  "Institution / KVK",
  "General enquiry",
] as const;

export type Audience = (typeof audiences)[number];

/** ?audience=dealer → "Dealer". Unknown values fall back to Farmer. */
export function audienceFromSlug(slug?: string): Audience {
  const key = (slug ?? "").toLowerCase();
  const found = audiences.find(
    (a) => a.toLowerCase().replace(/[^a-z]/g, "") === key,
  );
  if (found) return found;
  if (key === "general") return "General enquiry";
  if (key === "estate") return "Estate / plantation";
  if (key === "kvk" || key === "institution") return "Institution / KVK";
  return "Farmer";
}
