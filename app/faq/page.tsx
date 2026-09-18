import type { Metadata } from "next";
import Link from "next/link";
import { FAQAccordion } from "@/components/FAQAccordion";
import { faqGroups } from "@/lib/faq";
import { articles } from "@/lib/articles";
import { site, telHref, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Questions",
  description:
    "Dose, mixing, storage, AMC and the IIHR licences, and how dealers and distributors reach Bloom Biotech in Chikkamagaluru.",
};

export default function FaqPage() {
  return (
    <>
      <header data-tone="dark" className="pt-[calc(var(--nav-h)+3rem)] pb-14">
        <div className="shell">
          <p className="eyebrow">
            <span className="eyebrow-accent">Questions</span>
            <span className="mx-2 opacity-40">/</span>
            {faqGroups.flatMap((g) => g.items).length} answered
          </p>
          <h1 className="display d-hero mt-6 max-w-[14ch]">
            What the plant gets asked.
          </h1>
          <p className="lede mt-8">
            Dose and mixing always follow the label on the pack in your hand.
            Where this page and the pack disagree, the pack wins.
          </p>
          <nav aria-label="Sections" className="mt-10 flex flex-wrap gap-2">
            {faqGroups.map((g) => (
              <a key={g.id} href={`#${g.id}`} className="chip">
                {g.title}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {faqGroups.map((group, i) => (
        <section
          key={group.id}
          id={group.id}
          data-tone={i % 2 === 0 ? "light" : "bone"}
          className="band-tight"
        >
          <div className="shell grid gap-10 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:gap-16">
            <div className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)] lg:self-start">
              <p className="eyebrow" data-rv>
                <span className="eyebrow-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mx-2 opacity-40">/</span>
                {group.items.length} question
                {group.items.length === 1 ? "" : "s"}
              </p>
              <h2 className="display d-2 mt-5" data-rv>
                {group.title}
              </h2>
              <p className="prose-body mt-4 text-[0.92rem]" data-rv>
                {group.note}
              </p>
            </div>
            <div data-rv>
              <FAQAccordion items={group.items.map(({ q, a }) => ({ q, a }))} />
            </div>
          </div>
        </section>
      ))}

      <section data-tone="carbon" className="band">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-16">
          <div>
            <h2 className="display d-1 max-w-[16ch]" data-rv>
              Still not answered?
            </h2>
            <p className="lede mt-6" data-rv>
              Ask Bloom AI, bottom right — it answers from these same notes and
              will not invent a price. Or reach the plant directly during
              working hours.
            </p>
            <div className="mt-9 flex flex-wrap gap-3" data-rv>
              <a href={whatsappUrl()} className="btn btn-primary">
                WhatsApp the plant
                <span className="arw" aria-hidden>
                  →
                </span>
              </a>
              <a href={telHref()} className="btn btn-ghost">
                {site.phoneDisplay}
                <span className="arw" aria-hidden>
                  →
                </span>
              </a>
              <Link href="/solutions#finder" className="btn btn-ghost">
                Find the right product
                <span className="arw" aria-hidden>
                  →
                </span>
              </Link>
            </div>
          </div>

          <div data-rv>
            <p className="eyebrow">Field notes</p>
            <ul className="mt-5 space-y-4">
              {articles.slice(0, 4).map((a) => (
                <li key={a.slug}>
                  <Link href={`/journal/${a.slug}`} className="group block">
                    <span className="meta text-[0.66rem]">{a.date}</span>
                    <span className="mt-1 block text-[0.95rem] leading-snug transition-colors group-hover:text-[var(--accent)]">
                      {a.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/journal" className="link mt-7">
              All notes <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
