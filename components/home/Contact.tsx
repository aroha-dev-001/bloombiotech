import Link from "next/link";
import { site, telHref, whatsappUrl } from "@/lib/site";
import { plant } from "@/lib/plant";

export function Contact() {
  return (
    <section id="contact" data-tone="carbon" className="relative overflow-hidden band">
      <div className="shell">
        <p className="eyebrow" data-rv>
          <span className="eyebrow-accent">§09</span>
          <span className="mx-2 opacity-40">/</span>
          Quote desk
        </p>

        <h2 className="display d-hero mt-8 max-w-[16ch]" data-rv>
          Tell us the crop. We&rsquo;ll tell you the pack.
        </h2>

        <p className="lede mt-8 max-w-[52ch]" data-rv style={{ ["--rv-d" as string]: "80ms" }}>
          There is no price list and no checkout. Send the crop, the area and
          whether you need carrier or liquid, and the plant quotes it. Farmers,
          dealers, estates and KVKs all come through the same desk.
        </p>

        <div className="mt-12 flex flex-wrap gap-3" data-rv style={{ ["--rv-d" as string]: "140ms" }}>
          <Link href="/enquire" className="btn btn-primary">
            Request a quote
            <span className="arw" aria-hidden>
              →
            </span>
          </Link>
          <a href={whatsappUrl()} className="btn btn-ghost">
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
        </div>

        <dl className="spec mt-16 max-w-3xl" data-rv>
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
          <div>
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${site.email}`} className="hover:text-[var(--accent)]">
                {site.email}
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
