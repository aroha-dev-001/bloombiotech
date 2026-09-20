import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CatalogueBrowser } from "@/components/solutions/CatalogueBrowser";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Fifteen packs from Bloom Biotech: IIHR-licensed consortia, biocontrols, compost culture and crop nutrition. Filter by crop, problem and application route.",
};

export default function ProductsPage() {
  return (
    <>
      <header data-tone="light" className="pt-[calc(var(--nav-h)+5rem)] pb-20">
        <div className="shell">
          <h1 className="display d-hero max-w-[13ch]">Every product we make.</h1>
          <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,34rem)_auto] md:items-end md:justify-between">
            <p className="lede lede-wide">
              Organisms, dose and mixing rule on every pack. Prices are quoted
              from the plant.
            </p>
            <Link href="/solutions#find" className="btn btn-primary">
              Not sure? Find your solution
              <span className="arw" aria-hidden>
                →
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Where every pack on this page is filled. Real footage, no scrim. */}
      <section data-tone="light" className="pb-4">
        <div className="shell">
          <figure className="page-band" data-rv="mask">
            <Image
              src="/film/fermentation-vessels.jpg"
              alt="Stainless steel fermenters in the Bloom Biotech production hall"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </figure>
        </div>
      </section>

      <section data-tone="light" className="band">
        <div className="shell">
          <CatalogueBrowser />
        </div>
      </section>

      <section data-tone="carbon" className="band">
        <div className="shell flex flex-wrap items-end justify-between gap-10">
          <h2 className="display d-1 max-w-[16ch]">
            Not sure which pack fits your crop?
          </h2>
          <div className="flex flex-wrap gap-3">
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
