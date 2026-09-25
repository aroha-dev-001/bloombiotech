import { articles } from "./articles";
import { products, type Product } from "./products";
import { site, telHref, whatsappUrl } from "./site";

export type ChatLink = { label: string; href: string };

export type ChatAnswer = {
  title: string;
  summary: string;
  bullets: string[];
  cta?: string;
  links: ChatLink[];
  followUps: string[];
};

export const welcomeAnswer: ChatAnswer = {
  title: "Ask Bloom AI",
  summary:
    "I brief the Bloom Biotech catalogue from the company brochure: IIHR-licensed AMC, ACT, biocontrols, compost culture, and imported nutrition. Ask for a pack name, a pest, or how to apply AMC. Prices are quoted by the plant. Labels win if they differ.",
  bullets: [
    "Bloom Biotech, Chikkamagaluru. Started 2013. Collaboration with ICAR-IIHR.",
    "First in India to licence AMC (Bio Sanjiveeni powder, Bhu Samruddhi liquid) and Arka Fermented Cocopeat.",
    "ACT licensed in 2015 as Bio Astra. No published price list.",
  ],
  links: [
    { label: "Products", href: "/products" },
    { label: "Quote", href: "/enquire" },
    { label: "Company", href: "/about" },
  ],
  followUps: ["What is AMC?", "Plant address & phone", "Coffee berry borer", "Compost culture"],
};

const nav = {
  product: (p: Product): ChatLink => ({
    label: p.name,
    href: `/products/${p.slug}`,
  }),
  /** The enquiry form on the pack's own page, with the pack already filled in. */
  ask: (p: Product): ChatLink => ({
    label: `Ask for ${p.name}`,
    href: `/products/${p.slug}#enquire`,
  }),
  quote: { label: "Request a quote", href: "/enquire" },
  finder: { label: "Find your solution", href: "/solutions#find" },
  whatsapp: { label: "WhatsApp", href: whatsappUrl() },
  call: { label: `Call ${site.phoneDisplay}`, href: telHref() },
  email: { label: "Email", href: `mailto:${site.email}` },
  maps: { label: "Directions", href: site.maps },
  about: { label: "Company", href: "/about" },
  products: { label: "All products", href: "/products" },
};

function explain(p: Product) {
  return `${p.name} (${p.technology}): ${p.short} Use: ${p.usage.map((u) => `${u.title} ${u.text}`).join("; ")}`;
}

function matchProducts(q: string) {
  const hay = q.toLowerCase();
  const tokens = hay.split(/[^a-z0-9]+/).filter((t) => t.length > 2);
  return products.filter((p) => {
    const blob = `${p.name} ${p.slug} ${p.aliases.join(" ")} ${p.category} ${p.technology} ${p.targets} ${p.actives} ${p.short}`.toLowerCase();
    return tokens.some((t) => blob.includes(t));
  });
}

export function answerQuestion(question: string, priorUser: string[] = []): ChatAnswer {
  const q = question.toLowerCase().trim();
  const ctx = `${priorUser.slice(-2).join(" ")} ${question}`.toLowerCase();
  const sanj = products.find((p) => p.slug === "bio-sanjiveeni")!;
  const bhu = products.find((p) => p.slug === "bhu-samruddhi")!;
  const astra = products.find((p) => p.slug === "bio-astra")!;
  const blu = products.find((p) => p.slug === "bluderma")!;
  const compost = products.find((p) => p.slug === "bloom-compost-culture")!;
  const hit = products.find((p) => p.slug === "bio-hit")!;

  if (/phone|call|whatsapp|email|address|where|location|map|hour|open|contact/.test(q)) {
    return {
      title: "Plant & contact",
      summary: `Bloom Biotech, Assessment Number 10, 5th Phase KHB Colony, CMC Ward No. 1, K.M. Road, Chikkamagaluru 577102. Customer care ${site.phoneDisplay}. WhatsApp ${site.whatsappDisplay}. Email ${site.email}. Website ${site.website}.`,
      bullets: [
        `Phone: ${site.phoneDisplay}`,
        `WhatsApp: ${site.whatsappDisplay}`,
        `Email: ${site.email}`,
        site.addressLines.join(", "),
        `${site.hours} · ${site.website}`,
      ],
      links: [nav.call, nav.whatsapp, nav.email, nav.maps, nav.quote],
      followUps: ["How do I get a quote?", "What is AMC?", "List of products"],
    };
  }

  if (/price|cost|rate|quote|order|buy|dealer|distributor|bulk/.test(q)) {
    return {
      title: "How quoting works",
      summary:
        "The brochure does not print prices. The plant quotes after crop, area, and solid vs liquid. WhatsApp or email the plant.",
      bullets: [
        "Send crop, acres or seedling count, and powder vs liquid.",
        `WhatsApp ${site.whatsappDisplay} or email ${site.email}.`,
        "Pouch and bottle labels still win on dose and CFU.",
        "Jackpot, Fulcare, Calcare, NutriCare C2 are imported; no repacking in India.",
      ],
      links: [nav.quote, nav.whatsapp, nav.call, nav.products],
      followUps: ["What is AMC?", "List of products", "Plant address & phone"],
    };
  }

  if (
    (/dose|how to use|application|fym|drench|drip|per acre/.test(q) &&
      /amc|arka|consortium|sanjiv|bhu/.test(ctx)) ||
    /amc dose/.test(q)
  ) {
    return {
      title: "AMC how to use",
      summary:
        "Bio Sanjiveeni is powder AMC. Bhu Samruddhi is liquid AMC. Follow the pack in hand if CFU or dose differs.",
      bullets: [
        "Sanjiveeni soil drench: 1 kg in 40 L, drench the root system.",
        "Sanjiveeni FYM: 5-10 kg in 1 MT FYM or compost; apply after 7-10 days.",
        "Sanjiveeni drip: 1 kg in 40 L, filter, fertigate.",
        "Bhu Samruddhi: 10 ml/L foliar spray or drip.",
        "Do not mix with antibiotics, pesticides, or insecticides.",
      ],
      links: [nav.product(sanj), nav.product(bhu), nav.quote],
      followUps: ["What is Bio Astra?", "Compost culture", "Get a quote"],
    };
  }

  if (/amc|arka microbial|sanjiv|bhu samruddhi|consortium/.test(q) && !/actino|astra/.test(q)) {
    return {
      title: "Arka Microbial Consortium",
      summary:
        "Bloom was the first company in India to licence AMC from IIHR. Powder pack: Bio Sanjiveeni. Liquid pack: Bhu Samruddhi. Actives: Pseudomonas taiwanensis, Azotobacter tropicalis, Bacillus aryabhattai. Suitable for all crops. Soil-borne targets include Pythium, Phytophthora, Rhizoctonia, Fusarium, Botrytis, Sclerotium, Sclerotinia, Ustilago.",
      bullets: [
        `Sanjiveeni CFU ≥ 1 × 10⁹ per g (brochure). ${sanj.use}.`,
        `Bhu Samruddhi CFU ≥ 1 × 10⁸ per ml. Dose 10 ml/L.`,
        "Eliminates separate N-fixer, PSB, and Pseudomonas packets.",
        "Do not mix with antibiotics, pesticides, or insecticides.",
      ],
      links: [nav.product(sanj), nav.product(bhu), nav.quote],
      followUps: ["AMC dose", "Bio Astra ACT", "Get a quote"],
    };
  }

  if (/actino|bio astra|\bact\b/.test(q)) {
    return {
      title: astra.name,
      summary: explain(astra),
      bullets: [
        astra.actives,
        astra.cfu,
        ...astra.usage.map((u) => `${u.title}: ${u.text}`),
        astra.precaution,
      ],
      links: [nav.product(astra), nav.ask(astra)],
      followUps: ["What is AMC?", "Bluderma", "Get a quote"],
    };
  }

  if (/compost|coffee pulp|coco-peat compost|fermented coco/.test(q)) {
    return {
      title: compost.name,
      summary: explain(compost),
      bullets: compost.usage.map((u) => `${u.title}: ${u.text}`),
      links: [nav.product(compost), nav.ask(compost)],
      followUps: ["What is AMC?", "Get a quote"],
    };
  }

  if (/berry borer|coffee borer|beauveria/.test(q)) {
    return {
      title: hit.name,
      summary: explain(hit),
      bullets: [hit.targets, ...hit.usage.map((u) => `${u.title}: ${u.text}`), hit.precaution],
      links: [nav.product(hit), nav.ask(hit)],
      followUps: ["Bio Ace for sucking pests", "Get a quote"],
    };
  }

  if (/coffee/.test(q) && /nursery|seedling|coco/.test(q)) {
    return {
      title: "Coffee nursery from the brochure",
      summary:
        "The brochure does not print a named nursery kit. For media, Bloom Compost Culture ferments raw moist coco-peat (4 kg culture + 4 kg urea per tonne, 30-40 days). For biology in the root zone use Bio Sanjiveeni or Bhu Samruddhi. For damping-off use Bluderma (Trichoderma).",
      bullets: [explain(compost), explain(sanj), explain(blu)],
      links: [nav.product(compost), nav.product(sanj), nav.product(blu), nav.quote],
      followUps: ["AMC dose", "Coffee berry borer", "Get a quote"],
    };
  }

  if (/list|catalogue|catalog|products|what do you sell|range|other products/.test(q)) {
    return {
      title: "Product range",
      summary:
        "IIHR line: Bio Sanjiveeni (AMC powder), Bhu Samruddhi (AMC liquid), Bio Astra (ACT), Bluderma, Blumonas, Bio Vanish, Bio Erase, Bio Hit, Bio Ace, Bloom Compost Culture. Imported nutrition: Jackpot, Fulcare, Calcare, NutriCare C2. AscoGold is amino acids plus seaweed at 3 ml/L.",
      bullets: products.map((p) => `${p.name}: ${p.technology}`),
      links: [nav.products, nav.finder, nav.quote],
      followUps: ["What is AMC?", "Imported products", "Get a quote"],
    };
  }

  if (/import|jackpot|fulcare|calcare|nutricare|ascogold|humate|fulvic|seaweed/.test(q)) {
    const imported = products.filter((p) => p.imported || p.slug === "ascogold");
    return {
      title: "Nutrition packs",
      summary:
        "Jackpot, Fulcare, Calcare, and NutriCare C2 are imported. Jackpot, Fulcare, and Calcare say no repacking in India. AscoGold is 3 ml/L foliar (amino acids + Ascophyllum nodosum).",
      bullets: imported.map((p) => `${p.name}: ${p.short}`),
      links: [...imported.slice(0, 3).map(nav.product), nav.quote],
      followUps: ["Jackpot dose", "Calcare", "Get a quote"],
    };
  }

  if (/who are you|about the company|company overview|what is bloom/.test(q)) {
    return {
      title: "Bloom Biotech",
      summary: site.description,
      bullets: [
        "Green biotechnology. Production facility in Chikkamagaluru.",
        "First in India to licence AMC and Arka Fermented Cocopeat from IIHR. ACT in 2015.",
        `${site.addressLines.join(", ")}`,
        `${site.phoneDisplay} · ${site.email}`,
      ],
      links: [nav.about, nav.products, nav.call],
      followUps: ["What is AMC?", "Plant address & phone", "List of products"],
    };
  }

  const named = products.filter((p) => {
    const n = p.name.toLowerCase();
    const slug = p.slug.replace(/-/g, " ");
    return q.includes(n) || q.includes(slug) || p.aliases.some((a) => q.includes(a));
  });
  const picked = named.length ? named : matchProducts(q).slice(0, 4);

  if (picked.length === 1) {
    const p = picked[0];
    return {
      title: p.name,
      summary: `${p.short} ${p.body[0] ?? ""}`,
      bullets: [
        `${p.technology} · ${p.pack}`,
        `Actives: ${p.actives}`,
        `CFU: ${p.cfu}`,
        ...p.usage.map((u) => `${u.title}: ${u.text}`),
        p.precaution,
      ],
      links: [nav.product(p), nav.ask(p), nav.whatsapp],
      followUps: ["How do I get a quote?", "Other products", "What is AMC?"],
    };
  }

  if (picked.length > 1) {
    return {
      title: "What fits this query",
      summary: picked
        .slice(0, 4)
        .map((p) => p.name)
        .join(", "),
      bullets: picked.slice(0, 4).map(explain),
      links: [...picked.slice(0, 3).map(nav.product), nav.quote],
      followUps: ["What is AMC?", "How do I get a quote?"],
    };
  }

  return {
    title: "I don’t have that in the brochure",
    summary: `I only brief packs printed in the Bloom Biotech brochure. I will not invent a price or a yield percentage. WhatsApp ${site.whatsappDisplay} or email ${site.email}.`,
    bullets: [
      "Try Bio Sanjiveeni, Bhu Samruddhi, Bio Astra, Bluderma, or compost culture.",
      "Ask AMC dose for the 1 kg / 40 L and 10 ml/L figures.",
      "Imported line: Jackpot, Fulcare, Calcare, NutriCare C2.",
    ],
    links: [nav.products, nav.finder, nav.whatsapp],
    followUps: ["List of products", "What is AMC?", "Plant address & phone"],
  };
}

const pages = new Set([
  "/",
  "/products",
  "/solutions",
  "/about",
  "/enquire",
  "/faq",
  "/field",
  "/gallery",
  "/journal",
  "/assistant",
]);

/**
 * Whether a link the model wrote goes somewhere real. The model is told to
 * link site paths, and will happily invent /products/amc; a chip that lands
 * on a 404 is worse than no chip.
 */
export function isKnownHref(href: string) {
  if (/^(tel|mailto):/i.test(href)) return true;
  if (href === site.maps || href.startsWith("https://wa.me/")) return true;
  const path = href.split(/[?#]/)[0];
  if (pages.has(path)) return true;
  const m = path.match(/^\/(products|journal)\/([\w-]+)$/);
  if (!m) return false;
  return m[1] === "products"
    ? products.some((p) => p.slug === m[2])
    : articles.some((a) => a.slug === m[2]);
}

export function parseModelAnswer(raw: string, fallback: ChatAnswer): ChatAnswer {
  try {
    const jsonStart = raw.indexOf("{");
    const jsonEnd = raw.lastIndexOf("}");
    if (jsonStart < 0 || jsonEnd < 0) return compactText(raw, fallback);
    const parsed = JSON.parse(raw.slice(jsonStart, jsonEnd + 1)) as Partial<ChatAnswer>;
    const bullets = (parsed.bullets ?? []).map(String).filter(Boolean).slice(0, 7);
    const links = (Array.isArray(parsed.links) ? parsed.links : []).filter(
      (l): l is ChatLink =>
        !!l && typeof l.label === "string" && typeof l.href === "string" && isKnownHref(l.href),
    );
    const summary = String(parsed.summary || "").trim();
    if (!summary && !bullets.length) return compactText(raw, fallback);
    return {
      title: String(parsed.title || fallback.title).slice(0, 72),
      summary: summary || fallback.summary,
      bullets: bullets.length ? bullets : fallback.bullets,
      cta: parsed.cta ? String(parsed.cta).slice(0, 180) : fallback.cta,
      links: links.length ? links : fallback.links,
      followUps:
        Array.isArray(parsed.followUps) && parsed.followUps.length
          ? parsed.followUps.map(String).slice(0, 4)
          : fallback.followUps,
    };
  } catch {
    return compactText(raw, fallback);
  }
}

function compactText(raw: string, fallback: ChatAnswer): ChatAnswer {
  const parts = raw
    .split(/\n+/)
    .map((s) => s.replace(/^[-*•]\s*/, "").trim())
    .filter((s) => s.length > 20);
  if (!parts.length) return fallback;
  return {
    ...fallback,
    summary: parts.slice(0, 2).join(" "),
    bullets: parts.slice(2, 8).length ? parts.slice(2, 8) : fallback.bullets,
  };
}

export const assistantSystemPrompt = `You are Ask Bloom AI for Bloom Biotech, Chikkamagaluru.

Facts only from the knowledge excerpts (company brochure). Do not invent prices, yield percentages, GST numbers, or products not listed.

Return ONLY JSON:
{
  "title": "short heading",
  "summary": "3 to 6 sentences from the brochure.",
  "bullets": ["doses, CFU, actives, precautions"],
  "cta": "one next step",
  "links": [{"label":"human label","href":"/products/..."}],
  "followUps": ["up to 4 short follow-up questions"]
}

Rules:
- Bio Sanjiveeni = AMC powder. Bhu Samruddhi = AMC liquid. Bio Astra = ACT (Streptomyces), licensed 2015.
- Compost Culture doses: coffee pulp 2 kg/MT; FYM 3 kg/MT; green leaf 1 kg/MT; coco-peat 4 kg culture + 4 kg urea / MT.
- href must be a site path. No em dashes. Do not claim to place an order.
- Product pages are /products/<slug>, with slug one of: ${products.map((p) => p.slug).join(", ")}. Each has an enquiry form at /products/<slug>#enquire. Other pages: /products, /solutions#find, /enquire, /about, /faq.
- Write pack names exactly as listed, the phone ${site.phoneDisplay}, the WhatsApp number ${site.whatsappDisplay} and email ${site.email} in full: they become links on screen.
`;
