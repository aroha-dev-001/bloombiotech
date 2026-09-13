import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle } from "@/lib/articles";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  return { title: article?.title ?? "Article" };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <article className="mx-auto max-w-2xl px-4 py-16">
      <Link href="/journal" className="text-sm text-leaf">
        ← Journal
      </Link>
      <p className="mt-6 text-xs text-soil">
        {article.date} · {article.tags.join(" · ")}
      </p>
      <h1 className="mt-3 font-serif text-4xl leading-tight text-forest">
        {article.title}
      </h1>
      <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted">
        {article.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </article>
  );
}
