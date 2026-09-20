"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { films, plates } from "@/lib/plant";
import { SectionHead } from "../SectionHead";

export function FilmRoom({ heading = true }: { heading?: boolean }) {
  const [open, setOpen] = useState<number | null>(null);

  const move = useCallback((step: number) => {
    setOpen((v) => (v === null ? v : (v + step + plates.length) % plates.length));
  }, []);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open, move]);

  const plate = open === null ? null : plates[open];

  return (
    <section id="film" data-tone="dark" className="band">
      <div className="shell">
        {heading ? (
          <SectionHead
            title="The unit, unedited."
            lede="Drone passes over the village and footage from the fermentation floor."
          />
        ) : null}

        <div className={`grid gap-4 md:grid-cols-2 ${heading ? "mt-14" : ""}`}>
          {films.map((f) => (
            <figure key={f.src} data-rv="mask">
              <div className="ratio-box" style={{ aspectRatio: f.ratio }}>
                <video
                  controls
                  muted
                  loop
                  playsInline
                  preload="none"
                  poster={f.poster}
                  aria-label={f.title}
                >
                  <source src={f.src} type="video/mp4" />
                </video>
              </div>
              <figcaption className="mt-4">
                <span className="display d-3">{f.title}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="wall mt-4">
          {plates.map((p, i) => (
            <button
              key={p.src}
              type="button"
              className="plate group text-left"
              onClick={() => setOpen(i)}
              data-rv
              style={{ ["--rv-d" as string]: `${(i % 4) * 60}ms` }}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(min-width: 700px) 25vw, 50vw"
                className="object-cover"
              />
              <span className="sr-only">Open larger</span>
            </button>
          ))}
        </div>
      </div>

      {plate ? (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={plate.label}>
          <div className="shell flex h-[var(--nav-h)] items-center justify-between">
            <p className="eyebrow text-[var(--bone)]">{plate.label}</p>
            <button
              type="button"
              className="nav-toggle"
              onClick={() => setOpen(null)}
              aria-label="Close viewer"
              autoFocus
            >
              <span aria-hidden className="text-lg leading-none">
                ×
              </span>
            </button>
          </div>
          <div className="lightbox-stage">
            <Image
              src={plate.src}
              alt={plate.alt}
              width={plate.w}
              height={plate.h}
              sizes="92vw"
              className="h-auto w-full rounded-[var(--r)] object-contain"
              style={{ maxWidth: `min(92vw, ${Math.round(plate.w * 1.5)}px)`, maxHeight: "74svh" }}
            />
          </div>
          <div className="shell flex items-center justify-between gap-6 py-5">
            <p className="meta max-w-[52ch] text-[var(--dim)]">{plate.caption}</p>
            <div className="flex gap-2">
              <button type="button" className="nav-toggle" onClick={() => move(-1)} aria-label="Previous">
                <span aria-hidden>←</span>
              </button>
              <button type="button" className="nav-toggle" onClick={() => move(1)} aria-label="Next">
                <span aria-hidden>→</span>
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
