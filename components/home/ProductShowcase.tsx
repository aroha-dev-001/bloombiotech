"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { plateOf, products, shotOf } from "@/lib/products";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * The packs, as a gallery rather than a grid.
 *
 * Six cards in a row said nothing about any of them — every pack got an equal,
 * small share of the page and none of them was ever the subject. Here one pack
 * is the subject, large, and the others are the way to reach it.
 *
 * Moving between them is one shared-layout move: the marker behind the name
 * travels to the pack you picked (`layoutId`), the stage cross-fades, and the
 * copy swaps under it. Hovering is enough on a pointer; tapping works on a
 * phone. Nothing animates on its own.
 *
 * Plates are mounted as they are first shown and then kept, so going back to a
 * pack is instant and the first paint still only carries one picture.
 */
const featured = [
  "bio-sanjiveeni",
  "bhu-samruddhi",
  "bio-astra",
  "bluderma",
  "bloom-compost-culture",
  "ascogold",
];

const picks = featured
  .map((slug) => products.find((p) => p.slug === slug))
  .filter((p): p is (typeof products)[number] => Boolean(p));

export function ProductShowcase() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [seen, setSeen] = useState<ReadonlySet<number>>(() => new Set([0]));

  const show = (n: number) => {
    setI(n);
    setSeen((prev) => (prev.has(n) ? prev : new Set(prev).add(n)));
  };

  const active = picks[i];

  return (
    <div className="show">
      <div className="show-stage">
        {picks.map((p, n) =>
          seen.has(n) ? (
            <Image
              key={p.slug}
              src={plateOf(p)}
              alt={n === i ? `${p.name} pack` : ""}
              aria-hidden={n !== i}
              fill
              sizes="(min-width: 1024px) 32rem, 100vw"
              priority={n === 0}
              className="show-plate"
              data-on={n === i ? "true" : undefined}
            />
          ) : null,
        )}
      </div>

      <div className="show-side">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.slug}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 1 } : { opacity: 0, y: -10 }}
            transition={{ duration: reduce ? 0 : 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="show-copy"
          >
            <p className="meta">{active.technology}</p>
            <h3 className="display d-1 mt-3">{active.name}</h3>
            <p className="lede mt-5 max-w-[46ch]">{active.short}</p>
            {shotOf(active) === "contents" ? (
              <p className="pcard-shot mt-3">Pictured: the formulation, not the pack.</p>
            ) : null}
            <Link href={`/products/${active.slug}`} className="btn btn-primary mt-8">
              Open {active.name}
              <span className="arw" aria-hidden>
                →
              </span>
            </Link>
          </motion.div>
        </AnimatePresence>

        <LayoutGroup id="showcase">
          <div className="show-rail" role="tablist" aria-label="Featured packs">
            {picks.map((p, n) => (
              <button
                key={p.slug}
                type="button"
                role="tab"
                aria-selected={n === i}
                tabIndex={n === i ? 0 : -1}
                className="show-tab"
                onMouseEnter={() => show(n)}
                onFocus={() => show(n)}
                onClick={() => show(n)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                    e.preventDefault();
                    show((i + 1) % picks.length);
                  }
                  if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                    e.preventDefault();
                    show((i - 1 + picks.length) % picks.length);
                  }
                }}
              >
                {n === i ? (
                  <motion.span
                    layoutId="show-marker"
                    className="show-marker"
                    transition={
                      reduce
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 420, damping: 38 }
                    }
                  />
                ) : null}
                <span className="show-tab-label">{p.name}</span>
              </button>
            ))}
          </div>
        </LayoutGroup>
      </div>
    </div>
  );
}
