import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** One heading, one optional line under it. No numbers, no labels. */
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
  return (
    <div className={cn("sec-head", className)} data-rv>
      <h2 className="display d-1 max-w-[16ch]">{title}</h2>
      {lede ? <p className="lede">{lede}</p> : null}
      {aside ? <div>{aside}</div> : null}
    </div>
  );
}
