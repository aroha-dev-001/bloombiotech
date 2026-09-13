"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { AiMark } from "./AiMark";
import { site } from "@/lib/site";

const STORAGE = "bloom-ai-enquiry-v3";
const START = "bloom-ai-enquiry-start-v3";
const DELAY_MS = 10_000;

const steps = [
  {
    key: "name" as const,
    kicker: "Chikkamagaluru plant",
    ask: "Who should we write the quote to?",
    hint: "Your name — farmer, dealer, or estate",
    inputMode: "text" as const,
    type: "text",
    autoComplete: "name",
  },
  {
    key: "phone" as const,
    kicker: "WhatsApp / call",
    ask: "Which mobile should the plant use?",
    hint: "10-digit number",
    inputMode: "tel" as const,
    type: "tel",
    autoComplete: "tel",
  },
  {
    key: "email" as const,
    kicker: "Pack list",
    ask: "Where should we send AMC and catalogue notes?",
    hint: "Email for Bio Sanjiveeni / Bhu Samruddhi",
    inputMode: "email" as const,
    type: "email",
    autoComplete: "email",
  },
];

function valid(key: (typeof steps)[number]["key"], value: string) {
  const v = value.trim();
  if (key === "name") return v.length >= 2;
  if (key === "phone") return /^(\+91[\s-]?)?[6-9]\d{9}$/.test(v.replace(/\s/g, ""));
  if (key === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  return false;
}

export function EnquiryPulse() {
  const path = usePathname();
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [values, setValues] = useState({ name: "", phone: "", email: "" });
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"talk" | "sending" | "ok" | "err">("talk");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (path !== "/") return;
    try {
      if (sessionStorage.getItem(STORAGE)) return;
    } catch {
      /* ignore */
    }

    let start = 0;
    try {
      start = Number(sessionStorage.getItem(START) || 0);
      if (!start) {
        start = Date.now();
        sessionStorage.setItem(START, String(start));
      }
    } catch {
      start = Date.now();
    }

    const wait = Math.max(0, DELAY_MS - (Date.now() - start));
    const t = window.setTimeout(() => setOpen(true), wait);
    return () => window.clearTimeout(t);
  }, [path]);

  useEffect(() => {
    if (!open || status !== "talk") return;
    const id = window.setTimeout(() => inputRef.current?.focus(), 200);
    return () => window.clearTimeout(id);
  }, [open, step, status]);

  function close() {
    setOpen(false);
    try {
      sessionStorage.setItem(STORAGE, "closed");
    } catch {
      /* ignore */
    }
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function goNext() {
    const current = steps[step];
    const value = values[current.key];
    if (!valid(current.key, value)) {
      setError(
        current.key === "phone"
          ? "Use a 10-digit Indian mobile."
          : current.key === "email"
            ? "That email does not look complete."
            : "Type at least two letters.",
      );
      return;
    }
    setError("");
    if (step < steps.length - 1) {
      setStep((s) => s + 1);
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/enquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          phone: values.phone.trim(),
          email: values.email.trim(),
          audience: "AI popup",
          product: "Quote callback",
          message:
            "Home-page Ask Bloom briefing. Request a callback for AMC / catalogue from the Chikkamagaluru plant.",
        }),
      });
      if (!res.ok) throw new Error("fail");
      setStatus("ok");
      try {
        sessionStorage.setItem(STORAGE, "done");
      } catch {
        /* ignore */
      }
    } catch {
      setStatus("err");
    }
  }

  if (!ready || !open) return null;

  const current = steps[step];
  const first = values.name.trim().split(" ")[0];

  return createPortal(
    <div className="pulse-overlay" role="dialog" aria-modal="true" aria-labelledby="pulse-title">
      <button type="button" className="pulse-scrim" aria-label="Close enquiry" onClick={close} />
      <div className="pulse-card">
        <div className="pulse-photo">
          <Image
            src="/photos/coffee.png"
            alt=""
            fill
            sizes="26rem"
            className="object-cover object-[72%_center]"
          />
          <div className="pulse-photo-veil" />
          <p className="pulse-photo-label">Bloom Biotech · coffee country</p>
        </div>
        <button type="button" className="pulse-close" onClick={close} aria-label="Close">
          ×
        </button>
        <div className="pulse-body">
          <div className="flex items-center gap-3 pr-8">
            <AiMark />
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-leaf">
                Ask Bloom AI
              </p>
              <p id="pulse-title" className="font-serif text-xl text-forest">
                Quote from the Chikkamagaluru plant
              </p>
            </div>
          </div>

          <div className="pulse-rail" aria-hidden="true">
            {steps.map((s, i) => (
              <span key={s.key} className={i <= step || status === "ok" ? "is-on" : ""} />
            ))}
          </div>

          {status === "ok" ? (
            <div className="mt-5">
              <p className="font-serif text-2xl text-forest">Noted{first ? `, ${first}` : ""}.</p>
              <p className="mt-2 text-sm text-muted">
                We have your number for Bio Sanjiveeni, Bhu Samruddhi, and the rest of the
                brochure line. WhatsApp {site.phoneDisplay} if you need a pack list today.
              </p>
              <button type="button" className="btn btn-primary mt-6" onClick={close}>
                Back to the site
              </button>
            </div>
          ) : (
            <form
              className="mt-5"
              onSubmit={(e) => {
                e.preventDefault();
                void goNext();
              }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-leaf">
                {step + 1} / {steps.length} · {current.kicker}
              </p>
              <p className="mt-2 font-serif text-2xl leading-snug text-forest">{current.ask}</p>
              <input
                ref={inputRef}
                key={current.key}
                value={values[current.key]}
                onChange={(e) => setValues((v) => ({ ...v, [current.key]: e.target.value }))}
                type={current.type}
                inputMode={current.inputMode}
                autoComplete={current.autoComplete}
                placeholder={current.hint}
                className="pulse-input"
                aria-label={current.hint}
              />
              {error ? <p className="mt-2 text-sm text-moss">{error}</p> : null}
              {status === "err" ? (
                <p className="mt-2 text-sm text-moss">
                  Could not save here. WhatsApp {site.phoneDisplay}.
                </p>
              ) : null}
              <div className="mt-5 flex flex-wrap items-center gap-3">
                {step > 0 && status === "talk" ? (
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => {
                      setError("");
                      setStep((s) => s - 1);
                    }}
                  >
                    Back
                  </button>
                ) : null}
                <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
                  {status === "sending"
                    ? "Sending…"
                    : step === steps.length - 1
                      ? "Send to the plant"
                      : "Next"}
                </button>
              </div>
              <button type="button" className="mt-4 text-xs text-muted hover:text-forest" onClick={close}>
                Not now
              </button>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
