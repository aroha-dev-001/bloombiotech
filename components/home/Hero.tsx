"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useMounted } from "@/hooks/useMounted";

function isThrifty() {
  const conn = (
    navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }
  ).connection;
  return conn?.saveData === true || /2g/.test(conn?.effectiveType ?? "");
}

const facts = [
  { k: "Est. 2013", v: "Own unit, Chikkamagaluru" },
  { k: "First in India", v: "to licence IIHR AMC" },
  { k: "15 packs", v: "consortia to nutrition" },
  { k: "CFU printed", v: "on every pack" },
];

export function Hero() {
  const reduce = useReducedMotion();
  const mounted = useMounted();
  const wide = useMediaQuery("(min-width: 768px)");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [armed, setArmed] = useState(false);

  // Heavy footage is desktop-and-good-connection only; the still carries mobile.
  const thrifty = mounted ? isThrifty() : true;
  const allowVideo = mounted && wide && !reduce && !thrifty;

  // Mount the video only after the still has had its moment, so the poster
  // image keeps the LCP slot to itself.
  useEffect(() => {
    if (!allowVideo) return;
    const t = window.setTimeout(() => setArmed(true), 700);
    return () => window.clearTimeout(t);
  }, [allowVideo]);

  // Autoplay where the browser allows it, and stop burning frames once the
  // hero has scrolled away.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    void el.play().catch(() => {});
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [armed]);

  return (
    <section className="hero" data-tone="dark" aria-labelledby="hero-title">
      <div className="hero-media">
        <Image
          src="/plant/aerial-wide.jpg"
          alt="The Bloom Biotech production unit in Beekanahalli Village, Chikkamagaluru, seen from the air"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {allowVideo && armed ? (
          <video
            ref={videoRef}
            data-ready={ready ? "true" : "false"}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/media/poster-plant-aerial.jpg"
            aria-hidden
            onPlaying={() => setReady(true)}
          >
            <source src="/media/plant-aerial.mp4" type="video/mp4" />
          </video>
        ) : null}
      </div>
      <div className="hero-veil" />
      <div className="grain" aria-hidden />

      <div className="shell hero-copy">
        <p className="eyebrow hero-line" style={{ ["--i" as string]: 0 }}>
          <span className="text-[var(--lime)]">Green biotechnology</span>
          <span className="mx-2 opacity-40">/</span>
          Chikkamagaluru, Karnataka
        </p>

        <h1 id="hero-title" className="display d-hero mt-6 max-w-[14ch]">
          <span className="hero-line" style={{ ["--i" as string]: 1 }}>
            Microbes,
          </span>
          <span className="hero-line" style={{ ["--i" as string]: 2 }}>
            made to spec.
          </span>
        </h1>

        <div className="mt-8 grid gap-8 md:grid-cols-[minmax(0,32rem)_auto] md:items-end md:justify-between">
          <p
            className="lede hero-line text-[var(--dim)]"
            style={{ ["--i" as string]: 3 }}
          >
            ICAR-IIHR licensed consortia, biocontrols and crop nutrition —
            fermented, counted and packed at our own unit since 2013.
          </p>
          <div className="hero-line flex flex-wrap gap-3" style={{ ["--i" as string]: 4 }}>
            <Link href="/products" className="btn btn-primary">
              See the catalogue
              <span className="arw" aria-hidden>
                →
              </span>
            </Link>
            <Link href="#plant" className="btn btn-ghost">
              Inside the plant
              <span className="arw" aria-hidden>
                →
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className="relative">
        <a href="#origin" className="hero-scroll eyebrow" aria-label="Scroll to the company story">
          <i aria-hidden />
          Scroll
        </a>
        <dl className="hero-bar">
          {facts.map((f) => (
            <div key={f.k}>
              <dt className="display text-[1.05rem] tracking-[-0.02em] sm:text-[1.25rem]">
                {f.k}
              </dt>
              <dd className="eyebrow mt-2">{f.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
