"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/products";
import { TiltCard } from "./TiltCard";

export function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  return (
    <TiltCard>
      <Link
        href={`/products/${product.slug}`}
        className="shop-card group"
        style={{ ["--i" as string]: index }}
      >
        <div className="shop-card-media">
          <Image
            src={product.photo}
            alt={`${product.name} pack`}
            fill
            sizes="(min-width: 1024px) 18rem, 45vw"
            className="object-contain p-5 transition-transform duration-700 group-hover:scale-[1.04]"
            style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          />
        </div>
        <div className="shop-card-body">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
            {product.category}
            {product.imported ? " · imported" : ""}
          </p>
          <h3 className="mt-1.5 font-serif text-xl leading-tight text-forest">
            {product.name}
          </h3>
          <p className="mt-3 flex items-center justify-between text-sm text-leaf">
            View pack
            <span className="transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </p>
        </div>
      </Link>
    </TiltCard>
  );
}
