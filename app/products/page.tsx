import type { Metadata } from "next";
import Link from "next/link";
import { products } from "@/lib/products";
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
      <header data-tone="dark" className="pt-[calc(var(--nav-h)+3rem)] pb-14">
        <div className="shell">
          <p className="eyebrow">
            <span className="eyebrow-accent">Products</span>
            <span className="mx-2 opacity-40">/</span>
            {products.length} packs
          </p>
          <h1 className="display d-hero mt-6 max-w-[12ch]">The line, in full.</h1>
          <div className="mt-8 grid gap-8 md:grid-cols-[minmax(0,34rem)_auto] md:items-end md:justify-between">
            <p className="lede">
              Organisms, colony count, dose and mixing rule for every pack.
              Prices are quoted from the plant — there is no public price list
              and no checkout.
            </p>
            <Link href="/solutions#finder" className="btn btn-primary">
              Not sure? Use the finder
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

      <section data-tone="carbon" className="band-tight">
        <div className="shell flex flex-wrap items-end justify-between gap-8">
          <div>
            <h2 className="display d-2 max-w-[18ch]">
              Not sure which pack fits the crop?
            </h2>
            <p className="lede mt-4">
              Send the crop, the area and the problem. The plant answers with a
              route and a pack.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/solutions#finder">Find the right product</Button>
            <Button href="/enquire?audience=farmer" variant="ghost">
              Talk to an expert
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
