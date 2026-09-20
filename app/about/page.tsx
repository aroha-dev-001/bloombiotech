import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { plant } from "@/lib/plant";
import { Origin } from "@/components/about/Origin";
import { Capabilities } from "@/components/about/Capabilities";
import { Assurance } from "@/components/about/Assurance";

export const metadata: Metadata = {
  title: "About Bloom",
  description:
    "Bloom Biotech, Chikkamagaluru: an agri-biotech company in technological collaboration with ICAR-IIHR since 2013.",
};

export default function AboutPage() {
  return (
    <>
      <header
        data-tone="dark"
        className="relative isolate flex min-h-[70svh] items-end overflow-hidden pt-[calc(var(--nav-h)+5rem)] pb-20"
      >
        <Image
          src="/film/factory-aerial.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="hero-veil -z-10" />
        <div className="grain" aria-hidden />
        <div className="shell">
          <h1 className="display d-hero max-w-[13ch]">
            Growing microbes in Chikkamagaluru since 2013.
          </h1>
          <p className="lede lede-wide mt-8">
            An agri-biotechnology company in technological collaboration with
            ICAR-IIHR, making licensed microbial inputs at its own unit in
            Chikkamagaluru.
          </p>
        </div>
      </header>

      <Origin />
      <Capabilities />
      <Assurance />

      <section data-tone="light" className="band">
        <div className="shell grid gap-14 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-20">
          <div>
            <h2 className="display d-1" data-rv>
              Where it is made.
            </h2>
            <div className="mt-10 flex flex-wrap gap-3" data-rv>
              <Link href={site.maps} className="btn btn-ghost">
                Google Maps
              </Link>
              <Link href="/gallery" className="btn btn-ghost">
                See the plant
              </Link>
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
          </dl>
        </div>
      </section>

      <section data-tone="carbon" className="band">
        <div className="shell flex flex-wrap items-end justify-between gap-10">
          <h2 className="display d-1 max-w-[16ch]">
            Every pack is quoted from this address.
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/solutions#find" className="btn btn-primary">
              Find your solution
              <span className="arw" aria-hidden>
                →
              </span>
            </Link>
            <Link href="/enquire" className="btn btn-ghost">
              Contact
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
