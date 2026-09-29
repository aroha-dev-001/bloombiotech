"use client";

import { useEffect, useRef } from "react";
import { PackStrip, centreInStrip } from "@/components/products/PackShow";

/**
 * The strip on a product page: every name a link, and the page's own name
 * scrolled into the middle on arrival, so the twelfth pack's page does not
 * open with its name out of sight past the edge.
 */
export function PackStripNav({ active }: { active: number }) {
  const strip = useRef<HTMLElement>(null);

  useEffect(() => {
    centreInStrip(strip.current, active);
  }, [active]);

  return <PackStrip active={active} label="Every product" stripRef={strip} />;
}
