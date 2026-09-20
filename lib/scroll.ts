/**
 * Scrolling the page from a click handler, reliably.
 *
 * Two things rule out the obvious `el.scrollIntoView({ behavior: "smooth" })`:
 * Lenis runs a RAF loop that writes the scroll position every frame, which
 * cancels a native smooth scroll outright, and its own `scrollTo` disagrees
 * with the native one about whether `scroll-margin-top` has been applied yet.
 *
 * So the tween is done here. Lenis synchronises to scroll positions set from
 * outside, so per-frame writes land and survive.
 */

/** Same curve as the design system's --ease-out. */
function easeOutQuint(t: number) {
  return 1 - Math.pow(1 - t, 5);
}

let active = 0;

export function scrollToElement(el: HTMLElement, { smooth = true } = {}) {
  const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const to = Math.min(max, Math.max(0, el.getBoundingClientRect().top + window.scrollY - margin));
  const from = window.scrollY;

  // Cancel a tween still in flight, so rapid taps do not fight each other.
  if (active) cancelAnimationFrame(active);

  // Nothing to animate, or nothing watching: land on the mark immediately.
  // (rAF is paused in a hidden tab, so a tween there would never finish.)
  if (!smooth || document.visibilityState === "hidden" || Math.abs(to - from) < 2) {
    window.scrollTo(0, to);
    return;
  }

  const duration = 700;
  const start = performance.now();

  const step = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    window.scrollTo(0, from + (to - from) * easeOutQuint(t));
    active = t < 1 ? requestAnimationFrame(step) : 0;
  };

  active = requestAnimationFrame(step);
}
