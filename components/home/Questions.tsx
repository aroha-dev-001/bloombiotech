import { FAQAccordion } from "../FAQAccordion";
import { faqs } from "@/lib/faq";
import { Split } from "@/components/motion/Split";

export function Questions() {
  return (
    <section id="faq" data-tone="light" className="band">
      <div className="shell grid gap-12 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-20">
        <div className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)] lg:self-start">
          <Split as="h2" text="Questions." className="display d-1" />
        </div>
        <div data-rv>
          <FAQAccordion items={[...faqs]} />
        </div>
      </div>
    </section>
  );
}
