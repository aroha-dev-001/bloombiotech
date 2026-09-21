"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Aperture } from "./Aperture";

/**
 * The landing frame.
 *
 * It used to open on the same drone clip the film below opens on, under a
 * headline that never moved. Now it is a still frame that holds, and the
 * sentence finishes itself: "Beneficial microbes for —" and then the crop,
 * wiping over as the picture behind it changes to match.
 *
 * The rotation is also the navigation. Each crop is a real link into the
 * finder, so the thing that is moving is the thing you can click. Hovering a
 * crop takes over from the timer; leaving hands it back.
 */
const slides = [
  {
    id: "coffee",
    word: "coffee",
    src: "/farm/hero-coffee.jpg",
    alt: "A row of coffee bushes heavy with ripe red cherries on a Karnataka estate",
  },
  {
    id: "black-pepper",
    word: "black pepper",
    src: "/farm/hero-pepper.jpg",
    alt: "Black pepper vines climbing shade trees, green spikes hanging in the foreground",
  },
  {
    id: "pomegranate",
    word: "pomegranate",
    src: "/farm/hero-pomegranate.jpg",
    alt: "Ripe pomegranates on the tree in a sunlit orchard",
  },
  {
    id: "floriculture",
    word: "flowers",
    src: "/farm/hero-flowers.jpg",
    alt: "Rows of marigolds in full flower on an Indian flower farm",
  },
] as const;

const HOLD = 3800;

export function Hero() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [held, setHeld] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  /**
   * Which frames exist in the DOM. All four at once cost close to 2 MB on
   * first paint for three pictures nobody was looking at yet, so the set
   * carries the current frame and the one after it and grows from there —
   * the next frame is always already decoded when the wipe reaches it.
   */
  const [live, setLive] = useState<ReadonlySet<number>>(() => new Set([0, 1]));

  const go = (n: number) => {
    setI(n);
    setLive((prev) => {
      const after = (n + 1) % slides.length;
      if (prev.has(n) && prev.has(after)) return prev;
      const next = new Set(prev);
      next.add(n);
      next.add(after);
      return next;
    });
  };

  useEffect(() => {
    if (reduce || held) return;
    timer.current = window.setTimeout(() => go((i + 1) % slides.length), HOLD);
    return () => window.clearTimeout(timer.current);
  }, [i, held, reduce]);

  const current = slides[i];

  return (
    <section className="hero" data-tone="dark" aria-labelledby="hero-title">
      {/* The lens opens on the same frame the hero is already showing, so when
          it finishes there is nothing to hand over to — the picture is simply
          already there. */}
      <Aperture src={slides[0].src} alt={slides[0].alt} />

      <div className="hero-media">
        {slides.map((s, n) =>
          live.has(n) ? (
            <Image
              key={s.id}
              src={s.src}
              alt={n === i ? s.alt : ""}
              fill
              priority={n === 0}
              sizes="100vw"
              className="object-cover"
              data-on={n === i ? "true" : undefined}
              aria-hidden={n !== i}
            />
          ) : null,
        )}
      </div>
      <div className="hero-veil" />

      <div className="shell hero-copy">
        <h1 id="hero-title" className="display d-hero">
          <span className="hero-line" style={{ ["--i" as string]: 0 }}>
            Beneficial microbes
          </span>
          {/* The line that finishes the sentence, and the one that moves.
              The whole line wipes rather than just the word, so there is no
              reserved width to overflow a phone. */}
          <span className="hero-line hero-rot-line" style={{ ["--i" as string]: 1 }}>
            <span key={current.id} className="hero-rot-in">
              for {current.word}.
            </span>
          </span>
        </h1>

        {/* One short line, not a paragraph. The film below says the rest. */}
        <p
          className="lede hero-line mt-7 text-[var(--bone)] opacity-90"
          style={{ ["--i" as string]: 2 }}
        >
          Licensed by ICAR-IIHR. Made in Chikkamagaluru.
        </p>

        {/* The rotation, made clickable. */}
        <nav
          className="hero-crops hero-line"
          style={{ ["--i" as string]: 3 }}
          aria-label="Jump to a crop"
          onMouseLeave={() => setHeld(false)}
        >
          {slides.map((s, n) => (
            <Link
              key={s.id}
              href={`/solutions?crop=${s.id}`}
              className="hero-crop"
              data-on={n === i ? "true" : undefined}
              onMouseEnter={() => {
                setHeld(true);
                go(n);
              }}
              onFocus={() => {
                setHeld(true);
                go(n);
              }}
            >
              {s.word}
            </Link>
          ))}
        </nav>

        <div className="hero-line mt-10 flex flex-wrap gap-3" style={{ ["--i" as string]: 4 }}>
          <Link href="#find" className="btn btn-primary">
            Find your solution
            <span className="arw" aria-hidden>
              →
            </span>
          </Link>
          <Link href="/products" className="btn btn-ghost">
            See the products
          </Link>
        </div>
      </div>

      <a href="#intro" className="hero-cue" aria-label="Scroll to the next section">
        <span aria-hidden>↓</span>
      </a>
    </section>
  );
}
