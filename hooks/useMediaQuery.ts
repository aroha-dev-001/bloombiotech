"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Media query as an external store, so there is no state-set-in-effect and no
 * double render on mount. Server and first paint always get `false`.
 */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}
