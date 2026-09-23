"use client";

import { useEffect, useRef } from "react";
import { at, TOTAL } from "./legs";

/**
 * The specimen.
 *
 * At the root hair the visitor picks up a sample: a round lens opens on the
 * microscope shot with the cells moving inside it, then docks at the edge of
 * the screen and travels with them. In the fermentation hall it fills and
 * multiplies. At the products it drops into the centre can. At the drip line
 * it comes back out and the cells scatter into the soil. One object carries
 * the whole chain the page is about: soil, factory, product, field.
 *
 * Everything is derived from the scroll position, so it runs backwards as
 * cleanly as forwards. The position is smoothed at the same rate as the
 * engine's playhead so the lens and the film under it arrive together.
 */

const LERP = 0.12;
const CELLS = 240;
const SEED_CELLS = 14;
const TAU = Math.PI * 2;

/* Where things are in the film, as fractions of the 16:9 source frame. Read
   off the end frame of each leg. */
const CAPTURE: [number, number] = [0.6, 0.55]; // bacteria on the root hair
const CAN: [number, number] = [0.505, 0.6]; // label of the centre can
const DRIP: [number, number] = [0.5, 0.7]; // the wet soil under the emitter

/* The timeline, in track positions (viewport-heights of scroll). */
const T = {
  open0: at(3, 0.74),
  open1: at(3, 0.94),
  dock0: at(4, 0.04),
  dock1: at(4, 0.26),
  grow0: at(7, 0.08),
  grow1: at(7, 0.78),
  drop0: at(8, 0.42),
  drop1: at(8, 0.9),
  out0: at(9, 0.66),
  out1: at(9, 1) + 0.12,
};

type Cell = {
  r: number;
  a: number;
  ang: number;
  len: number;
  w: number;
  tone: number;
  spin: number;
  wob: number;
};

const TONES = ["233 220 184", "205 170 98", "170 184 108", "226 204 150"];

function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function makeCells(): Cell[] {
  const r = rng(20130917);
  return Array.from({ length: CELLS }, () => ({
    r: Math.sqrt(r()) * 0.86,
    a: r() * TAU,
    ang: r() * TAU,
    len: 0.09 + r() * 0.07,
    w: 0.034 + r() * 0.014,
    tone: Math.floor(r() * TONES.length),
    spin: (r() - 0.5) * 0.12,
    wob: r() * TAU,
  }));
}

const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
const smooth = (x: number) => {
  x = clamp01(x);
  return x * x * (3 - 2 * x);
};
const span = (t: number, a: number, b: number) => smooth((t - a) / (b - a));
const mix = (a: number, b: number, k: number) => a + (b - a) * k;

/** Portrait phones get a centre-cropped 9:16 cut of every clip. */
const PORTRAIT_MQ = "(max-width: 860px) and (orientation: portrait)";
const CROP = 81 / 256; // width of a 9:16 crop taken from a 16:9 frame

/** A point in the source frame, to where object-fit: cover puts it on screen. */
function toScreen([fx, fy]: [number, number], vw: number, vh: number, portrait: boolean) {
  let x = fx;
  let sw = 1920;
  let sh = 1080;
  if (portrait) {
    x = (fx - (1 - CROP) / 2) / CROP;
    sw = 720;
    sh = 1280;
  }
  const s = Math.max(vw / sw, vh / sh);
  return [(vw - sw * s) / 2 + x * sw * s, (vh - sh * s) / 2 + fy * sh * s] as const;
}

export function Specimen() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const portraitMQ = matchMedia(PORTRAIT_MQ);
    const cells = makeCells();
    let vw = 0;
    let vh = 0;
    let dpr = 1;
    let smoothT = -1;
    let clock = 0;
    let last = performance.now();
    let raf = 0;
    let blank = false;

    const size = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      vw = window.innerWidth;
      vh = window.innerHeight;
      canvas.width = Math.round(vw * dpr);
      canvas.height = Math.round(vh * dpr);
      blank = false;
    };

    const dock = (narrow: boolean) => {
      const R = narrow ? 40 : 58;
      const gut = Math.min(64, Math.max(20, vw * 0.05));
      return narrow
        ? { x: gut + R, y: 96 + R, R }
        : { x: vw - gut - R - 6, y: vh * 0.4, R };
    };

    const drawLens = (x: number, y: number, R: number, count: number, alpha: number) => {
      if (alpha <= 0.002 || R < 1) return;
      ctx.save();
      ctx.globalAlpha = alpha;

      // The glass, with a real offset shadow under it.
      ctx.save();
      ctx.shadowColor = "rgba(3, 6, 4, 0.5)";
      ctx.shadowBlur = R * 0.45;
      ctx.shadowOffsetY = R * 0.14;
      const bg = ctx.createRadialGradient(x - R * 0.2, y - R * 0.25, R * 0.1, x, y, R);
      bg.addColorStop(0, "rgb(46 33 19)");
      bg.addColorStop(0.7, "rgb(24 17 10)");
      bg.addColorStop(1, "rgb(12 9 6)");
      ctx.fillStyle = bg;
      ctx.beginPath();
      ctx.arc(x, y, R, 0, TAU);
      ctx.fill();
      ctx.restore();

      // The sample. Darkfield: the cells carry the light, the ground does not.
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, Math.max(0.5, R - 1), 0, TAU);
      ctx.clip();

      // Two fungal threads, always there, faint.
      ctx.lineWidth = Math.max(0.8, R * 0.012);
      ctx.strokeStyle = "rgba(226, 214, 180, 0.22)";
      ctx.beginPath();
      ctx.moveTo(x - R, y + R * 0.3);
      ctx.bezierCurveTo(x - R * 0.3, y + R * 0.05, x + R * 0.1, y + R * 0.6, x + R, y + R * 0.2);
      ctx.moveTo(x - R * 0.4, y - R);
      ctx.bezierCurveTo(x - R * 0.2, y - R * 0.3, x + R * 0.5, y - R * 0.4, x + R * 0.7, y - R);
      ctx.stroke();

      ctx.lineCap = "round";
      const n = Math.min(CELLS, count);
      for (let i = 0; i < Math.ceil(n); i++) {
        const c = cells[i];
        const born = clamp01(n - i); // the newest cell fades in as it divides
        const a = c.a + clock * c.spin;
        const px = x + Math.cos(a) * c.r * R;
        const py = y + Math.sin(a) * c.r * R;
        const ang = c.ang + Math.sin(clock * 0.6 + c.wob) * 0.35;
        const half = (c.len * R) / 2;
        const dx = Math.cos(ang) * half;
        const dy = Math.sin(ang) * half;
        ctx.lineWidth = c.w * R;
        ctx.strokeStyle = `rgb(${TONES[c.tone]} / ${0.82 * born})`;
        ctx.beginPath();
        ctx.moveTo(px - dx, py - dy);
        ctx.lineTo(px + dx, py + dy);
        ctx.stroke();
        ctx.lineWidth = c.w * R * 0.35;
        ctx.strokeStyle = `rgb(255 250 235 / ${0.45 * born})`;
        ctx.beginPath();
        ctx.moveTo(px - dx * 0.6, py - dy * 0.6 - c.w * R * 0.18);
        ctx.lineTo(px + dx * 0.6, py + dy * 0.6 - c.w * R * 0.18);
        ctx.stroke();
      }

      // Falloff at the edge of the field of view.
      const vig = ctx.createRadialGradient(x, y, R * 0.55, x, y, R);
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(6,4,2,0.55)");
      ctx.fillStyle = vig;
      ctx.fillRect(x - R, y - R, R * 2, R * 2);
      ctx.restore();

      // The rim: one bright edge and a faint inner one, plus a highlight.
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "rgba(244, 243, 238, 0.82)";
      ctx.beginPath();
      ctx.arc(x, y, R, 0, TAU);
      ctx.stroke();
      if (R > 12) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgba(244, 243, 238, 0.16)";
        ctx.beginPath();
        ctx.arc(x, y, R - 5, 0, TAU);
        ctx.stroke();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "rgba(255, 255, 255, 0.22)";
        ctx.beginPath();
        ctx.arc(x, y, R - 3, Math.PI * 1.08, Math.PI * 1.42);
        ctx.stroke();
      }

      ctx.restore();
    };

    /** The release: the lens opens at the drip point and the cells go into the soil. */
    const drawRelease = (x: number, y: number, R: number, k: number) => {
      if (k <= 0 || k >= 1) return;
      const fade = 1 - smooth(k);
      ctx.save();
      ctx.lineCap = "round";
      const n = 90;
      for (let i = 0; i < n; i++) {
        const c = cells[i];
        const dist = (0.15 + c.r) * R * (1 + k * 2.6);
        const a = c.a + clock * c.spin * 0.4;
        const px = x + Math.cos(a) * dist;
        const py = y + Math.sin(a) * dist * 0.42 + k * R * 0.35; // flattened: they spread along the ground
        const half = (c.len * R * 0.8) / 2;
        const ang = c.ang;
        ctx.lineWidth = c.w * R * 0.8;
        ctx.strokeStyle = `rgb(${TONES[c.tone]} / ${0.8 * fade})`;
        ctx.beginPath();
        ctx.moveTo(px - Math.cos(ang) * half, py - Math.sin(ang) * half);
        ctx.lineTo(px + Math.cos(ang) * half, py + Math.sin(ang) * half);
        ctx.stroke();
      }
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = `rgba(244, 243, 238, ${0.7 * fade * fade})`;
      ctx.beginPath();
      ctx.ellipse(x, y + k * R * 0.35, R * (0.4 + k * 2.4), R * (0.4 + k * 2.4) * 0.42, 0, 0, TAU);
      ctx.stroke();
      ctx.restore();
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!reduce) clock += dt;

      const target = Math.min(TOTAL, Math.max(0, window.scrollY / Math.max(1, vh)));
      smoothT = smoothT < 0 || reduce ? target : smoothT + (target - smoothT) * LERP;
      const t = smoothT;

      const live = t > T.open0 - 0.05 && t < T.out1 + 0.05;
      if (!live) {
        if (!blank) {
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          blank = true;
        }
        return;
      }
      blank = false;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, vw, vh);

      const portrait = portraitMQ.matches;
      const narrow = vw <= 860;
      const d = dock(narrow);
      const big = Math.min(vw, vh) * (narrow ? 0.22 : 0.17);
      const [cx, cy] = toScreen(CAPTURE, vw, vh, portrait);
      const [kx, ky] = toScreen(CAN, vw, vh, portrait);
      const [rx, ry] = toScreen(DRIP, vw, vh, portrait);

      // Opening on the root hair, then docking.
      const open = span(t, T.open0, T.open1);
      const docked = span(t, T.dock0, T.dock1);
      const grow = span(t, T.grow0, T.grow1);
      const drop = span(t, T.drop0, T.drop1);

      let x: number;
      let y: number;
      let R: number;
      let alpha = open * (1 - drop);

      if (reduce) {
        // Fewer and gentler: it simply appears in its dock and leaves by fading.
        x = d.x;
        y = d.y;
        R = d.R;
      } else if (drop > 0) {
        x = mix(d.x, kx, drop);
        y = mix(d.y, ky, drop);
        R = mix(d.R * (1 + grow * 0.18), d.R * 0.2, drop);
        alpha = 1 - smooth((drop - 0.6) / 0.4);
      } else {
        x = mix(cx, d.x, docked);
        y = mix(cy, d.y, docked);
        R = mix(big * open, d.R, docked) * (1 + grow * 0.18);
      }

      // Fourteen cells from the soil, then the fermenter multiplies them.
      const count = SEED_CELLS * Math.pow(CELLS / SEED_CELLS, grow);
      drawLens(x, y, R, count, alpha);

      if (!reduce) {
        // The same sample comes back whole at the emitter, then opens into the
        // wet soil. The lens arriving first is what makes it read as the one
        // the visitor has been carrying, not as a new effect.
        const k = (t - T.out0) / (T.out1 - T.out0);
        if (k > 0 && k < 1) {
          const arrive = clamp01(k / 0.16);
          const open = clamp01((k - 0.16) / 0.84);
          drawLens(rx, ry, d.R * 1.1, CELLS * 0.4, arrive * (1 - clamp01(open * 3)));
          drawRelease(rx, ry, d.R * 1.2, open);
        }
      }
    };

    size();
    window.addEventListener("resize", size, { passive: true });
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", size);
    };
  }, []);

  return <canvas ref={ref} className="wspecimen" aria-hidden />;
}
