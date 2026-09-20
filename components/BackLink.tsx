"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSyncExternalStore } from "react";

/**
 * "Back" that actually goes back.
 *
 * A product opened from the homepage finder used to strand the reader: the
 * only link out went to /products, which is not where they came from, so the
 * way home was the logo. This returns to the previous page when there is one
 * in this session, and falls back to the catalogue otherwise — including
 * with no JavaScript, where it is a plain link.
 */
const subscribe = () => () => {};

/**
 * Did this visit arrive from somewhere else on the site?
 *
 * `document.referrer` alone is not enough: the App Router navigates on the
 * client, and a soft navigation never updates it — so arriving from the
 * catalogue still reported "no referrer" and the link stayed a dead end.
 *
 * The navigation timing entry keeps the URL the *document* was loaded at. If
 * the address has moved on since, this page was reached by a client-side
 * navigation and there is a real entry to go back to.
 */
function cameFromSite() {
  try {
    if (window.history.length <= 1) return false;

    const [nav] = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
    if (nav?.name && new URL(nav.name).pathname !== window.location.pathname) {
      return true;
    }

    // Full page load: fall back to a same-origin referrer.
    return (
      Boolean(document.referrer) &&
      new URL(document.referrer).origin === window.location.origin
    );
  } catch {
    return false;
  }
}

export function BackLink({
  fallback = "/products",
  fallbackLabel = "Catalogue",
}: {
  fallback?: string;
  fallbackLabel?: string;
}) {
  const router = useRouter();

  // Read once on the client, the same way the rest of the app reads
  // browser-only facts — no state set from an effect, and the server and
  // first paint always render the fallback label.
  const canGoBack = useSyncExternalStore(subscribe, cameFromSite, () => false);

  return (
    <Link
      href={fallback}
      className="link"
      onClick={(e) => {
        if (!canGoBack) return;
        e.preventDefault();
        router.back();
      }}
    >
      <span aria-hidden>←</span> {canGoBack ? "Back" : fallbackLabel}
    </Link>
  );
}
