"use client";

import Link from "next/link";
import Script from "next/script";
import { Fragment, useCallback, useEffect, useRef, type ReactNode } from "react";
import { preconnect } from "react-dom";
import { Aperture } from "../Aperture";
import { ChapterRail } from "./ChapterRail";
import { Specimen } from "./Specimen";
import { legs, weights, windowOf } from "./legs";
import { media, MEDIA_ORIGIN } from "@/lib/media";
import "./scrollcraft.css";
import "./world.css";

/**
 * The home page is one flight.
 *
 * Canopy, crop, soil, the microbes on a root hair, up through the plant into a
 * leaf, out above the farm to the plant in Chikkamagaluru, through the
 * fermentation hall, onto the bench, back out to the field and up over the
 * estate again. Eleven clips mounted in one fixed stage, cross-dissolving at
 * frames that were generated to match. The only thing in document flow is an
 * empty spacer; scroll drives the film and the words, nothing else moves.
 *
 * The runtime is the unmodified scrollcraft engine, loaded from /public. It
 * has no teardown, so this page is never left by a client-side navigation:
 * internal links from here load their page in full. That also returns the
 * decoded video to the browser the moment the visitor leaves.
 */

type ScrollCraft = { mount: (root: Element, opts?: object) => unknown };
declare global {
  interface Window {
    ScrollCraft?: ScrollCraft;
  }
}

const mounted = new WeakSet<Element>();
const PORTRAIT_MQ = "(max-width: 860px) and (orientation: portrait)";

type Side = "lead" | "trail";
type Block = {
  id: string;
  window: string;
  side: Side;
  /** A denser scrim, for the white fermentation hall. */
  deep?: boolean;
  body: ReactNode;
};

const blocks: Block[] = [
  {
    id: "hero",
    window: "hero",
    side: "lead",
    body: (
      <>
        <h1 className="wtitle wtitle--hero">Follow a farm all the way down.</h1>
        <p className="wbody">
          Bloom Biotech makes living biological inputs for coffee country, with
          ICAR-IIHR.
        </p>
        <div className="wactions">
          <Link href="/products" className="btn btn-ghost">
            Explore Our Products
          </Link>
        </div>
      </>
    ),
  },
  {
    id: "crop",
    window: windowOf([1, 0.02], [1, 0.72]),
    side: "trail",
    body: (
      <>
        <h2 className="wtitle">A crop is decided underground.</h2>
        <p className="wbody">
          Root rot, wilt, nematodes, nutrients locked in the soil. Most of what
          goes wrong starts where nobody is looking.
        </p>
      </>
    ),
  },
  // Leg 2, the surface closing over the lens, carries nothing on purpose.
  {
    id: "microbes",
    window: windowOf([3, 0.16], [3, 0.97]),
    side: "lead",
    body: (
      <>
        <h2 className="wtitle">The real work is done by microbes.</h2>
        <p className="wbody">
          Azotobacter draws nitrogen from the air. Bacillus frees phosphorus and
          zinc held in the soil. Pseudomonas keeps disease away from the root.
        </p>
      </>
    ),
  },
  {
    id: "plant",
    window: windowOf([4, 0.3], [4, 0.97]),
    side: "trail",
    body: (
      <>
        <h2 className="wtitle">From the root, into every leaf.</h2>
        <p className="wbody">
          What the microbes free moves with water into the root and up through
          the plant, to where the sun does the rest.
        </p>
      </>
    ),
  },
  {
    id: "grown-here",
    window: windowOf([5, 0.42], [6, 0.3]),
    side: "lead",
    body: <h2 className="wtitle">We grow those microbes here.</h2>,
  },
  {
    id: "factory",
    window: windowOf([6, 0.24], [7, 0.02]),
    side: "trail",
    body: (
      <>
        <h2 className="wtitle">Chikkamagaluru, since 2013.</h2>
        <p className="wbody">
          The first company in India to license the Arka Microbial Consortium
          from ICAR-IIHR.
        </p>
      </>
    ),
  },
  {
    id: "fermentation",
    window: windowOf([7, 0.06], [7, 0.96]),
    side: "lead",
    deep: true,
    body: (
      <>
        <h2 className="wtitle">The ones you met at the root, grown by the billion.</h2>
        <p className="wbody">
          Fermented batch by batch, and every pack carries its living count on
          the label.
        </p>
      </>
    ),
  },
  {
    id: "products",
    window: windowOf([8, 0.4], [8, 1]),
    side: "trail",
    deep: true,
    body: (
      <>
        <h2 className="wtitle">Ready for the field.</h2>
        <p className="wbody">
          Consortia for the soil, biocontrols for disease and pests, and
          nutrition the plant can take up.
        </p>
      </>
    ),
  },
  {
    // Up while the farmer is spraying, gone before the camera passes the can.
    id: "application",
    window: windowOf([9, 0.02], [9, 0.44]),
    side: "lead",
    body: (
      <>
        <h2 className="wtitle">Through the sprayer, or the drip line.</h2>
        <p className="wbody">
          Bhu Samruddhi goes on at 10 ml per litre, as a foliar spray or through
          drip fertigation.
        </p>
      </>
    ),
  },
  {
    id: "finale",
    window: "finale",
    side: "lead",
    body: (
      <>
        <h2 className="wtitle">Biology that grows healthier crops.</h2>
        <p className="wbody">From the soil, through the factory, and back to the farm.</p>
        <div className="wactions">
          <Link href="/products" className="btn btn-primary">
            Explore Our Products
            <span className="arw" aria-hidden>
              →
            </span>
          </Link>
          <Link href="/enquire" className="btn btn-ghost">
            Contact
          </Link>
        </div>
      </>
    ),
  },
];

export function World() {
  const host = useRef<HTMLDivElement>(null);

  // The first poster is the page's largest paint and it comes from the media
  // host, so open that connection with the document. The clips are fetched
  // with CORS, which browsers pool separately, so warm that one too.
  if (MEDIA_ORIGIN) {
    preconnect(MEDIA_ORIGIN);
    preconnect(MEDIA_ORIGIN, { crossOrigin: "anonymous" });
  }

  const mount = useCallback(() => {
    const el = host.current;
    const sc = window.ScrollCraft;
    if (!el || !sc || mounted.has(el)) return;
    mounted.add(el);

    // Portrait phones get the portrait cut of every clip. Anything else,
    // including a tablet held landscape, gets the landscape master: the engine
    // would otherwise hand a coarse-pointer landscape screen a 9:16 clip.
    const portrait = matchMedia(PORTRAIT_MQ).matches;
    el.querySelectorAll<HTMLVideoElement>("video[data-portrait]").forEach((v) => {
      if (portrait) v.setAttribute("data-sc-src-mobile", v.dataset.portrait ?? "");
      else v.removeAttribute("data-sc-src-mobile");
    });

    sc.mount(el);

    // The spacer is sized once at mount. Re-measure when the window and the
    // faces have settled, or a mount that saw a 0px viewport never scrolls.
    const relayout = () => window.dispatchEvent(new Event("resize"));
    if (document.readyState === "complete") relayout();
    else window.addEventListener("load", relayout, { once: true });
    document.fonts?.ready.then(relayout);
  }, []);

  // Leave by full navigation. See the note at the top of the file.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!(a instanceof HTMLAnchorElement)) return;
      if ((a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      window.location.assign(url.href);
    };
    window.addEventListener("click", onClick, true);
    return () => {
      window.removeEventListener("click", onClick, true);
      // Back and forward still navigate client-side. If that is what unmounted
      // us, finish the job with a real load of wherever the visitor went.
      if (window.location.pathname !== "/") window.location.reload();
    };
  }, []);

  // Each scrim follows its copy block's opacity. A scrim cannot be windowed
  // itself: anything windowed counts as copy, and the contrast pass hides copy
  // to see what it sits on, which would hide the scrim with it.
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const pairs = [...el.querySelectorAll<HTMLElement>("[data-scrim-for]")].map((scrim) => ({
      scrim,
      copy: el.querySelector<HTMLElement>(`[data-copy-id="${scrim.dataset.scrimFor}"]`),
      last: "",
    }));
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      for (const p of pairs) {
        const o = p.copy?.style.opacity || "0";
        if (o !== p.last) {
          p.scrim.style.opacity = o;
          p.last = o;
        }
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Keyboard focus on a link inside a copy block that is not on screen yet
  // lands on something invisible. Fly to where that block is fully shown.
  useEffect(() => {
    const onFocus = (e: FocusEvent) => {
      const block = (e.target as Element | null)?.closest?.("[data-at]");
      if (!(block instanceof HTMLElement)) return;
      if (parseFloat(getComputedStyle(block).opacity || "0") > 0.9) return;
      const at = parseFloat(block.dataset.at ?? "0");
      window.scrollTo({ top: Math.round(at * document.documentElement.scrollHeight), behavior: "instant" });
    };
    document.addEventListener("focusin", onFocus);
    return () => document.removeEventListener("focusin", onFocus);
  }, []);

  return (
    <div ref={host} className="world" data-sc-lerp="0.12">
      <Script src="/scrollcraft/scrollcraft.js" strategy="afterInteractive" onReady={mount} />

      {/* The lens opens on the frame the flight starts from, so when it lets
          go there is nothing to hand over: the canopy is already there. */}
      <Aperture
        src={media("/world/leg00.jpg")}
        alt="A shade-grown coffee estate in the hills of Chikkamagaluru, seen from above"
      />

      {/* The map comes before the words so keyboard order is chapters first. */}
      <ChapterRail />

      <div data-sc-mode="worldflight" data-sc-seam="0.16">
        <div data-sc-world>
          {legs.map((l, i) => (
            <div
              key={l.id}
              className="world-leg"
              data-sc-segment
              data-sc-w={weights[i]}
              data-sc-waypoint={l.chapter}
            >
              <picture>
                <source media={PORTRAIT_MQ} srcSet={media(`/world/${l.id}-m.jpg`)} />
                {/* A plain img on purpose: the engine drives it as the leg's
                    poster and push-in, and needs it as a direct image. */}
                <img
                  src={media(`/world/${l.id}.jpg`)}
                  alt=""
                  decoding="async"
                  fetchPriority={i === 0 ? "high" : "low"}
                />
              </picture>
              <video
                data-sc-src={media(`/world/${l.id}.mp4`)}
                data-portrait={media(`/world/${l.id}-m.mp4`)}
                muted
                playsInline
                preload="none"
                aria-hidden
              />
            </div>
          ))}
        </div>

        <div data-sc-world-copy>
          {blocks.map((b) => (
            <Fragment key={b.id}>
              <div
                className={`wscrim wscrim--${b.side}${b.deep ? " wscrim--deep" : ""}`}
                data-scrim-for={b.id}
                aria-hidden
              />
              <div
                data-sc-copy
                data-sc-window={b.window}
                data-copy-id={b.id}
                data-at={plateauOf(b.window)}
                className={`wcopy wcopy--${b.side}`}
              >
                {b.body}
              </div>
            </Fragment>
          ))}
        </div>

        <div data-sc-spacer aria-hidden />
      </div>

      <Specimen />
    </div>
  );
}

/**
 * The middle of a copy block's window as a fraction of the page's scroll
 * height, for the focus handler. The spacer is the track plus one viewport,
 * so a track fraction maps onto the document by the same ratio.
 */
function plateauOf(win: string) {
  const total = weights.reduce((a, b) => a + b, 0);
  const track = total / (total + 1);
  if (win === "hero") return "0";
  if (win === "finale") return track.toFixed(4);
  const [f, t] = win.split(" ").map(Number);
  return (((f + t) / 2) * track).toFixed(4);
}
