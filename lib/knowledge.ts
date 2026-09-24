import { articles } from "./articles";
import { faqs } from "./faq";
import { products } from "./products";
import { site } from "./site";

export type KnowledgeChunk = {
  id: string;
  title: string;
  text: string;
  href?: string;
};

export function companyKnowledge(): KnowledgeChunk[] {
  const chunks: KnowledgeChunk[] = [
    {
      id: "overview",
      title: "Company overview",
      href: "/about",
      text: `${site.name} is a green biotechnology company in Chikkamagaluru, Karnataka. Started in 2013. Technological collaboration with the Indian Institute of Horticultural Research (IIHR / ICAR-IIHR). First company in India to licence Arka Microbial Consortium (AMC) and Arka Fermented Cocopeat. Licensed Arka Actino Consortium (ACT) in 2015. State-of-the-art production facility in Chikkamagaluru (coffee land). Mission: high-quality biotechnology products and technical assistance for higher yields at lower costs. 100% organic mark on IIHR licensed packs. Website ${site.website}. ${site.description}`,
    },
    {
      id: "contact",
      title: "Contact and address",
      href: "/enquire",
      text: `Phone / customer care ${site.phoneDisplay}. Email ${site.email}. Hours: ${site.hours}. Address: ${site.addressLines.join(", ")}. Website ${site.website}. Instagram ${site.instagram}. Maps: ${site.maps}.`,
    },
    {
      id: "licence",
      title: "IIHR licences",
      href: "/products/bio-sanjiveeni",
      text: `Bloom Biotech has technological collaboration with IIHR. First in India to licence Arka Microbial Consortium (AMC) as Bio Sanjiveeni (carrier / powder) and Bhu Samruddhi (liquid AMC), and Arka Fermented Cocopeat (Bloom Compost Culture). Licensed Arka Actino Consortium (ACT) in 2015 as Bio Astra. AMC actives: Pseudomonas taiwanensis, Azotobacter tropicalis, Bacillus aryabhattai. Do not invent yield percentages. Do not publish prices. Bottle / pouch label wins if it differs from the brochure.`,
    },
    {
      id: "quote",
      title: "How to get a quote",
      href: "/enquire",
      text: `Request a quote at /enquire or WhatsApp ${site.phoneDisplay} or email ${site.email}. Include crop, area, and solid vs liquid. No published price list and no online checkout. Prices are quoted by the plant.`,
    },
    {
      id: "mix",
      title: "Mixing precautions",
      href: "/products",
      text: `AMC powder and compost culture: do not mix with antibiotics, pesticides, or insecticides. Bio Astra, Bluderma, Blumonas, Bio Vanish, Bio Erase, Bio Hit, Bio Ace: do not mix with fungicides, pesticides, or insecticides. Calcare: caution when mixing with high-phosphorus fertilizers. Store cool and dry, away from direct sunlight. NutriCare C2 and AscoGold: store below 25°C.`,
    },
    {
      id: "finder",
      title: "Finding the right pack",
      href: "/solutions",
      text: `Find your solution is at /solutions. Step 1 pick the crop (coffee, black pepper, pomegranate, floriculture, or other crops). Step 2 pick what is needed: disease management, pest management, nematode management, better nutrition, root health, soil biology, or composting. Results are tiered: packs named for that crop first, then packs that answer one of the needs that crop is worked on for, then the rest that simply print "suitable for all crops". The catalogue at /products carries the same filters as a flat list. The brochure names pomegranate, black pepper and floriculture as the commercial crops where AMC is used in crop protection management; most packs print "suitable for all crops". Crop-to-pack matching on this site is derived from the printed targets, usage and crop fields on each pack, not from a brochure recommendation table.`,
    },
    {
      id: "field",
      title: "Field records",
      href: "/field",
      text: `Field records are published at /field, one per crop (pomegranate, black pepper, coffee). The structure is published but the observations are placeholders in square brackets until a grower has reported and verified them. Bloom publishes no trial data, no yield percentages, no testimonials and no result claims. Never state a result, yield increase or field outcome for any Bloom product.`,
    },
    {
      id: "audiences",
      title: "Who to contact and how",
      href: "/enquire",
      text: `One contact form at /enquire for everyone. It asks once whether you are a farmer, distributor, retailer or other, then name, phone, product of interest and what you need. Estates, KVKs and institutions use the same desk. WhatsApp ${site.phoneDisplay} is fastest during working hours.`,
    },
  ];

  faqs.forEach((f, i) => {
    chunks.push({ id: `faq:${i}`, title: f.q, href: "/faq", text: `${f.q} ${f.a}` });
  });

  for (const p of products) {
    chunks.push({
      id: `product:${p.slug}`,
      title: p.name,
      href: `/products/${p.slug}`,
      text: `${p.name} (${p.category}, ${p.technology}). Aliases: ${p.aliases.join(", ")}. ${p.short} Crops: ${p.crops.join(", ")}. Use: ${p.use}. Pack: ${p.pack}. Actives: ${p.actives}. CFU: ${p.cfu}. Targets: ${p.targets}. Usage: ${p.usage.map((u) => `${u.title}: ${u.text}`).join(" ")}. Precaution: ${p.precaution}. Storage: ${p.storage}. ${p.imported ? "Imported product. No repacking in India where stated." : ""} ${p.benefits?.join(" ") ?? ""} ${p.specs?.map((s) => `${s.label} ${s.value}`).join("; ") ?? ""} ${p.body.join(" ")}`,
    });
  }

  for (const a of articles) {
    chunks.push({
      id: `article:${a.slug}`,
      title: a.title,
      href: `/journal/${a.slug}`,
      text: `${a.title}. ${a.excerpt} ${a.body.join(" ")} Tags: ${a.tags.join(", ")}`,
    });
  }

  return chunks;
}

export function retrieveKnowledge(query: string, limit = 8) {
  const q = query.toLowerCase();
  const terms = q.split(/[^a-z0-9+]+/).filter((t) => t.length > 2);
  const scored = companyKnowledge().map((chunk) => {
    const hay = `${chunk.title} ${chunk.text}`.toLowerCase();
    let score = 0;
    for (const t of terms) {
      if (hay.includes(t)) score += 2;
    }
    if (/(where|phone|whatsapp|email|address|contact)/.test(q) && chunk.id === "contact")
      score += 10;
    if (/(amc|arka|consortium|sanjiv|licence|license|iihr)/.test(q) && chunk.id === "licence")
      score += 8;
    if (/(price|quote|cost)/.test(q) && chunk.id === "quote") score += 8;
    if (/(mix|pesticide|fungicide)/.test(q) && chunk.id === "mix") score += 6;
    return { chunk, score };
  });
  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.chunk);
}
