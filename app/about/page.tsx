import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { plant } from "@/lib/plant";
import { Origin } from "@/components/about/Origin";
import { Capabilities } from "@/components/about/Capabilities";
import { Assurance } from "@/components/about/Assurance";
import { ProcessSteps } from "@/components/about/ProcessSteps";
import { Split } from "@/components/motion/Split";

export const metadata: Metadata = {
  title: "About Bloom",
  description:
    "Bloom Biotech, Chikkamagaluru: an agri-biotech company in technological collaboration with ICAR-IIHR since 2013.",
};

export default function AboutPage() {
  return (
    <>
      <header data-tone="dark" className="pg-hero">
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
          <Split
            as="h1"
            text="Growing microbes in Chikkamagaluru since 2013."
            className="display pg-title"
          />
          <p className="pg-lede" data-rv style={{ ["--rv-d" as string]: "240ms" }}>
            An agri-biotech company working with ICAR-IIHR, making licensed
            microbial inputs at our own unit.
          </p>
        </div>
      </header>

      <Origin />

      {/* From culture to pack: five steps, a picture and a line each. */}
      <section id="process" data-tone="bone" className="pg-band">
        <div className="shell">
          <div className="pg-head">
            <h2 className="display pg-h2">From culture to pack.</h2>
            <p className="pg-note">What is licensed, what is grown, and what is printed on the label.</p>
          </div>
          <ProcessSteps />
        </div>
      </section>

      <Capabilities />
      <Assurance />

      <section data-tone="light" className="pg-band">
        <div className="shell ab-where">
          <div>
            <h2 className="display pg-h2" data-rv>
              Where it is made.
            </h2>
            <div className="pg-btns mt-5" data-rv>
              <Link href={site.maps} className="btn btn-ghost">
                Google Maps
              </Link>
              <Link href="/gallery" className="btn btn-ghost">
                See the plant
              </Link>
            </div>
          </div>

          <dl className="pk-spec" data-rv>
            <div data-wide>
              <dt>Production unit</dt>
              <dd>{plant.unitAddress}</dd>
            </div>
            <div data-wide>
              <dt>Office</dt>
              <dd>{site.addressLines.join(", ")}</dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>
                <a href={`tel:+91${site.phone}`}>{site.phoneDisplay}</a>
              </dd>
            </div>
            <div data-wide>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </dd>
            </div>
            <div>
              <dt>GSTIN</dt>
              <dd>{plant.gstin}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section data-tone="carbon" className="pg-band">
        <div className="shell pg-cta">
          <h2 className="display pg-h2">Every pack is quoted from this address.</h2>
          <div className="pg-cta-actions">
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
