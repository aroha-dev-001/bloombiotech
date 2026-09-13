"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "./Button";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { heroVideoUrl } from "@/lib/media";

export function HeroStage() {
  const reduced = useReducedMotion();
  const [videoFailed, setVideoFailed] = useState(false);
  const showVideo = Boolean(heroVideoUrl) && !reduced && !videoFailed;

  return (
    <section
      id="home"
      className={`hero-stage is-live${showVideo ? " has-video" : ""}`}
    >
      <Image
        src="/photos/coffee.png"
        alt="Hands cupping a seedling in soil"
        fill
        priority
        sizes="100vw"
        className="hero-photo object-cover object-[72%_center]"
      />
      {showVideo ? (
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/photos/coffee.png"
          aria-hidden
          onError={() => setVideoFailed(true)}
        >
          <source src={heroVideoUrl} type="video/mp4" />
        </video>
      ) : null}
      <div className="hero-veil" />
      <div className="hero-copy">
        <p className="hero-line font-mono text-[11px] uppercase tracking-[0.28em] text-lime">
          Bloom Biotech · Green biotechnology
        </p>
        <h1 className="hero-line mt-4 font-serif text-4xl leading-[1.08] text-white md:text-6xl lg:text-7xl">
          Biology for farms in coffee country.
        </h1>
        <p className="hero-line mt-5 max-w-xl text-[1.05rem] leading-relaxed text-white/88">
          Microbial products and technical assistance from our plant in
          Chikkamagaluru. Consortia, biocontrols, compost culture, and crop
          nutrition for the ground you already farm.
        </p>
        <div className="hero-line mt-8 flex flex-wrap gap-3">
          <Button href="/products">Open catalogue</Button>
          <Button href="/about" variant="ghost">
            Our story
          </Button>
        </div>
      </div>
      <a href="#about" className="hero-scroll" aria-label="Scroll to the company story">
        <span />
        Scroll
      </a>
    </section>
  );
}
