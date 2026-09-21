import Link from "next/link";
import { shotOf, type Product } from "@/lib/products";
import { ProductMedia } from "./products/ProductMedia";

export function PackCard({
  product,
  index,
  reveal = true,
}: {
  product: Product;
  index: number;
  /** Off when a parent already animates the card (e.g. filter transitions). */
  reveal?: boolean;
}) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="pcard group w-auto"
      data-rv={reveal ? "" : undefined}
      style={reveal ? { ["--rv-d" as string]: `${(index % 4) * 60}ms` } : undefined}
    >
      <ProductMedia product={product} morph />
      <div className="pcard-body">
        <h3 className="display d-3">{product.name}</h3>
        <p className="meta">{product.technology}</p>
        {shotOf(product) === "contents" ? (
          <p className="pcard-shot">Pictured: the formulation, not the pack.</p>
        ) : null}
      </div>
    </Link>
  );
}
