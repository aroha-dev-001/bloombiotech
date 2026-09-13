import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, products } from "@/lib/products";
import { EnquiryForm } from "@/components/EnquiryForm";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  return { title: product?.name ?? "Product" };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 lg:grid-cols-[1.1fr_0.9fr]">
      <article>
        <Link href="/products" className="nav-link text-sm">
          ← Catalogue
        </Link>
        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          {product.category}
          {product.imported ? " · imported" : ""}
        </p>
        <h1 className="mt-2 font-serif text-4xl text-forest">{product.name}</h1>
        <p className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-leaf">
          {product.technology}
        </p>
        <div className="relative mt-6 aspect-[4/5] max-w-sm overflow-hidden border border-forest/10 bg-white">
          <Image
            src={product.photo}
            alt={`${product.name} pack from the Bloom Biotech brochure`}
            fill
            sizes="24rem"
            className="object-contain p-4"
            priority
          />
        </div>
        <p className="mt-4 text-lg text-muted">{product.short}</p>
        <dl className="mt-8 grid gap-px bg-forest/10 sm:grid-cols-2">
          <div className="bg-paper p-4">
            <dt className="font-mono text-[10px] uppercase tracking-wider text-muted">Crops</dt>
            <dd className="mt-1">{product.crops.join(" · ")}</dd>
          </div>
          <div className="bg-paper p-4">
            <dt className="font-mono text-[10px] uppercase tracking-wider text-muted">Pack</dt>
            <dd className="mt-1">{product.pack}</dd>
          </div>
          <div className="bg-paper p-4 sm:col-span-2">
            <dt className="font-mono text-[10px] uppercase tracking-wider text-muted">
              Active ingredient
            </dt>
            <dd className="mt-1">{product.actives}</dd>
          </div>
          <div className="bg-paper p-4 sm:col-span-2">
            <dt className="font-mono text-[10px] uppercase tracking-wider text-muted">CFU</dt>
            <dd className="mt-1">{product.cfu}</dd>
          </div>
          <div className="bg-paper p-4 sm:col-span-2">
            <dt className="font-mono text-[10px] uppercase tracking-wider text-muted">
              Targets
            </dt>
            <dd className="mt-1">{product.targets}</dd>
          </div>
        </dl>
        <h2 className="mt-8 font-serif text-2xl text-forest">Usage</h2>
        <ul className="mt-3 space-y-3">
          {product.usage.map((u) => (
            <li key={u.title} className="border-l-2 border-leaf pl-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-leaf">
                {u.title}
              </p>
              <p className="mt-1 text-muted">{u.text}</p>
            </li>
          ))}
        </ul>
        {product.specs?.length ? (
          <>
            <h2 className="mt-8 font-serif text-2xl text-forest">Specification</h2>
            <dl className="mt-3 grid gap-px bg-forest/10 sm:grid-cols-2">
              {product.specs.map((s) => (
                <div key={s.label} className="bg-paper p-3">
                  <dt className="font-mono text-[10px] uppercase tracking-wider text-muted">
                    {s.label}
                  </dt>
                  <dd className="mt-1">{s.value}</dd>
                </div>
              ))}
            </dl>
          </>
        ) : null}
        {product.benefits?.length ? (
          <>
            <h2 className="mt-8 font-serif text-2xl text-forest">Benefits</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-muted">
              {product.benefits.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </>
        ) : null}
        <div className="mt-8 space-y-4 leading-relaxed text-muted">
          {product.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <p className="mt-6 text-sm text-forest">Precaution: {product.precaution}</p>
        <p className="mt-2 text-sm text-muted">Storage: {product.storage}</p>
      </article>
      <aside className="h-fit border border-forest/10 bg-white/50 p-6">
        <h2 className="font-serif text-2xl text-forest">Ask for this pack</h2>
        <p className="mt-2 mb-6 text-sm text-muted">
          Include crop, area, and whether you need carrier or liquid. No
          published price list.
        </p>
        <EnquiryForm presetProduct={product.name} />
      </aside>
    </div>
  );
}
