"use client";

import { FlaskConical, Handshake, Leaf, ShieldCheck } from "lucide-react";
import { SectionHeading } from "../SectionHeading";

const items = [
  {
    icon: Leaf,
    title: "IIHR-licensed AMC",
    text: "First AMC licence in India: Bio Sanjiveeni powder and Bhu Samruddhi liquid. Actives printed on the pack.",
  },
  {
    icon: FlaskConical,
    title: "Chikkamagaluru plant",
    text: "Production in coffee country since 2013, with ACT licensed in 2015 as Bio Astra.",
  },
  {
    icon: ShieldCheck,
    title: "Organic mark on AMC packs",
    text: "Licensed AMC line carries a 100% organic mark on the brochure. Follow mixing cautions on each SKU.",
  },
  {
    icon: Handshake,
    title: "Technical assistance",
    text: "The brochure mission is products plus help for farmers — quotes by crop and route, not a mixed crate.",
  },
];

export function Benefits() {
  return (
    <section id="benefits" className="bg-white/40 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          kicker="03 / Why Bloom"
          title="Licensed consortia, a real plant, and a quote desk."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-forest/10 bg-paper/90 p-6 shadow-[0_18px_40px_-32px_var(--forest)] backdrop-blur-sm transition-transform duration-500 hover:-translate-y-1"
            >
              <item.icon className="h-6 w-6 text-leaf" aria-hidden />
              <h3 className="mt-4 font-serif text-xl text-forest">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
