"use client";

import Image from "next/image";
import { useState } from "react";
import { routes } from "@/lib/plant";
import { SectionHead } from "../SectionHead";
import { Button } from "../Button";
import { whatsappUrl } from "@/lib/site";

export function RouteGuide() {
  const [active, setActive] = useState(0);
  const route = routes[active];

  return (
    <section id="routes" data-tone="light" className="band">
      <div className="shell">
        <SectionHead
          index="03"
          kicker="Application"
          title="Four ways it reaches the root."
          lede="Doses below are the brochure routes for the carrier and liquid lines. If the pouch or can in your hand prints something else, follow the pack."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-14">
          <div>
            <div
              role="tablist"
              aria-label="Application routes"
              className="grid gap-px bg-[var(--line)]"
            >
              {routes.map((r, i) => {
                const on = i === active;
                return (
                  <button
                    key={r.index}
                    role="tab"
                    id={`route-tab-${r.index}`}
                    aria-selected={on}
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
                    className="group flex items-center justify-between gap-4 bg-[var(--bg)] px-5 py-5 text-left transition-colors duration-400"
                    style={
                      on
                        ? { background: "color-mix(in srgb, var(--brand) 10%, var(--bg))" }
                        : undefined
                    }
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="eyebrow eyebrow-accent">{r.index}</span>
                      <span className="display d-3">{r.name}</span>
                    </span>
                    <span
                      className="meta text-right text-[0.68rem]"
                      style={on ? { color: "var(--leaf)" } : undefined}
                    >
                      {r.dose}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="note-caution mt-8">
              <p className="eyebrow">Mixing</p>
              <p className="prose-body mt-2 text-[0.9rem]">
                AMC and compost culture: do not mix with antibiotics, pesticides
                or insecticides. Bio Astra, Bluderma, Blumonas, Bio Vanish, Bio
                Erase, Bio Hit and Bio Ace: do not mix with fungicides,
                pesticides or insecticides.
              </p>
            </div>
          </div>

          <div
            role="tabpanel"
            id={`route-panel-${route.index}`}
            aria-labelledby={`route-tab-${route.index}`}
            className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,17rem)] sm:items-start"
          >
            <div className="frame frame-ticks aspect-[4/5] sm:order-2">
              <Image
                key={route.photo}
                src={route.photo}
                alt={route.alt}
                width={800}
                height={1200}
                sizes="(min-width: 640px) 17rem, 100vw"
                className="object-cover"
              />
            </div>
            <div className="sm:order-1">
              <p className="eyebrow">Route {route.index}</p>
              <p className="display d-2 mt-4">{route.dose}</p>
              <p className="prose-body mt-5">{route.body}</p>
              <dl className="spec mt-8">
                <div>
                  <dt>Works with</dt>
                  <dd>
                    {route.index === "04"
                      ? "Bhu Samruddhi and the liquid biocontrol line"
                      : "Bio Sanjiveeni, Bio Astra and the carrier biocontrols"}
                  </dd>
                </div>
                <div>
                  <dt>Storage</dt>
                  <dd>Cool and dry, out of direct sunlight</dd>
                </div>
              </dl>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/enquire">Quote this route</Button>
                <Button
                  href={whatsappUrl(
                    `Hello Bloom Biotech, I need a quote. Route: ${route.name} (${route.dose}). Crop and area:`,
                  )}
                  variant="ghost"
                >
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
