"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

let heroShift = "";

/**
 * A custom property set on <html> restyles the whole document, so write one
 * only when its value changes. --hero-shift stops changing past 900px.
 */
function paintScroll(y: number) {
  const next = Number.isFinite(y) ? Math.max(0, y) : window.scrollY || 0;
  const root = document.documentElement;
  const shift = String(Math.min(Math.round(next), 900));
  if (shift !== heroShift) {
    root.style.setProperty("--hero-shift", shift);
    heroShift = shift;
  }
  root.classList.toggle("is-scrolled", next > 24);
}

/**
 * Lenis smooths the wheel and leaves a finger to the browser, but it still
 * listens to touches with non-passive handlers, so on a phone every swipe
 * waits on the main thread before the page may move. Only a mouse or
 * trackpad gets it; touch screens scroll natively.
 */
const smoothWheel = () => matchMedia("(hover: hover) and (pointer: fine)").matches;

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
  // The home page is a scroll-driven film with its own playhead smoothing.
  // Lenis smoothing the scroll underneath it would put two lags in series.
  const smoothScroll = usePathname() !== "/";

  useEffect(() => {
    document.documentElement.classList.toggle("reduce-motion", reduce);
  }, [reduce]);

  useRevealObserver(reduce);

  useEffect(() => {
    let frame = 0;
    let lenis: Lenis | undefined;

    if (!reduce && smoothScroll && smoothWheel()) {
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
  }, [reduce, smoothScroll]);

  return <>{children}</>;
}
