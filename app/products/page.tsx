import type { Metadata } from "next";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "Products",
  description: "Biofertilizers, consortia, and biocontrols from Bloom Biotech.",
};

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
        Catalogue
      </p>
      <h1 className="mt-2 font-serif text-4xl text-forest">Products</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Shop the brochure packs. Quote by crop and acres. No published price
        list.
      </p>
      <div className="shop-grid mt-10">
        {products.map((p, i) => (
          <ProductCard key={p.slug} product={p} index={i} />
        ))}
      </div>
    </div>
  );
}
