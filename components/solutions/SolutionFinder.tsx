"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  crops,
  needs,
  applications,
  rankForCrop,
  shortlist,
  getCrop,
  getNeed,
  getApplication,
  type CropId,
  type NeedId,
  type ApplicationId,
} from "@/lib/solutions";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { scrollToElement } from "@/lib/scroll";
import { ResultCard } from "./ResultCard";
import { site, telHref, whatsappUrl } from "@/lib/site";

/**
 * Find your solution — crop, then need, then route, then the packs.
 *
 * One interaction, no form, nothing submitted. Every answer is reversible in a
 * tap and the results update underneath.
 *
 * The scroll behaviour is the point on a phone. The crop grid alone runs past
 * two screens, so a selection that only changed state left the next question
 * below the fold and the grower with nothing to follow. Each answer now carries
 * the page to the question it unlocked — but only when that question is not
 * already on screen, so a desktop user who can see everything is never yanked.
 */
export function SolutionFinder({
  initialCrop,
  initialNeed,
  initialApplication,
}: {
  initialCrop?: CropId;
  initialNeed?: NeedId;
  initialApplication?: ApplicationId;
}) {
  const reduce = useReducedMotion();
  const [crop, setCrop] = useState<CropId | undefined>(initialCrop);
  const [need, setNeed] = useState<NeedId | undefined>(initialNeed);
  const [route, setRoute] = useState<ApplicationId | undefined>(initialApplication);

  const cropStep = useRef<HTMLDivElement>(null);
  const needStep = useRef<HTMLDivElement>(null);
  const routeStep = useRef<HTMLDivElement>(null);
  const results = useRef<HTMLDivElement>(null);

  /**
   * Bring a step into view, but only if it is not already comfortably there.
   * Measured after two frames so the newly unlocked step has laid out first.
   */
  const reveal = useCallback(
    (ref: React.RefObject<HTMLDivElement | null>) => {
      const run = () => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const navH =
          parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue("--nav-h"),
          ) * 16 || 84;
        // Low on the screen, or scrolled off the top: move. Otherwise leave it.
        const offscreen = rect.top > window.innerHeight * 0.55 || rect.top < navH;
        if (!offscreen) return;
        scrollToElement(el, { smooth: !reduce });
      };
      // A timeout rather than rAF: clicks are discrete, so React has already
      // committed by the time this runs, and rAF is paused in a background tab.
      window.setTimeout(run, 0);
    },
    [reduce],
  );

  const ranked = useMemo(
    () => (crop ? rankForCrop({ crop, need, application: route }) : []),
    [crop, need, route],
  );
  const shown = useMemo(() => shortlist(ranked, need).lead.slice(0, 6), [ranked, need]);

  const cropRecord = crop ? getCrop(crop) : undefined;
  const needRecord = need ? getNeed(need) : undefined;
  const routeRecord = route ? getApplication(route) : undefined;

  // The crop's own common needs lead; everything else stays reachable below.
  const orderedNeeds = useMemo(() => {
    if (!cropRecord) return needs;
    const primary = new Set<NeedId>(cropRecord.needs);
    return [...needs].sort(
      (a, b) => Number(primary.has(b.id)) - Number(primary.has(a.id)),
    );
  }, [cropRecord]);

  const message = cropRecord
    ? `Hello Bloom Biotech. Crop: ${cropRecord.name}.${
        needRecord ? ` Need: ${needRecord.label}.` : ""
      }${routeRecord ? ` Applied by: ${routeRecord.route}.` : ""} Area: `
    : undefined;

  const reset = () => {
    setCrop(undefined);
    setNeed(undefined);
    setRoute(undefined);
    reveal(cropStep);
  };

  /* The answers so far, kept on screen while the grower moves down the page.
     Steps are named rather than carrying their refs, so nothing hands a ref
     around during render. */
  const stepRef = {
    crop: cropStep,
    need: needStep,
    route: routeStep,
  } as const;

  type StepName = keyof typeof stepRef;

  const trail = [
    cropRecord && {
      key: "crop" as StepName,
      label: cropRecord.name,
      onClear: () => {
        setCrop(undefined);
        setNeed(undefined);
        setRoute(undefined);
      },
    },
    needRecord && {
      key: "need" as StepName,
      label: needRecord.short,
      onClear: () => setNeed(undefined),
    },
    routeRecord && {
      key: "route" as StepName,
      label: routeRecord.label,
      onClear: () => setRoute(undefined),
    },
  ].filter(Boolean) as {
    key: StepName;
    label: string;
    onClear: () => void;
  }[];

  return (
    <div className="finder" id="find">
      {/* ------------------------------------------------ what you chose */}
      <div className="finder-trail" data-on={crop ? "true" : undefined} aria-live="polite">
        <div className="finder-trail-inner">
          {trail.map((t) => (
            <span key={t.key} className="finder-chip">
              <button
                type="button"
                className="finder-chip-label"
                onClick={() => reveal(stepRef[t.key])}
              >
                {t.label}
              </button>
              <button
                type="button"
                className="finder-chip-x"
                onClick={t.onClear}
                aria-label={`Clear ${t.label}`}
              >
                <span aria-hidden>×</span>
              </button>
            </span>
          ))}
          <button type="button" className="finder-reset" onClick={reset}>
            Start again
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------- the crop */}
      <div className="finder-q" ref={cropStep}>
        <h3 className="display d-2">What do you grow?</h3>
        <div className="crop-grid" role="group" aria-label="What do you grow?">
          {crops.map((c) => (
            <button
              key={c.id}
              type="button"
              className="crop-card"
              data-on={crop === c.id ? "true" : undefined}
              aria-pressed={crop === c.id}
              onClick={() => {
                if (crop === c.id) {
                  setCrop(undefined);
                  setNeed(undefined);
                  setRoute(undefined);
                  return;
                }
                setCrop(c.id);
                setNeed(undefined);
                setRoute(undefined);
                reveal(needStep);
              }}
            >
              <Image src={c.photo} alt="" fill sizes="(min-width: 760px) 20vw, 50vw" />
              <span className="crop-card-name">{c.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------------- the need */}
      <div className="finder-q" ref={needStep} data-state={crop ? undefined : "locked"}>
        <h3 className="display d-2">What do you want to do?</h3>
        <div className="need-grid" role="group" aria-label="What do you want to do?">
          {orderedNeeds.map((n) => (
            <button
              key={n.id}
              type="button"
              className="need-card"
              disabled={!crop}
              aria-pressed={need === n.id}
              onClick={() => {
                if (need === n.id) {
                  setNeed(undefined);
                  return;
                }
                setNeed(n.id);
                setRoute(undefined);
                reveal(routeStep);
              }}
            >
              <span>{n.label}</span>
              <i aria-hidden>→</i>
            </button>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------------ the route */}
      <div className="finder-q" ref={routeStep} data-state={need ? undefined : "locked"}>
        <h3 className="display d-2">How will you apply it?</h3>
        <div className="need-grid" role="group" aria-label="How will you apply it?">
          {applications.map((a) => (
            <button
              key={a.id}
              type="button"
              className="need-card"
              disabled={!need}
              aria-pressed={route === a.id}
              onClick={() => {
                setRoute(route === a.id ? undefined : a.id);
                reveal(results);
              }}
            >
              <span>{a.label}</span>
              <i aria-hidden>→</i>
            </button>
          ))}
        </div>
        <p className="prose-body">
          Skip this if you are not sure — it only narrows the list.
        </p>
      </div>

      {/* ---------------------------------------------------- the answer */}
      <div ref={results} className="finder-q">
        {crop ? (
          <>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h3 className="display d-2 max-w-[18ch]">
                {needRecord
                  ? `${needRecord.short} in ${cropRecord?.name.toLowerCase()}`
                  : `For ${cropRecord?.name.toLowerCase()}`}
              </h3>
              <button type="button" className="link" onClick={reset}>
                Start again
              </button>
            </div>

            {shown.length ? (
              <div className="result-grid mt-2">
                {shown.map((r, i) => (
                  <ResultCard
                    key={`${crop}-${need ?? ""}-${route ?? ""}-${r.product.slug}`}
                    product={r.product}
                    index={i}
                    note={!need || r.tier === "named" ? r.reason : undefined}
                    tier={r.tier}
                  />
                ))}
              </div>
            ) : (
              <p className="lede lede-wide">
                Nothing matches that combination.{" "}
                {route ? (
                  <button type="button" className="link" onClick={() => setRoute(undefined)}>
                    Clear the application route
                  </button>
                ) : (
                  "Tell us the crop and the problem and you will get a straight answer."
                )}
              </p>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={whatsappUrl(message)} className="btn btn-primary">
                Send this to us
                <span className="arw" aria-hidden>
                  →
                </span>
              </a>
              <a href={telHref()} className="btn btn-ghost">
                {site.phoneDisplay}
              </a>
            </div>
          </>
        ) : (
          <p className="lede lede-wide">
            Pick a crop to see the packs made for it, or{" "}
            <Link href="/products" className="text-[var(--fg)] underline underline-offset-4">
              browse everything
            </Link>
            .
          </p>
        )}
      </div>
    </div>
  );
}
