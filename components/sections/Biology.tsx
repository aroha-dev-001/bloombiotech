"use client";

import { SectionHeading } from "../SectionHeading";

const biology = [
  {
    name: "Pseudomonas taiwanensis",
    benefit: "AMC partner",
    text: "Named on the AMC consortium with Azotobacter tropicalis and Bacillus aryabhattai. Printed on Bio Sanjiveeni / Bhu Samruddhi.",
  },
  {
    name: "Azotobacter tropicalis",
    benefit: "N-fixer in the mix",
    text: "Part of Arka Microbial Consortium. Use as the pack states: powder drench or liquid 10 ml/L.",
  },
  {
    name: "Bacillus aryabhattai",
    benefit: "P and Zn solubilizer",
    text: "The third AMC organism on the brochure. Do not mix the powder line with antibiotics or pesticides.",
  },
  {
    name: "Trichoderma (Bluderma)",
    benefit: "Nursery biocontrol",
    text: "Bluderma is the Trichoderma pack in the licensed biocontrol set. Keep it off fungicide tank mixes.",
  },
  {
    name: "Arka Actino Consortium",
    benefit: "Bio Astra, 2015",
    text: "ACT licensed after AMC. Commercial name Bio Astra. Label wins if it differs from the brochure.",
  },
  {
    name: "Arka Fermented Cocopeat",
    benefit: "Bloom Compost Culture",
    text: "The AFC licence Bloom took first in India, sold as Bloom Compost Culture for composting programmes.",
  },
];

export function Biology() {
  return (
    <section id="biology" className="mx-auto max-w-6xl px-4 py-16 md:py-20">
      <SectionHeading
        kicker="04 / Biology"
        title="What is actually in the consortium."
        lede="These are brochure organisms and licences — not a skincare ingredient story. CFU and dose stay on the pack."
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {biology.map((item) => (
          <article
            key={item.name}
            className="rounded-3xl border border-forest/10 bg-white/70 p-5"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-leaf">{item.benefit}</p>
            <h3 className="mt-2 font-serif text-2xl text-forest">{item.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
