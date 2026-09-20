"use client";

import { useMemo, useState, type ReactNode } from "react";
import { products, type Product } from "@/lib/products";
import {
  crops,
  needs,
  needsOf,
  suitsAllCrops,
  getCrop,
  type CropId,
  type NeedId,
} from "@/lib/solutions";
import { PackCard } from "@/components/PackCard";

type Category = Product["category"];

const categories: { key: Category; label: string }[] = [
  { key: "Consortium", label: "Consortia" },
  { key: "Biocontrol", label: "Biocontrol" },
  { key: "Compost", label: "Compost culture" },
  { key: "Nutrition", label: "Crop nutrition" },
];

/**
 * The catalogue, filterable by type, crop and problem. Every filter is a
 * toggle, so a grower can answer as much as they know and no more.
 */
export function CatalogueBrowser() {
  const [category, setCategory] = useState<Category | undefined>();
  const [crop, setCrop] = useState<CropId | undefined>();
  const [need, setNeed] = useState<NeedId | undefined>();

  const list = useMemo(() => {
    const named = crop ? new Set(getCrop(crop)?.named ?? []) : new Set<string>();
    return products.filter((p) => {
      if (category && p.category !== category) return false;
      if (crop && crop !== "other" && !named.has(p.slug) && !suitsAllCrops(p))
        return false;
      if (need && !needsOf(p).includes(need)) return false;
      return true;
    });
  }, [category, crop, need]);

  const active = [category, crop, need].filter(Boolean).length;

  const groups: { label: string; node: ReactNode }[] = [
    {
      label: "Type",
      node: (
        <>
          {categories.map((c) => (
            <button
              key={c.key}
              type="button"
              className="chip"
              aria-pressed={category === c.key}
              onClick={() => setCategory(category === c.key ? undefined : c.key)}
            >
              {c.label}
            </button>
          ))}
        </>
      ),
    },
    {
      label: "Crop",
      node: (
        <>
          {crops.map((c) => (
            <button
              key={c.id}
              type="button"
              className="chip"
              aria-pressed={crop === c.id}
              onClick={() => setCrop(crop === c.id ? undefined : c.id)}
            >
              <span className="chip-glyph" aria-hidden>
                {c.glyph}
              </span>
              {c.name}
            </button>
          ))}
        </>
      ),
    },
    {
      label: "Problem",
      node: (
        <>
          {needs.map((n) => (
            <button
              key={n.id}
              type="button"
              className="chip"
              aria-pressed={need === n.id}
              title={n.question}
              onClick={() => setNeed(need === n.id ? undefined : n.id)}
            >
              {n.short}
            </button>
          ))}
        </>
      ),
    },
  ];

  return (
    <div>
      <div className="grid gap-8 md:grid-cols-3">
        {groups.map((g) => (
          <div key={g.label}>
            <p className="eyebrow mb-4">{g.label}</p>
            <div className="chip-rail">{g.node}</div>
          </div>
        ))}
      </div>

      <div
        className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--line)] pt-6"
        aria-live="polite"
      >
        <p className="meta">
          {list.length} of {products.length} packs
        </p>
        {active ? (
          <button
            type="button"
            className="link"
            onClick={() => {
              setCategory(undefined);
              setCrop(undefined);
              setNeed(undefined);
            }}
          >
            Clear filters
          </button>
        ) : null}
      </div>

      {list.length ? (
        <div className="shop-grid mt-10">
          {list.map((p, i) => (
            <div
              key={`${category ?? ""}${crop ?? ""}${need ?? ""}-${p.slug}`}
              className="pop"
              style={{ ["--pop-d" as string]: `${Math.min(i, 8) * 40}ms` }}
            >
              <PackCard product={p} index={products.indexOf(p)} reveal={false} />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-[var(--r-lg)] border border-dashed border-[var(--line)] p-12 text-center">
          <p className="display d-3">Nothing matches that combination.</p>
          <p className="prose-body mx-auto mt-4 max-w-[42ch]">
            Try dropping one filter.
          </p>
        </div>
      )}
    </div>
  );
}
