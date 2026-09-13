"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};

/** True only after hydration. */
export function useMounted() {
  return useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
}
