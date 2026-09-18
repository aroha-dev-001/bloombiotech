import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { fieldCases } from "@/lib/cases";
import { FieldRecord } from "@/components/field/FieldRecord";
import { BeforeAfter } from "@/components/field/BeforeAfter";
import { Button } from "@/components/Button";
import { site, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "In the field",
  description:
    "Field records from Bloom Biotech applications, crop by crop. Structure published; observations collected from growers before anything is printed.",
};

export default function FieldPage() {
  return (
    <>
      <header
        data-tone="dark"
        className="relative isolate overflow-hidden pt-[calc(var(--nav-h)+3rem)] pb-16"
      >
        <Image
          src="/plant/aerial-fields.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover opacity-35"
        />
        <div className="hero-veil -z-10" />
        <div className="shell">
          <p className="eyebrow">
            <span className="eyebrow-accent">In the field</span>
            <span className="mx-2 opacity-40">/</span>
            {fieldCases.length} records open
          </p>
          <h1 className="display d-hero mt-6 max-w-[14ch]">
            Bloom Biotech in the field.
          </h1>
          <p className="lede mt-8">
            A record per crop: the challenge, the pack, the route, the duration
            and what the grower observed. The frame is published here before the
            findings are, so nothing gets rounded up on the way in.
          </p>
        </div>
      </header>

      <section data-tone="light" className="band-tight">
        <div className="shell">
          <div className="note-caution" data-rv>
            <p className="eyebrow">How to read these</p>
            <p className="prose-body mt-2 max-w-[74ch] text-[0.92rem]">
              Fields in square brackets are <strong>placeholders, not
              findings</strong>. Bloom publishes no trial data, no yield
              percentages and no farmer testimonials that it has not collected
              and verified. Packs named on a record are real packs indicated for
              that crop; the observation columns fill in as growers report back.
            </p>
          </div>
        </div>
      </section>

      {fieldCases.map((record, i) => (
        <section
          key={record.slug}
          id={record.slug}
          data-tone={i % 2 === 0 ? "bone" : "light"}
          className="band-tight"
        >
          <div className="shell">
            <FieldRecord record={record} index={i} />
          </div>
        </section>
      ))}

      {/* ------------------------------------------ comparison, when ready */}
      <section data-tone="carbon" className="band">
        <div className="shell grid gap-10 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-16">
          <div>
            <p className="eyebrow" data-rv>
              <span className="eyebrow-accent">Comparison</span>
              <span className="mx-2 opacity-40">/</span>
              Before and after
            </p>
            <h2 className="display d-1 mt-6" data-rv>
              Side by side, when the photographs exist.
            </h2>
            <p className="lede mt-6" data-rv>
              Each record carries a wipe comparison between the same frame
              before and after an application. It stays marked as pending until
              both photographs come from the same plot, the same angle and the
              same grower.
            </p>
            <div className="mt-8 flex flex-wrap gap-3" data-rv>
              <Button href={whatsappUrl("Hello Bloom Biotech, I have field photographs from my plot to share. Crop: ")}>
                Send us your plot
              </Button>
            </div>
          </div>
          <div data-rv>
            <BeforeAfter
              before={{ src: null, alt: "", label: "Before" }}
              after={{ src: null, alt: "", label: "After" }}
              ratio="16 / 10"
            />
          </div>
        </div>
      </section>

      <section data-tone="light" className="band-tight">
        <div className="shell flex flex-wrap items-end justify-between gap-8">
          <div>
            <h2 className="display d-2 max-w-[20ch]">
              Growing one of these crops?
            </h2>
            <p className="lede mt-4">
              Start from the finder, or send the plant your crop and acreage on{" "}
              {site.phoneDisplay}.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/solutions#finder" className="btn btn-primary">
              Find the right product
              <span className="arw" aria-hidden>
                →
              </span>
            </Link>
            <Link href="/enquire?audience=farmer" className="btn btn-ghost">
              Talk to an expert
              <span className="arw" aria-hidden>
                →
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
