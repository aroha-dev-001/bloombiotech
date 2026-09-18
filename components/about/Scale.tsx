import { CountUp } from "../CountUp";
import { products } from "@/lib/products";
import { site } from "@/lib/site";

const cells = [
  {
    index: "01",
    value: <span className="count">2013</span>,
    label: "Production since",
    note: "The year Bloom Biotech licensed AMC and Arka Fermented Cocopeat — a first for India.",
  },
  {
    index: "02",
    value: <CountUp value={3} />,
    label: "IIHR technologies licensed",
    note: "Arka Microbial Consortium, Arka Actino Consortium and Arka Fermented Cocopeat.",
  },
  {
    index: "03",
    value: <CountUp value={products.length} />,
    label: "Packs in the catalogue",
    note: "Consortia, biocontrol, compost culture and the imported nutrition line.",
  },
  {
    index: "04",
    value: <CountUp value={Number(site.googleRating)} decimals={1} />,
    label: "Google rating",
    note: `From ${site.googleReviews} reviews. The only rating we have on file, and the only one printed here.`,
  },
];

export function Scale() {
  return (
    <section data-tone="bone" className="band-tight border-y border-[var(--line)]">
      <div className="shell">
        <ul className="grid gap-px bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-4">
          {cells.map((c, i) => (
            <li
              key={c.index}
              className="bg-[var(--bg)] px-1 py-8 sm:px-6"
              data-rv
              style={{ ["--rv-d" as string]: `${i * 70}ms` }}
            >
              <p className="eyebrow">
                <span className="eyebrow-accent">{c.index}</span>
                <span className="mx-2 opacity-40">/</span>
                {c.label}
              </p>
              <p className="display mt-5 text-[clamp(2.6rem,5vw,4rem)] leading-none">
                {c.value}
              </p>
              <p className="prose-body mt-4 max-w-[28ch] text-[0.85rem]">{c.note}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
