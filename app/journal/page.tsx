import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Field notes",
  description: "Notes on microbial inputs, coffee soils and dealer practice.",
};

export default function JournalPage() {
  return (
    <>
      <header data-tone="dark" className="pt-[calc(var(--nav-h)+3rem)] pb-14">
        <div className="shell">
          <p className="eyebrow">
            <span className="eyebrow-accent">Field notes</span>
            <span className="mx-2 opacity-40">/</span>
            {articles.length} entries
          </p>
          <h1 className="display d-hero mt-6 max-w-[12ch]">Field notes.</h1>
          <p className="lede mt-8">
            Written the way the plant would brief a new agronomist — dose,
            route, caution. Not search filler.
          </p>
        </div>
      </header>

      <section data-tone="light" className="band-tight">
        <div className="shell">
          <ul className="border-t border-[var(--line)]">
            {articles.map((a, i) => (
              <li key={a.slug} data-rv style={{ ["--rv-d" as string]: `${i * 50}ms` }}>
                <Link
                  href={`/journal/${a.slug}`}
                  className="group grid gap-3 border-b border-[var(--line)] py-8 md:grid-cols-[10rem_minmax(0,1fr)_auto] md:items-baseline md:gap-8"
                >
                  <span className="meta">{a.date}</span>
                  <span>
                    <span className="display d-3 block transition-colors group-hover:text-[var(--accent)]">
                      {a.title}
                    </span>
                    <span className="prose-body mt-2 block max-w-[60ch] text-[0.95rem]">
                      {a.excerpt}
                    </span>
                    <span className="mt-4 flex flex-wrap gap-1.5">
                      {a.tags.map((t) => (
                        <span key={t} className="tag">
                          {t}
                        </span>
                      ))}
                    </span>
                  </span>
                  <span className="text-[var(--accent)] transition-transform duration-500 group-hover:translate-x-1" aria-hidden>
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
