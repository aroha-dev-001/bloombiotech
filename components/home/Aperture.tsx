"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * The way in.
 *
 * A bone screen, then a hairline of the estate opens down the middle, widens
 * into a standing strip, then into a framed picture, then lets go of the frame
 * and fills the screen — at which point the hero underneath is already there
 * and simply continues. A lens opening, not a loading screen: nothing is being
 * waited for, and there is no spinner, no percentage and no logo animation.
 *
 * It runs on the first arrival of a session only. Seeing it once is an
 * entrance; seeing it on every navigation back to the homepage is an
 * obstruction, and the people this site is for come back to it to look up a
 * dose.
 *
 * The whole thing is four CSS custom properties on one element, animated by a
 * keyframe rather than by JS, so the sequence cannot drift under a busy main
 * thread and costs nothing to run. It is skipped outright under reduced motion.
 */
const KEY = "bloom-entered";

/**
 * Decided once per page load, at module scope, and remembered.
 *
 * It cannot live inside the effect. In development React mounts, runs effects,
 * tears them down and runs them again — and the second run would read back the
 * flag the first run had just written, conclude the entrance had already been
 * seen, and cancel it. Memoising the answer here makes the question idempotent
 * however many times the effect is invoked.
 */
let decision: boolean | null = null;

function claimEntrance() {
  if (decision !== null) return decision;
  try {
    decision = sessionStorage.getItem(KEY) !== "1";
    if (decision) sessionStorage.setItem(KEY, "1");
  } catch {
    // Private mode or blocked storage: show it, it is only an entrance.
    decision = true;
  }
  return decision;
}

const subscribe = () => () => {};

export function Aperture({ src, alt }: { src: string; alt: string }) {
  const reduce = useReducedMotion();

  /**
   * Read rather than assigned: the server says no, the client says whatever
   * `claimEntrance` memoised, and the two never disagree because the element
   * only exists after hydration. Doing this with state set from an effect
   * would be a render, an effect and a second render to show a thing that was
   * already decided before the first one.
   */
  const claimed = useSyncExternalStore(subscribe, claimEntrance, () => false);
  const [done, setDone] = useState(false);
  const run = claimed && !reduce && !done;

  useEffect(() => {
    if (!run) return;
    document.documentElement.classList.add("entering");
    const t = window.setTimeout(() => {
      document.documentElement.classList.remove("entering");
      setDone(true);
    }, 2300);
    return () => {
      window.clearTimeout(t);
      document.documentElement.classList.remove("entering");
    };
  }, [run]);

  if (!run) return null;

  return (
    <div className="ap" aria-hidden>
      <div className="ap-frame">
        {/* Deliberately a plain img: this is the first paint of the session and
            it must not wait on a component's own loader. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="ap-img" />
      </div>
    </div>
  );
}
