"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { chapters } from "@/lib/plant";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useMounted } from "@/hooks/useMounted";

/**
 * From culture to pack — the five steps, in order.
 *
 * The homepage film says "this is where it is made" in pictures and one line a
 * scene. This is the same journey at reading speed: what is licensed, what is
 * grown, what leaves in which form, what is counted, what is printed. The copy
 * is `chapters` in lib/plant.ts, which was written from the plant and the pack
 * labels and had never been rendered anywhere.
 *
 * On a wide screen the picture pins and the steps scroll past it, so the frame
 * changes as the step you are reading changes.
 *
 * The active step is the one crossing the middle of the screen, read straight
 * off an observer with a centre band rather than derived from progress across
 * the whole container — container progress counts the heading and the trailing
 * space too, which ran the picture a step ahead of the words beside it.
 *
 * On a phone a pinned panel would take half the screen and leave the words in
 * the other half, so the steps simply stack, each with its own frame.
 */
export function ProcessScroll() {
  const mounted = useMounted();
  const wide = useMediaQuery("(min-width: 900px)");
  const [i, setI] = useState(0);
  const steps = useRef<(HTMLLIElement | null)[]>([]);

  const pinned = mounted && wide;

  useEffect(() => {
    if (!pinned) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const n = steps.current.indexOf(e.target as HTMLLIElement);
          if (n >= 0) setI((v) => (v === n ? v : n));
        }
      },
      // Only whatever crosses the middle 10% of the viewport counts as read.
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    for (const el of steps.current) if (el) io.observe(el);
    return () => io.disconnect();
  }, [pinned]);

  return (
    <div className="proc">
      {pinned ? (
        <div className="proc-media" aria-hidden>
          {chapters.map((c, n) => (
            <Image
              key={c.index}
              src={c.still}
              alt=""
              fill
              sizes="(min-width: 900px) 32rem, 100vw"
              className="proc-frame"
              data-on={n === i ? "true" : undefined}
            />
          ))}
        </div>
      ) : null}

      <ol className="proc-steps">
        {chapters.map((c, n) => (
          <li
            key={c.index}
            ref={(el) => {
              steps.current[n] = el;
            }}
            className="proc-step"
            data-on={pinned && n === i ? "true" : undefined}
          >
            {!pinned ? (
              <figure className="proc-step-media">
                <Image
                  src={c.still}
                  alt={c.alt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </figure>
            ) : null}
            <p className="proc-n">{c.index}</p>
            <h3 className="display d-2 mt-3">{c.title}</h3>
            <p className="lede mt-4">{c.lede}</p>
            <p className="prose-body mt-4 max-w-[52ch]">{c.detail}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
