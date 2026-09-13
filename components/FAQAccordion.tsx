"use client";

import { useId, useState } from "react";

export type FaqItem = { q: string; a: string };

export function FAQAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState(0);
  const base = useId();

  return (
    <div className="border-t border-[var(--line)]">
      {items.map((item, i) => {
        const expanded = open === i;
        const panel = `${base}-panel-${i}`;
        const btn = `${base}-btn-${i}`;
        return (
          <div key={item.q} className="border-b border-[var(--line)]">
            <h3>
              <button
                id={btn}
                type="button"
                aria-expanded={expanded}
                aria-controls={panel}
                className="flex w-full items-start justify-between gap-6 py-6 text-left"
                onClick={() => setOpen(expanded ? -1 : i)}
              >
                <span className="display d-3 max-w-[32ch]">{item.q}</span>
                <span
                  className="mt-1 shrink-0 text-[var(--accent)] transition-transform duration-500"
                  style={{ transform: expanded ? "rotate(45deg)" : undefined }}
                  aria-hidden
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={panel}
              role="region"
              aria-labelledby={btn}
              className="grid transition-[grid-template-rows] duration-500 ease-[var(--ease-out)]"
              style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="prose-body max-w-[62ch] pb-7">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
