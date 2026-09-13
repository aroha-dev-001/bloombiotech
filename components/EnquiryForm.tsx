"use client";

import { useState } from "react";
import { site, whatsappUrl } from "@/lib/site";
import { products } from "@/lib/products";
import { Button } from "./Button";

const audiences = ["Farmer", "Dealer", "Estate / plantation", "Institution / KVK"] as const;

export function EnquiryForm({ presetProduct }: { presetProduct?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [audience, setAudience] = useState<(typeof audiences)[number]>("Farmer");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/enquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("fail");
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("err");
    }
  }

  if (status === "ok") {
    return (
      <div className="border border-leaf/40 bg-white p-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-leaf">
          Logged
        </p>
        <h3 className="mt-2 font-serif text-2xl">Enquiry received.</h3>
        <p className="mt-2 text-sm text-muted">
          WhatsApp the plant if you need a same-day pack list.
        </p>
        <Button href={whatsappUrl()} className="mt-5">
          Open WhatsApp
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block text-xs uppercase tracking-[0.16em] text-muted">
          Name
          <input required name="name" className="field text-base tracking-normal text-ink normal-case" />
        </label>
        <label className="block text-xs uppercase tracking-[0.16em] text-muted">
          Phone
          <input required name="phone" type="tel" className="field text-base tracking-normal text-ink normal-case" />
        </label>
      </div>
      <label className="block text-xs uppercase tracking-[0.16em] text-muted">
        Email
        <input name="email" type="email" className="field text-base tracking-normal text-ink normal-case" />
      </label>
      <fieldset>
        <legend className="text-xs uppercase tracking-[0.16em] text-muted">I am a</legend>
        <input type="hidden" name="audience" value={audience} />
        <div className="mt-3 flex flex-wrap gap-2">
          {audiences.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setAudience(a)}
              className={`border px-3 py-1.5 text-sm transition-transform duration-400 ${
                audience === a
                  ? "border-leaf bg-leaf text-white"
                  : "border-forest/15 bg-transparent hover:border-forest/40"
              }`}
              style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
            >
              {a}
            </button>
          ))}
        </div>
      </fieldset>
      <label className="block text-xs uppercase tracking-[0.16em] text-muted">
        Product of interest
        <select
          name="product"
          className="field text-base tracking-normal text-ink normal-case"
          defaultValue={presetProduct ?? ""}
        >
          <option value="">Not sure yet</option>
          {products.map((p) => (
            <option key={p.slug} value={p.name}>
              {p.name}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-xs uppercase tracking-[0.16em] text-muted">
        Crop, acres, and what you need
        <textarea
          required
          name="message"
          rows={4}
          className="field text-base tracking-normal text-ink normal-case"
          placeholder="12 acres robusta · AMC liquid + Trichoderma for nursery"
        />
      </label>
      <div className="flex flex-wrap items-center gap-4 pt-2">
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send enquiry"}
        </Button>
        <a href={`mailto:${site.email}`} className="text-sm text-muted hover:text-forest">
          Email instead
        </a>
      </div>
      {status === "err" ? (
        <p className="text-sm text-moss">
          Could not save here. WhatsApp {site.phoneDisplay}.
        </p>
      ) : null}
    </form>
  );
}
