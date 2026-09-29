"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { cutoutOf, kindOf, products, shotOf, type Product } from "@/lib/products";
import { centreInStrip, pad } from "@/components/products/PackShow";

/**
 * The catalogue's opening: six packs standing on a turntable.
 *
 * The pack in front has its neighbours either side and a step behind, turned
 * a little towards it. Choosing another (its name along the foot, a pack
 * beside the front one, a swipe across them, the arrow keys) turns the whole
 * table: the front pack swings back to one side while the next comes round
 * to the front, and the words beside it turn the same way. The ground takes
 * a wash of the front pack's own label colour.
 *
 * It turns on its own while nobody is using it: the line under the current
 * name fills, and when it is full the next pack comes round. A mouse over the
 * packs or the names, focus inside, or scrolling away holds it; choosing a
 * pack stops it for good, so nothing moves out from under someone reading.
 *
 * The turn is a spring on one number, the table's angle, run on its own
 * frame loop and written straight to the packs' transforms, so a second
 * choice made mid-turn carries on from the speed it is already at, and a
 * swipe drags the table under the finger. Every size is in units of the
 * stage, so the server renders the first frame exactly where it will be.
 */

/**
 * The packs on the table, in the order they come round, each with the ground
 * it brings: a pale wash of its label colour.
 */
const SHOW: { slug: string; tint: string }[] = [
  { slug: "bio-sanjiveeni", tint: "#e4eedb" },
  { slug: "blumonas", tint: "#f4e2e0" },
  { slug: "bio-vanish", tint: "#f3efd7" },
  { slug: "bluderma", tint: "#e0e8f1" },
  { slug: "bio-hit", tint: "#ece3ef" },
  { slug: "bhu-samruddhi", tint: "#e5eed4" },
];

const packs = SHOW.map((s) => ({ ...(products.find((p) => p.slug === s.slug) as Product), tint: s.tint }));
const n = packs.length;

/** Degrees of table between one pack and the next. */
const STEP = 40;
/** How big a neighbour stands, against the pack in front. */
const SIDE = 0.72;
/** How far the packs turn to face along the table, against its angle. */
const FACE = 0.4;
/**
 * How much further a pack swings round while the table is moving, in degrees
 * per pack-a-second. At rest every pack nearly faces the front, so its label
 * reads; turning, they swing with the table, which is what makes it read as
 * a table turning rather than pictures sliding.
 */
const SWING = 13;
/** The spring's natural frequency: about 0.7s for a turn to settle. */
const OMEGA = 7.5;

const rad = (d: number) => (d * Math.PI) / 180;
const clamp = (x: number, a: number, b: number) => (x < a ? a : x > b ? b : x);
const wrap = (i: number) => ((i % n) + n) % n;

// A circle of radius R seen from distance P. Both are fixed by the one thing
// that matters on screen: a neighbour at STEP stands `--sp` pack-widths to
// the side at SIDE of full size. R is in those units, so it is 1 / (sin * SIDE).
const R = 1 / (Math.sin(rad(STEP)) * SIDE);
const P = (R * (1 - Math.cos(rad(STEP))) * SIDE) / (1 - SIDE);

/** Where a pack stands, and how it looks, at an angle round the table. */
function place(deg: number, k = 1, vel = 0) {
  const t = ((((deg + 180) % 360) + 360) % 360) - 180;
  const a = Math.abs(t);
  const z = -R * (1 - Math.cos(rad(t)));
  const s = P / (P - z);
  const x = R * Math.sin(rad(t)) * s;
  // Further back stands a little higher, as it would on a real table.
  const y = -(1 - s) * 0.07;
  // Full strength up to a neighbour's place, gone by the next one round.
  const opacity = clamp((STEP * 1.7 - a) / (STEP * 0.7), 0, 1);
  // The packs behind are seen through a little more air.
  const h = Math.min(1, a / STEP);
  return {
    transform:
      `translate3d(calc(-50% + ${x.toFixed(4)} * var(--sp) * var(--pw)), ${(y * 100).toFixed(3)}%, 0) ` +
      `scale(${(s * k).toFixed(4)}) perspective(1200px) rotateY(${(t * FACE - clamp(vel * SWING, -34, 34)).toFixed(2)}deg)`,
    opacity: opacity.toFixed(3),
    zIndex: String(Math.round(500 + 400 * Math.cos(rad(t)))),
    filter: h > 0.01 ? `saturate(${1 - 0.22 * h}) brightness(${1 + 0.06 * h}) contrast(${1 - 0.08 * h})` : "none",
    visibility: opacity > 0 ? "visible" : "hidden",
  };
}

/** The pack's angle round the table, with the table turned to `phase`. */
function angleOf(i: number, phase: number) {
  let d = i - phase;
  d -= n * Math.round(d / n);
  return d * STEP;
}

const scaleOf = (p: Product) => (shotOf(p) === "contents" ? 0.8 : 1);

/**
 * The table: where it is, how fast it is turning and where it is going, in
 * packs, and the loop that turns it. The target is not wrapped, so the table
 * always turns the short way and a pack that goes round comes back from the
 * other side.
 */
function makeTable() {
  const els: (HTMLDivElement | null)[] = [];
  const T = { phase: 0, vel: 0, target: 0, raf: 0, last: 0, drag: false };

  const paint = () => {
    for (let i = 0; i < n; i++) {
      const el = els[i];
      if (!el) continue;
      const st = place(angleOf(i, T.phase), scaleOf(packs[i]), T.vel);
      el.style.transform = st.transform;
      el.style.opacity = st.opacity;
      el.style.zIndex = st.zIndex;
      el.style.filter = st.filter;
      el.style.visibility = st.visibility;
    }
  };

  const tick = (now: number) => {
    const dt = Math.min(0.05, (now - T.last) / 1000 || 0.016);
    T.last = now;
    if (!T.drag) {
      // Critically damped: no overshoot, and a new target mid-turn keeps the
      // speed the table already has.
      const acc = OMEGA * OMEGA * (T.target - T.phase) - 2 * OMEGA * T.vel;
      T.vel += acc * dt;
      T.phase += T.vel * dt;
      if (Math.abs(T.target - T.phase) < 0.0005 && Math.abs(T.vel) < 0.001) {
        T.phase = T.target;
        T.vel = 0;
      }
    }
    paint();
    T.raf = T.drag || T.phase !== T.target ? requestAnimationFrame(tick) : 0;
  };

  const run = () => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      T.phase = T.target;
      T.vel = 0;
      paint();
      return;
    }
    if (!T.raf) {
      T.last = performance.now();
      T.raf = requestAnimationFrame(tick);
    }
  };

  const stop = () => {
    cancelAnimationFrame(T.raf);
    T.raf = 0;
  };

  return {
    setEl: (i: number, el: HTMLDivElement | null) => {
      els[i] = el;
    },
    phase: () => T.phase,
    /** Aim `by` packs further round. Returns the front pack before and after. */
    turn: (by: number) => {
      const from = wrap(T.target);
      T.target += by;
      run();
      return [from, wrap(T.target)] as const;
    },
    /** A finger has the table: stop turning, and follow it. */
    grab: () => {
      T.drag = true;
      T.vel = 0;
      T.last = performance.now();
      stop();
      return T.phase;
    },
    dragTo: (phase: number) => {
      // The finger's speed, smoothed, so the packs swing under it too.
      const now = performance.now();
      const dt = (now - T.last) / 1000;
      if (dt > 0.001) T.vel = 0.6 * T.vel + (0.4 * (phase - T.phase)) / dt;
      T.last = now;
      T.phase = phase;
      paint();
    },
    /** Let go at `vel` packs a second, to settle on `goal`. */
    release: (vel: number, goal: number) => {
      T.drag = false;
      T.vel = vel;
      const from = wrap(T.target);
      T.target = goal;
      run();
      return [from, wrap(goal)] as const;
    },
    dragging: () => T.drag,
    stop,
  };
}

export function PackCarousel() {
  const [active, setActive] = useState(0);
  const [out, setOut] = useState<number | null>(null);
  const [dir, setDir] = useState<"next" | "prev" | null>(null);
  const [auto, setAuto] = useState(true);
  const [hold, setHold] = useState(false);
  const [seen, setSeen] = useState(true);
  const [table] = useState(makeTable);

  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const strip = useRef<HTMLDivElement>(null);

  /** Turn the table by `by` packs. */
  const turn = useCallback(
    (by: number) => {
      if (!by) return;
      const [from, to] = table.turn(by);
      if (to !== from) {
        setOut(from);
        setActive(to);
        setDir(by > 0 ? "next" : "prev");
      }
    },
    [table],
  );

  /** Bring pack i to the front, the short way round. */
  const choose = useCallback(
    (i: number) => {
      setAuto(false);
      let by = wrap(i - active);
      if (by > n / 2) by -= n;
      turn(by);
    },
    [turn, active],
  );

  const advance = useCallback(() => turn(1), [turn]);

  useEffect(() => {
    centreInStrip(strip.current, active);
  }, [active]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => table.stop, [table]);

  // A swipe across the packs turns the table under the finger, and lets go
  // with the finger's speed. A press that barely moves is left to be a click.
  const press = useRef<{ id: number; x: number; phase: number; unit: number; trail: [number, number][] } | null>(null);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const el = stage.current;
    if (!el) return;
    const cs = getComputedStyle(el);
    const unit = (parseFloat(cs.getPropertyValue("--sp")) || 0.58) * el.clientHeight * 0.75;
    press.current = { id: e.pointerId, x: e.clientX, phase: table.phase(), unit, trail: [[e.timeStamp, e.clientX]] };
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const p = press.current;
    if (!p || p.id !== e.pointerId) return;
    const dx = e.clientX - p.x;
    if (!table.dragging()) {
      if (Math.abs(dx) < 8) return;
      setAuto(false);
      stage.current?.setPointerCapture(e.pointerId);
      p.phase = table.grab();
      p.x = e.clientX;
    }
    table.dragTo(p.phase - (e.clientX - p.x) / p.unit);
    p.trail.push([e.timeStamp, e.clientX]);
    while (p.trail.length > 2 && e.timeStamp - p.trail[0][0] > 100) p.trail.shift();
  };

  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    const p = press.current;
    press.current = null;
    if (!p || !table.dragging()) return;
    const [t0, x0] = p.trail[0];
    const [t1, x1] = p.trail[p.trail.length - 1];
    // Packs per second, positive when the table turns to bring the next one.
    const v = t1 > t0 && e.timeStamp - t1 < 80 ? -((x1 - x0) / (t1 - t0)) * (1000 / p.unit) : 0;
    const now = table.phase();
    let goal = Math.round(now + v * 0.12);
    // A deliberate flick always gets at least one pack, even a short one.
    if (goal === Math.round(p.phase) && Math.abs(v) > 0.8) goal += Math.sign(v);
    const [from, to] = table.release(v, goal);
    if (to !== from) {
      setOut(from);
      setActive(to);
      setDir(goal > p.phase ? "next" : "prev");
    }
  };

  const tint = packs[active].tint;

  return (
    <section
      ref={root}
      data-tone="light"
      className="ps ps-browse"
      style={{ ["--tint" as string]: tint }}
      aria-roledescription="carousel"
      aria-label="Bloom Biotech packs"
      onFocus={() => setHold(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHold(false);
      }}
    >
      <div className="shell ps-body">
        <div className="ps-grid">
          <div className="ps-words" data-dir={dir ?? undefined} aria-live={auto ? "off" : "polite"}>
            {packs.map((p, i) => (
              <div
                key={p.slug}
                id={`ps-panel-${p.slug}`}
                role="tabpanel"
                aria-labelledby={`ps-tab-${p.slug}`}
                className="ps-copy"
                data-state={i === active ? "on" : i === out ? "out" : undefined}
                inert={i !== active}
              >
                <p className="ps-kind">
                  {kindOf(p)} · {pad(i)} / {pad(n - 1)}
                </p>
                <h2 className="display ps-name">{p.name}</h2>
                <p className="ps-tagline">{p.tagline}</p>
                <p className="ps-tech">{p.technology}</p>
                <div className="ps-cta">
                  <Link href={`/products/${p.slug}`} className="btn btn-primary">
                    See {p.name}
                    <span className="arw" aria-hidden>
                      →
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div
            ref={stage}
            className="ps-stage ps-table"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onPointerEnter={(e) => e.pointerType === "mouse" && setHold(true)}
            onPointerLeave={(e) => e.pointerType === "mouse" && setHold(false)}
          >
            {packs.map((p, i) => {
              // The first frame, for the server and the first paint. After
              // that the frame loop owns these styles; this object never
              // changes, so React never writes over them.
              const first = place(angleOf(i, 0), scaleOf(p)) as CSSProperties;
              const front = i === active;
              const side = !front && Math.abs(angleOf(i, active)) <= STEP;
              const img = (
                <Image
                  src={cutoutOf(p)}
                  alt={front ? `${p.name} pack` : ""}
                  fill
                  priority={Math.abs(angleOf(i, 0)) <= STEP}
                  sizes="(min-width: 900px) 30rem, 72vw"
                  className="ps-img"
                  draggable={false}
                />
              );
              return (
                <div
                  key={p.slug}
                  ref={(el) => table.setEl(i, el)}
                  className="ps-orb"
                  style={first}
                  aria-hidden={!front || undefined}
                >
                  {side ? (
                    <button
                      type="button"
                      className="ps-hit"
                      tabIndex={-1}
                      aria-label={`Show ${p.name}`}
                      onClick={() => choose(i)}
                    >
                      {img}
                    </button>
                  ) : (
                    img
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div
          className="ps-foot"
          onPointerEnter={(e) => e.pointerType === "mouse" && setHold(true)}
          onPointerLeave={(e) => e.pointerType === "mouse" && setHold(false)}
        >
          <div className="ps-strip" role="tablist" aria-label="Choose a pack" ref={strip}>
            {packs.map((p, i) => (
              <button
                key={p.slug}
                type="button"
                role="tab"
                id={`ps-tab-${p.slug}`}
                aria-selected={i === active}
                aria-controls={`ps-panel-${p.slug}`}
                tabIndex={i === active ? 0 : -1}
                className="ps-tab"
                data-on={i === active || undefined}
                onClick={() => choose(i)}
                onKeyDown={(e) => {
                  const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
                  if (!step) return;
                  e.preventDefault();
                  const next = wrap(i + step);
                  choose(next);
                  document.getElementById(`ps-tab-${packs[next].slug}`)?.focus();
                }}
              >
                <span className="ps-tab-name">{p.name}</span>
                <span className="ps-track">
                  {i === active ? (
                    <span
                      key={`${active}-${auto ? "run" : "full"}`}
                      className="ps-fill"
                      data-run={auto || undefined}
                      data-paused={hold || !seen || undefined}
                      onAnimationEnd={advance}
                    />
                  ) : null}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
