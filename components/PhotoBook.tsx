"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import type { GalleryPlate } from "@/lib/gallery";

function plateNo(i: number) {
  return String(i + 1).padStart(2, "0");
}

export function PhotoBook({ plates }: { plates: readonly GalleryPlate[] }) {
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const startX = useRef(0);

  useEffect(() => {
    setReady(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);
  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex((i) => (i + dir + plates.length) % plates.length);
    },
    [plates.length],
  );

  function openAt(i: number) {
    setIndex(i);
    setOpen(true);
  }

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, go]);

  const plate = plates[index];

  return (
    <>
      <div className="fieldbook-grid">
        {plates.map((item, i) => (
          <button
            key={item.src}
            type="button"
            className="fieldbook-tile photo-frame"
            onClick={() => openAt(i)}
          >
            <span className="sr-only">Open plate {plateNo(i)}: {item.alt}</span>
            <div className="fieldbook-shot">
              <Image
                src={item.src}
                alt=""
                fill
                className="object-cover photo-zoom"
                sizes="(min-width: 640px) 50vw, 100vw"
              />
            </div>
            <span className="fieldbook-tile-meta">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-lime">
                Plate {plateNo(i)} · {item.kicker}
              </span>
              <span className="mt-1 line-clamp-2 text-left text-sm text-white/90">
                {item.caption}
              </span>
            </span>
          </button>
        ))}
      </div>

      {ready && open && plate
        ? createPortal(
            <div
              className="fieldbook-overlay"
              role="dialog"
              aria-modal="true"
              aria-labelledby="fieldbook-title"
            >
              <button type="button" className="fieldbook-scrim" aria-label="Close photos" onClick={close} />
              <div className="fieldbook-sheet">
                <div className="fieldbook-toolbar">
                  <p id="fieldbook-title" className="font-mono text-[10px] uppercase tracking-[0.2em] text-leaf">
                    Field book · {plateNo(index)} / {plateNo(plates.length - 1)}
                  </p>
                  <p className="font-serif text-xl text-forest">{plate.kicker}</p>
                  <button type="button" className="fieldbook-x" onClick={close} aria-label="Close">
                    ×
                  </button>
                </div>

                <div
                  className="fieldbook-stage"
                  onPointerDown={(e) => {
                    startX.current = e.clientX;
                  }}
                  onPointerUp={(e) => {
                    const dx = e.clientX - startX.current;
                    if (dx > 56) go(-1);
                    if (dx < -56) go(1);
                  }}
                >
                  <Image
                    key={plate.src}
                    src={plate.src}
                    alt={plate.alt}
                    fill
                    sizes="100vw"
                    className="object-contain"
                    priority
                  />
                </div>

                <p className="fieldbook-caption">
                  {plate.caption}{" "}
                  <span className="text-soil">({plate.credit})</span>
                </p>

                <div className="fieldbook-nav">
                  <button type="button" className="btn btn-ghost" onClick={() => go(-1)}>
                    Previous plate
                  </button>
                  <button type="button" className="btn btn-ghost" onClick={() => go(1)}>
                    Next plate
                  </button>
                </div>

                <div className="fieldbook-strip" role="tablist" aria-label="Plates">
                  {plates.map((item, i) => (
                    <button
                      key={item.src}
                      type="button"
                      role="tab"
                      aria-selected={i === index}
                      className={i === index ? "is-on" : ""}
                      onClick={() => setIndex(i)}
                    >
                      <Image src={item.src} alt={item.kicker} fill sizes="72px" className="object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
