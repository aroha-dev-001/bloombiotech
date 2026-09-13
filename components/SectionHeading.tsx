export function SectionHeading({
  kicker,
  title,
  lede,
  tone = "light",
}: {
  kicker: string;
  title: string;
  lede?: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div className="max-w-2xl">
      <p
        className={`font-mono text-[10px] uppercase tracking-[0.22em] ${dark ? "text-lime" : "text-muted"}`}
      >
        {kicker}
      </p>
      <h2 className={`mt-2 font-serif text-3xl md:text-4xl ${dark ? "text-paper" : "text-forest"}`}>
        {title}
      </h2>
      {lede ? (
        <p className={`mt-3 text-base leading-relaxed md:text-lg ${dark ? "text-paper/75" : "text-muted"}`}>
          {lede}
        </p>
      ) : null}
    </div>
  );
}
