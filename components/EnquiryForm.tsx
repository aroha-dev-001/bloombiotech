"use client";

import { useState } from "react";
import { site, whatsappUrl } from "@/lib/site";
import { products } from "@/lib/products";
import { audiences, type Audience } from "@/lib/audience";
import { Button } from "./Button";

/** Short, plain and asked once: who you are, how to reach you, what you grow. */
export function EnquiryForm({
  presetProduct,
  presetAudience = "Farmer",
  presetMessage,
}: {
  presetProduct?: string;
  presetAudience?: Audience;
  presetMessage?: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [audience, setAudience] = useState<Audience>(presetAudience);

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
      <div className="rounded-[var(--r)] border border-[var(--brand)]/40 bg-[var(--surface)] p-8">
        <h3 className="display d-3">Thank you — we have it.</h3>
        <p className="prose-body mt-4">
          We will come back to you with a pack and a price. If it is urgent,
          WhatsApp the plant.
        </p>
        <Button href={whatsappUrl()} className="mt-7">
          Open WhatsApp
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-7">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="form-label">
          Name
          <input required name="name" className="field" />
        </label>
        <label className="form-label">
          Phone
          <input required name="phone" type="tel" className="field" />
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="form-label">
          I am a
          <select
            name="audience"
            className="field"
            value={audience}
            onChange={(e) => setAudience(e.target.value as Audience)}
          >
            {audiences.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </label>
        <label className="form-label">
          Product
          <select name="product" className="field" defaultValue={presetProduct ?? ""}>
            <option value="">Not sure yet</option>
            {products.map((p) => (
              <option key={p.slug} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="form-label">
        {audience === "Farmer" ? "Crop, acres and what you need" : "What you need from us"}
        <textarea
          required
          name="message"
          rows={4}
          className="field"
          defaultValue={presetMessage}
          placeholder={
            audience === "Farmer"
              ? "12 acres robusta — liquid AMC and something for the nursery"
              : "Districts covered, crops served, and what you want to carry"
          }
        />
      </label>

      <div className="flex flex-wrap items-center gap-6 pt-2">
        <Button type="submit" disabled={status === "sending"} arrow={false}>
          {status === "sending" ? "Sending…" : "Send enquiry"}
        </Button>
        <a href={`mailto:${site.email}`} className="prose-body hover:text-[var(--fg)]">
          Email instead
        </a>
      </div>

      {status === "err" ? (
        <p className="prose-body">
          That did not go through. WhatsApp or call {site.phoneDisplay}.
        </p>
      ) : null}
    </form>
  );
}
