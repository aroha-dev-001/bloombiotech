"use client";

import Image from "next/image";
import { useId, useState } from "react";

type Side = { src: string | null; alt: string; label: string };

/**
 * Before / after wipe. The range input *is* the control — it carries the
 * keyboard and screen-reader behaviour for free, and the visible handle is
 * decoration painted from the same value.
 *
 * Renders a marked placeholder when either photograph is missing, so the
 * component can ship before the field photographs exist.
 */
export function BeforeAfter({
  before,
  after,
  ratio = "4 / 3",
}: {
  before: Side;
  after: Side;
  ratio?: string;
}) {
  const [split, setSplit] = useState(50);
  const id = useId();

  if (!before.src || !after.src) {
    return (
      <div
        className="stage stage-empty border border-dashed border-[var(--line)]"
        style={{ aspectRatio: ratio }}
      >
        <p className="eyebrow eyebrow-accent">Comparison pending</p>
        <p className="is-placeholder max-w-[32ch]">
          [Before and after photographs pending]
        </p>
      </div>
    );
  }

  return (
    <figure>
      <div
        className="compare"
        style={{ aspectRatio: ratio, ["--split" as string]: `${split}%` }}
      >
        <div className="compare-layer">
          <Image src={after.src} alt={after.alt} fill sizes="(min-width: 900px) 60vw, 100vw" />
        </div>
        <div className="compare-layer compare-top">
          <Image src={before.src} alt={before.alt} fill sizes="(min-width: 900px) 60vw, 100vw" />
        </div>

        <span className="stage-tag">{before.label}</span>
        <span className="stage-tag" style={{ left: "auto", right: 0 }}>
          {after.label}
        </span>

        <input
          id={id}
          type="range"
          min={0}
          max={100}
          value={split}
          className="compare-range"
          aria-label={`Wipe between ${before.label} and ${after.label}`}
          onChange={(e) => setSplit(Number(e.currentTarget.value))}
        />
        <span className="compare-handle" aria-hidden />
      </div>
    </figure>
  );
}
