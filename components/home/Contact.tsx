import Link from "next/link";
import { site, telHref, whatsappUrl } from "@/lib/site";
import { plant } from "@/lib/plant";

export function Contact() {
  return (
    <section id="contact" data-tone="carbon" className="relative overflow-hidden band">
      <div className="shell">
        <h2 className="display d-hero max-w-[14ch]" data-rv>
          Tell us the crop.
        </h2>

        <p className="lede lede-wide mt-8" data-rv style={{ ["--rv-d" as string]: "80ms" }}>
          Send the crop, the area and how you apply it. We answer with a pack
          and a price — farmers, dealers and estates through the same desk.
        </p>

        <div className="mt-12 flex flex-wrap gap-3" data-rv style={{ ["--rv-d" as string]: "140ms" }}>
          <Link href="/enquire" className="btn btn-primary">
            Get in touch
            <span className="arw" aria-hidden>
              →
            </span>
          </Link>
          <a href={whatsappUrl()} className="btn btn-ghost">
            WhatsApp
          </a>
          <a href={telHref()} className="btn btn-ghost">
            {site.phoneDisplay}
          </a>
        </div>

        <dl className="spec mt-20 max-w-3xl" data-rv>
          <div>
            <dt>Production unit</dt>
            <dd>{plant.unitAddress}</dd>
          </div>
          <div>
            <dt>Office</dt>
            <dd>{site.addressLines.join(", ")}</dd>
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
