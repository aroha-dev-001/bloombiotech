"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { whatsappUrl } from "@/lib/site";

/**
 * Someone who has spent a while among the packs without deciding usually has
 * a question a product page cannot answer: which pack for their crop, what it
 * costs delivered, whether it mixes with what they already spray. After a
 * while on the product pages, a card offers the shortest route to a person.
 *
 * Time is counted only while the tab is visible, across the catalogue and
 * every product page (this lives in their shared layout, and the count is
 * kept for the session so a full reload does not restart it). It appears
 * once per session and never again once closed. It waits while the visitor
 * is typing in a form or talking to the assistant, rather than interrupting.
 */
const KEY = "bloom-nudge";
const AFTER_SECONDS = 15;

type Spent = number | "done";

function readSpent(): Spent {
  try {
    const v = sessionStorage.getItem(KEY);
    return v === "done" ? "done" : Number(v) || 0;
  } catch {
    return 0;
  }
}

function writeSpent(v: Spent) {
  try {
    sessionStorage.setItem(KEY, String(v));
  } catch {
    // Blocked storage: the count just restarts with the page.
  }
}

/** Typing in a form, or in a conversation with the assistant or the menu. */
function busy() {
  const el = document.activeElement;
  if (el instanceof HTMLElement && el.matches("input, textarea, select, [contenteditable]")) return true;
  return !!document.querySelector('[data-chrome="chat"][aria-expanded="true"], [aria-controls="nav-sheet"][aria-expanded="true"]');
}

export function WhatsAppNudge({ names }: { names: Record<string, string> }) {
  const [state, setState] = useState<"hidden" | "shown" | "leaving">("hidden");
  const slug = usePathname().split("/")[2];
  const product = slug ? names[slug] : undefined;

  useEffect(() => {
    let spent = readSpent();
    if (spent === "done") return;

    const id = window.setInterval(() => {
      if (document.visibilityState !== "visible" || spent === "done") return;
      spent += 1;
      if (spent >= AFTER_SECONDS && !busy()) {
        spent = "done";
        window.clearInterval(id);
        setState("shown");
      }
      writeSpent(spent);
    }, 1000);

    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (state !== "shown") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setState("leaving");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [state]);

  // Out on a timer matched to nudge-out, not on animationend: tapping through
  // to WhatsApp usually hides the tab, and a hidden tab never ends it.
  useEffect(() => {
    if (state !== "leaving") return;
    const t = window.setTimeout(() => setState("hidden"), 300);
    return () => window.clearTimeout(t);
  }, [state]);

  const message = product
    ? `Hello Bloom Biotech, I was looking at ${product} and have a question. Crop and area:`
    : "Hello Bloom Biotech, I was looking at your products and have a question. Crop and area:";

  return (
    <div aria-live="polite">
      {state !== "hidden" ? (
        <aside
          className="nudge"
          data-leaving={state === "leaving" ? "" : undefined}
          aria-labelledby="nudge-title"
        >
          <button
            type="button"
            className="nudge-close"
            aria-label="Close"
            onClick={() => setState("leaving")}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>

          <p id="nudge-title" className="display nudge-title">
            Still in doubt?
          </p>
          <p className="nudge-body">
            Message us on WhatsApp for the dose, pack size and price that fit your crop.
          </p>

          <a
            href={whatsappUrl(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary nudge-cta"
            onClick={() => setState("leaving")}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
              <path
                fill="currentColor"
                d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91A9.84 9.84 0 0 0 12.04 2Zm0 18.15a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23a8.18 8.18 0 0 1 8.23 8.24c0 4.54-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z"
              />
            </svg>
            Chat on WhatsApp
          </a>
        </aside>
      ) : null}
    </div>
  );
}
