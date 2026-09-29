import Image from "next/image";
import Link from "next/link";
import { cutoutOf, products, shotOf, type Product } from "@/lib/products";

/**
 * A product page's opening frame: the page's own pack standing in front with
 * its neighbours behind, each a plain link, so the page renders it on the
 * server. The catalogue's turntable (PackCarousel) borrows `pad` and
 * `centreInStrip` from here.
 */

const n = products.length;

/** Where a pack stands relative to the one in front: -1 left, 1 right. */
function offset(i: number, active: number) {
  let d = i - active;
  if (d > n / 2) d -= n;
  if (d < -n / 2) d += n;
  return Math.abs(d) > 1 ? "far" : String(d);
}

export const pad = (i: number) => String(i + 1).padStart(2, "0");

/**
 * The pack in front, with the packs either side of it standing behind, each a
 * link to its own page. The cutouts are the real packs lifted off their
 * photographs; see scripts/cutouts/build.py.
 */
export function PackStage({ active, priority }: { active: number; priority?: boolean }) {
  return (
    <div className="ps-stage">
      {products.map((p, i) => {
        const pos = offset(i, active);
        if (pos === "far") return null;
        const img = (
          <Image
            src={cutoutOf(p)}
            alt={i === active ? altOf(p) : ""}
            fill
            priority={priority}
            sizes="(min-width: 900px) 30rem, 72vw"
            className="ps-img"
            draggable={false}
          />
        );

        return (
          <div
            key={p.slug}
            className="ps-pack"
            data-pos={pos}
            data-shot={shotOf(p)}
            aria-hidden={i !== active || undefined}
          >
            {i === active ? (
              img
            ) : (
              <Link href={`/products/${p.slug}`} className="ps-hit" tabIndex={-1}>
                {img}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}

function altOf(p: Product) {
  return shotOf(p) === "contents" ? `${p.name}: ${p.actives}` : `${p.name} pack`;
}

/** Scroll the strip so its current name is in the middle, without moving the page. */
export function centreInStrip(strip: HTMLElement | null, i: number) {
  const tab = strip?.children[i] as HTMLElement | undefined;
  if (!strip || !tab || strip.scrollWidth <= strip.clientWidth) return;
  strip.scrollLeft = tab.offsetLeft - strip.clientWidth / 2 + tab.clientWidth / 2;
}
