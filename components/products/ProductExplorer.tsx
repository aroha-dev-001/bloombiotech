"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { plateOf, type Product } from "@/lib/products";
import { applicationsOf } from "@/lib/solutions";
import { KeyPoints } from "@/components/KeyPoints";

/**
 * A pack, in key points.
 *
 * Four questions a grower actually asks, each answered in a few short lines
 * rather than a paragraph: what it does and how, how much to use, what is in
 * the pack, and which crops. On a wide screen the picture changes with the
 * answer; on a phone it is left out, because the pack is already at the top of
 * the page and a second tall picture only pushes the answer down.
 *
 * Nothing is invented. The key points, doses and targets are the product
 * record's own (lib/products.ts), shortened.
 */
type TabKey = "does" | "use" | "inside" | "crops";

const routePhotos = {
  drip: { src: "/farm/drip.jpg", alt: "Drip irrigation line watering the root zone" },
  foliar: {
    src: "/farm/foliar.jpg",
    alt: "A knapsack sprayer applying a foliar spray over a crop",
  },
  compost: {
    src: "/farm/compost.jpg",
    alt: "Powder being mixed into farmyard manure with a spade",
  },
  soil: {
    src: "/farm/application.jpg",
    alt: "A farmer pouring the mixed consortium around the base of a plant",
  },
} as const;

/**
 * The route photo that matches how this pack is actually applied.
 *
 * The pack's own first usage step is the authority — it is the route the
 * label leads with. `applicationsOf` is only the fallback, because its tag
 * order does not say which route comes first.
 */
function routeVisual(product: Product) {
  const lead = product.usage[0]?.title.toLowerCase() ?? "";

  // A title can name two routes ("Foliar spray and drip fertigation"); the one
  // printed first is the one the label leads with.
  const hits = (
    [
      ["soil", ["drench", "soil"]],
      ["drip", ["drip", "fertigation"]],
      ["foliar", ["foliar", "spray"]],
      ["compost", ["compost", "fym", "neem"]],
    ] as const
  )
    .map(([key, words]) => {
      const at = words
        .map((w) => lead.indexOf(w))
        .filter((n) => n >= 0)
        .sort((a, b) => a - b)[0];
      return at === undefined ? null : { key, at };
    })
    .filter(Boolean) as { key: keyof typeof routePhotos; at: number }[];

  if (hits.length) return routePhotos[hits.sort((a, b) => a.at - b.at)[0].key];

  const apps = applicationsOf(product);
  for (const k of ["soil", "drip", "foliar", "compost"] as const) {
    if (apps.includes(k)) return routePhotos[k];
  }
  return routePhotos.soil;
}

const microbial = (p: Product) => p.cfu !== "Not a microbial product";

export function ProductExplorer({ product }: { product: Product }) {
  const [tab, setTab] = useState<TabKey>("does");

  const compost = product.category === "Compost";

  const tabs: { key: TabKey; label: string; media: { src: string; alt: string } }[] = [
    {
      key: "does",
      label: "What it does",
      media: { src: "/farm/leaves.jpg", alt: "Healthy green coffee leaves in full sunlight" },
    },
    { key: "use", label: "How to use", media: routeVisual(product) },
    {
      key: "inside",
      label: "What's inside",
      // Bloom's own microbes are grown in the hall; the imported nutrition
      // range is not, so it shows its pack instead.
      media: microbial(product)
        ? {
            src: "/film/fermentation-vessels.jpg",
            alt: "Stainless steel fermenters in the Bloom Biotech production hall",
          }
        : { src: plateOf(product), alt: `${product.name} pack` },
    },
    {
      key: "crops",
      label: compost ? "Works with" : "Crops",
      media: {
        src: "/farm/plantation.jpg",
        alt: "A sunlit coffee plantation under shade trees",
      },
    },
  ];

  const inside = [
    { label: microbial(product) ? "Organisms" : "Contains", value: product.actives },
    ...(microbial(product) ? [{ label: "Live count", value: product.cfu }] : []),
    { label: "Pack", value: product.pack },
    ...(product.specs ?? []),
  ];

  return (
    <div className="pk">
      {/* ------------------------------------------------ the four questions */}
      <div className="pk-tabs" role="tablist" aria-label={`About ${product.name}`}>
        {tabs.map((t) => (
          <button
            key={t.key}
            role="tab"
            type="button"
            id={`pk-tab-${t.key}`}
            aria-selected={tab === t.key}
            aria-controls={`pk-${t.key}`}
            tabIndex={tab === t.key ? 0 : -1}
            className="pk-tab"
            onClick={() => setTab(t.key)}
            onKeyDown={(e) => {
              const i = tabs.findIndex((x) => x.key === tab);
              const step = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
              if (!step) return;
              e.preventDefault();
              const nextKey = tabs[(i + step + tabs.length) % tabs.length].key;
              setTab(nextKey);
              document.getElementById(`pk-tab-${nextKey}`)?.focus();
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="pk-body">
        {/* ------------------------------------------------------ the answer */}
        <div
          className="pk-panel"
          id={`pk-${tab}`}
          role="tabpanel"
          aria-labelledby={`pk-tab-${tab}`}
          key={tab}
        >
          {tab === "does" ? (
            <>
              <KeyPoints items={product.points} />
              {product.against?.length ? (
                <div className="pk-group">
                  <h3 className="pk-sub">Works against</h3>
                  <ul className="pk-chips">
                    {product.against.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </>
          ) : null}

          {tab === "use" ? (
            <>
              <ul className="pk-doses">
                {product.usage.map((u) => (
                  <li key={u.title}>
                    <p className="pk-dose-way">{u.title}</p>
                    <p className="pk-dose">{u.dose ?? u.text}</p>
                    {u.note ? <p className="pk-dose-note">{u.note}</p> : null}
                  </li>
                ))}
              </ul>
              <div className="pk-caution">
                <svg viewBox="0 0 20 20" aria-hidden>
                  <path d="M10 2.5l8 14.5H2z" />
                  <path d="M10 8v4M10 14.2v.3" />
                </svg>
                <p>
                  {product.precaution} {product.storage}
                </p>
              </div>
            </>
          ) : null}

          {tab === "inside" ? (
            <dl className="pk-spec">
              {/* Short values pair up two to a row; a long one takes the row. */}
              {inside.map((s) => (
                <div key={s.label} data-wide={s.value.length > 30 || undefined}>
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          {tab === "crops" ? (
            <>
              <ul className="pk-chips pk-chips-lg">
                {product.crops.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
              {compost ? null : (
                <p className="pk-more">
                  Not sure it suits your crop?{" "}
                  <Link href="/solutions#find">Find your solution</Link>
                </p>
              )}
            </>
          ) : null}
        </div>

        {/* ------------------------------------------------------- the visual */}
        <figure className="pk-media">
          {tabs.map((t) => (
            <Image
              key={t.key}
              src={t.media.src}
              alt={t.key === tab ? t.media.alt : ""}
              fill
              sizes="(min-width: 900px) 24rem, 100vw"
              className="object-cover"
              data-on={t.key === tab ? "true" : undefined}
              aria-hidden={t.key !== tab}
            />
          ))}
        </figure>
      </div>
    </div>
  );
}
