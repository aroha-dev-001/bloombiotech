import Link from "next/link";
import { fieldCases } from "@/lib/cases";
import { FieldRecord } from "../field/FieldRecord";
import { SectionHead } from "../SectionHead";

/** Field records preview — the first record in full, the rest behind a link. */
export function FieldStories() {
  const [first] = fieldCases;

  return (
    <section id="field" data-tone="bone" className="band">
      <div className="shell">
        <SectionHead
          index="05"
          kicker="In the field"
          title="Bloom Biotech in the field."
          lede="Records from actual applications, crop by crop. The frame is built and the packs are real — the observations are collected from growers before anything is printed here."
        />

        <div className="mt-12">
          <FieldRecord record={first} index={0} />
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-6" data-rv>
          <Link href="/field" className="btn btn-primary">
            All field records
            <span className="arw" aria-hidden>
              →
            </span>
          </Link>
          <p className="meta max-w-[42ch] text-[0.7rem] leading-relaxed">
            {fieldCases.length} records open. Bracketed fields are placeholders,
            not findings — nothing is published as a result until a grower has
            signed it off.
          </p>
        </div>
      </div>
    </section>
  );
}
