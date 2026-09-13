"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const routes = [
  {
    id: "drench",
    step: "01",
    name: "Soil drench",
    dose: "1 kg Bio Sanjiveeni in 40 L water",
    why: "Wet the entire root system. Do not mix with antibiotics, pesticides, or insecticides.",
    photo: "/photos/amc/amc-01-soil-drench.png",
    alt: "Mixing powder AMC into a water bucket, then drenching the root zone of a seedling",
  },
  {
    id: "fym",
    step: "02",
    name: "FYM / compost",
    dose: "5-10 kg Bio Sanjiveeni in 1 MT FYM",
    why: "Apply to soil after 7-10 days of enrichment. Same route for Bio Astra (ACT).",
    photo: "/photos/amc/amc-02-fym-compost.png",
    alt: "Mixing powder AMC into a FYM heap, then applying enriched compost to the crop",
  },
  {
    id: "drip",
    step: "03",
    name: "Drip",
    dose: "1 kg Bio Sanjiveeni in 40 L, filter, fertigate",
    why: "Filter the solution before it enters the drip lines.",
    photo: "/photos/amc/amc-03-drip-filter.png",
    alt: "Filtering mixed AMC through cloth into a tank, then drip emitters at the root line",
  },
  {
    id: "liquid",
    step: "04",
    name: "Liquid AMC",
    dose: "Bhu Samruddhi 10 ml/L foliar or drip",
    why: "Same three strains as the powder, in liquid. Do not mix with antibiotics, pesticides, or insecticides.",
    photo: "/photos/amc/amc-04-liquid-amc.png",
    alt: "Measuring liquid AMC into a sprayer, with foliar mist and a drip line",
  },
] as const;

const THRESHOLD = 90;
const COUNT = routes.length;

export function AmcRoutes() {
  const [index, setIndex] = useState(0);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const start = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const dragRef = useRef(false);
  const lock = useRef(false);

  const stacked = [0, 1, 2].map((offset) => routes[(index + offset) % COUNT]);

  function moveTo(next: { x: number; y: number }) {
    posRef.current = next;
    setPos(next);
  }

  function step(dir: -1 | 1) {
    if (lock.current) return;
    lock.current = true;
    dragRef.current = false;
    setLeaving(true);
    setDragging(false);
    moveTo({ x: dir * 520, y: posRef.current.y * 0.2 });
    window.setTimeout(() => {
      setIndex((i) => (i + dir + COUNT) % COUNT);
      moveTo({ x: 0, y: 0 });
      setLeaving(false);
      lock.current = false;
    }, 280);
  }

  function onPointerDown(e: React.PointerEvent) {
    if (lock.current) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    start.current = { x: e.clientX, y: e.clientY };
    dragRef.current = true;
    setDragging(true);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragRef.current || lock.current) return;
    moveTo({
      x: e.clientX - start.current.x,
      y: e.clientY - start.current.y,
    });
  }

  function onPointerUp() {
    if (!dragRef.current || lock.current) return;
    dragRef.current = false;
    setDragging(false);
    const x = posRef.current.x;
    if (x > THRESHOLD) step(1);
    else if (x < -THRESHOLD) step(-1);
    else moveTo({ x: 0, y: 0 });
  }

  function onNav(dir: -1 | 1, e: React.PointerEvent) {
    e.preventDefault();
    e.stopPropagation();
    step(dir);
  }

  const rot = pos.x / 18;
  const stamp = pos.x > 40 ? "next" : pos.x < -40 ? "prev" : "";

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
        02b / How AMC moves
      </p>
      <h2 className="mt-2 max-w-xl font-serif text-3xl text-forest md:text-4xl">
        Four AMC routes. One IIHR licence.
      </h2>
      <p className="mt-3 max-w-lg text-sm text-muted">
        Four routes from the brochure. Powder AMC is Bio Sanjiveeni. Liquid AMC
        is Bhu Samruddhi. Pack labels still win.
      </p>

      <div className="swipe-deck mt-8">
        {[...stacked].reverse().map((card, i, arr) => {
          const isTop = i === arr.length - 1;
          const depth = arr.length - 1 - i;
          return (
            <article
              key={`${card.id}-${index}-${depth}`}
              className={`swipe-card ${isTop ? "is-top" : ""}`}
              style={
                isTop
                  ? {
                      transform: `translate(${pos.x}px, ${pos.y * 0.35}px) rotate(${rot}deg)`,
                      transition:
                        dragging && !leaving
                          ? "none"
                          : "transform 0.28s ease-out",
                    }
                  : {
                      transform: `scale(${1 - depth * 0.05}) translateY(${depth * 10}px)`,
                    }
              }
              onPointerDown={isTop ? onPointerDown : undefined}
              onPointerMove={isTop ? onPointerMove : undefined}
              onPointerUp={isTop ? onPointerUp : undefined}
              onPointerCancel={isTop ? onPointerUp : undefined}
            >
              <div className="swipe-photo">
                <Image
                  src={card.photo}
                  alt={card.alt}
                  fill
                  draggable={false}
                  sizes="(min-width: 640px) 22rem, 85vw"
                  className="object-cover"
                  priority={card.id === "drench"}
                />
                <div className="swipe-title">
                  <p className="font-mono text-[11px] tracking-[0.2em] text-lime">
                    {card.step} / AMC
                  </p>
                  <h3 className="font-serif text-[1.85rem] leading-none text-white sm:text-3xl">
                    {card.name}
                  </h3>
                </div>
                {isTop && stamp ? (
                  <span className={`swipe-stamp ${stamp}`}>{stamp}</span>
                ) : null}
              </div>
              <div className="swipe-copy">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-leaf">
                  Label dose
                </p>
                <p className="mt-1 font-serif text-lg leading-snug text-forest sm:text-xl">
                  {card.dose}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{card.why}</p>
              </div>
            </article>
          );
        })}
        <button
          type="button"
          className="swipe-hit prev"
          aria-label="Previous route"
          onPointerDown={(e) => onNav(-1, e)}
        >
          <span className="swipe-chevron" aria-hidden>
            ‹
          </span>
        </button>
        <button
          type="button"
          className="swipe-hit next"
          aria-label="Next route"
          onPointerDown={(e) => onNav(1, e)}
        >
          <span className="swipe-chevron" aria-hidden>
            ›
          </span>
        </button>
      </div>

      <div className="mt-5 flex items-center justify-center gap-2" aria-hidden>
        {routes.map((r, i) => (
          <span
            key={r.id}
            className={`swipe-dot ${i === index ? "is-on" : ""}`}
          />
        ))}
      </div>
      <p className="mt-3 text-center font-mono text-[11px] text-muted">
        {index + 1} / {COUNT} · swipe or tap the arrows
      </p>

      <p className="mt-4 text-center">
        <Link href="/products/bio-sanjiveeni" className="nav-link text-sm">
          Open Bio Sanjiveeni
        </Link>
      </p>
    </section>
  );
}
