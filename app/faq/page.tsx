import type { Metadata } from "next";
import Link from "next/link";
import { FAQAccordion } from "@/components/FAQAccordion";
import { faqs } from "@/lib/faq";
import { site, telHref, whatsappUrl } from "@/lib/site";
import { Split } from "@/components/motion/Split";

export const metadata: Metadata = {
  title: "Questions",
  description:
    "Choosing a pack, applying it, mixing, price and storage — the questions Bloom Biotech is asked most.",
};

export default function FaqPage() {
  return (
    <>
      <header data-tone="light" className="pt-[calc(var(--nav-h)+5rem)] pb-20">
        <div className="shell">
          <Split as="h1" text="Questions." className="display d-hero max-w-[14ch]" />
          <p className="lede lede-wide mt-8" data-rv style={{ ["--rv-d" as string]: "240ms" }}>
            Where this page and the label on your pack disagree, the pack wins.
          </p>
        </div>
      </header>

      <section data-tone="light" className="band">
        <div className="shell max-w-4xl" data-rv>
          <FAQAccordion items={[...faqs]} />
        </div>
      </section>

      <section data-tone="carbon" className="band">
        <div className="shell">
          <h2 className="display d-1 max-w-[14ch]" data-rv>
            Still not answered?
          </h2>
          <p className="lede lede-wide mt-8" data-rv>
            Reach the plant directly during working hours.
          </p>
          <div className="mt-12 flex flex-wrap gap-3" data-rv>
            <a href={whatsappUrl()} className="btn btn-primary">
              WhatsApp
              <span className="arw" aria-hidden>
                →
              </span>
            </a>
            <a href={telHref()} className="btn btn-ghost">
              {site.phoneDisplay}
            </a>
            <Link href="/solutions#find" className="btn btn-ghost">
              Find your solution
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
