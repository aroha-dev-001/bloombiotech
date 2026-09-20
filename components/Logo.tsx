import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  priority?: boolean;
  tone?: "light" | "dark";
  /** Symbol only, no wordmark. */
  markOnly?: boolean;
};

/**
 * Brand lockup: the Bloom tree mark beside a typeset wordmark, so the logo
 * holds up on video, on near-black and on bone without a white chip.
 */
export function Logo({ className, priority, tone = "light", markOnly }: Props) {
  const dark = tone === "dark";
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src="/brand/mark.png"
        alt=""
        width={286}
        height={356}
        priority={priority}
        className="h-full w-auto"
        style={dark ? { filter: "saturate(1.15) brightness(1.2)" } : undefined}
        aria-hidden
      />
      {markOnly ? (
        <span className="sr-only">Bloom Biotech</span>
      ) : (
        /* The wordmark alone. The "Green Biotechnology" line that used to sit
           under it set at 7px — decoration too small to read, on every page. */
        <span
          className="display text-[1.05rem] leading-none tracking-[-0.02em] sm:text-[1.2rem]"
          style={{ color: dark ? "var(--bone)" : "var(--ink)" }}
        >
          Bloom Biotech
        </span>
      )}
    </span>
  );
}
