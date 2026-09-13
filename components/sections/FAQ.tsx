"use client";

import { FAQAccordion } from "../FAQAccordion";
import { SectionHeading } from "../SectionHeading";
import { site } from "@/lib/site";

const items = [
  {
    q: "Do you publish a price list?",
    a: "No. Pack prices are quoted by the Chikkamagaluru plant. Use Request a quote or WhatsApp with crop, area, and whether you need powder or liquid.",
  },
  {
    q: "What is AMC on this site?",
    a: "Arka Microbial Consortium from IIHR. Bloom was first in India to licence it. Bio Sanjiveeni is the powder; Bhu Samruddhi is the liquid. Actives: Pseudomonas taiwanensis, Azotobacter tropicalis, Bacillus aryabhattai.",
  },
  {
    q: "How do I apply Bio Sanjiveeni?",
    a: "Brochure routes: 1 kg in 40 L as a root drench; 5–10 kg in 1 MT FYM after 7–10 days; 1 kg in 40 L through drip after filtering. If the pouch in hand differs, follow the pouch.",
  },
  {
    q: "Can I mix these with pesticides?",
    a: "AMC powder and compost culture: do not mix with antibiotics, pesticides, or insecticides. Bio Astra, Bluderma, Blumonas, and the Bio Vanish / Erase / Hit / Ace line: do not mix with fungicides, pesticides, or insecticides.",
  },
  {
    q: "Is there a shelf life?",
    a: "Bio Sanjiveeni brochure pack notes expiry six months from manufacture. Store cool and dry, away from sun. NutriCare C2 and AscoGold: store below 25°C.",
  },
  {
    q: "Are the AMC packs organic?",
    a: "Licensed AMC packs carry a 100% organic mark on the brochure. That is a pack mark, not a claim about every imported nutrition SKU.",
  },
  {
    q: "How do dealers get a board list?",
    a: `WhatsApp ${site.phoneDisplay} or email ${site.email} with the SKUs you need on the board. The catalogue page lists current commercial names.`,
  },
  {
    q: "Where is the plant?",
    a: `${site.addressLines.join(", ")}. Hours: ${site.hours}.`,
  },
];

export function FAQ() {
  return (
    <section id="faq" className="mx-auto max-w-6xl px-4 py-16 md:py-20">
      <SectionHeading
        kicker="08 / FAQ"
        title="Questions the plant actually gets."
        lede="Dose and mixing follow the label. Ask Bloom AI on the site will not invent prices."
      />
      <div className="mt-10">
        <FAQAccordion items={items} />
      </div>
    </section>
  );
}
