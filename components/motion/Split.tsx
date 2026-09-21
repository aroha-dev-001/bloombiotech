
/**
 * A heading that arrives a word at a time, each one rising from behind its own
 * mask.
 *
 * The reference for this pass does it with SplitType and GSAP. Neither is
 * needed: splitting a string is pure work, so this stays a server component
 * and ships no JavaScript at all. The words sit in overflow-hidden boxes and
 * CSS moves them; the class that starts it is added by the one
 * IntersectionObserver already running in MotionRoot, so nothing new observes
 * the page either.
 *
 * Takes a plain string rather than children, because it has to be able to
 * split the text. Headings that carry markup — the hero's rotating crop, a
 * link inside a line — keep the ordinary `data-rv` fade.
 */
type Tag = "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";

export function Split({
  as = "h2",
  text,
  className,
  delay = 0,
  /** Per-word stagger. Long headings want less, or the tail drags. */
  step,
}: {
  as?: Tag;
  text: string;
  className?: string;
  delay?: number;
  step?: number;
}) {
  const El = as;
  // Keeps the whitespace as its own entry so the line still wraps naturally.
  const parts = text.split(/(\s+)/);
  const gap = step ?? (parts.length > 18 ? 26 : 45);

  let word = 0;
  return (
    <El
      className={className}
      data-rv="split"
      style={{ ["--rv-d" as string]: `${delay}ms`, ["--sw-step" as string]: `${gap}ms` }}
    >
      {parts.map((part, i) => {
        if (!part.trim()) return part;
        const n = word++;
        return (
          <span key={i} className="sw">
            <span className="sw-i" style={{ ["--i" as string]: n }}>
              {part}
            </span>
          </span>
        );
      })}
    </El>
  );
}
