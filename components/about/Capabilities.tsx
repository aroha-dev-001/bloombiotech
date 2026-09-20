import { capabilities } from "@/lib/plant";
import { SectionHead } from "../SectionHead";

export function Capabilities() {
  return (
    <section id="capability" data-tone="light" className="band">
      <div className="shell">
        <SectionHead
          title="What the unit can make."
          lede="Six capabilities, each tied to packs you can hold."
        />

        <ul className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c, i) => (
            <li
              key={c.index}
              className="rounded-[var(--r-lg)] border border-[var(--line)] p-7 transition-colors duration-500 hover:border-[color-mix(in_srgb,var(--brand)_50%,transparent)] md:p-9"
              data-rv
              style={{ ["--rv-d" as string]: `${i * 60}ms` }}
            >
              <h3 className="display d-3">{c.title}</h3>
              <p className="prose-body mt-4">{c.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
