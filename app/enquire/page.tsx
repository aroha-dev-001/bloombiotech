import Image from "next/image";
import type { Metadata } from "next";
import { EnquiryForm } from "@/components/EnquiryForm";
import { audienceFromSlug } from "@/lib/audience";
import { site, whatsappUrl, telHref } from "@/lib/site";
import { plant } from "@/lib/plant";
import { Split } from "@/components/motion/Split";

export const metadata: Metadata = {
  title: "Contact Bloom",
  description:
    "Send the crop, the area and the pack you need — Bloom Biotech quotes from the Chikkamagaluru plant.",
};

type Props = { searchParams: Promise<{ audience?: string; product?: string }> };

export default async function EnquirePage({ searchParams }: Props) {
  const q = await searchParams;
  const audience = audienceFromSlug(q.audience);

  return (
    <>
      <header data-tone="light" className="pg-hero-plain">
        <div className="shell">
          <Split as="h1" text="Talk to us." className="display pg-title" />
          <p className="pg-lede" data-rv style={{ ["--rv-d" as string]: "200ms" }}>
            No price list, no checkout. Tell us what you grow and we quote
            against it.
          </p>

          {/* The three ways in, before anything else. */}
          <ul className="ct-quick" data-rv style={{ ["--rv-d" as string]: "280ms" }}>
            <li>
              <a href={whatsappUrl()} className="ct-card">
                <svg viewBox="0 0 24 24" aria-hidden>
                  <path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4.1A8 8 0 1 1 20 11.5z" />
                </svg>
                <span>
                  <span className="ct-way">WhatsApp</span>
                  <span className="ct-val">Message us</span>
                </span>
              </a>
            </li>
            <li>
              <a href={telHref()} className="ct-card">
                <svg viewBox="0 0 24 24" aria-hidden>
                  <path d="M6.6 3.5h2.9l1.4 4.1-2 1.4a11 11 0 0 0 6.1 6.1l1.4-2 4.1 1.4v2.9a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2z" />
                </svg>
                <span>
                  <span className="ct-way">Call</span>
                  <span className="ct-val">{site.phoneDisplay}</span>
                </span>
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="ct-card">
                <svg viewBox="0 0 24 24" aria-hidden>
                  <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
                  <path d="M4 7l8 6 8-6" />
                </svg>
                <span>
                  <span className="ct-way">Email</span>
                  <span className="ct-val">{site.email}</span>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </header>

      <section data-tone="light" className="pg-band ct-main">
        <div className="shell ct-grid">
          <div className="pp-form">
            <h2 className="display pg-h3">Send an enquiry</h2>
            <p className="pg-note">Crop, area and the pack if you know it. We reply with a quote.</p>
            <div className="mt-6">
              <EnquiryForm presetAudience={audience} presetProduct={q.product} />
            </div>
          </div>

          <aside className="ct-aside">
            <figure className="frame ct-photo">
              <Image
                src="/farm/plantation-portrait.jpg"
                alt="A sunlit coffee plantation in Karnataka"
                fill
                sizes="(min-width: 900px) 24rem, 1px"
                className="object-cover"
              />
            </figure>
            <dl className="pk-spec ct-spec">
              <div>
                <dt>Hours</dt>
                <dd>{site.hours}</dd>
              </div>
              <div data-wide>
                <dt>Production unit</dt>
                <dd>{plant.unitAddress}</dd>
              </div>
              <div data-wide>
                <dt>Office</dt>
                <dd>{site.addressLines.join(", ")}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>
    </>
  );
}
