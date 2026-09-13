import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle } from "@/lib/articles";
import { Button } from "@/components/Button";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Article" };
  return { title: article.title, description: article.excerpt };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <>
      <header data-tone="dark" className="pt-[calc(var(--nav-h)+3rem)] pb-14">
        <div className="shell">
          <Link href="/journal" className="link">
            <span aria-hidden>←</span> Field notes
          </Link>
          <p className="eyebrow mt-8">
            {article.date}
            <span className="mx-2 opacity-40">/</span>
            {article.tags.join(" · ")}
          </p>
          <h1 className="display d-1 mt-5 max-w-[20ch]">{article.title}</h1>
          <p className="lede mt-7 max-w-[56ch]">{article.excerpt}</p>
        </div>
      </header>

      <section data-tone="light" className="band-tight">
        <div className="shell-narrow">
          <div className="space-y-6 prose-body text-[1.05rem]">
            {article.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="mt-14 flex flex-wrap gap-3 border-t border-[var(--line)] pt-10">
            <Button href="/enquire">Request a quote</Button>
            <Button href="/products" variant="ghost">
              Catalogue
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
