"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { chapters } from "@/lib/plant";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** The chapter that gets the moving picture instead of a still. */
const FILM_INDEX = 1;

export function PlantStory() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const items = useRef<(HTMLElement | null)[]>([]);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const nodes = items.current.filter(Boolean) as HTMLElement[];
    if (!nodes.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const i = nodes.indexOf(visible.target as HTMLElement);
        if (i >= 0) setActive(i);
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: [0, 0.3, 0.7, 1] },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = video.current;
    if (!el || reduce) return;
    if (active === FILM_INDEX) el.play().catch(() => {});
    else el.pause();
  }, [active, reduce]);

  return (
    <section id="plant" data-tone="dark" className="band">
      <div className="shell">
        <div className="sec-head" data-rv>
          <p className="eyebrow">
            <span className="eyebrow-accent">§03</span>
            <span className="mx-2 opacity-40">/</span>
            Manufacture
          </p>
          <div>
            <h2 className="display d-1 max-w-[15ch]">
              From a licensed strain to a labelled can.
            </h2>
            <p className="lede mt-6">
              Five steps, filmed at the unit on Hampapura Bypass Road. Nothing
              here is a stock photograph of somebody else&rsquo;s factory.
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-16">
          {/* sticky film panel — desktop */}
          <div className="hidden lg:block">
            <div className="stick">
              <div className="frame frame-ticks relative aspect-[4/3] w-full">
                {chapters.map((c, i) => (
                  <div
                    key={c.index}
                    className="absolute inset-0 transition-opacity duration-700"
                    style={{ opacity: active === i ? 1 : 0 }}
                    aria-hidden={active !== i}
                  >
                    {i === FILM_INDEX ? (
                      <video
                        ref={video}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        poster="/media/poster-fermentation.jpg"
                        className="h-full w-full object-cover"
                        aria-label="Footage from the Bloom Biotech fermentation hall"
                      >
                        <source src="/media/fermentation-hall.mp4" type="video/mp4" />
                      </video>
                    ) : (
                      <Image
                        src={c.still}
                        alt={c.alt}
                        fill
                        sizes="(min-width: 1024px) 52vw, 100vw"
                        className="object-cover"
                      />
                    )}
                  </div>
                ))}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-[rgba(7,10,8,0.85)] to-transparent p-4">
                  <p className="eyebrow text-[var(--bone)]">
                    {chapters[active].index} — {chapters[active].title}
                  </p>
                  <p className="eyebrow">
                    {active === FILM_INDEX ? "Film" : "Still"}
                  </p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-5 gap-1.5" aria-hidden>
                {chapters.map((c, i) => (
                  <span
                    key={c.index}
                    className="h-px bg-[var(--line)] transition-colors duration-500"
                    style={active >= i ? { background: "var(--lime)" } : undefined}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* chapters */}
          <ol className="lg:pt-4">
            {chapters.map((c, i) => (
              <li
                key={c.index}
                ref={(el) => {
                  items.current[i] = el;
                }}
                className="chapter"
                data-on={active === i ? "true" : "false"}
              >
                <div className="flex items-baseline gap-4">
                  <span className="eyebrow eyebrow-accent">{c.index}</span>
                  <h3 className="display d-3">{c.title}</h3>
                </div>
                <div className="frame mt-5 aspect-[16/10] lg:hidden">
                  {i === FILM_INDEX ? (
                    <video
                      muted
                      loop
                      playsInline
                      preload="none"
                      controls
                      poster="/media/poster-fermentation.jpg"
                      className="h-full w-full object-cover"
                      aria-label="Footage from the Bloom Biotech fermentation hall"
                    >
                      <source src="/media/fermentation-hall.mp4" type="video/mp4" />
                    </video>
                  ) : (
                    <Image src={c.still} alt={c.alt} fill sizes="100vw" className="object-cover" />
                  )}
                </div>
                <p className="mt-5 text-[1.05rem] leading-snug text-[var(--fg)]">{c.lede}</p>
                <p className="prose-body mt-3 text-[0.95rem]">{c.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
