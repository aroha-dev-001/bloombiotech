import Image from "next/image";
import type { Metadata } from "next";
import { EnquiryForm } from "@/components/EnquiryForm";
import { audienceFromSlug } from "@/lib/audience";
import { Button } from "@/components/Button";
import { site, whatsappUrl, telHref } from "@/lib/site";
import { plant } from "@/lib/plant";

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
      <header data-tone="light" className="pt-[calc(var(--nav-h)+5rem)] pb-20">
        <div className="shell">
          <h1 className="display d-hero max-w-[12ch]">Talk to us.</h1>
          <p className="lede lede-wide mt-8">
            No price list, no checkout. Tell us what you grow and we quote
            against it.
          </p>
        </div>
      </header>

      {/* A real field rather than a black rectangle behind the contact page. */}
      <section data-tone="light" className="pb-4">
        <div className="shell">
          <figure className="page-band" data-rv="mask">
            <Image
              src="/farm/plantation.jpg"
              alt="A sunlit coffee plantation in Karnataka"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </figure>
        </div>
      </section>

      <section data-tone="light" className="band">
        <div className="shell grid gap-14 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-20">
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
              <div>
                <dt>Hours</dt>
                <dd>{site.hours}</dd>
              </div>
            </dl>
            <div className="mt-10">
              <Button href={whatsappUrl()} variant="ghost" arrow={false}>
                WhatsApp instead
              </Button>
            </div>
          </div>

          <div className="rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--surface)] p-7 sm:p-12">
            <EnquiryForm presetAudience={audience} presetProduct={q.product} />
          </div>
        </div>
      </section>
    </>
  );
}
