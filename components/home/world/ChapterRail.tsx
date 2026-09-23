"use client";

import { useEffect, useRef, useState } from "react";
import { chapters, legs, starts, weights } from "./legs";

/** Which chapter each leg belongs to, by index. */
const chapterOfLeg = legs.map((l) => chapters.findIndex((c) => c.name === l.chapter));

/** The last chapter above ground before the camera goes under. */
const GROUND_AFTER = chapters.findIndex((c) => c.name === "Crop");

/**
 * The map.
 *
 * A continuous world has no sections to scroll between, so this is how the
 * visitor knows where they are and how they skip ahead. One tick per chapter,
 * the current one named, a hairline where the ground is. Every tick is a
 * button that flies the camera there.
 */
export function ChapterRail() {
  const [active, setActive] = useState(0);
  // Name the chapter as it arrives, then let the words on screen have the
  // frame. A label that stayed up would sit beside every headline.
  const [flash, setFlash] = useState(true);
  const current = useRef(0);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const settle = () => {
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setFlash(false), 2200);
    };
    const onWaypoint = (e: Event) => {
      const { index } = (e as CustomEvent<{ index: number }>).detail;
      const chapter = chapterOfLeg[index] ?? 0;
      if (chapter === current.current) return;
      current.current = chapter;
      setActive(chapter);
      setFlash(true);
      settle();
    };
    settle();
    document.addEventListener("sc:waypoint", onWaypoint);
    return () => {
      document.removeEventListener("sc:waypoint", onWaypoint);
      window.clearTimeout(timer.current);
    };
  }, []);

  const go = (leg: number) => {
    // Land a third of the way into the leg, where its words are already up.
    const into = leg === 0 ? 0 : 0.35;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: Math.round((starts[leg] + weights[leg] * into) * window.innerHeight),
      behavior: reduce ? "auto" : "smooth",
    });
  };

  return (
    <nav className="wrail" aria-label="Chapters" data-flash={flash || undefined}>
      <ol>
        {chapters.map((c, i) => (
          <li key={c.name}>
            <button
              type="button"
              aria-current={i === active ? "step" : undefined}
              onClick={() => go(c.leg)}
            >
              <span className="wrail__tick" aria-hidden />
              <span className="wrail__name">{c.name}</span>
            </button>
            {i === GROUND_AFTER ? <span className="wrail__ground" aria-hidden /> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
