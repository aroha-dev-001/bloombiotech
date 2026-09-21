import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/lib/articles";
import { Split } from "@/components/motion/Split";

export const metadata: Metadata = {
  title: "Field notes",
  description: "Notes on microbial inputs, coffee soils and dealer practice.",
};

export default function JournalPage() {
  return (
    <>
      <header data-tone="light" className="pt-[calc(var(--nav-h)+5rem)] pb-20">
        <div className="shell">
          <Split as="h1" text="Field notes." className="display d-hero max-w-[12ch]" />
          <p className="lede lede-wide mt-8" data-rv style={{ ["--rv-d" as string]: "240ms" }}>
            Written the way we would brief a new agronomist: dose, route,
            caution.
          </p>
        </div>
      </header>

      <section data-tone="light" className="band">
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
                    <span className="prose-body mt-3 block max-w-[60ch]">
                      {a.excerpt}
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
