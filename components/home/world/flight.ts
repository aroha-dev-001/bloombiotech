import { stops } from "./legs";

/**
 * How the flight is navigated.
 *
 * Scroll still drives the camera directly, so the film scrubs under the hand
 * exactly as before. What changes is where it stops. When a scroll ends
 * between two rest frames (legs.ts), the page glides on to one of them: on to
 * the next if the visitor was moving that way, back if they barely moved. So
 * every scroll lands on a composed frame with its words fully up, never on a
 * morph, a half-dissolved seam or a lens in mid-air.
 *
 * The keyboard steps from rest frame to rest frame. The chapter rail glides
 * to a nearby chapter and cuts through a dip to a far one: flying ten clips in
 * a second is a blur of posters, and it fetches every clip on the way.
 *
 * Anything the visitor does while a glide is running hands the page straight
 * back to them. Under reduced motion nothing moves on its own: the keyboard
 * and the rail jump, and a scroll stays where it was left.
 */

type Glide = {
  from: number;
  to: number;
  start: number;
  dur: number;
  /** Starting slope, normalised: 1 is the glide's own average speed. */
  m0: number;
  /** The scroll position this glide last wrote. */
  last: number;
  raf: number;
};

type Clip = {
  el: HTMLVideoElement;
  ready: boolean;
  painted: boolean;
  cur: number;
  target: number;
};
type Engine = { worlds: { segs: { clip: Clip | null }[] }[] };

/** Quiet time that ends a scroll, where the browser has no scrollend. */
const IDLE_MS = 180;
/** A jump longer than this, in viewport-heights, cuts instead of gliding. */
const FAR = 2.4;
const VEIL_IN_MS = 240;

let glide: Glide | null = null;
let aim = -1;
let dir = 0;
let lastY = 0;
let touching = false;
let cutting = 0;
let idle: number | undefined;
let veil: HTMLElement | null = null;

const clamp = (x: number, a: number, b: number) => (x < a ? a : x > b ? b : x);
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const maxY = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
const px = (i: number) => Math.min(Math.round(stops[i].t * window.innerHeight), maxY());
const setY = (y: number) => window.scrollTo({ top: y, behavior: "instant" });
const wait = (ms: number) => new Promise((r) => window.setTimeout(r, ms));

// Cubic Hermite from speed m0 to rest. With m0 = 0 it is smoothstep, the
// ease a camera dolly makes; a glide that is already moving keeps its speed.
const ease = (s: number, m0: number) => m0 * (s * s * s - 2 * s * s + s) + (3 * s * s - 2 * s * s * s);
const slope = (s: number, m0: number) => m0 * (3 * s * s - 4 * s + 1) + 6 * s - 6 * s * s;

function nearest(y: number) {
  let n = 0;
  for (let i = 1; i < stops.length; i++) if (Math.abs(px(i) - y) < Math.abs(px(n) - y)) n = i;
  return n;
}

/** The rest frame for a scroll that ended at y while moving in direction d. */
function pick(y: number, d: number) {
  const n = nearest(y);
  if (!d || Math.abs(px(n) - y) <= 2) return n;
  let a = -1;
  for (let i = 0; i < stops.length; i++) if (px(i) <= y) a = i;
  if (a < 0) return 0;
  if (a >= stops.length - 1) return stops.length - 1;
  const lo = px(a);
  const hi = px(a + 1);
  // A deliberate nudge carries on to the next frame; a slip goes back. One
  // notch of a mouse wheel is a nudge.
  const nudge = Math.min(0.2 * (hi - lo), 0.06 * window.innerHeight);
  if (d > 0) return y - lo > nudge ? a + 1 : a;
  return hi - y > nudge ? a : a + 1;
}

function halt() {
  if (glide) cancelAnimationFrame(glide.raf);
  glide = null;
}

function fly(i: number) {
  const from = window.scrollY;
  const to = px(i);
  const dist = to - from;
  aim = i;
  if (Math.abs(dist) <= 1) {
    halt();
    return;
  }
  // About a second for one leg of film: the camera is seen to move, and the
  // next frame is never more than a breath away. The engine's playhead eases
  // in behind the scroll for roughly another 0.45s, which is the landing.
  const dur = clamp(500 + (480 * Math.abs(dist)) / window.innerHeight, 560, 1400);
  const now = performance.now();
  let m0 = 0;
  if (glide) {
    // Carry the speed of the glide already under way, so a second key press
    // extends the move instead of restarting it from a standstill.
    const s = clamp((now - glide.start) / glide.dur, 0, 1);
    const v = ((glide.to - glide.from) * slope(s, glide.m0)) / glide.dur;
    m0 = clamp((v * dur) / dist, 0, 2);
    cancelAnimationFrame(glide.raf);
  }
  glide = { from, to, start: now, dur, m0, last: from, raf: 0 };
  glide.raf = requestAnimationFrame(step);
}

function step(now: number) {
  const g = glide;
  if (!g) return;
  // Anything else that moved the page since the last frame is the visitor
  // taking over: a wheel, a finger, the scrollbar. Let go at once.
  const y0 = window.scrollY;
  if (Math.abs(y0 - g.last) > 2) {
    dir = Math.sign(y0 - g.last);
    halt();
    // Their scroll may already be over, and its end went by while the glide
    // still owned the page. If nothing else scrolls, settle from here.
    settleSoon();
    return;
  }
  const s = clamp((now - g.start) / g.dur, 0, 1);
  const y = Math.round(g.from + (g.to - g.from) * ease(s, g.m0));
  setY(y);
  g.last = y;
  if (s < 1) g.raf = requestAnimationFrame(step);
  else glide = null;
}

function settle() {
  window.clearTimeout(idle);
  if (glide || cutting || touching || reduced()) return;
  const y = window.scrollY;
  const i = pick(y, dir);
  dir = 0;
  if (Math.abs(px(i) - y) > 1) fly(i);
}

function settleSoon(ms = IDLE_MS) {
  window.clearTimeout(idle);
  idle = window.setTimeout(settle, ms);
}

/** The engine's own record of the clip a rest frame sits in, if it has one. */
function clipAt(i: number) {
  const engine = window.ScrollCraft?.instances?.[0] as Engine | undefined;
  return engine?.worlds[0]?.segs[stops[i].leg]?.clip ?? null;
}

/**
 * Hold the veil until the frame behind it is the real one. The playhead is
 * put straight on its target rather than left to lerp there, or the clip
 * would scrub up from wherever it last was the moment the veil lifted.
 */
function arrival(i: number) {
  const t0 = performance.now();
  return new Promise<void>((done) => {
    const check = () => {
      const clip = clipAt(i);
      const waited = performance.now() - t0;
      let there = !clip;
      if (clip?.ready) {
        clip.cur = clip.target;
        const at = clip.el.currentTime / (clip.el.duration || 1);
        there = clip.painted && !clip.el.seeking && Math.abs(at - Math.min(clip.target, 0.999)) < 0.01;
      }
      if ((there && waited > 140) || waited > 1600) done();
      else requestAnimationFrame(check);
    };
    requestAnimationFrame(check);
  });
}

async function cut(i: number) {
  halt();
  aim = i;
  const mine = ++cutting;
  if (veil) {
    veil.dataset.on = "";
    await wait(VEIL_IN_MS);
    if (mine !== cutting) return;
  }
  setY(px(i));
  lastY = window.scrollY;
  window.dispatchEvent(new Event("world:cut"));
  await arrival(i);
  if (mine !== cutting) return;
  if (veil) delete veil.dataset.on;
  cutting = 0;
  // If the visitor scrolled under the veil, their scroll ended unseen.
  settle();
}

/**
 * Take the visitor to rest frame i. "auto" glides there, or cuts if it is
 * far; "glide" always glides; "instant" jumps, for keyboard focus.
 */
export function goTo(i: number, how: "auto" | "glide" | "instant" = "auto") {
  i = clamp(i, 0, stops.length - 1);
  window.clearTimeout(idle);
  if (how === "instant" || reduced()) {
    halt();
    aim = i;
    setY(px(i));
    return;
  }
  const far = Math.abs(px(i) - window.scrollY) / window.innerHeight > FAR;
  // Behind a veil that is already down, the new destination is another cut.
  if ((how === "auto" && far) || cutting) void cut(i);
  else fly(i);
}

/** Start listening. Returns the teardown. */
export function startFlight(veilEl: HTMLElement | null) {
  veil = veilEl;
  lastY = window.scrollY;
  const hasEnd = "onscrollend" in window;

  const onScroll = () => {
    const y = window.scrollY;
    // A glide's own writes; step() notices anyone else's.
    if (glide || cutting) {
      lastY = y;
      return;
    }
    if (Math.abs(y - lastY) > 0.5) dir = Math.sign(y - lastY);
    lastY = y;
    window.clearTimeout(idle);
    if (!hasEnd) settleSoon();
  };

  const onScrollEnd = () => {
    if (!glide && !cutting) settle();
  };

  const onTouchStart = () => {
    touching = true;
    halt();
    window.clearTimeout(idle);
  };

  const onTouchEnd = (e: TouchEvent) => {
    if (e.touches.length) return;
    touching = false;
    // A fling keeps scrolling and ends in scrollend (or goes quiet). A finger
    // lifted without one scrolls no further, so nothing else would settle it.
    settleSoon();
  };

  const onKey = (e: KeyboardEvent) => {
    if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
    const t = e.target instanceof Element ? e.target : null;
    const inFlight = !t || t === document.body || t === document.documentElement || !!t.closest(".world");
    if (!inFlight || t?.closest("input, textarea, select, [contenteditable]")) return;
    const here = aim >= 0 && (glide || cutting) ? aim : nearest(window.scrollY);
    let to: number;
    let how: "auto" | "glide" = "glide";
    switch (e.key) {
      case "ArrowDown":
      case "PageDown":
        to = here + 1;
        break;
      case "ArrowUp":
      case "PageUp":
        to = here - 1;
        break;
      case " ":
        if (t?.closest("a, button, summary, [role='button']")) return;
        to = here + (e.shiftKey ? -1 : 1);
        break;
      case "Home":
        to = 0;
        how = "auto";
        break;
      case "End":
        to = stops.length - 1;
        how = "auto";
        break;
      default:
        return;
    }
    e.preventDefault();
    goTo(to, how);
  };

  let width = window.innerWidth;
  const onResize = () => {
    // A phone's address bar showing or hiding changes only the height, in
    // the middle of a scroll. Only a real resize re-settles.
    if (window.innerWidth === width) return;
    width = window.innerWidth;
    halt();
    settleSoon(260);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  if (hasEnd) window.addEventListener("scrollend", onScrollEnd);
  window.addEventListener("touchstart", onTouchStart, { passive: true });
  window.addEventListener("touchend", onTouchEnd, { passive: true });
  window.addEventListener("touchcancel", onTouchEnd, { passive: true });
  window.addEventListener("keydown", onKey);
  window.addEventListener("resize", onResize, { passive: true });

  return () => {
    halt();
    cutting = 0;
    window.clearTimeout(idle);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("scrollend", onScrollEnd);
    window.removeEventListener("touchstart", onTouchStart);
    window.removeEventListener("touchend", onTouchEnd);
    window.removeEventListener("touchcancel", onTouchEnd);
    window.removeEventListener("keydown", onKey);
    window.removeEventListener("resize", onResize);
    veil = null;
  };
}

/** Land a page that opened part-way along (a reload restores the scroll). */
export function settleNow() {
  settleSoon(0);
}
