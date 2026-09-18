import { site } from "./site";

export type FaqGroup = {
  id: string;
  title: string;
  note: string;
  items: { q: string; a: string; home?: boolean }[];
};

/**
 * Every question the plant gets asked, grouped by who asks it.
 *
 * `home: true` marks the four a grower needs before anything else; the homepage
 * shows only those, and this page carries the rest.
 */
export const faqGroups: readonly FaqGroup[] = [
  {
    id: "choosing",
    title: "Choosing a pack",
    note: "What a grower asks before buying anything.",
    items: [
      {
        q: "Which pack should I use for my crop?",
        a: "Start with the product finder: pick the crop, then what you are dealing with — disease, pests, nematodes, nutrition, root health, soil biology or composting. It leads with the packs named for that crop and the ones that answer that problem. If the crop is not on the list, most Bloom packs print “suitable for all crops” — send the crop and the acreage to the plant and you get a pack and a route back.",
        home: true,
      },
      {
        q: "How do I apply it?",
        a: "Four printed routes. Soil drench: 1 kg in 40 L of water over the whole root system. FYM or compost enrichment: 5–10 kg in 1 MT, applied to soil after 7–10 days (biocontrols go in at 10 kg per tonne). Drip fertigation: 1 kg in 40 L, filtered before it reaches the line. Liquid: 10 ml per litre as foliar spray or through drip. If the pouch or can in your hand prints a different dose, follow the pack.",
        home: true,
      },
      {
        q: "Can I tank-mix these with chemicals?",
        a: "No. AMC and compost culture must not be mixed with antibiotics, pesticides or insecticides. Bio Astra, Bluderma, Blumonas, Bio Vanish, Bio Erase, Bio Hit and Bio Ace must not be mixed with fungicides, pesticides or insecticides. Calcare needs care with high-phosphorus fertilizers.",
        home: true,
      },
      {
        q: "What does it cost?",
        a: "There is no published price list and no online checkout. Packs are quoted from the Chikkamagaluru plant against the crop, the area and whether you need carrier (powder) or liquid. Send those three things on WhatsApp and you get a quote against them.",
        home: true,
      },
      {
        q: "Carrier or liquid — which one do I want?",
        a: "Carrier is a powder on a carrier base: soil drenching, FYM and compost enrichment, neem cake enrichment, and filtered drip. Liquid suits foliar spray and drip fertigation at 10 ml per litre. The same organisms, two delivery routes. What you already have in the field — a drip line, a manure heap, a sprayer — usually decides it.",
      },
    ],
  },
  {
    id: "technology",
    title: "The technology",
    note: "AMC, ACT and the IIHR licences.",
    items: [
      {
        q: "What exactly is AMC?",
        a: "Arka Microbial Consortium, an ICAR-IIHR technology. Bloom Biotech was the first company in India to licence it. Bio Sanjiveeni is the carrier powder, Bhu Samruddhi the liquid. Actives: Pseudomonas taiwanensis, Azotobacter tropicalis and Bacillus aryabhattai in a single formulation, so separate N-fixer, PSB and Pseudomonas packets are not needed.",
      },
      {
        q: "What is Bio Astra, and how is it different?",
        a: "Bio Astra is Arka Actino Consortium — three compatible antibiotic-producing Streptomyces strains from IIHR. They secrete antibiotics in the root zone and plant-growth promoters (IAA and gibberellins) for rooting. Bloom licensed ACT in 2015, again as the first company in India.",
      },
      {
        q: "Are the packs certified organic?",
        a: "Licensed AMC packs carry the 100% Organic mark alongside the ICAR and IIHR marks, and Bhu Samruddhi is printed as certified for use in organic agriculture. That is a pack mark — it is not a claim about every imported nutrition SKU.",
      },
      {
        q: "What is the shelf life, and how do I store it?",
        a: "Bio Sanjiveeni and Bio Astra print six months from the month of manufacture. Store cool and dry, away from direct sunlight. NutriCare C2 and AscoGold stay in their original pack below 25°C.",
      },
      {
        q: "Why does the pack print a different CFU to the brochure?",
        a: "Because the pack is the one that counts. Colony forming units are declared per gram for carrier and per millilitre for liquid, and where the pack in hand differs from anything printed elsewhere — including this website — the pack wins. That rule is ours and we hold to it.",
      },
    ],
  },
  {
    id: "trade",
    title: "Dealers and distributors",
    note: "Board lists, territory and trade enquiries.",
    items: [
      {
        q: "I am a dealer. How do I get a board list?",
        a: `WhatsApp ${site.phoneDisplay} or email ${site.email} with the SKUs you want on the board and the taluk you cover. The products page carries the current commercial names.`,
      },
      {
        q: "Do you appoint distributors?",
        a: "Send the districts you cover, the crops your growers run and the portfolio you already carry, and the plant will take it from there. Use the distribution enquiry so it reaches the right desk.",
      },
      {
        q: "Where is the plant?",
        a: "The production unit is at Sy. No. 259/1, Hampapura Bypass Road, Beekanahalli Village, Joythinagar, Chikkamagalur 577102. The office address is on K.M. Road, Chikkamagaluru.",
      },
    ],
  },
] as const;

/** The four a grower needs first. */
export const homeFaqs = faqGroups
  .flatMap((g) => g.items)
  .filter((i) => i.home)
  .map(({ q, a }) => ({ q, a }));
