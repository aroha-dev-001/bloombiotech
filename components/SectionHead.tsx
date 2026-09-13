import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHead({
  index,
  kicker,
  title,
  lede,
  aside,
  className,
}: {
  index: string;
  kicker: string;
  title: ReactNode;
  lede?: ReactNode;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("sec-head", className)} data-rv>
      <p className="eyebrow">
        <span className="eyebrow-accent">§{index}</span>
        <span className="mx-2 opacity-40">/</span>
        {kicker}
      </p>
      <div>
        <h2 className="display d-1 max-w-[18ch]">{title}</h2>
        {lede ? <p className="lede mt-6">{lede}</p> : null}
        {aside ? <div className="mt-8">{aside}</div> : null}
      </div>
    </div>
  );
}
