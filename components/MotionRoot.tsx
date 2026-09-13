"use client";

import Lenis from "lenis";
import { useEffect, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function paintScroll(y: number) {
  const next = Number.isFinite(y) ? Math.max(0, y) : window.scrollY || 0;
  const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  document.documentElement.style.setProperty("--scroll", String(Math.min(1, next / max)));
  document.documentElement.style.setProperty("--hero-shift", String(Math.min(next, 720)));
  document.documentElement.classList.toggle("is-scrolled", next > 18);
}

export function MotionRoot({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  useEffect(() => {
    document.documentElement.classList.toggle("reduce-motion", reduce);
  }, [reduce]);

  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    let lenis: Lenis | undefined;

    const onTick = (y: number) => {
      paintScroll(y);
      if (Math.abs(y - last) > 2) {
        document.documentElement.dataset.scrollDir = y > last ? "down" : "up";
      }
      last = y;
    };

    if (!reduce) {
      lenis = new Lenis({
        autoRaf: true,
        anchors: false,
        duration: 1.05,
      });
      lenis.on("scroll", (instance) => onTick(instance.scroll));
      onTick(window.scrollY);
      return () => {
        lenis?.destroy();
      };
    }

    const tick = () => {
      frame = 0;
      onTick(window.scrollY);
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
