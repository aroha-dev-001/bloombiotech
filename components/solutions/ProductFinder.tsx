"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  applications,
  crops,
  needs,
  rankForCrop,
  shortlist,
  getCrop,
  getNeed,
  type ApplicationId,
  type CropId,
  type NeedId,
} from "@/lib/solutions";
import { ResultCard } from "./ResultCard";
import { site, telHref, whatsappUrl } from "@/lib/site";

/**
 * Three questions, then packs. Deliberately not a form: nothing is required,
 * nothing is submitted, and every answer is reversible in one tap.
 *
 * Crop is the only gate — need and application narrow the list further but the
 * grower sees packs as soon as the crop is chosen.
 */
export function ProductFinder({
  compact = false,
  initialCrop,
  initialNeed,
}: {
  compact?: boolean;
  /** Deep links: /solutions?crop=coffee&need=composting. */
  initialCrop?: CropId;
  initialNeed?: NeedId;
}) {
  const [crop, setCrop] = useState<CropId | undefined>(initialCrop);
  const [need, setNeed] = useState<NeedId | undefined>(initialNeed);
  const [application, setApplication] = useState<ApplicationId | undefined>();
  const [showAll, setShowAll] = useState(false);

  const ranked = useMemo(
    () => (crop ? rankForCrop({ crop, need, application }) : []),
    [crop, need, application],
  );
  const { lead, rest } = useMemo(
    () => shortlist(ranked, need),
    [ranked, need],
  );
  const shown = showAll ? [...lead, ...rest] : lead;

  const cropRecord = crop ? getCrop(crop) : undefined;
  const needRecord = need ? getNeed(need) : undefined;

  // The crop's own common needs lead; the rest stay reachable underneath.
  const orderedNeeds = useMemo(() => {
    if (!cropRecord) return needs;
    const primary = new Set(cropRecord.needs);
    return [...needs].sort(
      (a, b) => Number(primary.has(b.id)) - Number(primary.has(a.id)),
    );
  }, [cropRecord]);

  const summary = [
    cropRecord?.name,
    needRecord?.label.toLowerCase(),
    application ? `${application} application` : undefined,
  ]
    .filter(Boolean)
    .join(" · ");

  const expertMessage = crop
    ? `Hello Bloom Biotech. Crop: ${cropRecord?.name}.${
        needRecord ? ` Need: ${needRecord.label}.` : ""
      }${application ? ` Application: ${application}.` : ""} Area: `
    : undefined;

  return (
    <div className="finder" id="finder">
      <div className="finder-steps">
        {/* ---------------------------------------------------- step 1 */}
        <div className="finder-step" data-state={crop ? "done" : "active"}>
          <p className="finder-step-n">
            <i aria-hidden />
            Step 1
          </p>
          <h3 className="display d-3">Select your crop</h3>
          <div className="chip-rail" role="group" aria-label="Select your crop">
            {crops.map((c) => (
              <button
                key={c.id}
                type="button"
                className="chip"
                aria-pressed={crop === c.id}
                onClick={() => {
                  const next = crop === c.id ? undefined : c.id;
                  setCrop(next);
                  setShowAll(false);
                  // A new crop invalidates narrower answers.
                  if (next !== crop) {
                    setNeed(undefined);
                    setApplication(undefined);
                  }
                }}
              >
                <span className="chip-glyph" aria-hidden>
                  {c.glyph}
                </span>
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* ---------------------------------------------------- step 2 */}
        <div
          className="finder-step"
          data-state={!crop ? "locked" : need ? "done" : "active"}
        >
          <p className="finder-step-n">
            <i aria-hidden />
            Step 2
          </p>
          <h3 className="display d-3">What are you looking for?</h3>
          <div
            className="chip-rail"
            role="group"
            aria-label="What are you looking for?"
          >
            {orderedNeeds.map((n) => (
              <button
                key={n.id}
                type="button"
                className="chip"
                disabled={!crop}
                aria-pressed={need === n.id}
                title={n.question}
                onClick={() => {
                  setNeed(need === n.id ? undefined : n.id);
                  setShowAll(false);
                }}
              >
                {n.label}
              </button>
            ))}
          </div>
          {needRecord ? (
            <p className="meta text-[0.7rem] leading-relaxed">
              {needRecord.question}
            </p>
          ) : null}
        </div>

        {/* ---------------------------------------------------- step 3 */}
        <div
          className="finder-step"
          data-state={!crop ? "locked" : application ? "done" : "active"}
        >
          <p className="finder-step-n">
            <i aria-hidden />
            Step 3 · optional
          </p>
          <h3 className="display d-3">How will you apply it?</h3>
          <div className="chip-rail" role="group" aria-label="How will you apply it?">
            {applications.map((a) => (
              <button
                key={a.id}
                type="button"
                className="chip"
                disabled={!crop}
                aria-pressed={application === a.id}
                title={a.route}
                onClick={() => {
                  setApplication(application === a.id ? undefined : a.id);
                  setShowAll(false);
                }}
              >
                {a.label}
              </button>
            ))}
          </div>
          <p className="meta text-[0.7rem] leading-relaxed">
            Leave this open to see every route.
          </p>
        </div>
      </div>

      {/* ------------------------------------------------------ results */}
      <div className="finder-result">
        {!crop ? (
          <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
            <p className="prose-body max-w-[52ch] text-[0.95rem]">
              Pick a crop to see the packs Bloom makes for it. Dose and mixing
              rules always follow the label on the pack in your hand.
            </p>
            <Link href="/products" className="link justify-self-start">
              Browse all 15 packs <span aria-hidden>→</span>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">
                  <span className="eyebrow-accent">Recommended</span>
                  <span className="mx-2 opacity-40">/</span>
                  {shown.length} of {ranked.length} pack
                  {ranked.length === 1 ? "" : "s"}
                </p>
                <p className="display d-3 mt-3 max-w-[22ch]">{summary}</p>
              </div>
              <button
                type="button"
                className="link"
                onClick={() => {
                  setCrop(undefined);
                  setNeed(undefined);
                  setApplication(undefined);
                  setShowAll(false);
                }}
              >
                Start again <span aria-hidden>↺</span>
              </button>
            </div>

            {cropRecord?.basis ? (
              <p className="meta mt-5 max-w-[68ch] text-[0.7rem] leading-relaxed">
                {cropRecord.basis}
              </p>
            ) : null}

            {shown.length ? (
              <>
                <div className="result-grid mt-7">
                  {shown.map((r, i) => (
                    <ResultCard
                      key={`${crop}-${need ?? ""}-${application ?? ""}-${r.product.slug}`}
                      product={r.product}
                      index={i}
                      note={r.reason}
                      tier={r.tier}
                    />
                  ))}
                </div>
                {rest.length ? (
                  <button
                    type="button"
                    className="link mt-6"
                    onClick={() => setShowAll((v) => !v)}
                  >
                    {showAll
                      ? "Show the shortlist only"
                      : `Show ${rest.length} more suitable for all crops`}
                    <span aria-hidden>{showAll ? "↑" : "↓"}</span>
                  </button>
                ) : null}
                {!need ? (
                  <p className="meta mt-5 max-w-[62ch] text-[0.7rem] leading-relaxed">
                    Most Bloom packs print “suitable for all crops”. The
                    shortlist above leads with the packs named for this crop and
                    the ones that answer what it is usually worked on for — pick
                    a problem in step 2 to narrow it properly.
                  </p>
                ) : null}
              </>
            ) : (
              <div className="mt-7 border border-dashed border-[var(--line)] p-6">
                <p className="display d-3">No pack matches all three.</p>
                <p className="prose-body mt-3 max-w-[48ch] text-[0.92rem]">
                  Try clearing the application route, or talk to the plant — a
                  crop this specific is usually a phone call, not a filter.
                </p>
              </div>
            )}

            {/* ------------------------------------------ talk to an expert */}
            <div className="mt-10 border-t border-[var(--line)] pt-8">
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <p className="eyebrow eyebrow-accent">Not sure?</p>
                  <h4 className="display d-2 mt-3 max-w-[16ch]">
                    Talk to an expert.
                  </h4>
                  <p className="prose-body mt-4 max-w-[46ch] text-[0.95rem]">
                    Tell the plant your crop and acreage. You get a route, a pack
                    and a dose — not a price list.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={whatsappUrl(expertMessage)}
                    className="btn btn-primary"
                  >
                    WhatsApp an expert
                    <span className="arw" aria-hidden>
                      →
                    </span>
                  </a>
                  <a href={telHref()} className="btn btn-ghost">
                    {site.phoneDisplay}
                    <span className="arw" aria-hidden>
                      →
                    </span>
                  </a>
                  {!compact ? (
                    <Link href="/enquire?audience=farmer" className="btn btn-ghost">
                      Send an enquiry
                      <span className="arw" aria-hidden>
                        →
                      </span>
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/** Small crop tiles — the visual way into the same finder. */
export function CropTiles({
  active,
  onSelect,
}: {
  active?: CropId;
  onSelect: (id: CropId) => void;
}) {
  return (
    <div className="crop-grid">
      {crops.map((c) => (
        <button
          key={c.id}
          type="button"
          className="crop-card"
          data-on={active === c.id ? "true" : undefined}
          aria-pressed={active === c.id}
          onClick={() => onSelect(c.id)}
        >
          <Image src={c.photo} alt="" fill sizes="(min-width: 1000px) 20vw, 50vw" />
          <span className="chip-glyph text-[1.4rem]" aria-hidden>
            {c.glyph}
          </span>
          <span className="crop-card-name">{c.name}</span>
          {c.kn ? <span className="crop-card-kn">{c.kn}</span> : null}
        </button>
      ))}
    </div>
  );
}
