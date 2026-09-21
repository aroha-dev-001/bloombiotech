import Image from "next/image";
import { ViewTransition } from "react";
import { plateOf, shotOf, type Product } from "@/lib/products";

/**
 * One stage, every pack.
 *
 * The fifteen source photographs are four different kinds of picture — pouches
 * on a grey bench, bottles cropped off a shelf, flat label artwork on white,
 * and two that are contents rather than packaging. Left to themselves in a
 * grid they read as four different companies, and the old 4:3 `object-cover`
 * card cropped the taller ones through the label.
 *
 * `public/plates/` holds the normalized version of each: one 4:5 canvas, the
 * pack contained rather than cropped, sized so a 5 L can and a 5 kg pouch carry
 * the same weight, feathered into a blurred neutral ground taken from its own
 * frame. The pack itself is untouched — only background, scale and crop.
 * `scripts/plates.sh` rebuilds them.
 *
 * So there is nothing to fit here: the plate already *is* the stage. This
 * component's job is the frame around it — the shared proportion, the contact
 * shadow, and the one hover move (§09: lift, a little scale, a deeper shadow,
 * and nothing else).
 *
 * With `morph`, the stage also carries a view-transition identity, so opening a
 * pack from the catalogue moves the plate you clicked into the product page
 * rather than replacing one picture with another. Only two surfaces opt in —
 * the catalogue card and the product hero — because a view-transition name has
 * to be unique on a page, and the same pack can appear more than once.
 */
export function ProductMedia({
  product,
  size = "card",
  priority,
  className = "",
  sizes,
  morph,
}: {
  product: Product;
  /** `card` in a grid, `hero` on a product page, `thumb` in a result row. */
  size?: "card" | "hero" | "thumb";
  priority?: boolean;
  className?: string;
  sizes?: string;
  /** Carry this plate across the navigation. One per page, at most. */
  morph?: boolean;
}) {
  const fallbackSizes =
    size === "hero"
      ? "(min-width: 1024px) 34rem, 100vw"
      : size === "thumb"
        ? "5rem"
        : "(min-width: 1100px) 22rem, (min-width: 760px) 30vw, 46vw";

  const stage = (
    <div className={`pstage pstage-${size} ${className}`.trim()} data-shot={shotOf(product)}>
      <Image
        src={plateOf(product)}
        alt={
          shotOf(product) === "contents"
            ? `${product.name} — ${product.actives}`
            : `${product.name} pack`
        }
        fill
        priority={priority}
        sizes={sizes ?? fallbackSizes}
        className="pstage-img"
      />
    </div>
  );

  if (!morph) return stage;

  return (
    <ViewTransition name={`pack-${product.slug}`} share="morph" default="none">
      {stage}
    </ViewTransition>
  );
}
