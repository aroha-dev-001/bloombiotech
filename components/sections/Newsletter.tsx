"use client";

import { FormEvent, useState } from "react";
import { Button } from "../Button";
import { SectionHeading } from "../SectionHeading";
import { site, whatsappUrl } from "@/lib/site";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(next)) return;
    const body = encodeURIComponent(
      `Please send a pack list and quote notes to ${next}. From the Bloom Biotech website.`,
    );
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("Pack list")}&body=${body}`;
    setSent(true);
  }

  return (
    <section id="contact" className="border-t border-forest/10 bg-white/50 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          kicker="09 / Contact"
          title="Start with a quote from the plant."
          lede={`${site.phoneDisplay} · ${site.email} · Chikkamagaluru. We do not run a self-serve shop.`}
        />
        <form className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row" onSubmit={onSubmit}>
          <label className="sr-only" htmlFor="pack-email">
            Email for a pack list
          </label>
          <input
            id="pack-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email for a pack list"
            className="min-h-11 flex-1 rounded-full border border-forest/15 bg-paper px-4 text-base text-ink outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leaf"
          />
          <Button type="submit" className="min-h-11">
            Email the plant
          </Button>
        </form>
        {sent ? (
          <p className="mt-3 text-sm text-moss">Your mail app should open with {site.email}.</p>
        ) : null}
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={whatsappUrl()}>WhatsApp the plant</Button>
          <Button href="/enquire" variant="ghost">
            Written quote
          </Button>
        </div>
      </div>
    </section>
  );
}
