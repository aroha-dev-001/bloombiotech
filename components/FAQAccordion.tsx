"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";
import { revealEase } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export type FaqItem = { q: string; a: string };

export function FAQAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState(0);
  const base = useId();
  const reduce = useReducedMotion();

  return (
    <div className="divide-y divide-forest/10 border-y border-forest/10">
      {items.map((item, i) => {
        const expanded = open === i;
        const panel = `${base}-panel-${i}`;
        const btn = `${base}-btn-${i}`;
        return (
          <div key={item.q}>
            <h3>
              <button
                id={btn}
                type="button"
                aria-expanded={expanded}
                aria-controls={panel}
                className="flex min-h-11 w-full items-center justify-between gap-4 py-5 text-left font-serif text-xl text-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leaf"
                onClick={() => setOpen(expanded ? -1 : i)}
              >
                {item.q}
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-leaf transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                  aria-hidden
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {expanded ? (
                <motion.div
                  id={panel}
                  role="region"
                  aria-labelledby={btn}
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduce ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.35, ease: revealEase }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 text-base leading-relaxed text-muted">{item.a}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
