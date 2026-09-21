"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { plateOf, type Product } from "@/lib/products";
import { applicationsOf } from "@/lib/solutions";

/**
 * A pack, explored rather than read top to bottom.
 *
 * The old page listed specification, usage, benefits and body copy as one
 * vertical wall — a PDF with a web address. Here the same facts are four
 * questions a grower actually asks, and the picture changes with the answer:
 * the pack itself for what is inside it, the crop for what it does, the
 * matching application route for how it is used.
 *
 * Nothing is invented. Every field comes from the product record.
 */
type TabKey = "contains" | "does" | "use" | "crops";

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

export function ProductExplorer({ product }: { product: Product }) {
  const [tab, setTab] = useState<TabKey>("contains");

  const route = routeVisual(product);

  const tabs: { key: TabKey; label: string; media: { src: string; alt: string }; fit: "contain" | "cover" }[] = [
    {
      key: "contains",
      label: "What's in it",
      // The normalized plate, not the raw photograph: contained on the page's
      // own ground, the source frame's grey bench showed as a rectangle.
      media: { src: plateOf(product), alt: `${product.name} pack` },
      fit: "cover",
    },
    {
      key: "does",
      label: "What it does",
      media: { src: "/farm/leaves.jpg", alt: "Healthy green coffee leaves in full sunlight" },
      fit: "cover",
    },
    { key: "use", label: "How to use it", media: route, fit: "cover" },
    {
      key: "crops",
      label: "Which crops",
      media: {
        src: "/farm/plantation.jpg",
        alt: "A sunlit coffee plantation under shade trees",
      },
      fit: "cover",
    },
  ];

  const current = tabs.find((t) => t.key === tab) ?? tabs[0];

  return (
    <div className="pex">
      {/* ------------------------------------------------ the four questions */}
      <div className="pex-tabs" role="tablist" aria-label={`About ${product.name}`}>
        {tabs.map((t) => (
          <button
            key={t.key}
            role="tab"
            type="button"
            aria-selected={tab === t.key}
            aria-controls={`pex-${t.key}`}
            tabIndex={tab === t.key ? 0 : -1}
            data-on={tab === t.key ? "true" : undefined}
            className="pex-tab"
            onClick={() => setTab(t.key)}
            onKeyDown={(e) => {
              const i = tabs.findIndex((x) => x.key === tab);
              if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                e.preventDefault();
                setTab(tabs[(i + 1) % tabs.length].key);
              }
              if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                e.preventDefault();
                setTab(tabs[(i - 1 + tabs.length) % tabs.length].key);
              }
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="pex-body">
        {/* ------------------------------------------------------ the answer */}
        <div className="pex-panel" id={`pex-${tab}`} role="tabpanel" key={tab}>
          {tab === "contains" ? (
            <dl className="pspec">
              <div>
                <dt>Organisms</dt>
                <dd>{product.actives}</dd>
              </div>
              <div>
                <dt>Colony count</dt>
                <dd>{product.cfu}</dd>
              </div>
              <div>
                <dt>Formulation</dt>
                <dd>{product.technology}</dd>
              </div>
              <div>
                <dt>Pack</dt>
                <dd>{product.pack}</dd>
              </div>
              {product.specs?.map((s) => (
                <div key={s.label}>
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          {tab === "does" ? (
            <>
              <p className="pex-lead">{product.short}</p>
              {product.benefits?.length ? (
                <ul className="pex-list">
                  {product.benefits.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              ) : null}
              <dl className="pspec">
                <div>
                  <dt>Works against</dt>
                  <dd>{product.targets}</dd>
                </div>
              </dl>
            </>
          ) : null}

          {tab === "use" ? (
            <>
              <ol className="pex-steps">
                {product.usage.map((u, n) => (
                  <li key={u.title}>
                    <span className="pex-step-n" aria-hidden>
                      {n + 1}
                    </span>
                    <div>
                      <h4>{u.title}</h4>
                      <p>{u.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="note-caution mt-10">
                <p className="pex-note">{product.precaution}</p>
                <p className="pex-note mt-3">{product.storage}</p>
              </div>
            </>
          ) : null}

          {tab === "crops" ? (
            <>
              <ul className="pex-crops">
                {product.crops.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
              <p className="pex-lead mt-8">
                Not sure this is the right pack for your crop?{" "}
                <Link href="/solutions#find" className="underline underline-offset-4">
                  Find your solution
                </Link>
                .
              </p>
            </>
          ) : null}
        </div>

        {/* ------------------------------------------------------- the visual */}
        <figure className="pex-media" data-fit={current.fit}>
          {tabs.map((t) => (
            <Image
              key={t.key}
              src={t.media.src}
              alt={t.key === tab ? t.media.alt : ""}
              fill
              sizes="(min-width: 1024px) 30rem, 100vw"
              className={t.fit === "contain" ? "object-contain" : "object-cover"}
              data-on={t.key === tab ? "true" : undefined}
              aria-hidden={t.key !== tab}
            />
          ))}
        </figure>
      </div>
    </div>
  );
}
