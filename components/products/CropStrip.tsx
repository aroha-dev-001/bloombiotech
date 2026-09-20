import Image from "next/image";
import Link from "next/link";
import { crops, suitsAllCrops } from "@/lib/solutions";
import type { Product } from "@/lib/products";

/**
 * Which crops this pack is for, as photographs rather than a comma list.
 *
 * Also the way out of a product page: each crop leads into the finder already
 * answered, so a reader who arrived on the wrong pack has somewhere to go
 * that is not the browser's back button.
 *
 * A crop that names this pack directly is marked; the rest are shown only
 * when the label prints "suitable for all crops", which most of them do.
 */
export function CropStrip({ product }: { product: Product }) {
  const all = suitsAllCrops(product);
  const shown = crops.filter(
    (c) => c.named.includes(product.slug) || (all && c.id !== "other"),
  );

  if (!shown.length) return null;

  return (
    <section data-tone="carbon" className="band-tight">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="display d-2 max-w-[18ch]" data-rv>
            Where {product.name} is used.
          </h2>
          <Link href="/solutions#find" className="btn btn-ghost">
            Find your solution
            <span className="arw" aria-hidden>
              →
            </span>
          </Link>
        </div>

        <ul className="crop-strip mt-10">
          {shown.map((c, i) => (
            <li key={c.id} data-rv style={{ ["--rv-d" as string]: `${i * 60}ms` }}>
              <Link href={`/solutions?crop=${c.id}`} className="crop-strip-card">
                <Image src={c.photo} alt="" fill sizes="(min-width: 760px) 20vw, 45vw" />
                <span className="crop-strip-name">
                  {c.name}
                  {c.named.includes(product.slug) ? (
                    <i aria-hidden title="Named for this crop">
                      ●
                    </i>
                  ) : null}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
