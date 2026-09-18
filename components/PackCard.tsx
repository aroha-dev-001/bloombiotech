import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";

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
      <p className="pcard-index eyebrow">{String(index + 1).padStart(2, "0")}</p>
      <div className="pcard-media">
        <Image
          src={product.photo}
          alt={`${product.name} pack`}
          fill
          sizes="(min-width: 1100px) 20rem, (min-width: 760px) 30vw, 46vw"
        />
      </div>
      <div className="pcard-body">
        <p className="eyebrow">
          {product.category}
          {product.imported ? " · imported" : ""}
        </p>
        <h3 className="display d-3">{product.name}</h3>
        <p className="meta text-[0.7rem] leading-relaxed">{product.technology}</p>
        <p className="mt-2 flex items-center justify-between border-t border-[var(--line-soft)] pt-3 text-[0.7rem] uppercase tracking-[0.16em] text-[var(--accent)]">
          Open pack
          <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
        </p>
      </div>
    </Link>
  );
}
