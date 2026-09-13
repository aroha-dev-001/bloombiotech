"use client";

import Lenis from "lenis";
import { useEffect, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function paintScroll(y: number) {
  const next = Number.isFinite(y) ? Math.max(0, y) : window.scrollY || 0;
  const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  const root = document.documentElement;
  root.style.setProperty("--scroll", String(Math.min(1, next / max)));
  root.style.setProperty("--hero-shift", String(Math.min(next, 900)));
  root.classList.toggle("is-scrolled", next > 24);
}

/**
 * One observer reveals every [data-rv] element on the page, so sections can
 * stay server components and still animate in.
 */
function useRevealObserver(reduce: boolean) {
  useEffect(() => {
    if (reduce) {
      document.querySelectorAll("[data-rv]").forEach((el) => el.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    const watch = () => {
      document.querySelectorAll("[data-rv]:not(.is-in)").forEach((el) => io.observe(el));
    };

    watch();
    const mo = new MutationObserver(watch);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, [reduce]);
}

export function MotionRoot({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  useEffect(() => {
    document.documentElement.classList.toggle("reduce-motion", reduce);
  }, [reduce]);

  useRevealObserver(reduce);

  useEffect(() => {
    let frame = 0;
    let lenis: Lenis | undefined;

    if (!reduce) {
      lenis = new Lenis({ autoRaf: true, anchors: true, duration: 1.05 });
      lenis.on("scroll", (instance: { scroll: number }) => paintScroll(instance.scroll));
      paintScroll(window.scrollY);
      return () => lenis?.destroy();
    }

    const tick = () => {
      frame = 0;
      paintScroll(window.scrollY);
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduce]);

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      {children}
    </>
  );
}
