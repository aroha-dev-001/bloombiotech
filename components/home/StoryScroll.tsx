"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useMounted } from "@/hooks/useMounted";

/**
 * The Bloom Biotech film: factory → drone → fermentation → the packs →
 * plantation → application → soil and water.
 *
 * Scroll is the camera. Scroll position is a continuous value; every scene's
 * opacity and scale are written from it each frame, so neighbouring scenes
 * genuinely cross-dissolve rather than a fixed transition firing on a cut.
 *
 * Four of the seven scenes are real Bloom footage, restored from the original
 * SD source. The scrim is deliberately light — the footage is sunny and the
 * point is to keep it that way, so only the strip behind the caption darkens.
 *
 * React state changes only when the whole-number scene changes, for the ticks
 * and for what screen readers are told; the per-frame work never re-renders.
 */
type Scene = {
  key: string;
  label: string;
  line: string;
  src: string;
  srcPortrait?: string;
  alt: string;
  /** Real footage, played in place of the still on capable screens. */
  video?: { src: string; poster: string; srcPortrait?: string };
  /** Packshots are the wrong shape to bleed off the frame. */
  fit?: "cover" | "contain";
  /** A bright frame needs dark type on it, not white. */
  ink?: "dark";
};

const scenes: readonly Scene[] = [
  {
    key: "sign",
    label: "Bloom Biotech.",
    line: "Green biotechnology, made in Karnataka.",
    src: "/film/factory-sign.jpg",
    alt: "The Bloom Biotech sign on the production unit",
    video: { src: "/film/factory-sign.mp4", poster: "/film/factory-sign.jpg" },
  },
  {
    key: "factory",
    label: "This is where it is made.",
    line: "Beekanahalli Village, Chikkamagaluru.",
    src: "/film/factory-exterior.jpg",
    alt: "The Bloom Biotech production unit in bright sunlight",
    video: { src: "/film/factory-exterior.mp4", poster: "/film/factory-exterior.jpg" },
  },
  {
    key: "fermentation",
    label: "We grow the microbes ourselves.",
    line: "Licensed from ICAR-IIHR, fermented on site.",
    src: "/film/fermentation.jpg",
    srcPortrait: "/film/fermentation-portrait.jpg",
    alt: "Stainless steel fermenters in the Bloom Biotech production hall",
    video: {
      src: "/film/fermentation.mp4",
      poster: "/film/fermentation.jpg",
      srcPortrait: "/film/fermentation-portrait.mp4",
    },
  },
  {
    key: "pack",
    label: "Then it is filled and marked.",
    line: "Batch number, manufacture and expiry on every pack.",
    src: "/film/products-lineup.jpg",
    srcPortrait: "/film/products-lineup-portrait.jpg",
    alt: "Blumonas, Bhu Samruddhi, Bio Astra and Root Care cans photographed together",
    ink: "dark",
  },
  {
    key: "plantation",
    label: "Then it goes to the estates.",
    line: "Coffee, pepper, pomegranate and more.",
    src: "/farm/plantation.jpg",
    srcPortrait: "/farm/plantation-portrait.jpg",
    alt: "A sunlit coffee plantation under shade trees in Karnataka",
  },
  {
    key: "application",
    label: "Poured at the root.",
    line: "One kilogram in forty litres of water.",
    src: "/farm/application.jpg",
    srcPortrait: "/farm/application-portrait.jpg",
    alt: "A farmer pouring the mixed consortium around the base of a young coffee plant",
  },
  {
    key: "water",
    label: "Or run through the drip line.",
    line: "Filtered, then straight to the root zone.",
    src: "/farm/drip.jpg",
    srcPortrait: "/farm/drip-portrait.jpg",
    alt: "Water dripping from an irrigation emitter onto red soil beside green plants",
  },
];

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);
const smooth = (n: number) => n * n * (3 - 2 * n);

/**
 * How present scene `i` is at continuous progress `p`.
 * Fades in across the preceding quarter-scene, holds, fades out across its
 * own last quarter — so scene i's fade-out and scene i+1's fade-in are the
 * same window and the pair genuinely cross-dissolves. Presence sums to 1
 * across the whole run, so the stage is never empty.
 *
 * The last scene holds to the end rather than fading the stage out as the
 * section releases.
 */
function presence(p: number, i: number, last: boolean) {
  const t = p - i;
  if (t <= -0.25) return 0;
  if (last) return t < 0 ? smooth(clamp01((t + 0.25) / 0.25)) : 1;
  if (t >= 1) return 0;
  if (t < 0) return smooth(clamp01((t + 0.25) / 0.25));
  if (t > 0.75) return smooth(clamp01((1 - t) / 0.25));
  return 1;
}

function isThrifty() {
  const conn = (
    navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }
  ).connection;
  return conn?.saveData === true || /2g/.test(conn?.effectiveType ?? "");
}

export function StoryScroll() {
  const reduce = useReducedMotion();
  const mounted = useMounted();
  const wide = useMediaQuery("(min-width: 760px)");
  const wrap = useRef<HTMLElement>(null);
  const sceneEls = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  const portrait = mounted && !wide;
  // The cuts are short and encoded for web now, so phones get footage too —
  // but never on a metered or 2g connection.
  const canPlay = mounted && !reduce && !isThrifty();

  // `autoPlay` fetches regardless of preload="none", so mounting the first
  // scenes eagerly pulled ~1.4 MB before the visitor had scrolled at all.
  // Nothing loads until the film is within a screen of the viewport.
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = wrap.current;
    if (!el || near) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "100% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [near]);

  const allowVideo = canPlay && near;

  useEffect(() => {
    if (reduce) return;
    const el = wrap.current;
    if (!el) return;

    let frame = 0;
    const read = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const span = Math.max(1, rect.height - window.innerHeight);
      const p = clamp01(-rect.top / span) * scenes.length;

      for (let i = 0; i < scenes.length; i++) {
        const node = sceneEls.current[i];
        if (!node) continue;
        node.style.setProperty("--o", String(presence(p, i, i === scenes.length - 1)));
        // One continuous push per scene, across its whole travel.
        node.style.setProperty("--s", String(1.1 - clamp01(p - i + 0.25) * 0.1));
        // Copy wipes in while the frame is still dissolving in, so the words
        // are fully there the moment the scene lands, and leaves as it goes.
        // The last scene keeps its words — there is nothing to hand over to.
        const t = p - i;
        const last = i === scenes.length - 1;
        const cIn = smooth(clamp01((t + 0.16) / 0.2));
        const cOut = last ? 0 : smooth(clamp01((t - 0.84) / 0.16));
        node.style.setProperty("--c", String(cIn * (1 - cOut)));
        // The supporting line trails the headline by a beat.
        const c2In = smooth(clamp01((t + 0.06) / 0.2));
        node.style.setProperty("--c2", String(c2In * (1 - cOut)));
      }

      const i = Math.min(scenes.length - 1, Math.max(0, Math.floor(p)));
      setActive((v) => (v === i ? v : i));
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduce]);

  return (
    <section
      ref={wrap}
      id="story"
      data-tone="dark"
      className="story"
      style={reduce ? undefined : { height: `calc(${scenes.length} * var(--story-step))` }}
      aria-label="From the unit in Chikkamagaluru to the field"
    >
      <div className="story-stage">
        {scenes.map((s, i) => {
          const near = Math.abs(active - i) <= 1;
          const vsrc = portrait && s.video?.srcPortrait ? s.video.srcPortrait : s.video?.src;
          return (
            <div
              key={s.key}
              ref={(n) => {
                sceneEls.current[i] = n;
              }}
              className="story-scene"
              data-fit={s.fit}
              data-ink={s.ink}
              aria-hidden={!reduce && active !== i}
            >
              {allowVideo && s.video && near ? (
                <video
                  key={vsrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="none"
                  poster={s.video.poster}
                  aria-hidden
                >
                  <source src={vsrc} type="video/mp4" />
                </video>
              ) : (
                <Image
                  src={portrait && s.srcPortrait ? s.srcPortrait : s.src}
                  alt={s.alt}
                  fill
                  sizes="100vw"
                  priority={i === 0}
                  className={s.fit === "contain" ? "object-contain" : "object-cover"}
                />
              )}
              <div className="story-veil" />
              <div className="story-copy">
                <div className="shell">
                  <div className="story-caption">
                    <h2 className="display d-1 story-line">
                      <span>{s.label}</span>
                    </h2>
                    <p className="story-sub">{s.line}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <div className="story-ticks" aria-hidden>
          {scenes.map((s, i) => (
            <i key={s.key} data-on={active >= i ? "true" : undefined} />
          ))}
        </div>
      </div>
    </section>
  );
}
