import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Journal",
  description: "Articles on microbial inputs, coffee soils, and dealer practice.",
};

export default function JournalPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <p className="text-xs uppercase tracking-[0.2em] text-soil">Journal</p>
      <h1 className="mt-2 font-serif text-4xl text-forest">Articles</h1>
      <p className="mt-3 text-muted">
        Field notes written as if Bloom were briefing a new agronomist - not
        generic SEO filler.
      </p>
      <ul className="mt-10 space-y-6">
        {articles.map((a) => (
          <li key={a.slug}>
            <Link
              href={`/journal/${a.slug}`}
              className="block rounded-2xl border border-forest/10 bg-white/50 p-6 hover:border-leaf/40"
            >
              <p className="text-xs text-soil">
                {a.date} · {a.tags.join(" · ")}
              </p>
              <h2 className="mt-2 font-serif text-2xl text-forest">{a.title}</h2>
              <p className="mt-2 text-sm text-muted">{a.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
