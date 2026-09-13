import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { plant, capabilities } from "@/lib/plant";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "The plant",
  description:
    "Bloom Biotech, Chikkamagaluru: an agri-biotech company in technological collaboration with ICAR-IIHR since 2013.",
};

export default function AboutPage() {
  return (
    <>
      <header data-tone="dark" className="relative isolate overflow-hidden pt-[calc(var(--nav-h)+3rem)] pb-16">
        <Image
          src="/plant/aerial-fields.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover opacity-40"
        />
        <div className="hero-veil -z-10" />
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

      <section data-tone="light" className="band">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-16">
          <div className="max-w-[58ch] space-y-6 prose-body text-[1.05rem]">
            <p>
              The company started its journey in 2013 by becoming the{" "}
              <strong>first company in India to license Arka Microbial
              Consortium (AMC) and Arka Fermented Cocopeat</strong> technologies
              from IIHR.
            </p>
            <p>
              Through work across Karnataka in partnership with IIHR scientists,
              AMC has been accepted by farmers as an integral part of crop
              protection management in commercial crops such as pomegranate,
              black pepper and floriculture. In 2015 Bloom Biotech was again the
              first company in India to license{" "}
              <strong>Arka Actino Consortium (ACT)</strong> from IIHR.
            </p>
            <p>
              Today there is a state-of-the-art production facility in coffee
              land, Chikkmagalur, to meet the quality requirement of farmers and
              planters. The aim is to provide high quality biotechnology products
              and technical assistance to farmers,{" "}
              <strong>to produce more for less</strong>.
            </p>
            <p className="border-l-2 border-[var(--brand)] pl-5 text-[var(--fg)]">
              “For us at Bloom Biotech innovation, dedication to quality and
              simplicity is not a goal but way of life.”
            </p>
            <p className="meta">Company brochure, About Us</p>
          </div>

          <div className="grid gap-6">
            <figure className="frame zoomer aspect-[3/2] lg:aspect-[4/5]" data-rv="mask">
              <Image
                src="/photos/founders.jpg"
                alt="The founders of Bloom Biotech"
                width={766}
                height={913}
                sizes="(min-width: 1024px) 26rem, 100vw"
                className="object-cover object-[50%_22%] lg:object-[50%_35%]"
              />
            </figure>
            <dl className="spec spec-tight">
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
            <div className="flex flex-wrap gap-3">
              <Button href={site.maps} variant="ghost">
                Google Maps
              </Button>
              <Button href="/gallery" variant="ghost">
                Film room
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section data-tone="bone" className="band">
        <div className="shell">
          <p className="eyebrow" data-rv>
            Capability
          </p>
          <h2 className="display d-1 mt-6 max-w-[16ch]" data-rv>
            What runs inside the unit.
          </h2>
          <ul className="mt-12 grid gap-px bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c) => (
              <li key={c.index} className="bg-[var(--bg)] p-7" data-rv>
                <span className="eyebrow eyebrow-accent">{c.index}</span>
                <h3 className="display d-3 mt-5">{c.title}</h3>
                <p className="prose-body mt-3 text-[0.92rem]">{c.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section data-tone="carbon" className="band-tight">
        <div className="shell flex flex-wrap items-center justify-between gap-6">
          <h2 className="display d-2 max-w-[20ch]">
            Every pack is quoted from this address.
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/enquire" className="btn btn-primary">
              Request a quote
              <span className="arw" aria-hidden>
                →
              </span>
            </Link>
            <Link href="/products" className="btn btn-ghost">
              Catalogue
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
