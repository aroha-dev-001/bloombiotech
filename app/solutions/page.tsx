import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ProductFinder } from "@/components/solutions/ProductFinder";
import { CropExplorer } from "@/components/solutions/CropExplorer";
import { SectionHead } from "@/components/SectionHead";
import { RouteGuide } from "@/components/solutions/RouteGuide";
import { crops, getCrop, getNeed, type CropId, type NeedId } from "@/lib/solutions";

export const metadata: Metadata = {
  title: "Solutions by crop",
  description:
    "Find the Bloom Biotech pack for your crop. Coffee, black pepper, pomegranate, floriculture and all crops — by problem and by application route.",
};

type Props = {
  searchParams: Promise<{ crop?: string; need?: string }>;
};

export default async function SolutionsPage({ searchParams }: Props) {
  const q = await searchParams;
  const crop = (getCrop(q.crop ?? "")?.id ?? undefined) as CropId | undefined;
  const need = (getNeed(q.need ?? "")?.id ?? undefined) as NeedId | undefined;

  return (
    <>
      <header
        data-tone="dark"
        className="relative isolate overflow-hidden pt-[calc(var(--nav-h)+3rem)] pb-16"
      >
        <Image
          src="/photos/coffee.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover opacity-25"
        />
        <div className="hero-veil -z-10" />
        <div className="grain" aria-hidden />
        <div className="shell">
          <p className="eyebrow">
            <span className="eyebrow-accent">Solutions</span>
            <span className="mx-2 opacity-40">/</span>
            By crop, problem and route
          </p>
          <h1 className="display d-hero mt-6 max-w-[13ch]">
            Start with what you grow.
          </h1>
          <p className="lede mt-8">
            Fifteen packs, sorted by the three things a grower actually knows:
            the crop in the ground, the problem in front of them, and how they
            can apply it.
          </p>
          <div className="mt-10 flex flex-wrap gap-2">
            {crops.map((c) => (
              <Link
                key={c.id}
                href={`/solutions?crop=${c.id}#finder`}
                className="chip"
                data-on={crop === c.id ? "true" : undefined}
              >
                <span className="chip-glyph" aria-hidden>
                  {c.glyph}
                </span>
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* ------------------------------------------------- guided finder */}
      <section data-tone="light" className="band-tight">
        <div className="shell">
          <SectionHead
            index="01"
            kicker="Product finder"
            title="Three questions. Then the packs."
            lede="Nothing is submitted and nothing is required. Change any answer and the list changes with it — dose and mixing always follow the label on the pack in your hand."
          />
          <div className="mt-12" data-rv>
            <ProductFinder initialCrop={crop} initialNeed={need} />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- crop explorer */}
      <section data-tone="bone" className="band">
        <div className="shell">
          <SectionHead
            index="02"
            kicker="By crop"
            title="Solutions for the crops you grow."
            lede="The brochure names pomegranate, black pepper and floriculture as the commercial crops where AMC is used in crop protection management. The unit itself sits in coffee land."
          />
          <div className="mt-12" data-rv>
            <CropExplorer initial={crop ?? "coffee"} initialNeed={need} />
          </div>
        </div>
      </section>

      <RouteGuide />
    </>
  );
}
