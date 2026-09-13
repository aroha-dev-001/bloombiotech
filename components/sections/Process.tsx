"use client";

import { SectionHeading } from "../SectionHeading";

const steps = [
  {
    n: "01",
    title: "Source",
    text: "IIHR technologies: AMC, ACT, and Arka Fermented Cocopeat, licensed rather than invented in-house.",
  },
  {
    n: "02",
    title: "Formulate",
    text: "Production at the Chikkamagaluru plant since 2013, with the coffee-country facility named on the brochure.",
  },
  {
    n: "03",
    title: "Deliver",
    text: "WhatsApp or a written quote for farmers, dealers, estates, and institutions. No public checkout.",
  },
];

export function Process() {
  return (
    <section id="process" className="border-y border-forest/10 bg-forest py-16 text-paper md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          kicker="05 / How it is made"
          title="Source, formulate, then quote."
          tone="dark"
        />
        <ol className="relative mt-12 grid gap-8 md:grid-cols-3">
          <span
            className="pointer-events-none absolute top-7 right-[12%] left-[12%] hidden h-px bg-white/15 md:block"
            aria-hidden
          />
          {steps.map((step) => (
            <li key={step.n} className="relative">
              <p className="relative z-10 grid h-14 w-14 place-items-center rounded-full border border-white/20 bg-forest font-mono text-sm text-lime">
                {step.n}
              </p>
              <h3 className="mt-5 font-serif text-2xl">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-paper/75">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
