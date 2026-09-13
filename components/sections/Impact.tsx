"use client";

import Image from "next/image";
import { Button } from "../Button";
import { site } from "@/lib/site";

export function Impact() {
  return (
    <section id="impact" className="impact-band relative isolate overflow-hidden py-16 md:py-20">
      <Image
        src="/photos/seedling.png"
        alt="Ripe coffee berries from the Bloom Biotech brochure"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-forest/70" />
      <div className="relative z-10 mx-auto max-w-6xl px-4 text-paper">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-lime">07 / Coffee country</p>
        <h2 className="mt-3 max-w-xl font-serif text-3xl md:text-5xl">
          A production plant in Chikkamagaluru, not a warehouse story.
        </h2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-paper/80">
          The brochure names a state-of-the-art facility in coffee land, IIHR
          collaboration, and technical assistance. We do not invent carbon
          percentages or yield lifts. For maps and the printed address, use
          Company or WhatsApp the plant.
        </p>
        <div className="mt-8">
          <Button href="/about" variant="ghost">
            Read the company notes
          </Button>
        </div>
        <p className="mt-6 font-mono text-[11px] text-lime/80">{site.addressLines[2]}</p>
      </div>
    </section>
  );
}
