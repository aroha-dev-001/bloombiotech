"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { capabilities } from "@/lib/plant";
import { products } from "@/lib/products";
import { SectionHead } from "../SectionHead";

/**
 * What the unit can make — six capabilities, each one openable.
 *
 * The cards used to be six static blocks of body copy. Now each is a control:
 * open one and it gives the same line alongside a photograph of that part of
 * the plant, plus the packs it actually produces, linked where a pack of that
 * name exists.
 */
const shots: Record<string, { src: string; alt: string }> = {
  "01": {
    src: "/film/fermentation.jpg",
    alt: "Stainless steel fermenters in the Bloom Biotech production hall",
  },
  "02": {
    src: "/film/fermentation-vessels.jpg",
    alt: "Fermentation vessels and control panels on the production floor",
  },
  "03": {
    src: "/farm/leaves.jpg",
    alt: "Healthy green coffee leaves in full sunlight",
  },
  "04": {
    src: "/farm/compost.jpg",
    alt: "Powder being mixed into farmyard manure with a spade",
  },
  "05": {
    src: "/farm/foliar.jpg",
    alt: "A knapsack sprayer applying a foliar spray over a crop",
  },
  "06": {
    src: "/farm/application.jpg",
    alt: "A farmer pouring the mixed consortium around the base of a plant",
  },
};

/**
 * Some `meta` entries name a pack ("Bio Astra liquid"), others name a dose
 * ("Coffee pulp 2 kg/MT"). Only the first kind becomes a link.
 */
function packFor(label: string) {
  const l = label.toLowerCase();
  return products.find(
    (p) => l.includes(p.name.toLowerCase()) || p.name.toLowerCase().includes(l),
  );
}

export function Capabilities() {
  const [open, setOpen] = useState<number | null>(null);

  const move = useCallback((step: number) => {
    setOpen((v) =>
      v === null ? v : (v + step + capabilities.length) % capabilities.length,
    );
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

  const cap = open === null ? null : capabilities[open];
  const shot = cap ? shots[cap.index] : null;

  return (
    <section id="capability" data-tone="light" className="band">
      <div className="shell">
        <SectionHead
          title="What the unit can make."
          lede="Six capabilities, each tied to packs you can hold."
        />

        <ul className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c, i) => (
            <li key={c.index} data-rv style={{ ["--rv-d" as string]: `${i * 60}ms` }}>
              <button
                type="button"
                className="cap-card"
                onClick={() => setOpen(i)}
                aria-haspopup="dialog"
              >
                <span className="cap-shot" aria-hidden>
                  <Image src={shots[c.index].src} alt="" fill sizes="22rem" />
                </span>
                <span className="cap-body">
                  <span className="display d-3">{c.title}</span>
                  <span className="prose-body mt-3 block">{c.body}</span>
                  <span className="cap-more">
                    What this makes
                    <i aria-hidden>→</i>
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {cap && shot ? (
        <div
          className="cap-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={cap.title}
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(null);
          }}
        >
          <div className="cap-dialog" data-tone="light">
            <figure className="cap-dialog-media">
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                sizes="(min-width: 900px) 30rem, 100vw"
                className="object-cover"
              />
            </figure>

            <div className="cap-dialog-body">
              <h3 className="display d-2">{cap.title}</h3>
              <p className="pex-lead mt-5 text-[var(--dim)]">{cap.body}</p>

              <p className="cap-dialog-label">What this makes</p>
              <ul className="cap-packs">
                {cap.meta.map((m) => {
                  const p = packFor(m);
                  return (
                    <li key={m}>
                      {p ? (
                        <Link href={`/products/${p.slug}`} onClick={() => setOpen(null)}>
                          {m}
                          <i aria-hidden>→</i>
                        </Link>
                      ) : (
                        <span>{m}</span>
                      )}
                    </li>
                  );
                })}
              </ul>

              <div className="cap-dialog-foot">
                <button type="button" className="link" onClick={() => move(-1)}>
                  <span aria-hidden>←</span> Previous
                </button>
                <button type="button" className="link" onClick={() => move(1)}>
                  Next <span aria-hidden>→</span>
                </button>
              </div>
            </div>

            <button
              type="button"
              className="cap-close"
              onClick={() => setOpen(null)}
              aria-label="Close"
              autoFocus
            >
              <span aria-hidden>×</span>
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
