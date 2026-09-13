import { CountUp } from "./CountUp";
import { products } from "@/lib/products";
import { site } from "@/lib/site";

const stats = [
  { kind: "num" as const, value: 5, decimals: 1, label: "Google rating", note: `${site.googleReviews} reviews` },
  { kind: "num" as const, value: products.length, decimals: 0, label: "Catalogue SKUs", note: "bio + biocontrol" },
  { kind: "text" as const, value: "IIHR", label: "AMC + ACT", note: "first AMC licence, India" },
  { kind: "text" as const, value: "2013", label: "Started", note: "Chikkamagaluru plant" },
];

export function StatsStrip() {
  return (
    <section aria-label="Plant facts" id="trust" className="border-y border-forest/10 bg-white/40">
      <div className="mx-auto grid max-w-6xl sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`px-5 py-6 ${i ? "border-t border-forest/10 sm:border-t-0 sm:border-l" : ""}`}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
              {String(i + 1).padStart(2, "0")} / {s.label}
            </p>
            <p className="mt-2 font-serif text-4xl tracking-tight text-forest">
              {s.kind === "num" ? (
                <CountUp value={s.value} decimals={s.decimals} />
              ) : (
                s.value
              )}
            </p>
            <p className="mt-1 text-sm text-muted">{s.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
