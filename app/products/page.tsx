import type { Metadata } from "next";
import Image from "next/image";
import { PackCarousel } from "@/components/products/PackCarousel";
import { Button } from "@/components/Button";
import { Split } from "@/components/motion/Split";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Fifteen packs from Bloom Biotech: IIHR-licensed consortia, biocontrols, compost culture and crop nutrition, each with what it does and what it is for.",
};

/**
 * The catalogue.
 *
 * It opens on the packs, one at a time: the pack in front with its neighbours
 * behind, its name and what it is for beside it, and every pack's name along
 * the foot (PackCarousel). Each product page opens on the same frame for its
 * own pack.
 *
 * The fermenter photograph sits at the foot of the page, where it answers
 * "where does this come from" after the packs have been seen, rather than
 * delaying them.
 */
export default function ProductsPage() {
  return (
    <>
      <PackCarousel />

      {/* Where every pack is filled. Real footage, no scrim. */}
      <section data-tone="light" className="pt-10 pb-10 md:pt-14 md:pb-14">
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
              Every pack is filled here, in Chikkamagaluru.
            </figcaption>
          </figure>
        </div>
      </section>

      <section data-tone="carbon" className="pp-band">
        <div className="shell flex flex-wrap items-end justify-between gap-6">
          <Split
            as="h2"
            text="Not sure which pack fits your crop?"
            className="display cat-cta max-w-[18ch]"
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
