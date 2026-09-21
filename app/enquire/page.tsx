import Image from "next/image";
import type { Metadata } from "next";
import { EnquiryForm } from "@/components/EnquiryForm";
import { audienceFromSlug } from "@/lib/audience";
import { Button } from "@/components/Button";
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
      {/* Split rather than another full-bleed banner: two pages already open
          on one, and a contact page reads warmer with the field beside the
          invitation than under it. */}
      <header data-tone="light" className="pt-[calc(var(--nav-h)+4rem)] pb-20">
        <div className="shell grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-20">
          <div>
            <Split as="h1" text="Talk to us." className="display d-hero max-w-[12ch]" />
            <p
              className="lede lede-wide mt-8"
              data-rv
              style={{ ["--rv-d" as string]: "240ms" }}
            >
              No price list, no checkout. Tell us what you grow and we quote
              against it.
            </p>
            <div
              className="mt-10 flex flex-wrap gap-3"
              data-rv
              style={{ ["--rv-d" as string]: "320ms" }}
            >
              <Button href={whatsappUrl()}>WhatsApp us</Button>
              <Button href={telHref()} variant="ghost" arrow={false}>
                {site.phoneDisplay}
              </Button>
            </div>
          </div>

          <figure className="frame aspect-[4/5]" data-rv="mask">
            <Image
              src="/farm/plantation-portrait.jpg"
              alt="A sunlit coffee plantation in Karnataka"
              fill
              priority
              sizes="(min-width: 1024px) 26rem, 100vw"
              className="object-cover"
            />
          </figure>
        </div>
      </header>

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
