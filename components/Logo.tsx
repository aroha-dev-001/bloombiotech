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
        <span className="flex flex-col justify-center leading-none">
          <span
            className="display text-[0.98rem] tracking-[-0.02em] sm:text-[1.1rem]"
            style={{ color: dark ? "var(--bone)" : "var(--ink)" }}
          >
            Bloom Biotech
          </span>
          <span
            className="mt-1 font-mono text-[0.46rem] uppercase tracking-[0.28em] sm:text-[0.5rem]"
            style={{ color: dark ? "var(--lime)" : "var(--leaf)" }}
          >
            Green Biotechnology
          </span>
        </span>
      )}
    </span>
  );
}
