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
      <div className="pcard-media">
        <Image
          src={product.photo}
          alt={`${product.name} pack`}
          fill
          sizes="(min-width: 1100px) 20rem, (min-width: 760px) 30vw, 46vw"
        />
      </div>
      <div className="pcard-body">
        <h3 className="display d-3">{product.name}</h3>
        <p className="meta">{product.technology}</p>
      </div>
    </Link>
  );
}
