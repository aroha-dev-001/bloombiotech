import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Split } from "./motion/Split";

/**
 * One heading, one optional line under it. No numbers, no labels.
 *
 * A plain-string title is typeset a word at a time; the block itself then does
 * not fade, because a block fading while its own words rise out of it is two
 * animations doing one job. A title carrying markup keeps the ordinary fade.
 */
export function SectionHead({
  title,
  lede,
  aside,
  className,
}: {
  title: ReactNode;
  lede?: ReactNode;
  aside?: ReactNode;
  className?: string;
}) {
  const splittable = typeof title === "string";

  return (
    <div className={cn("sec-head", className)} data-rv={splittable ? undefined : ""}>
      {splittable ? (
        <Split as="h2" text={title} className="display d-1 max-w-[16ch]" />
      ) : (
        <h2 className="display d-1 max-w-[16ch]">{title}</h2>
      )}
      {lede ? (
        <p className="lede" data-rv={splittable ? "" : undefined} style={{ ["--rv-d" as string]: "220ms" }}>
          {lede}
        </p>
      ) : null}
      {aside ? (
        <div data-rv={splittable ? "" : undefined} style={{ ["--rv-d" as string]: "300ms" }}>
          {aside}
        </div>
      ) : null}
    </div>
  );
}
