"use client";

import Link from "next/link";
import { CountUp } from "./CountUp";
import { products } from "@/lib/products";
import { site } from "@/lib/site";

const desks = [
  {
    id: "01",
    name: "Farmers",
    href: "/enquire",
    metric: 4,
    unit: "routes",
    fill: 78,
    detail: "Drench 1 kg/40 L, FYM 5-10 kg/MT, drip, liquid 10 ml/L.",
    tags: ["Drench", "FYM", "Drip", "Liquid"],
  },
  {
    id: "02",
    name: "Dealers",
    href: "/products",
    metric: products.length,
    unit: "SKUs",
    fill: 92,
    detail: "Sanjiveeni, Bhu Samruddhi, Bluderma, Bio Astra for the board.",
    tags: ["Sanjiveeni", "Bluderma", "Astra"],
  },
  {
    id: "03",
    name: "Estates",
    href: "/enquire",
    metric: 2,
    unit: "programmes",
    fill: 64,
    detail: "Coffee and horticulture quoted by block, not a mixed crate.",
    tags: ["Coffee", "Horticulture", "By block"],
  },
  {
    id: "04",
    name: "Institutions",
    href: "/products/bio-sanjiveeni",
    metric: 2,
    unit: "AMC forms",
    fill: 100,
    detail: "Bio Sanjiveeni powder and Bhu Samruddhi liquid. First AMC licence in India.",
    tags: ["IIHR", "KVK", "Solid + liquid"],
  },
];

export function AudienceBoard() {
  return (
    <section className="bg-forest text-paper">
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-lime">
              03 / Who it is for
            </p>
            <h2 className="mt-3 font-serif text-3xl leading-tight md:text-4xl">
              Four desks. One plant.
            </h2>
          </div>
          <p className="font-mono text-[11px] text-lime/80">
            Live board · {site.hours} · {products.length} packs
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-4">
          {desks.map((d) => (
            <Link
              key={d.name}
              href={d.href}
              className="desk-card group bg-forest p-4 sm:p-5"
            >
              <div className="flex items-baseline justify-between gap-2">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-lime">
                  {d.id} / {d.name}
                </p>
                <span className="text-lime transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </div>
              <p className="mt-3 font-serif text-4xl leading-none tracking-tight sm:text-5xl">
                <CountUp value={d.metric} />
                <span className="ml-1 align-middle font-sans text-[11px] font-normal tracking-normal text-paper/55">
                  {d.unit}
                </span>
              </p>
              <div className="desk-meter mt-4" aria-hidden="true">
                <span style={{ width: `${d.fill}%` }} />
              </div>
              <p className="mt-3 text-[12px] leading-snug text-paper/70 sm:text-sm">
                {d.detail}
              </p>
              <div className="mt-3 flex flex-wrap gap-1">
                {d.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-white/8 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wide text-lime"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
