import Image from "next/image";
import Link from "next/link";
import { Split } from "@/components/motion/Split";

/**
 * The company in one screen: a statement, a photograph of the unit, and a way
 * through. Everything else about Bloom lives on /about.
 */
export function Intro() {
  return (
    <section id="intro" data-tone="light" className="band">
      <div className="shell grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] lg:items-center lg:gap-20">
        <div>
          <Split as="h2" text="Licensed biology, made where it is used." className="display d-1 max-w-[14ch]" />
          <p className="lede lede-wide mt-8" data-rv style={{ ["--rv-d" as string]: "80ms" }}>
            Bloom Biotech was the first company in India to licence Arka
            Microbial Consortium from ICAR-IIHR. We have been fermenting it in
            Chikkamagaluru since 2013 — the same coffee country our growers farm.
          </p>
          <div className="mt-10 flex flex-wrap gap-3" data-rv style={{ ["--rv-d" as string]: "140ms" }}>
            <Link href="/about" className="btn btn-ghost">
              About Bloom
              <span className="arw" aria-hidden>
                →
              </span>
            </Link>
            <Link href="/gallery" className="btn btn-ghost">
              Inside the plant
            </Link>
          </div>
        </div>

        <figure className="frame aspect-[4/5]" data-rv="mask">
          <Image
            src="/plant/aerial-wide.jpg"
            alt="The Bloom Biotech production unit in Beekanahalli Village, Chikkamagaluru, seen from the air"
            fill
            sizes="(min-width: 1024px) 30rem, 100vw"
            className="object-cover"
          />
        </figure>
      </div>
    </section>
  );
}
