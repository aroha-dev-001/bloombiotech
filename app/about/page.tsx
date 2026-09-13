import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Company",
  description: "Bloom Biotech, Chikkamagaluru. IIHR collaboration since 2013.",
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <p className="text-xs uppercase tracking-[0.2em] text-soil">Overview</p>
      <h1 className="mt-3 font-serif text-4xl text-forest md:text-5xl">
        Green biotechnology. Chikkamagaluru. IIHR collaboration.
      </h1>
      <div className="relative mt-8 aspect-[4/5] max-w-md overflow-hidden border border-forest/10">
        <Image
          src="/photos/founders.png"
          alt="Bloom Biotech from the company brochure"
          fill
          sizes="28rem"
          className="object-cover"
          priority
        />
      </div>
      <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted">
        <p>
          Bloom Biotech is an innovative agri-biotech company in technological
          collaboration with the Indian Institute of Horticultural Research
          (IIHR). The company started in 2013.
        </p>
        <p>
          It was the first company in India to licence Arka Microbial
          Consortium (AMC) and Arka Fermented Cocopeat technologies from IIHR.
          Arka Actino Consortium (ACT) was licensed in 2015. Commercial names:
          Bio Sanjiveeni (AMC powder), Bhu Samruddhi (AMC liquid), Bio Astra
          (ACT), and Bloom Compost Culture (AFC).
        </p>
        <p>
          The brochure describes a state-of-the-art production facility in
          Chikkamagaluru (coffee land). The printed mission is high-quality
          biotechnology products and technical assistance to farmers for higher
          yields at lower costs. Licensed AMC packs carry a 100% organic mark.
          ICAR and IIHR logos appear on the brochure.
        </p>
        <p>
          The catalogue also includes biocontrols (Bluderma, Blumonas, Bio
          Vanish, Bio Erase, Bio Hit, Bio Ace) and an imported nutrition line
          (Jackpot, Fulcare, Calcare, NutriCare C2) plus AscoGold seaweed /
          amino acids.
        </p>
      </div>
      <div className="mt-10 rounded-2xl border border-forest/10 bg-white/60 p-6">
        <h2 className="font-serif text-2xl text-forest">Address on the brochure</h2>
        <p className="mt-3 text-muted">{site.addressLines.join(", ")}</p>
        <p className="mt-2 text-muted">
          {site.phoneDisplay} · {site.email} · {site.website.replace("https://", "")}
        </p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-leaf">
          <a href={site.maps}>Google Maps</a>
          <a href={site.website}>bloombiotech.co.in</a>
          <Link href="/gallery">Photos</Link>
          <Link href="/enquire">Enquire</Link>
        </div>
      </div>
    </article>
  );
}
