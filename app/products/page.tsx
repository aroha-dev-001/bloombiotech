import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CatalogueBrowser } from "@/components/solutions/CatalogueBrowser";
import { PlateMarquee } from "@/components/products/PlateMarquee";
import { Button } from "@/components/Button";
import { Split } from "@/components/motion/Split";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Fifteen packs from Bloom Biotech: IIHR-licensed consortia, biocontrols, compost culture and crop nutrition. Filter by crop, problem and application route.",
};

/**
 * The catalogue.
 *
 * It used to open on a heading over empty bone with the first pack a screen
 * and a half below, and a photograph of the fermentation hall between them.
 * The packs are the subject of this page, so they are what it opens on: the
 * whole catalogue drifting across the top, then the words, then the filters.
 *
 * The fermenter photograph moved to the foot of the page, where it answers
 * "where does this come from" after the packs have been seen, rather than
 * delaying them.
 */
export default function ProductsPage() {
  return (
    <>
      <header data-tone="light" className="pt-[calc(var(--nav-h)+3.5rem)]">
        <PlateMarquee />

        <div className="shell mt-16 pb-20">
          <Split as="h1" text="Every product we make." className="display d-hero max-w-[13ch]" />
          <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,34rem)_auto] md:items-end md:justify-between">
            <p className="lede lede-wide" data-rv style={{ ["--rv-d" as string]: "220ms" }}>
              Organisms, dose and mixing rule on every pack. Prices are quoted
              from the plant.
            </p>
            <Link
              href="/solutions#find"
              className="btn btn-primary"
              data-rv
              style={{ ["--rv-d" as string]: "300ms" }}
            >
              Not sure? Find your solution
              <span className="arw" aria-hidden>
                →
              </span>
            </Link>
          </div>
        </div>
      </header>

      <section data-tone="light" className="band-tight">
        <div className="shell">
          <CatalogueBrowser />
        </div>
      </section>

      {/* Where every pack above is filled. Real footage, no scrim. */}
      <section data-tone="light" className="pb-20">
        <div className="shell">
          <figure className="page-band" data-rv="mask">
            <Image
              src="/film/fermentation-vessels.jpg"
              alt="Stainless steel fermenters in the Bloom Biotech production hall"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <figcaption className="page-band-note">
              Every pack above is filled here, in Chikkamagaluru.
            </figcaption>
          </figure>
        </div>
      </section>

      <section data-tone="carbon" className="band">
        <div className="shell flex flex-wrap items-end justify-between gap-10">
          <Split
            as="h2"
            text="Not sure which pack fits your crop?"
            className="display d-1 max-w-[16ch]"
          />
          <div className="flex flex-wrap gap-3" data-rv style={{ ["--rv-d" as string]: "260ms" }}>
            <Button href="/solutions#find">Find your solution</Button>
            <Button href="/enquire" variant="ghost" arrow={false}>
              Talk to us
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
