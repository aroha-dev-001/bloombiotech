import Link from "next/link";
import { FAQAccordion } from "../FAQAccordion";
import { homeFaqs, faqGroups } from "@/lib/faq";

const total = faqGroups.flatMap((g) => g.items).length;

/**
 * Four questions, not eight. The full set — technology, shelf life, dealer and
 * distributor questions — lives on /faq.
 */
export function Questions() {
  return (
    <section id="faq" data-tone="bone" className="band">
      <div className="shell grid gap-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-16">
        <div className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)] lg:self-start">
          <p className="eyebrow" data-rv>
            <span className="eyebrow-accent">§08</span>
            <span className="mx-2 opacity-40">/</span>
            Questions
          </p>
          <h2
            className="display d-1 mt-6"
            data-rv
            style={{ ["--rv-d" as string]: "60ms" }}
          >
            Before you buy anything.
          </h2>
          <p className="lede mt-6 text-[0.95rem]" data-rv>
            The four a grower asks first. Dose and mixing always follow the
            label on the pack in your hand.
          </p>
          <div className="mt-8" data-rv>
            <Link href="/faq" className="link">
              All {total} questions <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        <div data-rv>
          <FAQAccordion items={homeFaqs} />
        </div>
      </div>
    </section>
  );
}
