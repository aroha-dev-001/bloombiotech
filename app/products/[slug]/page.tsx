import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, products } from "@/lib/products";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Button } from "@/components/Button";
import { ProductExplorer } from "@/components/products/ProductExplorer";
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
      <header data-tone="light" className="pt-[calc(var(--nav-h)+4rem)] pb-16">
        <div className="shell">
          <Link href="/products" className="link">
            <span aria-hidden>←</span> Catalogue
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-end">
            <div>
              <h1 className="display d-hero">{product.name}</h1>
              <p className="mt-5 text-[1.15rem] text-[var(--lime)]">{product.technology}</p>
              <p className="lede lede-wide mt-7">{product.short}</p>
              <div className="mt-10 flex flex-wrap gap-3">
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

            <div className="frame aspect-[4/5] bg-[color-mix(in_srgb,var(--bone)_6%,transparent)]">
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

      {/* The pack, explored: four questions, each with its own picture. */}
      <section data-tone="light" className="band">
        <div className="shell">
          <ProductExplorer product={product} />
        </div>
      </section>

      {/* Long-form background, kept but no longer the first thing you meet. */}
      <section data-tone="bone" className="band">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:gap-16">
          <div>
            <h2 className="display d-2" data-rv>
              More about {product.name}
            </h2>
            <div className="mt-8 space-y-5" data-rv>
              {product.body.map((para) => (
                <p key={para} className="pex-lead text-[var(--dim)]">
                  {para}
                </p>
              ))}
            </div>
          </div>

          <aside
            id="enquire"
            className="h-fit rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--surface)] p-7 lg:sticky lg:top-[calc(var(--nav-h)+1.5rem)]"
          >
            <h2 className="display d-3">Ask for {product.name}</h2>
            <p className="pex-note mt-3 text-[var(--dim)]">
              Tell us the crop and the area, and we quote against it.
            </p>
            <div className="mt-7">
              <EnquiryForm presetProduct={product.name} />
            </div>
          </aside>
        </div>
      </section>

      <section data-tone="bone" className="band-tight">
        <div className="shell flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="eyebrow">Next pack</p>
            <p className="display d-2 mt-2">{next.name}</p>
          </div>
          <Button href={`/products/${next.slug}`} variant="ghost">
            Open {next.name}
          </Button>
        </div>
      </section>
    </>
  );
}
