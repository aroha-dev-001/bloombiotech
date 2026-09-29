import Image from "next/image";
import Link from "next/link";
import type { Ref } from "react";
import { cutoutOf, products, shotOf, type Product } from "@/lib/products";

/**
 * The two halves of the pack showcase, shared by the catalogue (where they
 * turn on their own, PackCarousel) and by every product page (where they are
 * links, and the page's own pack is the one standing in front).
 *
 * Neither holds state, so a server page can render them as plain links and
 * the carousel can drive them with a callback.
 */

const n = products.length;

/** Where a pack stands relative to the one in front: -1 left, 1 right. */
function offset(i: number, active: number) {
  let d = i - active;
  if (d > n / 2) d -= n;
  if (d < -n / 2) d += n;
  return Math.abs(d) > 2 ? "far" : String(d);
}

export const pad = (i: number) => String(i + 1).padStart(2, "0");

/**
 * The pack in front, with the packs either side of it standing behind.
 *
 * Every pack is on the stage the whole time and moves between five places
 * (far left, left, front, right, far right), so turning to the next one is
 * one continuous move rather than a picture swapping. The cutouts are the real
 * packs lifted off their photographs; see scripts/cutouts/build.py.
 */
export function PackStage({
  active,
  onSelect,
  linked,
  priority,
  stageRef,
  onPointerDown,
  onPointerUp,
  onHover,
}: {
  active: number;
  /** Carousel: a neighbour brings itself to the front. */
  onSelect?: (i: number) => void;
  /** Product page: a neighbour is a link to its own page. */
  linked?: boolean;
  priority?: boolean;
  stageRef?: Ref<HTMLDivElement>;
  onPointerDown?: React.PointerEventHandler<HTMLDivElement>;
  onPointerUp?: React.PointerEventHandler<HTMLDivElement>;
  /** A mouse over the packs (not a finger, which never leaves). */
  onHover?: (over: boolean) => void;
}) {
  return (
    <div
      className="ps-stage"
      ref={stageRef}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerEnter={onHover && ((e) => e.pointerType === "mouse" && onHover(true))}
      onPointerLeave={onHover && ((e) => e.pointerType === "mouse" && onHover(false))}
    >
      {products.map((p, i) => {
        const pos = offset(i, active);
        const side = pos === "-1" || pos === "1";
        const img = (
          <Image
            src={cutoutOf(p)}
            alt={i === active ? altOf(p) : ""}
            fill
            priority={priority && (pos === "0" || side)}
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
            data-slug={p.slug}
            aria-hidden={i !== active || undefined}
          >
            {side && linked ? (
              <Link href={`/products/${p.slug}`} className="ps-hit" tabIndex={-1}>
                {img}
              </Link>
            ) : side && onSelect ? (
              <button type="button" className="ps-hit" tabIndex={-1} onClick={() => onSelect(i)}>
                {img}
              </button>
            ) : (
              img
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

/**
 * Every pack by name along the foot of the showcase, with a line under each.
 * The line under the pack in front fills while it is on show.
 */
export function PackStrip({
  active,
  onSelect,
  linked,
  running,
  paused,
  onDone,
  stripRef,
  label,
}: {
  active: number;
  onSelect?: (i: number) => void;
  linked?: boolean;
  /** The front pack's line fills over the dwell, then calls onDone. */
  running?: boolean;
  /** Hold the fill where it is (pointer over, focus inside, out of view). */
  paused?: boolean;
  onDone?: () => void;
  stripRef?: Ref<HTMLElement>;
  label: string;
}) {
  const fill = (i: number) =>
    i === active ? (
      <span
        key={`${active}-${running ? "run" : "full"}`}
        className="ps-fill"
        data-run={running || undefined}
        data-paused={paused || undefined}
        onAnimationEnd={onDone}
      />
    ) : null;

  if (linked) {
    return (
      <nav className="ps-strip" aria-label={label} ref={stripRef}>
        {products.map((p, i) => (
          <Link
            key={p.slug}
            href={`/products/${p.slug}`}
            className="ps-tab"
            aria-current={i === active ? "page" : undefined}
            data-on={i === active || undefined}
          >
            <span className="ps-tab-name">{p.name}</span>
            <span className="ps-track">{fill(i)}</span>
          </Link>
        ))}
      </nav>
    );
  }

  return (
    <div
      className="ps-strip"
      role="tablist"
      aria-label={label}
      ref={stripRef as Ref<HTMLDivElement>}
    >
      {products.map((p, i) => (
        <button
          key={p.slug}
          type="button"
          role="tab"
          id={`ps-tab-${p.slug}`}
          aria-selected={i === active}
          aria-controls={`ps-panel-${p.slug}`}
          tabIndex={i === active ? 0 : -1}
          className="ps-tab"
          data-on={i === active || undefined}
          onClick={() => onSelect?.(i)}
          onKeyDown={(e) => {
            const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
            if (!step) return;
            e.preventDefault();
            const next = (i + step + n) % n;
            onSelect?.(next);
            document.getElementById(`ps-tab-${products[next].slug}`)?.focus();
          }}
        >
          <span className="ps-tab-name">{p.name}</span>
          <span className="ps-track">{fill(i)}</span>
        </button>
      ))}
    </div>
  );
}

/** Keep the strip's current name in view without moving the page. */
export function centreInStrip(strip: HTMLElement | null, i: number, behavior: ScrollBehavior = "smooth") {
  const tab = strip?.children[i] as HTMLElement | undefined;
  if (!strip || !tab || strip.scrollWidth <= strip.clientWidth) return;
  strip.scrollTo({
    left: tab.offsetLeft - strip.clientWidth / 2 + tab.clientWidth / 2,
    behavior,
  });
}
