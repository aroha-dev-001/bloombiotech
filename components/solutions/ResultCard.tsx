import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { applications, applicationsOf, type Tier } from "@/lib/solutions";

/**
 * Compact product result. Used by the finder, the crop explorer and the
 * filtered catalogue, so a pack reads the same wherever it surfaces.
 */
export function ResultCard({
  product,
  index = 0,
  note,
  tier,
}: {
  product: Product;
  index?: number;
  /** Why this pack is on the list — shown in place of the category. */
  note?: string;
  /** Packs named for the crop get the accent; the rest stay quiet. */
  tier?: Tier;
}) {
  const routes = applicationsOf(product)
    .map((id) => applications.find((a) => a.id === id)?.label)
    .filter(Boolean);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="result-card group pop"
      style={{ ["--pop-d" as string]: `${Math.min(index, 8) * 45}ms` }}
    >
      <div className="result-card-media">
        <Image
          src={product.photo}
          alt=""
          fill
          sizes="4.5rem"
          className="object-cover"
        />
      </div>
      <div className="min-w-0">
        {note ? (
          <p
            className={
              tier === "suitable"
                ? "eyebrow mb-1.5"
                : "eyebrow eyebrow-accent mb-1.5"
            }
          >
            {note}
          </p>
        ) : (
          <p className="eyebrow mb-1.5">
            {product.category}
            {product.imported ? " · imported" : ""}
          </p>
        )}
        <h3 className="display text-[1.05rem] leading-tight tracking-[-0.02em]">
          {product.name}
        </h3>
        <p className="meta mt-1.5 text-[0.68rem] leading-relaxed">
          {product.technology}
        </p>
        {routes.length ? (
          <p className="meta mt-2.5 text-[0.62rem] tracking-[0.16em] uppercase">
            {routes.join(" · ")}
          </p>
        ) : null}
        <p className="mt-3 flex items-center justify-between gap-2 border-t border-[var(--line-soft)] pt-2.5 text-[0.66rem] uppercase tracking-[0.16em] text-[var(--accent)]">
          Open pack
          <span className="transition-transform duration-500 group-hover:translate-x-1" aria-hidden>
            →
          </span>
        </p>
      </div>
    </Link>
  );
}
