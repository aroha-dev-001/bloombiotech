import { stops } from "./legs";

/**
 * How the flight is navigated.
 *
 * The wheel, the trackpad and the finger are the browser's own: the film
 * moves exactly as far as the page is scrolled, eased by the engine's
 * playhead, and stays wherever the visitor leaves it. Two earlier versions
 * carried every scroll on to the nearest composed frame (legs.ts `stops`),
 * first by gliding there once the scroll had ended and then by taking over
 * the wheel; the owner found both jumpy, because a small scroll became a
 * whole leg of film.
 *
 * The rest frames are still where deliberate steps land. The keyboard steps
 * from frame to frame, and the chapter rail glides to a nearby chapter and
 * cuts through a dip to a far one: flying ten clips in a second is a blur of
 * posters, and it fetches every clip on the way. Anything the visitor does
 * during a glide hands the page straight back to them. Under reduced motion
 * the keyboard and the rail jump.
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

/** A jump longer than this, in viewport-heights, cuts instead of gliding. */
const FAR = 2.4;
const VEIL_IN_MS = 240;

let glide: Glide | null = null;
let aim = -1;
let cutting = 0;
let veil: HTMLElement | null = null;

const LAST = stops.length - 1;
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

/**
 * The next rest frame in direction d. During a glide it counts on from the
 * frame the glide is headed for, so a second press goes one further; at rest
 * it is the first frame past wherever the visitor left the page.
 */
function following(d: number) {
  if (aim >= 0 && (glide || cutting)) return aim + d;
  const y = window.scrollY;
  if (d > 0) {
    for (let i = 0; i <= LAST; i++) if (px(i) > y + 2) return i;
    return LAST;
  }
  for (let i = LAST; i >= 0; i--) if (px(i) < y - 2) return i;
  return 0;
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
  // next frame is never more than a breath away.
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
  if (Math.abs(window.scrollY - g.last) > 2) {
    halt();
    return;
  }
  const s = clamp((now - g.start) / g.dur, 0, 1);
  const y = Math.round(g.from + (g.to - g.from) * ease(s, g.m0));
  setY(y);
  g.last = y;
  if (s < 1) g.raf = requestAnimationFrame(step);
  else glide = null;
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
  window.dispatchEvent(new Event("world:cut"));
  await arrival(i);
  if (mine !== cutting) return;
  if (veil) delete veil.dataset.on;
  cutting = 0;
}

/**
 * Take the visitor to rest frame i. "auto" glides there, or cuts if it is
 * far; "glide" always glides; "instant" jumps, for keyboard focus.
 */
export function goTo(i: number, how: "auto" | "glide" | "instant" = "auto") {
  i = clamp(i, 0, LAST);
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

  const onKey = (e: KeyboardEvent) => {
    if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
    const t = e.target instanceof Element ? e.target : null;
    const inFlight = !t || t === document.body || t === document.documentElement || !!t.closest(".world");
    if (!inFlight || t?.closest("input, textarea, select, [contenteditable]")) return;
    let to: number;
    let how: "auto" | "glide" = "glide";
    switch (e.key) {
      case "ArrowDown":
      case "PageDown":
        to = following(1);
        break;
      case "ArrowUp":
      case "PageUp":
        to = following(-1);
        break;
      case " ":
        if (t?.closest("a, button, summary, [role='button']")) return;
        to = following(e.shiftKey ? -1 : 1);
        break;
      case "Home":
        to = 0;
        how = "auto";
        break;
      case "End":
        to = LAST;
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
    // the middle of a scroll. Only a real resize stops a glide.
    if (window.innerWidth === width) return;
    width = window.innerWidth;
    halt();
  };

  window.addEventListener("keydown", onKey);
  window.addEventListener("resize", onResize, { passive: true });

  return () => {
    halt();
    cutting = 0;
    window.removeEventListener("keydown", onKey);
    window.removeEventListener("resize", onResize);
    veil = null;
  };
}
