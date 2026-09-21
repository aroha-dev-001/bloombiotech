import Link from "next/link";
import type { Product } from "@/lib/products";
import { ProductMedia } from "@/components/products/ProductMedia";
import type { Tier } from "@/lib/solutions";

/**
 * A pack, as it appears in any recommendation. Name, what it is, and a line on
 * why it is here — nothing else.
 */
export function ResultCard({
  product,
  index = 0,
  note,
  tier,
}: {
  product: Product;
  index?: number;
  /** Why this pack is on the list. */
  note?: string;
  /** Packs named for the crop get the accent; the rest stay quiet. */
  tier?: Tier;
}) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="result-card group pop"
      style={{ ["--pop-d" as string]: `${Math.min(index, 8) * 45}ms` }}
    >
      <ProductMedia product={product} size="thumb" className="result-card-media" />
      <div className="min-w-0">
        <h3 className="display text-[1.3rem] leading-tight tracking-[-0.025em]">
          {product.name}
        </h3>
        <p className="meta mt-1.5">{product.technology}</p>
        {note ? (
          <p
            className={`mt-2 text-[0.95rem] ${
              tier === "suitable" ? "text-[var(--dim)]" : "text-[var(--accent)]"
            }`}
          >
            {note}
          </p>
        ) : null}
      </div>
    </Link>
  );
}
