import type { Metadata } from "next";
import Link from "next/link";
import { EnquiryForm } from "@/components/EnquiryForm";
import { audienceFromSlug } from "@/lib/audience";
import { Button } from "@/components/Button";
import { site, whatsappUrl, telHref } from "@/lib/site";
import { plant } from "@/lib/plant";

export const metadata: Metadata = {
  title: "Contact Bloom",
  description:
    "Farmers, dealers, distributors and estates. Send the crop, the area and the pack you need — Bloom Biotech quotes from the Chikkamagaluru plant.",
};

/** What the page says depends on who walked in. */
const framing = {
  Farmer: {
    kicker: "For farmers",
    title: "Tell us the crop.",
    lede: "Say the crop and the area, and whether you want carrier (powder) or liquid. That is what decides the pack and the route.",
  },
  Dealer: {
    kicker: "For dealers",
    title: "Get the board list.",
    lede: "Ask for the current commercial names and the carrier and liquid lines. Say the taluk you cover and the crops your growers run.",
  },
  Distributor: {
    kicker: "For distributors",
    title: "Let's talk territory.",
    lede: "Districts covered, crops served and the portfolio you already carry. The IIHR licence position is part of that conversation.",
  },
  "Estate / plantation": {
    kicker: "For estates",
    title: "Tell us the block.",
    lede: "Acreage, crop and whether you are drenching, fertigating or enriching FYM. Volumes are quoted from the plant.",
  },
  "Institution / KVK": {
    kicker: "For institutions",
    title: "Tell us the programme.",
    lede: "Trials, demonstrations and extension programmes. Bloom works in technological collaboration with ICAR-IIHR.",
  },
  "General enquiry": {
    kicker: "Contact Bloom",
    title: "Reach the plant.",
    lede: "Chikkamagaluru, Karnataka. WhatsApp is the fastest route during working hours.",
  },
} as const;

type Props = { searchParams: Promise<{ audience?: string; product?: string }> };

export default async function EnquirePage({ searchParams }: Props) {
  const q = await searchParams;
  const audience = audienceFromSlug(q.audience);
  const copy = framing[audience];

  return (
    <>
      <header data-tone="dark" className="pt-[calc(var(--nav-h)+3rem)] pb-14">
        <div className="shell">
          <p className="eyebrow">
            <span className="eyebrow-accent">{copy.kicker}</span>
            <span className="mx-2 opacity-40">/</span>
            {site.hours}
          </p>
          <h1 className="display d-hero mt-6 max-w-[14ch]">{copy.title}</h1>
          <p className="lede mt-8">{copy.lede}</p>

          <nav aria-label="Who is enquiring" className="mt-10 flex flex-wrap gap-2">
            {(
              [
                ["farmer", "Farmer"],
                ["dealer", "Dealer"],
                ["distributor", "Distributor"],
                ["estate", "Estate"],
                ["general", "General"],
              ] as const
            ).map(([slug, label]) => (
              <Link
                key={slug}
                href={`/enquire?audience=${slug}`}
                className="chip"
                data-on={
                  audienceFromSlug(slug) === audience ? "true" : undefined
                }
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <section data-tone="light" className="band-tight">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
          <div>
            <dl className="spec spec-tight">
              <div>
                <dt>Phone</dt>
                <dd>
                  <a href={telHref()}>{site.phoneDisplay}</a>
                </dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </dd>
              </div>
              <div>
                <dt>Production unit</dt>
                <dd>{plant.unitAddress}</dd>
              </div>
              <div>
                <dt>Office</dt>
                <dd>{site.addressLines.join(", ")}</dd>
              </div>
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={whatsappUrl()} variant="ghost">
                WhatsApp instead
              </Button>
            </div>
            <div className="note-caution mt-10">
              <p className="eyebrow">Before you send</p>
              <p className="prose-body mt-2 text-[0.9rem]">
                There is no published price list and no online checkout. Every
                pack is quoted from Chikkamagaluru against the crop, the area and
                the route you need.
              </p>
            </div>
            <div className="mt-8 border-t border-[var(--line)] pt-6">
              <p className="eyebrow">Not sure which pack?</p>
              <Link href="/solutions#finder" className="link mt-4">
                Open the product finder <span aria-hidden>→</span>
              </Link>
            </div>
          </div>

          <div className="border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-10">
            <EnquiryForm presetAudience={audience} presetProduct={q.product} />
          </div>
        </div>
      </section>
    </>
  );
}
