import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, products } from "@/lib/products";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Button } from "@/components/Button";
import { whatsappUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product" };
  return { title: product.name, description: product.short };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const i = products.findIndex((p) => p.slug === product.slug);
  const next = products[(i + 1) % products.length];

  return (
    <>
      <header data-tone="dark" className="pt-[calc(var(--nav-h)+2.5rem)] pb-14">
        <div className="shell">
          <Link href="/products" className="link">
            <span aria-hidden>←</span> Catalogue
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-end">
            <div>
              <p className="eyebrow">
                <span className="eyebrow-accent">{String(i + 1).padStart(2, "0")}</span>
                <span className="mx-2 opacity-40">/</span>
                {product.category}
                {product.imported ? " · imported" : ""}
              </p>
              <h1 className="display d-hero mt-6">{product.name}</h1>
              <p className="meta mt-5 text-[0.8rem] uppercase tracking-[0.16em] text-[var(--lime)]">
                {product.technology}
              </p>
              <p className="lede mt-7 max-w-[52ch]">{product.short}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button href="#enquire">Ask for this pack</Button>
                <Button
                  href={whatsappUrl(
                    `Hello Bloom Biotech, I would like a quote for ${product.name}. Crop and area:`,
                  )}
                  variant="ghost"
                >
                  WhatsApp
                </Button>
              </div>
            </div>

            <div className="frame frame-ticks aspect-[4/5] bg-[color-mix(in_srgb,var(--bone)_6%,transparent)]">
              <Image
                src={product.photo}
                alt={`${product.name} pack`}
                fill
                priority
                sizes="(min-width: 1024px) 22rem, 100vw"
                className="object-contain p-8"
              />
            </div>
          </div>
        </div>
      </header>

      <section data-tone="light" className="band-tight">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:gap-16">
          <div>
            <h2 className="eyebrow" data-rv>
              Specification
            </h2>
            <dl className="spec mt-6" data-rv>
              <div>
                <dt>Active ingredient</dt>
                <dd>{product.actives}</dd>
              </div>
              <div>
                <dt>Colony count</dt>
                <dd>{product.cfu}</dd>
              </div>
              <div>
                <dt>Target</dt>
                <dd>{product.targets}</dd>
              </div>
              <div>
                <dt>Crops</dt>
                <dd>{product.crops.join(" · ")}</dd>
              </div>
              <div>
                <dt>Pack</dt>
                <dd>{product.pack}</dd>
              </div>
              {product.specs?.map((s) => (
                <div key={s.label}>
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>

            <h2 className="eyebrow mt-14" data-rv>
              Usage
            </h2>
            <ol className="mt-6 grid border-t border-[var(--line)] sm:grid-cols-2" data-rv>
              {product.usage.map((u, ui) => (
                <li
                  key={u.title}
                  className="border-b border-[var(--line)] p-6 sm:odd:border-r sm:odd:border-[var(--line)]"
                >
                  <p className="eyebrow eyebrow-accent">{String(ui + 1).padStart(2, "0")}</p>
                  <h3 className="display d-3 mt-4">{u.title}</h3>
                  <p className="prose-body mt-3 text-[0.92rem]">{u.text}</p>
                </li>
              ))}
            </ol>

            {product.benefits?.length ? (
              <>
                <h2 className="eyebrow mt-14" data-rv>
                  Benefits
                </h2>
                <ul className="mt-6 space-y-3" data-rv>
                  {product.benefits.map((b) => (
                    <li
                      key={b}
                      className="prose-body border-t border-[var(--line-soft)] pt-3 text-[0.95rem]"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            <div className="mt-14 space-y-5 prose-body" data-rv>
              {product.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <div className="note-caution mt-12" data-rv>
              <p className="eyebrow">Precaution</p>
              <p className="prose-body mt-2 text-[0.92rem]">{product.precaution}</p>
              <p className="prose-body mt-3 text-[0.92rem]">
                <span className="eyebrow">Storage</span>
                <br />
                {product.storage}
              </p>
            </div>
          </div>

          <aside id="enquire" className="h-fit border border-[var(--line)] bg-[var(--surface)] p-6 lg:sticky lg:top-[calc(var(--nav-h)+1.5rem)]">
            <p className="eyebrow">Quote desk</p>
            <h2 className="display d-3 mt-3">Ask for {product.name}</h2>
            <p className="prose-body mt-3 text-[0.88rem]">
              Include crop, area, and whether you need carrier or liquid. No
              published price list.
            </p>
            <div className="mt-6">
              <EnquiryForm presetProduct={product.name} />
            </div>
          </aside>
        </div>
      </section>

      <section data-tone="carbon" className="band-tight">
        <div className="shell flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="eyebrow">Next pack</p>
            <p className="display d-2 mt-3">{next.name}</p>
          </div>
          <Button href={`/products/${next.slug}`} variant="ghost">
            Open {next.name}
          </Button>
        </div>
      </section>
    </>
  );
}
