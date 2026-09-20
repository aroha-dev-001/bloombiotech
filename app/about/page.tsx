import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { plant } from "@/lib/plant";
import { Button } from "@/components/Button";
import { Origin } from "@/components/about/Origin";
import { Scale } from "@/components/about/Scale";
import { Capabilities } from "@/components/about/Capabilities";
import { Assurance } from "@/components/about/Assurance";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Bloom",
  description:
    "Bloom Biotech, Chikkamagaluru: an agri-biotech company in technological collaboration with ICAR-IIHR since 2013. The company, the numbers, the capability and the assurances.",
};

/**
 * The company in full: who Bloom is, what the numbers are, what the unit can
 * make, and what is printed on every pack. These four sections used to sit on
 * the homepage; they belong here, where someone is actually asking.
 */
export default function AboutPage() {
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
          className="-z-10 object-cover opacity-40"
        />
        <div className="hero-veil -z-10" />
        <div className="grain" aria-hidden />
        <div className="shell">
          <p className="eyebrow">
            <span className="eyebrow-accent">Company</span>
            <span className="mx-2 opacity-40">/</span>
            Since 2013
          </p>
          <h1 className="display d-hero mt-6 max-w-[14ch]">
            A licence, a lab and a shed in coffee land.
          </h1>
          <p className="lede mt-8">
            Bloom Biotech is an agri-biotechnology company in technological
            collaboration with the Indian Institute of Horticultural Research,
            producing licensed microbial inputs at its own unit in
            Chikkamagaluru.
          </p>
        </div>
      </header>

      <Origin />
      <Scale />
      <Capabilities />
      <Assurance />

      {/* --------------------------------------------------- the addresses */}
      <section data-tone="light" className="band">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
          <div>
            <p className="eyebrow" data-rv>
              <span className="eyebrow-accent">§04</span>
              <span className="mx-2 opacity-40">/</span>
              On record
            </p>
            <h2 className="display d-1 mt-6" data-rv>
              Where it is made.
            </h2>
            <p className="lede mt-6" data-rv>
              One production unit, one office, one desk that quotes every pack.
            </p>
            <div className="mt-8 flex flex-wrap gap-3" data-rv>
              <Button href={site.maps} variant="ghost">
                Google Maps
              </Button>
              <Button href="/gallery" variant="ghost">
                See the plant
              </Button>
            </div>
          </div>

          <dl className="spec" data-rv>
            <div>
              <dt>Production unit</dt>
              <dd>{plant.unitAddress}</dd>
            </div>
            <div>
              <dt>Office</dt>
              <dd>{site.addressLines.join(", ")}</dd>
            </div>
            <div>
              <dt>GSTIN</dt>
              <dd>{plant.gstin}</dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>
                <a href={`tel:+91${site.phone}`}>{site.phoneDisplay}</a>
              </dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </dd>
            </div>
            <div>
              <dt>Hours</dt>
              <dd>{site.hours}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section data-tone="carbon" className="band-tight">
        <div className="shell flex flex-wrap items-center justify-between gap-6">
          <h2 className="display d-2 max-w-[20ch]">
            Every pack is quoted from this address.
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/solutions#finder" className="btn btn-primary">
              Find the right product
              <span className="arw" aria-hidden>
                →
              </span>
            </Link>
            <Link href="/enquire" className="btn btn-ghost">
              Contact Bloom
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
