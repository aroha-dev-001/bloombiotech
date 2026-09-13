import { capabilities } from "@/lib/plant";
import { SectionHead } from "../SectionHead";

export function Capabilities() {
  return (
    <section id="capability" data-tone="bone" className="band">
      <div className="shell">
        <SectionHead
          index="04"
          kicker="Capability"
          title="What the unit can actually make."
          lede="Six production capabilities, each tied to packs you can hold. No capacity figures are published here because none are printed anywhere we can cite."
        />

        <ul className="mt-14 grid gap-px bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c, i) => (
            <li
              key={c.index}
              className="group bg-[var(--bg)] p-6 transition-colors duration-500 hover:bg-[color-mix(in_srgb,var(--brand)_7%,var(--bg))] md:p-8"
              data-rv
              style={{ ["--rv-d" as string]: `${i * 60}ms` }}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="eyebrow eyebrow-accent">{c.index}</span>
                <span
                  className="h-8 w-px bg-[var(--line)] transition-colors duration-500 group-hover:bg-[var(--brand)]"
                  aria-hidden
                />
              </div>
              <h3 className="display d-3 mt-6">{c.title}</h3>
              <p className="prose-body mt-4 text-[0.95rem]">{c.body}</p>
              <ul className="mt-6 flex flex-wrap gap-1.5">
                {c.meta.map((m) => (
                  <li key={m} className="tag">
                    {m}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
