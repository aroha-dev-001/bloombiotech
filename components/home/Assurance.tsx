import Image from "next/image";
import { assurances } from "@/lib/plant";

export function Assurance() {
  return (
    <section id="assurance" data-tone="carbon" className="band">
      <div className="shell grid gap-12 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-16">
        <div>
          <p className="eyebrow" data-rv>
            <span className="eyebrow-accent">§05</span>
            <span className="mx-2 opacity-40">/</span>
            Assurance
          </p>
          <h2 className="display d-1 mt-6" data-rv style={{ ["--rv-d" as string]: "60ms" }}>
            Read the label, not the brochure.
          </h2>
          <p className="lede mt-6" data-rv style={{ ["--rv-d" as string]: "120ms" }}>
            Everything a buyer needs to verify is printed on the pack in hand.
            Where the pack and the brochure disagree, the pack wins — that rule
            is ours, and we hold to it.
          </p>
          <figure className="frame frame-ticks mt-10 aspect-[4/5] max-w-sm" data-rv="mask">
            <Image
              src="/packs/can-blumonas.jpg"
              alt="Blumonas liquid Pseudomonas can showing batch number, manufacturing and expiry fields, net content and the organic marks"
              width={826}
              height={1100}
              sizes="(min-width: 1024px) 24rem, 100vw"
              className="object-cover"
            />
            <figcaption className="eyebrow absolute bottom-0 left-0 bg-[color-mix(in_srgb,var(--void)_72%,transparent)] px-3 py-2 backdrop-blur-sm">
              Batch · Mfg · Exp · MRP · Net content
            </figcaption>
          </figure>
        </div>

        <dl className="grid content-start gap-px bg-[var(--line)] sm:grid-cols-2">
          {assurances.map((a, i) => (
            <div
              key={a.label}
              className="bg-[var(--bg)] p-6 md:p-8"
              data-rv
              style={{ ["--rv-d" as string]: `${i * 50}ms` }}
            >
              <dt className="eyebrow">{a.label}</dt>
              <p className="display d-3 mt-4 text-[var(--accent)]">{a.value}</p>
              <dd className="prose-body mt-3 text-[0.92rem]">{a.note}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
