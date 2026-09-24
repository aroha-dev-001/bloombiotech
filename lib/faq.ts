import { site } from "./site";

export type Faq = { q: string; a: string };

/**
 * The questions the plant is actually asked on the phone, in the order a
 * grower meets them: choosing and using a pack, keeping it, buying it, help.
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
    q: "Powder or liquid?",
    a: "Powder suits soil drenching and enriching FYM or compost. Liquid suits drip and foliar spray. Same organisms — what you already use in the field usually decides it.",
  },
  {
    q: "Can I mix it with pesticides or fungicides?",
    a: "No. These are living organisms and chemicals kill them. Keep a gap of a few days between a chemical spray and a biological application.",
  },
  {
    q: "Can I use biological products with my existing crop-management program?",
    a: "Yes. They go in through the routes you already use — FYM, compost, neem cake, drip or a spray — so the routine barely changes. The only rule is timing: never in the same tank as chemical pesticides, fungicides or insecticides. With Calcare, take care alongside high-phosphorus fertilizers.",
  },
  {
    q: "How should I store the product?",
    a: "Somewhere cool and dry, out of direct sunlight, in the pack it came in. NutriCare C2 and AscoGold stay below 25°C. The biologicals are living organisms, so a hot store or a sunny shelf cuts their life short.",
  },
  {
    q: "How long does it keep?",
    a: "Six months from the month of manufacture for the consortia. Every pack carries its own batch and expiry.",
  },
  {
    q: "What should I do if my pack is near expiry?",
    a: `Use it before the date printed on the pack — after that, the count on the label no longer holds. If a pack reached you already close to expiry, call ${site.phoneDisplay} with the batch number.`,
  },
  {
    q: "How do I identify the genuine product?",
    a: `Read the label. Every Bloom pack prints the batch number, month and year of manufacture, expiry, MRP and net content, with the licence and CIBRC registration numbers. The IIHR-licensed packs also carry the ICAR, IIHR and 100% Organic marks and the line “R&D by Indian Institute of Horticultural Research”. If anything is missing or looks altered, WhatsApp a photo of the label to ${site.phoneDisplay} before you use it.`,
  },
  {
    q: "Where can I buy Bloom products?",
    a: `Directly from the plant in Chikkamagaluru. WhatsApp or call ${site.phoneDisplay}, email ${site.email}, or send an enquiry from this site. There is no online shop — the plant quotes against your crop and area.`,
  },
  {
    q: "Do you supply directly to farmers?",
    a: "Yes. Tell us the crop, the area and whether you want powder or liquid, and the plant quotes you directly.",
  },
  {
    q: "Do you supply dealers/distributors?",
    a: `Yes. Choose Distributor or Retailer on the enquiry form, or WhatsApp ${site.phoneDisplay}, and tell us which packs you want to carry.`,
  },
  {
    q: "What is the minimum order quantity?",
    a: "It depends on the pack and the order. Tell us what you need and the plant confirms it with the quote.",
  },
  {
    q: "What does it cost?",
    a: "We quote from the plant rather than publishing a price list. Send us the crop, the area and whether you want powder or liquid, and you get a price against that.",
  },
  {
    q: "How can I get technical assistance?",
    a: `WhatsApp or call ${site.phoneDisplay} during working hours, or email ${site.email}. Tell us the crop, the area and what you are seeing in the field — a photo helps — and the plant will help with the pack, the dose and how to apply it.`,
  },
] as const;
