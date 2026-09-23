"use client";

import { useLayoutEffect } from "react";

/**
 * The way in.
 *
 * A bone screen, then a hairline of the estate opens down the middle, widens
 * into a standing strip, then into a framed picture, then lets go of the frame
 * and fills the screen — at which point the page underneath is already there
 * and simply continues. A lens opening, not a loading screen: there is no
 * spinner, no percentage and no logo animation.
 *
 * It runs on the first arrival of a session only. Seeing it once is an
 * entrance; seeing it on every navigation back to the homepage is an
 * obstruction, and the people this site is for come back to it to look up a
 * dose.
 *
 * This component is only the markup. It is always rendered and hidden by CSS
 * unless <html> carries `entering`, which an inline script in <head> decides
 * before the first paint (lib/entrance.ts). The sequence is keyframes, so it
 * starts with the page rather than with hydration, and cannot drift under a
 * busy main thread.
 *
 * On phones the picture is the portrait frame the page itself opens on, not a
 * crop of the landscape one, so when the lens lets go nothing changes. It is
 * also the same file, so it is one download, not two racing each other.
 */
export function Aperture({
  src,
  alt,
  portrait,
}: {
  src: string;
  alt: string;
  /** The frame the page shows under this media query, if it differs. */
  portrait?: { src: string; media: string };
}) {
  // In development React's remount strips the classes the head script put on
  // <html>. Put them back from the script's own state. A no-op in production.
  useLayoutEffect(() => {
    const s = window.__entrance;
    const html = document.documentElement.classList;
    if (s === "wait" || s === "open") html.add("entering");
    if (s === "open") html.add("lens-open");
  }, []);

  return (
    <div className="ap" aria-hidden>
      <div className="ap-frame">
        <picture>
          {portrait ? <source media={portrait.media} srcSet={portrait.src} /> : null}
          {/* Deliberately a plain img: this is the first paint of the session and
              it must not wait on a component's own loader. */}
          <img src={src} alt={alt} className="ap-img" fetchPriority="high" />
        </picture>
      </div>
    </div>
  );
}
