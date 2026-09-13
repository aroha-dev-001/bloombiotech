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
      <div className="border border-[var(--brand)]/40 bg-[var(--surface)] p-6">
        <p className="eyebrow eyebrow-accent">Logged</p>
        <h3 className="display d-3 mt-3">Enquiry received.</h3>
        <p className="prose-body mt-3 text-sm">
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
        <label className="eyebrow block">
          Name
          <input required name="name" className="field" />
        </label>
        <label className="eyebrow block">
          Phone
          <input required name="phone" type="tel" className="field" />
        </label>
      </div>
      <label className="eyebrow block">
        Email
        <input name="email" type="email" className="field" />
      </label>
      <fieldset>
        <legend className="eyebrow">I am a</legend>
        <input type="hidden" name="audience" value={audience} />
        <div className="mt-3 flex flex-wrap gap-2">
          {audiences.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setAudience(a)}
              className={`tag min-h-9 px-3 transition-colors duration-300 ${
                audience === a
                  ? "border-[var(--brand)] bg-[var(--brand)] text-[#06120a]"
                  : "hover:border-[var(--fg)] hover:text-[var(--fg)]"
              }`}
            >
              {a}
            </button>
          ))}
        </div>
      </fieldset>
      <label className="eyebrow block">
        Product of interest
        <select
          name="product"
          className="field"
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
      <label className="eyebrow block">
        Crop, acres, and what you need
        <textarea
          required
          name="message"
          rows={4}
          className="field"
          placeholder="12 acres robusta · AMC liquid + Trichoderma for nursery"
        />
      </label>
      <div className="flex flex-wrap items-center gap-4 pt-2">
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send enquiry"}
        </Button>
        <a href={`mailto:${site.email}`} className="meta hover:text-[var(--fg)]">
          Email instead
        </a>
      </div>
      {status === "err" ? (
        <p className="prose-body text-sm">
          Could not save here. WhatsApp {site.phoneDisplay}.
        </p>
      ) : null}
    </form>
  );
}
