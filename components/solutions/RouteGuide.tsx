"use client";

import Image from "next/image";
import { useState } from "react";
import { routes } from "@/lib/plant";
import { SectionHead } from "../SectionHead";

/** Four ways a pack reaches the root. Pick one, see it. */
export function RouteGuide() {
  const [active, setActive] = useState(0);
  const route = routes[active];

  return (
    <section id="routes" data-tone="light" className="band">
      <div className="shell">
        <SectionHead
          title="How it reaches the root."
          lede="If the pack in your hand prints a different dose, follow the pack."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-16">
          <div>
            <div role="tablist" aria-label="Application routes" className="grid gap-2">
              {routes.map((r, i) => {
                const on = i === active;
                return (
                  <button
                    key={r.index}
                    role="tab"
                    id={`route-tab-${r.index}`}
                    aria-selected={on}
                    data-on={on ? "true" : undefined}
                    aria-controls={`route-panel-${r.index}`}
                    tabIndex={on ? 0 : -1}
                    onClick={() => setActive(i)}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                        e.preventDefault();
                        setActive((v) => (v + 1) % routes.length);
                      }
                      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                        e.preventDefault();
                        setActive((v) => (v - 1 + routes.length) % routes.length);
                      }
                    }}
                    className="need-card"
                  >
                    <span>{r.name}</span>
                    <i aria-hidden>→</i>
                  </button>
                );
              })}
            </div>

            <div className="note-caution mt-10">
              <p className="prose-body">
                Never tank-mix these with fungicides, pesticides or insecticides.
                They are living organisms and chemicals kill them.
              </p>
            </div>
          </div>

          <div
            role="tabpanel"
            id={`route-panel-${route.index}`}
            aria-labelledby={`route-tab-${route.index}`}
          >
            <figure className="frame aspect-[16/10]">
              <Image
                key={route.photo}
                src={route.photo}
                alt={route.alt}
                fill
                sizes="(min-width: 1024px) 50rem, 100vw"
                className="object-cover"
              />
            </figure>
            <p className="display d-2 mt-8">{route.dose}</p>
            <p className="prose-body mt-4 max-w-[52ch]">{route.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
