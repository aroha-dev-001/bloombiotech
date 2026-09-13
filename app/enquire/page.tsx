import type { Metadata } from "next";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Button } from "@/components/Button";
import { site, whatsappUrl, telHref } from "@/lib/site";
import { plant } from "@/lib/plant";

export const metadata: Metadata = {
  title: "Request a quote",
  description:
    "Send the crop, the area and the pack you need. Bloom Biotech quotes from the Chikkamagaluru plant.",
};

export default function EnquirePage() {
  return (
    <>
      <header data-tone="dark" className="pt-[calc(var(--nav-h)+3rem)] pb-14">
        <div className="shell">
          <p className="eyebrow">
            <span className="eyebrow-accent">Quote desk</span>
            <span className="mx-2 opacity-40">/</span>
            Farmers · dealers · estates · KVKs
          </p>
          <h1 className="display d-hero mt-6 max-w-[14ch]">
            Tell us the crop.
          </h1>
          <p className="lede mt-8">
            One form for everyone. WhatsApp is faster during working hours —{" "}
            {site.hours.toLowerCase()}.
          </p>
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
            <div className="mt-8">
              <Button href={whatsappUrl()} variant="ghost">
                WhatsApp instead
              </Button>
            </div>
            <div className="note-caution mt-10">
              <p className="eyebrow">Before you send</p>
              <p className="prose-body mt-2 text-[0.9rem]">
                Say the crop and the area, and whether you want carrier (powder)
                or liquid. That is what decides the pack and the route.
              </p>
            </div>
          </div>

          <div className="border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-10">
            <EnquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
