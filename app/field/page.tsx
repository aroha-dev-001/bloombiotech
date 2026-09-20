import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { fieldCases } from "@/lib/cases";
import { FieldRecord } from "@/components/field/FieldRecord";
import { BeforeAfter } from "@/components/field/BeforeAfter";
import { Button } from "@/components/Button";
import { whatsappUrl } from "@/lib/site";

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
        className="relative isolate flex min-h-[60svh] items-end overflow-hidden pt-[calc(var(--nav-h)+5rem)] pb-20"
      >
        <Image
          src="/farm/plantation.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="hero-veil -z-10" />
        <div className="shell">
          <h1 className="display d-hero max-w-[13ch]">In the field.</h1>
          <p className="lede lede-wide mt-8">
            A record per crop: the challenge, the pack, the route and what the
            grower saw. We publish the frame before the findings.
          </p>
        </div>
      </header>

      <section data-tone="light" className="band-tight">
        <div className="shell">
          <div className="note-caution" data-rv>
            <p className="prose-body max-w-[70ch]">
              Fields in square brackets are <strong>placeholders, not
              findings</strong>. We publish nothing as a result until a grower
              has reported it and signed it off.
            </p>
          </div>
        </div>
      </section>

      {fieldCases.map((record, i) => (
        <section
          key={record.slug}
          id={record.slug}
          data-tone={i % 2 === 0 ? "bone" : "light"}
          className="band"
        >
          <div className="shell">
            <FieldRecord record={record} />
          </div>
        </section>
      ))}

      {/* ------------------------------------------ comparison, when ready */}
      <section data-tone="bone" className="band">
        <div className="shell grid gap-10 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-16">
          <div>
            <h2 className="display d-1" data-rv>
              Side by side, when the photographs exist.
            </h2>
            <p className="lede lede-wide mt-8" data-rv>
              Both frames have to come from the same plot, the same angle and
              the same grower.
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

      <section data-tone="light" className="band">
        <div className="shell flex flex-wrap items-end justify-between gap-10">
          <h2 className="display d-1 max-w-[16ch]">Growing one of these crops?</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/solutions#find" className="btn btn-primary">
              Find your solution
              <span className="arw" aria-hidden>
                →
              </span>
            </Link>
            <Link href="/enquire" className="btn btn-ghost">
              Talk to us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
