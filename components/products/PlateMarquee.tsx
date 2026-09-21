import Image from "next/image";
import Link from "next/link";
import { plateOf, products } from "@/lib/products";

/**
 * The whole catalogue, drifting past.
 *
 * The products page opened on a heading over empty bone, with the first pack
 * a screen and a half below. The packs are the subject of the page, so they
 * are what it opens on: all fifteen plates moving slowly across the top, and
 * every one of them a link into its own page.
 *
 * The track is the list twice over and moves by exactly half its width, so the
 * loop has no seam. It is a CSS animation on a transform, which means no
 * JavaScript, no measurement, and no work on the main thread while it runs —
 * the reference site uses a carousel library for the same effect.
 *
 * It stops when a pointer is over it, so a pack can actually be read and
 * clicked, and it does not run at all under reduced motion.
 */
export function PlateMarquee() {
  const run = [...products, ...products];

  return (
    <div className="marquee" aria-label="Every pack Bloom Biotech makes">
      <div className="marquee-track">
        {run.map((p, i) => (
          <Link
            key={`${p.slug}-${i}`}
            href={`/products/${p.slug}`}
            className="marquee-cell"
            // The second pass is the same fifteen packs again, and a screen
            // reader should not have to hear the catalogue twice.
            aria-hidden={i >= products.length}
            tabIndex={i >= products.length ? -1 : undefined}
          >
            <Image
              src={plateOf(p)}
              alt={i < products.length ? `${p.name} pack` : ""}
              width={300}
              height={375}
              sizes="15rem"
              priority={i < 4}
            />
            <span className="marquee-name">{p.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
