import type { Metadata } from "next";
import { Split } from "@/components/motion/Split";

export const metadata: Metadata = {
  title: "Ask Bloom AI",
  description: "How the on-site assistant answers questions about Bloom Biotech packs.",
};

export default function AssistantPage() {
  return (
    <section data-tone="dark" className="pt-[calc(var(--nav-h)+5rem)] pb-28">
      <div className="shell-narrow px-0">
        <Split as="h1" text="Ask Bloom AI." className="display d-hero" />
        <p className="lede lede-wide mt-8">
          Open the assistant from the button at the bottom right. It answers from
          the same notes this site is built on — packs, organisms, dose, mixing
          rules and where the plant is. It will not invent a price.
        </p>
        <dl className="spec mt-12">
          <div>
            <dt>New chat</dt>
            <dd>The + button clears the conversation. Nothing is kept after you leave.</dd>
          </div>
          <div>
            <dt>Links</dt>
            <dd>Pack names, the phone number, email and address in an answer all open.</dd>
          </div>
          <div>
            <dt>Close</dt>
            <dd>The × button, or Escape.</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
