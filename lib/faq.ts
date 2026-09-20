import { site } from "./site";

export type Faq = { q: string; a: string };

/**
 * Six questions — the ones the plant is actually asked on the phone.
 * Answers stay short, and dose always defers to the label on the pack.
 */
export const faqs: readonly Faq[] = [
  {
    q: "Which pack should I use?",
    a: "Start with Find your solution: pick your crop, then what you are dealing with. If your crop is not listed, most of our packs work across crops — send us the crop and the acreage and we will tell you which one fits.",
  },
  {
    q: "How do I apply it?",
    a: "Four ways, depending on the pack. Drench it over the root zone, mix it into FYM or compost, run it through a filtered drip line, or spray the liquid at 10 ml per litre. The pack prints the dose for that product.",
  },
  {
    q: "Can I mix it with pesticides or fungicides?",
    a: "No. These are living organisms and chemicals kill them. Keep a gap of a few days between a chemical spray and a biological application.",
  },
  {
    q: "What does it cost?",
    a: "We quote from the plant rather than publishing a price list. Send us the crop, the area and whether you want powder or liquid, and you get a price against that.",
  },
  {
    q: "Powder or liquid?",
    a: "Powder suits soil drenching and enriching FYM or compost. Liquid suits drip and foliar spray. Same organisms — what you already use in the field usually decides it.",
  },
  {
    q: "How long does it keep?",
    a: `Six months from the month of manufacture for the consortia, stored somewhere cool and dry out of the sun. Every pack carries its own batch and expiry. If anything is unclear, call ${site.phoneDisplay}.`,
  },
] as const;
