import type { Metadata } from "next";
import { products, type Product } from "@/lib/products";
import { PackCard } from "@/components/PackCard";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Catalogue",
  description:
    "Fifteen packs from Bloom Biotech: IIHR-licensed consortia, biocontrols, compost culture and crop nutrition.",
};

const groups: { key: Product["category"]; title: string; note: string }[] = [
  {
    key: "Consortium",
    title: "Consortia",
    note: "Licensed ICAR-IIHR technologies. Several compatible organisms in one formulation, carrier or liquid.",
  },
  {
    key: "Biocontrol",
    title: "Biocontrol",
    note: "Fungi and bacteria that work on soil-borne disease, sucking pests, soil insects and nematodes.",
  },
  {
    key: "Compost",
    title: "Compost culture",
    note: "Arka Fermented Cocopeat culture for coffee pulp, FYM, green waste and raw coco-peat.",
  },
  {
    key: "Nutrition",
    title: "Crop nutrition",
    note: "Humate, fulvate, calcium, chelated micronutrients and seaweed amino acids. Imported where marked.",
  },
];

export default function ProductsPage() {
  return (
    <>
      <header data-tone="dark" className="pt-[calc(var(--nav-h)+3rem)] pb-16">
        <div className="shell">
          <p className="eyebrow">
            <span className="eyebrow-accent">Catalogue</span>
            <span className="mx-2 opacity-40">/</span>
            15 packs
          </p>
          <h1 className="display d-hero mt-6 max-w-[12ch]">The line, in full.</h1>
          <p className="lede mt-8">
            Organisms, colony count, dose and mixing rule for every pack. Prices
            are quoted from the plant — there is no public price list and no
            checkout.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            {groups.map((g) => (
              <a key={g.key} href={`#${g.key.toLowerCase()}`} className="tag hover:text-[var(--fg)]">
                {g.title}
              </a>
            ))}
          </div>
        </div>
      </header>

      {groups.map((group, gi) => {
        const list = products.filter((p) => p.category === group.key);
        return (
          <section
            key={group.key}
            id={group.key.toLowerCase()}
            data-tone={gi % 2 === 0 ? "light" : "bone"}
            className="band-tight"
          >
            <div className="shell">
              <div className="sec-head" data-rv>
                <p className="eyebrow">
                  <span className="eyebrow-accent">{String(gi + 1).padStart(2, "0")}</span>
                  <span className="mx-2 opacity-40">/</span>
                  {list.length} pack{list.length === 1 ? "" : "s"}
                </p>
                <div>
                  <h2 className="display d-2">{group.title}</h2>
                  <p className="lede mt-4 text-[0.98rem]">{group.note}</p>
                </div>
              </div>
              <div className="shop-grid mt-10">
                {list.map((p) => (
                  <PackCard key={p.slug} product={p} index={products.indexOf(p)} />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section data-tone="carbon" className="band-tight">
        <div className="shell flex flex-wrap items-end justify-between gap-8">
          <div>
            <h2 className="display d-2 max-w-[18ch]">Not sure which pack fits the crop?</h2>
            <p className="lede mt-4">
              Send the crop, the area and the problem. The plant answers with a
              route and a pack.
            </p>
          </div>
          <Button href="/enquire">Request a quote</Button>
        </div>
      </section>
    </>
  );
}
