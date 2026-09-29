import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, kindOf, products, shotOf } from "@/lib/products";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Button } from "@/components/Button";
import { BackLink } from "@/components/BackLink";
import { ProductExplorer } from "@/components/products/ProductExplorer";
import { ProductMedia } from "@/components/products/ProductMedia";
import { whatsappUrl } from "@/lib/site";
import { Split } from "@/components/motion/Split";
import { PackStage, pad } from "@/components/products/PackShow";
import { PackStripNav } from "@/components/products/PackStripNav";

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
  const whatsapp = whatsappUrl(
    `Hello Bloom Biotech, I would like a quote for ${product.name}. Crop and area:`,
  );

  return (
    <>
      {/* The catalogue's frame, for this pack: it stands in front, the packs
          either side of it behind (each a link to its own page), and every
          pack's name along the foot. */}
      <header data-tone="light" className="ps ps-page">
        <div className="shell">
          <BackLink />

          <div className="ps-grid">
            <div className="ps-copy">
              <p className="ps-kind">
                {kindOf(product)} · {pad(i)} / {pad(products.length - 1)}
              </p>
              <Split as="h1" text={product.name} className="display ps-name" />
              <p className="ps-tagline">{product.tagline}</p>
              <p className="ps-tech">
                {product.technology}
                <br />
                {shotOf(product) === "contents"
                  ? `Pictured: the formulation, not the pack. Supplied as ${product.pack.toLowerCase()}`
                  : product.pack}
              </p>
              <div className="ps-cta">
                <Button href="#enquire">Ask for this pack</Button>
                <Button href={whatsapp} variant="ghost">
                  WhatsApp
                </Button>
              </div>
            </div>

            <PackStage active={i} linked priority />
          </div>

          <div className="ps-foot">
            <PackStripNav active={i} />
          </div>
        </div>
      </header>

      {/* What it does, how to use it, what is inside, which crops. */}
      <section data-tone="light" className="pp-band pp-band-points">
        <div className="shell">
          <ProductExplorer product={product} />
        </div>
      </section>

      <section id="enquire" data-tone="bone" className="pp-band">
        <div className="shell pp-ask">
          <div>
            <h2 className="display pp-h2">Ask for {product.name}</h2>
            <p className="pp-note">Tell us the crop and the area, and we quote against it.</p>
            <Button href={whatsapp} variant="ghost" className="mt-6">
              Or message us on WhatsApp
            </Button>
          </div>
          <div className="pp-form">
            <EnquiryForm presetProduct={product.name} />
          </div>
        </div>
      </section>

      <section data-tone="bone" className="pp-band pp-band-next">
        <div className="shell">
          <Link href={`/products/${next.slug}`} className="pp-next">
            <ProductMedia product={next} size="thumb" className="pp-next-plate" />
            <span className="pp-next-text">
              <span className="pp-note">Next pack</span>
              <span className="display pp-next-name">{next.name}</span>
            </span>
            <span className="pp-next-arw" aria-hidden>
              →
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
