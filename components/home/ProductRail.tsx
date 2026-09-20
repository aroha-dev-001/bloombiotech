import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";
import { SectionHead } from "../SectionHead";

/**
 * Six packs, not fifteen.
 *
 * The homepage used to pin and scroll the entire catalogue horizontally, which
 * cost a full screen-height of scroll to say something the catalogue page says
 * better. This shows the three licensed IIHR technologies plus one pack from
 * each remaining line, and sends everyone else to /products.
 */
const featured = [
  "bio-sanjiveeni",
  "bhu-samruddhi",
  "bio-astra",
  "bluderma",
  "bloom-compost-culture",
  "ascogold",
];

const picks = featured
  .map((slug) => products.find((p) => p.slug === slug))
  .filter((p): p is (typeof products)[number] => Boolean(p));

export function ProductRail() {
  return (
    <section id="catalogue" data-tone="carbon" className="band">
      <div className="shell">
        <SectionHead
          index="04"
          kicker="The line"
          title="Fifteen packs, four jobs."
          lede="Consortia, biocontrol, compost culture and crop nutrition. Every pack carries its own organisms, colony count, dose and mixing rule."
        />

        <ul className="mt-14 grid gap-px bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-3">
          {picks.map((p, i) => (
            <li key={p.slug} data-rv style={{ ["--rv-d" as string]: `${i * 60}ms` }}>
              <Link
                href={`/products/${p.slug}`}
                className="group flex h-full gap-5 bg-[var(--bg)] p-5 transition-colors duration-500 hover:bg-[color-mix(in_srgb,var(--accent)_8%,var(--bg))] md:p-6"
              >
                <div className="relative aspect-[3/4] w-20 shrink-0 overflow-hidden bg-[color-mix(in_srgb,var(--fg)_6%,transparent)]">
                  <Image
                    src={p.photo}
                    alt=""
                    fill
                    sizes="5rem"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="eyebrow">
                    {p.category}
                    {p.imported ? " · imported" : ""}
                  </p>
                  <h3 className="display d-3 mt-2">{p.name}</h3>
                  <p className="meta mt-2 text-[0.7rem] leading-relaxed">
                    {p.technology}
                  </p>
                  <p className="mt-4 flex items-center justify-between gap-2 border-t border-[var(--line-soft)] pt-3 text-[0.66rem] uppercase tracking-[0.16em] text-[var(--accent)]">
                    Open pack
                    <span
                      className="transition-transform duration-500 group-hover:translate-x-1"
                      aria-hidden
                    >
                      →
                    </span>
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div
          className="mt-10 flex flex-wrap items-center justify-between gap-6"
          data-rv
        >
          <p className="meta max-w-[46ch] text-[0.72rem] leading-relaxed">
            Shown: the three ICAR-IIHR licensed technologies, plus one pack from
            the biocontrol, compost and nutrition lines.
          </p>
          <Link href="/products" className="btn btn-primary">
            See all {products.length} packs
            <span className="arw" aria-hidden>
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
