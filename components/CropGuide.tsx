"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "./Button";
import { whatsappUrl } from "@/lib/site";

const scenes = [
  {
    id: "amc",
    label: "AMC",
    kicker: "IIHR consortium",
    title: "Powder or liquid. Same three strains.",
    body: "Bio Sanjiveeni is carrier AMC. Bhu Samruddhi is liquid AMC. Actives: Pseudomonas taiwanensis, Azotobacter tropicalis, Bacillus aryabhattai. Bloom was first in India to licence AMC from IIHR.",
    caution: "Do not mix with antibiotics, pesticides, or insecticides. Label CFU wins.",
    packs: [
      { name: "Bio Sanjiveeni", href: "/products/bio-sanjiveeni" },
      { name: "Bhu Samruddhi", href: "/products/bhu-samruddhi" },
    ],
    wa: "Hello Bloom Biotech, quote for AMC (Bio Sanjiveeni / Bhu Samruddhi). Crop and area:",
  },
  {
    id: "coffee",
    label: "Coffee",
    kicker: "Pulp, berry borer, media",
    title: "Compost the pulp. Hit the borer. Ferment coco-peat.",
    body: "Bloom Compost Culture: 2 kg per tonne of coffee pulp, 30-45 days. Bio Hit (Beauveria bassiana) lists coffee berry borer. Raw coco-peat: 4 kg culture plus 4 kg urea per tonne, 30-40 days.",
    caution: "Do not mix compost culture with antibiotics, pesticides, or insecticides.",
    packs: [
      { name: "Bloom Compost Culture", href: "/products/bloom-compost-culture" },
      { name: "Bio Hit", href: "/products/bio-hit" },
      { name: "Bio Sanjiveeni", href: "/products/bio-sanjiveeni" },
    ],
    wa: "Hello Bloom Biotech, coffee quote (pulp compost / berry borer / AMC). Acres or tonnes:",
  },
  {
    id: "disease",
    label: "Soil disease",
    kicker: "Trichoderma · Pseudomonas · ACT",
    title: "Bluderma, Blumonas, or Bio Astra.",
    body: "Bluderma is Trichoderma for damping-off, wilt, and root rot. Blumonas is Pseudomonas fluorescens for mildews, blast, and blights. Bio Astra is Arka Actino Consortium (three Streptomyces strains), licensed in 2015.",
    caution: "Do not mix these packs with fungicides, pesticides, or insecticides.",
    packs: [
      { name: "Bluderma", href: "/products/bluderma" },
      { name: "Blumonas", href: "/products/blumonas" },
      { name: "Bio Astra", href: "/products/bio-astra" },
    ],
    wa: "Hello Bloom Biotech, soil-disease pack quote. Crop:",
  },
  {
    id: "nutrition",
    label: "Nutrition",
    kicker: "Imported line",
    title: "Humate, fulvate, calcium, chelates.",
    body: "Jackpot, Fulcare, Calcare, and NutriCare C2 are imported. No repacking in India on the humate/fulvate/calcium packs. AscoGold is 3 ml/L amino acids plus seaweed.",
    caution: "Calcare: caution with high-phosphorus fertilizers.",
    packs: [
      { name: "Jackpot", href: "/products/jackpot" },
      { name: "Calcare", href: "/products/calcare" },
      { name: "NutriCare C2", href: "/products/nutricare-c2" },
    ],
    wa: "Hello Bloom Biotech, imported nutrition quote (Jackpot / Fulcare / Calcare / NutriCare):",
  },
] as const;

export function CropGuide() {
  const [id, setId] = useState<(typeof scenes)[number]["id"]>("amc");
  const scene = scenes.find((s) => s.id === id) ?? scenes[0];

  return (
    <section className="border-y border-forest/10 bg-white/35">
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-16">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
          01 / Brochure
        </p>
        <h2 className="mt-2 max-w-xl font-serif text-3xl text-forest md:text-4xl">
          Tap a line. Get the printed dose.
        </h2>
        <p className="mt-3 max-w-lg text-sm text-muted">
          Copy is from the Bloom Biotech brochure. We do not invent prices.
        </p>

        <div className="mt-8 flex gap-2 overflow-x-auto pb-1">
          {scenes.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setId(s.id)}
              aria-pressed={id === s.id}
              className={`path-chip shrink-0 ${id === s.id ? "is-on" : ""}`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div key={scene.id} className="path-panel mt-6 grid gap-8 border border-forest/10 bg-paper p-5 sm:p-8 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-leaf">
              {scene.kicker}
            </p>
            <h3 className="mt-2 font-serif text-2xl text-forest sm:text-3xl">
              {scene.title}
            </h3>
            <p className="mt-4 leading-relaxed text-muted">{scene.body}</p>
            <p className="mt-4 border-l-2 border-leaf pl-3 text-sm text-forest">
              {scene.caution}
            </p>
          </div>
          <div className="flex flex-col justify-between gap-6">
            <ul className="space-y-2">
              {scene.packs.map((p) => (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    className="flex items-center justify-between border border-forest/10 bg-white/70 px-3 py-3 text-sm text-forest"
                  >
                    {p.name}
                    <span className="text-leaf">→</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <Button href={whatsappUrl(scene.wa)}>WhatsApp this brief</Button>
              <Button href="/enquire" variant="ghost">
                Written quote
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
