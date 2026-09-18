import Link from "next/link";
import { site, telHref, whatsappUrl } from "@/lib/site";

/**
 * Four doors instead of one "request a quote". Bloom's visitors are not one
 * audience: a grower wants a pack, a dealer wants a board list, a distributor
 * wants territory, everyone else wants the company.
 */
const paths = [
  {
    who: "For farmers",
    title: "Find the right product",
    body: "Answer three questions — crop, problem, how you apply it — and see the packs Bloom makes for it.",
    cta: "Open the finder",
    href: "/solutions#finder",
    external: false,
  },
  {
    who: "For dealers",
    title: "Become a dealer",
    body: "Ask for the current board list and the commercial names. Carrier and liquid lines are quoted from the plant.",
    cta: "Dealer enquiry",
    href: "/enquire?audience=dealer",
    external: false,
  },
  {
    who: "For distributors",
    title: "Distribution enquiry",
    body: "Territory, portfolio and the IIHR licence position. Start with the crops and districts you already cover.",
    cta: "Distribution enquiry",
    href: "/enquire?audience=distributor",
    external: false,
  },
  {
    who: "For everyone else",
    title: "Contact Bloom",
    body: `Chikkamagaluru, ${site.hours.toLowerCase()}. WhatsApp is the fastest route during working hours.`,
    cta: "Contact the plant",
    href: "/enquire?audience=general",
    external: false,
  },
] as const;

export function Pathways() {
  return (
    <section id="pathways" data-tone="light" className="band">
      <div className="shell">
        <div className="sec-head" data-rv>
          <p className="eyebrow">
            <span className="eyebrow-accent">§07</span>
            <span className="mx-2 opacity-40">/</span>
            Take action
          </p>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="display d-1 max-w-[15ch]">
              Four doors into the same plant.
            </h2>
            <p className="lede max-w-[34ch]">
              There is no price list and no checkout. Tell us who you are and
              what you grow or sell, and Chikkamagaluru answers with a route, a
              pack and a quote.
            </p>
          </div>
        </div>

        <div className="path-grid mt-14">
          {paths.map((p, i) => (
            <Link
              key={p.title}
              href={p.href}
              className="path-card"
              data-rv
              style={{ ["--rv-d" as string]: `${i * 70}ms` }}
            >
              <p className="eyebrow eyebrow-accent">{p.who}</p>
              <h3 className="display d-3">{p.title}</h3>
              <p className="prose-body text-[0.92rem]">{p.body}</p>
              <p className="path-card-go">
                {p.cta}
                <span aria-hidden>→</span>
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3" data-rv>
          <a href={whatsappUrl()} className="link">
            WhatsApp the plant <span aria-hidden>→</span>
          </a>
          <a href={telHref()} className="link">
            {site.phoneDisplay} <span aria-hidden>→</span>
          </a>
          <a href={`mailto:${site.email}`} className="link">
            {site.email} <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
