"use client";

import { Star } from "lucide-react";
import { SectionHeading } from "../SectionHeading";
import { site } from "@/lib/site";

const voices = [
  {
    role: "Farmers",
    place: "Open field and horticulture",
    quote:
      "Ask for drench, FYM enrichment, drip, or liquid 10 ml/L. The plant quotes the route that matches the pack.",
  },
  {
    role: "Dealers",
    place: "Board and warehouse",
    quote:
      "Sanjiveeni, Bhu Samruddhi, Bluderma, and Bio Astra are the names that need to sit on the board without a public price list.",
  },
  {
    role: "Estates",
    place: "Coffee country",
    quote:
      "Coffee and horticulture are quoted by block from the Chikkamagaluru plant — not a mixed crate.",
  },
];

export function Voices() {
  return (
    <section id="voices" className="mx-auto max-w-6xl px-4 py-16 md:py-20">
      <SectionHeading
        kicker="06 / Who we quote"
        title="Three desks. No invented reviews."
        lede={`Google lists Bloom Biotech at ${site.googleRating} from ${site.googleReviews} reviews. The cards below are how the plant actually quotes — not named testimonials we do not have on file.`}
      />
      <p className="mt-4 flex items-center gap-1 text-sm text-muted">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-leaf text-leaf" aria-hidden />
        ))}
        <span className="ml-2">
          {site.googleRating} · {site.googleReviews} Google reviews
        </span>
      </p>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {voices.map((v) => (
          <blockquote
            key={v.role}
            className="rounded-3xl border border-forest/10 bg-white/70 p-6"
          >
            <p className="font-serif text-xl leading-snug text-forest">“{v.quote}”</p>
            <footer className="mt-5 text-sm text-muted">
              <cite className="not-italic font-medium text-forest">{v.role}</cite>
              <span className="block">{v.place}</span>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
