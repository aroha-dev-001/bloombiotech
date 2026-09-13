"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { products } from "@/lib/products";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useMounted } from "@/hooks/useMounted";

function Card({ product, i }: { product: (typeof products)[number]; i: number }) {
  return (
    <Link href={`/products/${product.slug}`} className="pcard group">
      <p className="pcard-index eyebrow">{String(i + 1).padStart(2, "0")}</p>
      <div className="pcard-media">
        <Image
          src={product.photo}
          alt={`${product.name} pack`}
          fill
          sizes="(min-width: 1024px) 21rem, 60vw"
        />
      </div>
      <div className="pcard-body">
        <p className="eyebrow">
          {product.category}
          {product.imported ? " · imported" : ""}
        </p>
        <h3 className="display d-3">{product.name}</h3>
        <p className="meta text-[0.72rem] leading-relaxed">{product.technology}</p>
        <p className="mt-2 flex items-center justify-between border-t border-[var(--line-soft)] pt-3 text-[0.72rem] uppercase tracking-[0.16em] text-[var(--accent)]">
          Open pack
          <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
        </p>
      </div>
    </Link>
  );
}

function MoreCard() {
  return (
    <Link
      href="/products"
      className="pcard flex w-[clamp(15rem,24vw,21rem)] items-center justify-center border-dashed p-10 text-center"
    >
      <span className="display d-3">
        All fifteen packs
        <span className="mt-3 block text-[var(--accent)]" aria-hidden>
          →
        </span>
      </span>
    </Link>
  );
}

/** Desktop: the section pins and the row tracks scroll horizontally. */
function PinnedRail() {
  const wrap = useRef<HTMLDivElement>(null);
  const row = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!row.current) return;
      setDistance(Math.max(0, row.current.scrollWidth - window.innerWidth + 32));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: wrap,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  return (
    <div ref={wrap} style={{ height: `calc(100svh + ${distance}px)` }}>
      <div className="rail-pin">
        <motion.div ref={row} className="rail-row" style={{ x }}>
          {products.map((p, i) => (
            <Card key={p.slug} product={p} i={i} />
          ))}
          <MoreCard />
        </motion.div>
      </div>
    </div>
  );
}

function SnapRail() {
  return (
    <>
      <div className="snap-row">
        {products.map((p, i) => (
          <Card key={p.slug} product={p} i={i} />
        ))}
        <MoreCard />
      </div>
      <div className="shell mt-8">
        <Link href="/products" className="link">
          All fifteen packs <span aria-hidden>→</span>
        </Link>
      </div>
    </>
  );
}

export function ProductRail() {
  const reduce = useReducedMotion();
  const wide = useMediaQuery("(min-width: 900px)");
  // Server render and first paint are always the scroller; the pinned rail
  // mounts afterwards, so its scroll target exists before it measures.
  const mounted = useMounted();
  const pinned = mounted && wide && !reduce;

  return (
    <section
      id="catalogue"
      data-tone="carbon"
      className={pinned ? undefined : "overflow-hidden"}
    >
      <div className={pinned ? "band-tight" : "band"}>
        <div className="shell">
          <div className="sec-head" data-rv>
            <p className="eyebrow">
              <span className="eyebrow-accent">§02</span>
              <span className="mx-2 opacity-40">/</span>
              The line
            </p>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="display d-1 max-w-[14ch]">Fifteen packs, four jobs.</h2>
              <p className="lede max-w-[34ch]">
                Consortia, biocontrol, compost culture and crop nutrition. Every
                pack carries its own organisms, colony count, dose and mixing
                rule.
              </p>
            </div>
          </div>
        </div>
      </div>
      {pinned ? <PinnedRail /> : <SnapRail />}
    </section>
  );
}
