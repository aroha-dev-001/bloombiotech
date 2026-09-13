import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ask Bloom AI",
  description: "How the on-site assistant answers questions about Bloom Biotech packs.",
};

export default function AssistantPage() {
  return (
    <section data-tone="dark" className="pt-[calc(var(--nav-h)+3rem)] pb-24">
      <div className="shell-narrow px-0">
        <p className="eyebrow">
          <span className="eyebrow-accent">Assistant</span>
          <span className="mx-2 opacity-40">/</span>
          On every page
        </p>
        <h1 className="display d-1 mt-6">Ask Bloom AI.</h1>
        <p className="lede mt-7">
          Open the assistant from the button at the bottom right. It answers from
          the same notes this site is built on — packs, organisms, dose, mixing
          rules and where the plant is. It will not invent a price.
        </p>
        <dl className="spec mt-12">
          <div>
            <dt>New chat</dt>
            <dd>The + button clears the thread.</dd>
          </div>
          <div>
            <dt>History</dt>
            <dd>The ☰ button reopens earlier threads.</dd>
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
