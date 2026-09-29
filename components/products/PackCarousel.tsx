"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { kindOf, products } from "@/lib/products";
import { PackStage, PackStrip, centreInStrip, pad } from "@/components/products/PackShow";

/**
 * The catalogue, one pack at a time.
 *
 * The pack stands in front with its neighbours behind it, its name and what it
 * is for beside it, and every pack's name along the foot. It turns on its own
 * while nobody is using it: the line under the current name fills, and when it
 * is full the next pack comes forward. A mouse over the packs or the names,
 * focus inside it, or scrolling it out of view holds it (not a mouse anywhere
 * on the section, which on a desktop is nearly always, so it would never
 * turn); choosing a pack (a name, a neighbour, a
 * swipe) stops it turning for good, so it never moves out from
 * under someone who is reading.
 *
 * Every pack's words are in the page, stacked in one cell with only the front
 * one visible, so the block keeps the height of the longest and nothing below
 * it jumps as the packs turn.
 */
const n = products.length;

export function PackCarousel() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [hold, setHold] = useState(false);
  const [seen, setSeen] = useState(true);

  const root = useRef<HTMLElement>(null);
  const strip = useRef<HTMLDivElement>(null);
  const press = useRef<{ x: number; y: number } | null>(null);

  const choose = useCallback((i: number) => {
    setAuto(false);
    setActive(((i % n) + n) % n);
  }, []);

  const advance = useCallback(() => setActive((i) => (i + 1) % n), []);

  useEffect(() => {
    centreInStrip(strip.current, active);
  }, [active]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);


  return (
    <section
      ref={root}
      data-tone="light"
      className="ps ps-browse"
      aria-roledescription="carousel"
      aria-label="Every Bloom Biotech product"
      onFocus={() => setHold(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHold(false);
      }}
    >
      <h1 className="sr-only">Every product we make</h1>

      <div className="shell ps-body">
        <div className="ps-grid">
          <div className="ps-words" aria-live={auto ? "off" : "polite"}>
            {products.map((p, i) => (
              <div
                key={p.slug}
                id={`ps-panel-${p.slug}`}
                role="tabpanel"
                aria-labelledby={`ps-tab-${p.slug}`}
                className="ps-copy"
                data-on={i === active || undefined}
                inert={i !== active}
              >
                <p className="ps-kind">
                  {kindOf(p)} · {pad(i)} / {pad(n - 1)}
                </p>
                <h2 className="display ps-name">{p.name}</h2>
                <p className="ps-tagline">{p.tagline}</p>
                <p className="ps-tech">{p.technology}</p>
                <div className="ps-cta">
                  <Link href={`/products/${p.slug}`} className="btn btn-primary">
                    See {p.name}
                    <span className="arw" aria-hidden>
                      →
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <PackStage
            active={active}
            onSelect={choose}
            onHover={setHold}
            priority
            onPointerDown={(e) => {
              press.current = { x: e.clientX, y: e.clientY };
            }}
            onPointerUp={(e) => {
              const start = press.current;
              press.current = null;
              if (!start) return;
              const dx = e.clientX - start.x;
              const dy = e.clientY - start.y;
              if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) choose(active + (dx < 0 ? 1 : -1));
            }}
          />
        </div>

        <div
          className="ps-foot"
          onPointerEnter={(e) => e.pointerType === "mouse" && setHold(true)}
          onPointerLeave={(e) => e.pointerType === "mouse" && setHold(false)}
        >
          <PackStrip
            active={active}
            onSelect={choose}
            running={auto}
            paused={hold || !seen}
            onDone={advance}
            stripRef={strip}
            label="Choose a product"
          />
        </div>
      </div>
    </section>
  );
}
