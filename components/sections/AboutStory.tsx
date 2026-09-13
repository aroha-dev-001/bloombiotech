"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../Button";
import { SectionHeading } from "../SectionHeading";

export function AboutStory() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-16 md:py-20">
      <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
        <div className="photo-frame relative min-h-[18rem] overflow-hidden rounded-3xl aspect-[4/5] md:min-h-[28rem]">
          <Image
            src="/photos/founders.png"
            alt="Bloom Biotech team photograph from the brochure"
            fill
            sizes="(min-width: 768px) 28rem, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <SectionHeading
            kicker="01 / Company"
            title="A Chikkamagaluru plant, licensed with IIHR."
            lede="Started in 2013. First in India to licence Arka Microbial Consortium and Arka Fermented Cocopeat. ACT followed in 2015. The printed mission is biotechnology products plus technical assistance — not a catalogue of invented yields."
          />
          <p className="mt-5 text-muted">
            Commercial names on the brochure: Bio Sanjiveeni (AMC powder), Bhu
            Samruddhi (AMC liquid), Bio Astra (ACT), and Bloom Compost Culture.
            Licensed AMC packs carry a 100% organic mark. Dose follows the pack
            in hand.
          </p>
          <div className="mt-8">
            <Button href="/about">Learn more</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeCatalogue({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section id="catalogue" className="mx-auto max-w-6xl px-4 py-16 md:py-20">
      <div className="flex items-end justify-between gap-4">
        <SectionHeading
          kicker="02 / Catalogue"
          title="What we put in the ground"
          lede="Pack photos and label doses from the printed line. Quotes come from the plant — there is no public price list."
        />
        <Link href="/products" className="nav-link hidden shrink-0 text-sm sm:inline">
          All products
        </Link>
      </div>
      {children}
      <Link href="/products" className="nav-link mt-6 inline-block text-sm sm:hidden">
        All products
      </Link>
    </section>
  );
}
