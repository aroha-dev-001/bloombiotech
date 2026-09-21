import Link from "next/link";
import { SectionHead } from "../SectionHead";
import { ProductShowcase } from "./ProductShowcase";

/**
 * What we make. Six packs presented as a gallery with one of them the subject,
 * rather than six equal cards that made none of them the subject. The whole
 * catalogue is a link away.
 */
export function Packs() {
  return (
    <section id="catalogue" data-tone="carbon" className="band">
      <div className="shell">
        <SectionHead
          title="The packs we are known for."
          lede="Consortia, biocontrol, compost culture and crop nutrition."
        />

        <div className="mt-16" data-rv>
          <ProductShowcase />
        </div>

        <div className="mt-14" data-rv>
          <Link href="/products" className="btn btn-ghost">
            See every pack
            <span className="arw" aria-hidden>
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
