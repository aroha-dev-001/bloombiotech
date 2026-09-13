import Link from "next/link";
import { FAQAccordion } from "../FAQAccordion";
import { articles } from "@/lib/articles";
import { site } from "@/lib/site";

const items = [
  {
    q: "Do you publish a price list?",
    a: "No. Packs are quoted by the Chikkamagaluru plant. Send the crop, the area and whether you need carrier or liquid through the enquiry form or on WhatsApp, and you get a quote against that.",
  },
  {
    q: "What exactly is AMC?",
    a: "Arka Microbial Consortium, an ICAR-IIHR technology. Bloom Biotech was the first company in India to licence it. Bio Sanjiveeni is the carrier powder, Bhu Samruddhi the liquid. Actives: Pseudomonas taiwanensis, Azotobactor tropicalis and Bacillus aryabhattai in a single formulation, so separate N-fixer, PSB and Pseudomonas packets are not needed.",
  },
  {
    q: "How do I apply Bio Sanjiveeni?",
    a: "Three printed routes: 1 kg in 40 L of water as a root drench; 5–10 kg in 1 MT of FYM or compost, applied to soil after 7–10 days; or 1 kg in 40 L filtered and fertigated through drip. If the pouch in hand prints a different dose, follow the pouch.",
  },
  {
    q: "Can these be tank-mixed with chemicals?",
    a: "No. AMC and compost culture must not be mixed with antibiotics, pesticides or insecticides. Bio Astra, Bluderma, Blumonas, Bio Vanish, Bio Erase, Bio Hit and Bio Ace must not be mixed with fungicides, pesticides or insecticides.",
  },
  {
    q: "What is the shelf life?",
    a: "Bio Sanjiveeni and Bio Astra print six months from the month of manufacture. Store cool and dry, away from direct sunlight. NutriCare C2 and AscoGold stay in their original pack below 25°C.",
  },
  {
    q: "Are the packs certified organic?",
    a: "Licensed AMC packs carry the 100% Organic mark alongside the ICAR and IIHR marks, and Bhu Samruddhi is printed as certified for use in organic agriculture. That is a pack mark — it is not a claim about every imported nutrition SKU.",
  },
  {
    q: "I am a dealer. How do I get a board list?",
    a: `WhatsApp ${site.phoneDisplay} or email ${site.email} with the SKUs you want on the board. The catalogue page carries the current commercial names.`,
  },
  {
    q: "Where is the plant?",
    a: "The production unit is at Sy. No. 259/1, Hampapura Bypass Road, Beekanahalli Village, Joythinagar, Chikkamagalur 577102. The office address is on K.M. Road, Chikkamagaluru.",
  },
];

export function Questions() {
  return (
    <section id="faq" data-tone="bone" className="band">
      <div className="shell grid gap-12 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-16">
        <div className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)] lg:self-start">
          <p className="eyebrow" data-rv>
            <span className="eyebrow-accent">§08</span>
            <span className="mx-2 opacity-40">/</span>
            Questions
          </p>
          <h2 className="display d-1 mt-6" data-rv style={{ ["--rv-d" as string]: "60ms" }}>
            What the plant gets asked.
          </h2>
          <p className="lede mt-6 text-[0.95rem]" data-rv>
            Dose and mixing always follow the label. Ask Bloom AI, bottom right,
            answers from the same notes — and will not invent a price.
          </p>

          <div className="mt-10 border-t border-[var(--line)] pt-6" data-rv>
            <p className="eyebrow">Field notes</p>
            <ul className="mt-4 space-y-4">
              {articles.slice(0, 3).map((a) => (
                <li key={a.slug}>
                  <Link href={`/journal/${a.slug}`} className="group block">
                    <span className="meta text-[0.66rem]">{a.date}</span>
                    <span className="mt-1 block text-[0.95rem] leading-snug transition-colors group-hover:text-[var(--accent)]">
                      {a.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/journal" className="link mt-6">
              All notes <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        <div data-rv>
          <FAQAccordion items={items} />
        </div>
      </div>
    </section>
  );
}
