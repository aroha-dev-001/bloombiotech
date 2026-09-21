"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useMounted } from "@/hooks/useMounted";

/**
 * From the farm, into the biology.
 *
 * One continuous descent: the canopy, the leaf, the root, the soil — and then
 * the photography runs out, because the thing the pack actually contains has
 * no honest photograph. That is where the culture takes over.
 *
 * Scroll is the camera the whole way down. The frames do not cut; each one is
 * still pushing in as the next fades up through it, and the scale is written
 * continuously from scroll position so it reads as one move rather than four
 * transitions. Nothing here is on a timer.
 *
 * Per-frame work writes CSS custom properties and a ref, never React state —
 * the scene under it reads the same ref from its own render loop.
 */
const MicrobialField = dynamic(() => import("./MicrobialField"), { ssr: false });

const beats = [
  {
    key: "canopy",
    src: "/farm/plantation.jpg",
    srcPortrait: "/farm/plantation-portrait.jpg",
    alt: "A sunlit coffee plantation under shade trees in Karnataka",
    line: "Start at the canopy.",
  },
  {
    key: "leaf",
    src: "/farm/leaves.jpg",
    srcPortrait: "/farm/leaves-portrait.jpg",
    alt: "Healthy green coffee leaves in full sunlight",
    line: "Down to the leaf.",
  },
  {
    key: "root",
    src: "/farm/application.jpg",
    srcPortrait: "/farm/application-portrait.jpg",
    alt: "A farmer pouring the mixed consortium around the base of a young coffee plant",
    line: "Down to the root.",
  },
  {
    key: "soil",
    src: "/farm/drip.jpg",
    srcPortrait: "/farm/drip-portrait.jpg",
    alt: "Water dripping from an irrigation emitter onto red soil",
    line: "And into the soil.",
  },
] as const;

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);
const smooth = (n: number) => n * n * (3 - 2 * n);

/** Photography occupies the first 72% of the descent, four frames across it. */
const PHOTO_SPAN = 0.72;

function isThrifty() {
  const conn = (
    navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }
  ).connection;
  return conn?.saveData === true || /2g/.test(conn?.effectiveType ?? "");
}

export function Biology() {
  const reduce = useReducedMotion();
  const mounted = useMounted();
  const wide = useMediaQuery("(min-width: 760px)");
  const wrap = useRef<HTMLElement>(null);
  const frames = useRef<(HTMLDivElement | null)[]>([]);
  const progress = useRef(0);
  const [near, setNear] = useState(false);
  const [beat, setBeat] = useState(0);

  const portrait = mounted && !wide;

  /* The canvas is the heaviest thing on the page. It is not fetched until the
     descent is within a screen, never on a metered connection, and never when
     the visitor has asked for less motion — in which case the frames simply
     stack as a still sequence and the closing line still lands. */
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

  const showField = mounted && near && !reduce && !isThrifty();

  useEffect(() => {
    if (reduce) return;
    const el = wrap.current;
    if (!el) return;

    let frame = 0;
    const read = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const span = Math.max(1, rect.height - window.innerHeight);
      const p = clamp01(-rect.top / span);
      progress.current = p;

      // Where the photographic descent has got to, in frames.
      const fp = (p / PHOTO_SPAN) * beats.length;

      for (let i = 0; i < beats.length; i++) {
        const node = frames.current[i];
        if (!node) continue;
        const t = fp - i;
        // Fades up through the frame before it and out under the frame after,
        // so neighbouring frames genuinely dissolve rather than cut.
        const o = t <= -0.35 || t >= 1 ? 0 : t < 0 ? smooth(clamp01((t + 0.35) / 0.35)) : t > 0.7 ? smooth(clamp01((1 - t) / 0.3)) : 1;
        node.style.setProperty("--o", String(o));
        // One push per frame, continuous across its whole travel.
        node.style.setProperty("--s", String(1.16 - clamp01(t + 0.35) * 0.16));
      }

      /* The section above is bone. Rather than cutting from a light page into
         a full-bleed canopy, the film rises out of it: a bone wash covers the
         frame and clears as the section climbs the screen, so the canopy fades
         up through the colour of the page above it.

         This is measured off how far the section has risen, not off `p` — `p`
         does not leave zero until the stage pins, which would have held a full
         viewport of flat bone before anything started to dissolve. */
      const risen = clamp01(1 - rect.top / Math.max(1, window.innerHeight));
      el.style.setProperty("--enter", String(1 - smooth(risen)));

      // The last photograph hands over to the culture rather than cutting.
      const handover = smooth(clamp01((p - PHOTO_SPAN + 0.12) / 0.18));
      el.style.setProperty("--photo", String(1 - handover));
      el.style.setProperty("--field", String(handover));

      // The line belongs to whichever frame is actually on screen, so it is
      // read off the same `fp` the frames are — and once the culture is more
      // present than the photograph, it belongs to the culture.
      const i =
        handover > 0.5
          ? beats.length
          : Math.min(beats.length - 1, Math.max(0, Math.floor(fp)));
      setBeat((v) => (v === i ? v : i));
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

  const arrived = beat >= beats.length;

  return (
    <section
      ref={wrap}
      id="biology"
      data-tone="dark"
      className="bio"
      aria-label="From the canopy to the biology in the pack"
    >
      <div className="bio-stage">
        <div className="bio-photos">
          {beats.map((b, i) => (
            <div
              key={b.key}
              ref={(n) => {
                frames.current[i] = n;
              }}
              className="bio-frame"
            >
              <Image
                src={portrait && b.srcPortrait ? b.srcPortrait : b.src}
                alt={b.alt}
                fill
                sizes="100vw"
                priority={i === 0}
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {showField ? (
          <div className="bio-field" aria-hidden>
            <MicrobialField progress={progress} dense={wide} />
          </div>
        ) : null}

        <div className="bio-veil" />
        <div className="bio-seam" aria-hidden />

        <div className="bio-copy">
          <div className="shell">
            <p className="display d-1 bio-line">
              {arrived ? "And into the part you cannot see." : beats[Math.min(beat, beats.length - 1)].line}
            </p>
            <div className="bio-end" data-on={arrived ? "true" : undefined}>
              <p className="lede max-w-[46ch]">
                Azotobacter, phosphorus and zinc solubilisers, and Pseudomonas —
                alive in the pack, and counted per gram on the label.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
