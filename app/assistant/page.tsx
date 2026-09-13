import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ask Bloom AI",
};

export default function AssistantPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <p className="text-xs uppercase tracking-[0.2em] text-soil">Assistant</p>
      <h1 className="mt-2 font-serif text-4xl text-forest">Ask Bloom AI</h1>
      <p className="mt-4 text-muted">
        Open the Ask Bloom AI button at the bottom-right. Answers are short
        briefings, with links and follow-up chips. Use <strong>+</strong> for a
        new chat, <strong>☰</strong> for history, and <strong>×</strong> to
        close.
      </p>
    </div>
  );
}
