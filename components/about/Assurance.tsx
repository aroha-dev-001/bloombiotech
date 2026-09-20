"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { products } from "@/lib/products";

/**
 * Read the label, not the brochure.
 *
 * The claim only means something if the label is actually readable, so this
 * section is the label: four packs we have real photography for, and for each
 * one the fields that are printed on it, pulled straight from the product
 * record rather than written again here.
 *
 * It replaces a single static photograph and a six-cell grid of generic
 * assurances — which also read as a near-repeat of the capability grid
 * directly above it.
 */
const shelf = [
  { slug: "blumonas", photo: "/packs/can-blumonas.jpg" },
  { slug: "bhu-samruddhi", photo: "/packs/can-bhu-samruddhi.jpg" },
  { slug: "bio-astra", photo: "/packs/can-bio-astra.jpg" },
  { slug: "bluderma", photo: "/packs/can-bluderma.jpg" },
] as const;

const packs = shelf
  .map((s) => {
    const p = products.find((x) => x.slug === s.slug);
    return p ? { ...s, product: p } : null;
  })
  .filter(Boolean) as { slug: string; photo: string; product: (typeof products)[number] }[];

export function Assurance() {
  const [active, setActive] = useState(0);
  const { product } = packs[active];

  const printed = [
    { dt: "What is in it", dd: product.actives },
    { dt: "Colony count", dd: product.cfu },
    { dt: "Pack", dd: product.pack },
    { dt: "How it is applied", dd: product.use },
    { dt: "Do not mix with", dd: product.precaution },
    { dt: "Storage", dd: product.storage },
  ].filter((r) => r.dd);

  return (
    <section id="assurance" data-tone="carbon" className="band">
      <div className="shell grid gap-14 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-20">
        <div className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)] lg:self-start">
          <h2 className="display d-1" data-rv>
            Read the label, not the brochure.
          </h2>
          <p className="lede lede-wide mt-8" data-rv style={{ ["--rv-d" as string]: "100ms" }}>
            Every pack prints the things you can check without taking our word
            for it: the organisms inside, the colony count per gram or
            millilitre, the batch it came from, the day it was made and the day
            it stops working.
          </p>
          <p
            className="prose-body mt-6 max-w-[44ch]"
            data-rv
            style={{ ["--rv-d" as string]: "160ms" }}
          >
            <strong>Where this page and the pack in your hand disagree, the
            pack wins.</strong> Formulations are improved and label figures move
            with them; the can is the version that shipped.
          </p>
          <div className="mt-10" data-rv style={{ ["--rv-d" as string]: "220ms" }}>
            <Link href="/products" className="btn btn-ghost">
              Every pack in full
              <span className="arw" aria-hidden>
                →
              </span>
            </Link>
          </div>
        </div>

        <div data-rv className="label-wrap">
          <div className="label-reader">
            <figure className="label-stage">
              {packs.map((p, i) => (
                <Image
                  key={p.slug}
                  src={p.photo}
                  alt={
                    i === active
                      ? `${p.product.name} pack, showing the printed organisms, colony count, batch and expiry fields`
                      : ""
                  }
                  fill
                  sizes="(min-width: 1024px) 26rem, 60vw"
                  className="object-contain"
                  data-on={i === active ? "true" : undefined}
                  aria-hidden={i !== active}
                />
              ))}
            </figure>

            <div className="label-side">
              <div className="label-picker" role="tablist" aria-label="Choose a pack">
                {packs.map((p, i) => (
                  <button
                    key={p.slug}
                    type="button"
                    role="tab"
                    aria-selected={i === active}
                    tabIndex={i === active ? 0 : -1}
                    data-on={i === active ? "true" : undefined}
                    className="label-thumb"
                    onClick={() => setActive(i)}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                        e.preventDefault();
                        setActive((v) => (v + 1) % packs.length);
                      }
                      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                        e.preventDefault();
                        setActive((v) => (v - 1 + packs.length) % packs.length);
                      }
                    }}
                  >
                    <Image src={p.photo} alt="" fill sizes="5rem" className="object-contain" />
                    <span className="sr-only">{p.product.name}</span>
                  </button>
                ))}
              </div>

              <h3 className="display d-2 mt-8">{product.name}</h3>
              <p className="meta mt-2">{product.technology}</p>

              {/* Tight variant: in a ~20rem column the two-column spec leaves the value
                  less room than its label. */}
              <dl className="spec spec-tight mt-8" key={product.slug}>
                {printed.map((r) => (
                  <div key={r.dt}>
                    <dt>{r.dt}</dt>
                    <dd>{r.dd}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8">
                <Link href={`/products/${product.slug}`} className="link">
                  {product.name} in full
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
