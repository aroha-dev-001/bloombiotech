import type { Metadata } from "next";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Button } from "@/components/Button";
import { site, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request a quote",
};

export default function EnquirePage() {
  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
          04 / Enquiry
        </p>
        <h1 className="mt-3 font-serif text-4xl leading-tight text-forest">
          Tell us the crop. We will tell you the pack.
        </h1>
        <p className="mt-4 max-w-sm text-muted">
          One form for farmers, dealers, estates, and KVKs. WhatsApp is faster
          during {site.hours.toLowerCase()}.
        </p>
        <dl className="mt-10 space-y-4 border-t border-forest/10 pt-6 text-sm">
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-wider text-muted">Phone</dt>
            <dd>
              <a href={`tel:+91${site.phone}`}>{site.phoneDisplay}</a>
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-wider text-muted">Email</dt>
            <dd>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-wider text-muted">Plant</dt>
            <dd className="text-muted">{site.addressLines.join(" · ")}</dd>
          </div>
        </dl>
        <Button href={whatsappUrl()} variant="ghost" className="mt-8">
          WhatsApp instead
        </Button>
      </div>
      <div className="border border-forest/10 bg-white/50 p-6 sm:p-8">
        <EnquiryForm />
      </div>
    </div>
  );
}
