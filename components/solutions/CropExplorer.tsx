"use client";

import Link from "next/link";
import { useState } from "react";
import {
  crops,
  getNeed,
  rankForCrop,
  shortlist,
  type CropId,
  type NeedId,
} from "@/lib/solutions";
import { CropTiles } from "./ProductFinder";
import { ResultCard } from "./ResultCard";
import { whatsappUrl } from "@/lib/site";

/**
 * "Solutions for the crops you grow." Pick a crop, see the needs Bloom packs
 * are indicated for, then narrow to one need. Defaults to coffee — the crop the
 * plant itself sits in.
 */
export function CropExplorer({
  initial = "coffee",
  initialNeed,
}: {
  initial?: CropId;
  initialNeed?: NeedId;
}) {
  const [cropId, setCropId] = useState<CropId>(initial);
  const [need, setNeed] = useState<NeedId | undefined>(initialNeed);

  const crop = crops.find((c) => c.id === cropId)!;
  const ranked = rankForCrop({ crop: cropId, need });
  const { lead } = shortlist(ranked, need);
  const shown = lead.slice(0, 6);

  return (
    <div>
      <CropTiles
        active={cropId}
        onSelect={(id) => {
          setCropId(id);
          setNeed(undefined);
        }}
      />

      <div className="mt-px grid gap-px bg-[var(--line)] lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
        {/* ------------------------------------------------ common needs */}
        <div className="bg-[var(--bg)] p-6 md:p-8">
          <p className="eyebrow">
            <span className="eyebrow-accent">{crop.glyph}</span>
            <span className="mx-2 opacity-40">/</span>
            {crop.name}
          </p>
          <h3 className="display d-2 mt-5">Common needs</h3>

          <ul className="mt-6 grid gap-px bg-[var(--line-soft)]">
            {crop.needs.map((id) => {
              const n = getNeed(id);
              if (!n) return null;
              const on = need === id;
              return (
                <li key={id}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-3 bg-[var(--bg)] px-4 py-3.5 text-left transition-colors duration-300 hover:bg-[color-mix(in_srgb,var(--accent)_8%,var(--bg))]"
                    style={
                      on
                        ? { background: "color-mix(in srgb, var(--accent) 13%, var(--bg))" }
                        : undefined
                    }
                    aria-pressed={on}
                    onClick={() => setNeed(on ? undefined : id)}
                  >
                    <span>
                      <span className="block text-[0.98rem] leading-tight">
                        {n.label}
                      </span>
                      <span className="meta mt-1 block text-[0.66rem] leading-relaxed">
                        {n.question}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className="shrink-0 text-[var(--accent)] transition-transform duration-300"
                      style={on ? { transform: "rotate(45deg)" } : undefined}
                    >
                      +
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <p className="meta mt-6 text-[0.68rem] leading-relaxed">{crop.basis}</p>
        </div>

        {/* -------------------------------------------- recommended packs */}
        <div className="bg-[var(--bg)] p-6 md:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h3 className="display d-2">Recommended solutions</h3>
            <p className="eyebrow">
              {shown.length} of {ranked.length} pack
              {ranked.length === 1 ? "" : "s"}
              {need ? ` · ${getNeed(need)?.short}` : ""}
            </p>
          </div>

          <div className="result-grid mt-6">
            {shown.map((r, i) => (
              <ResultCard
                key={`${cropId}-${need ?? ""}-${r.product.slug}`}
                product={r.product}
                index={i}
                note={r.reason}
                tier={r.tier}
              />
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href={`/solutions?crop=${cropId}${need ? `&need=${need}` : ""}`}
              className="btn btn-primary"
            >
              All solutions for {crop.name.toLowerCase()}
              <span className="arw" aria-hidden>
                →
              </span>
            </Link>
            <a
              href={whatsappUrl(
                `Hello Bloom Biotech. Crop: ${crop.name}.${
                  need ? ` Need: ${getNeed(need)?.label}.` : ""
                } Area: `,
              )}
              className="link"
            >
              Ask an expert <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
