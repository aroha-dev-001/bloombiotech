import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";
import { SectionHead } from "../SectionHead";

/** Six packs, not the whole catalogue. */
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
          title="The packs we are known for."
          lede="Consortia, biocontrol, compost culture and crop nutrition."
        />

        <ul className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {picks.map((p, i) => (
            <li key={p.slug} data-rv style={{ ["--rv-d" as string]: `${i * 60}ms` }}>
              <Link href={`/products/${p.slug}`} className="pcard group h-full">
                <div className="pcard-media">
                  <Image src={p.photo} alt="" fill sizes="(min-width: 1024px) 26rem, 100vw" />
                </div>
                <div className="pcard-body">
                  <h3 className="display d-3">{p.name}</h3>
                  <p className="meta">{p.technology}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12" data-rv>
          <Link href="/products" className="btn btn-ghost">
            See every pack
            <span className="arw" aria-hidden>
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
