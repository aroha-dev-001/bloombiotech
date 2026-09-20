/**
 * Crop / need / application taxonomy.
 *
 * IMPORTANT — nothing in this file is a new factual claim.
 *
 * The Bloom brochure carries no crop-to-product recommendation table, so the
 * index below is *derived* from fields that are already printed on the pack and
 * transcribed in `lib/products.ts`:
 *
 *   needs[]         <- product.targets, product.technology, product.benefits
 *   applications[]  <- product.use and product.usage[].title
 *   crops           <- product.crops (most packs print "Suitable for all crops")
 *
 * Each crop profile carries a `basis` line naming the printed source that ties
 * the crop to Bloom. Where the brochure is silent, the crop is described only
 * through what the packs themselves say, never through agronomy we invented.
 */

import { products, type Product } from "./products";

/* ------------------------------------------------------------------ needs */

export type NeedId =
  | "disease"
  | "pests"
  | "nematodes"
  | "nutrition"
  | "root-health"
  | "soil-biology"
  | "composting";

export type Need = {
  id: NeedId;
  label: string;
  short: string;
  /** Plain-language line a grower would recognise. */
  question: string;
};

export const needs: readonly Need[] = [
  {
    id: "disease",
    label: "Disease management",
    short: "Disease",
    question: "Wilt, root rot, damping-off, leaf spot or blight",
  },
  {
    id: "pests",
    label: "Pest management",
    short: "Pests",
    question: "Borers, grubs, termites, mealy bugs, thrips or mites",
  },
  {
    id: "nematodes",
    label: "Nematode management",
    short: "Nematodes",
    question: "Root-knot, cyst, lesion or burrowing nematodes",
  },
  {
    id: "nutrition",
    label: "Better nutrition",
    short: "Nutrition",
    question: "Nutrient uptake, micronutrients, calcium or humates",
  },
  {
    id: "root-health",
    label: "Root health",
    short: "Roots",
    question: "Rooting, establishment and transplant vigour",
  },
  {
    id: "soil-biology",
    label: "Soil biology",
    short: "Soil biology",
    question: "Living soil, organic carbon and microbial activity",
  },
  {
    id: "composting",
    label: "Composting",
    short: "Composting",
    question: "Coffee pulp, FYM, green waste or coco-peat to compost",
  },
] as const;

/* ----------------------------------------------------------- applications */

export type ApplicationId = "soil" | "drip" | "foliar" | "compost";

export type Application = {
  id: ApplicationId;
  label: string;
  /** The printed route this maps to in the brochure usage block. */
  route: string;
};

export const applications: readonly Application[] = [
  { id: "soil", label: "Soil", route: "Soil drenching" },
  { id: "drip", label: "Drip", route: "Drip fertigation" },
  { id: "foliar", label: "Foliar", route: "Foliar spray" },
  { id: "compost", label: "Compost", route: "FYM, compost or neem cake enrichment" },
] as const;

/* ------------------------------------------------------------- the index */

type Tags = { needs: NeedId[]; applications: ApplicationId[] };

/**
 * Per-pack tags. Every entry is justified by the product record it sits beside;
 * the comment names the printed field it was read from.
 */
const index: Record<string, Tags> = {
  // AMC carrier: Azotobacter + P/Zn solubilisers + Pseudomonas; targets soil fungi.
  "bio-sanjiveeni": {
    needs: ["soil-biology", "root-health", "nutrition", "disease"],
    applications: ["soil", "compost", "drip"],
  },
  // Liquid AMC: same organisms, 10 ml/L foliar and drip.
  "bhu-samruddhi": {
    needs: ["soil-biology", "root-health", "nutrition", "disease"],
    applications: ["foliar", "drip"],
  },
  // ACT: Streptomyces antibiotics in the root zone, plus IAA and gibberellins.
  "bio-astra": {
    needs: ["disease", "root-health", "soil-biology"],
    applications: ["soil", "compost", "drip"],
  },
  // Trichoderma: damping-off, wilt, root rot, charcoal rot, collar rot.
  bluderma: { needs: ["disease"], applications: ["soil", "compost"] },
  // Pseudomonas fluorescens: soil-borne and foliar disease, growth promoter.
  blumonas: { needs: ["disease", "root-health"], applications: ["soil", "compost"] },
  // Pochonia chlamydosporia: bio nematicide.
  "bio-vanish": { needs: ["nematodes"], applications: ["soil", "compost"] },
  // Metarhizium: termites, root grubs, soil insects.
  "bio-erase": { needs: ["pests"], applications: ["soil", "compost"] },
  // Beauveria: coffee berry borer, caterpillars, mealy bugs.
  "bio-hit": { needs: ["pests"], applications: ["soil", "compost"] },
  // Verticillium lecanii: mealy bugs, thrips, aphids, whiteflies, mites.
  "bio-ace": { needs: ["pests"], applications: ["soil", "compost"] },
  // AFC culture: coffee pulp, FYM, green leaf, coco-peat windrows.
  "bloom-compost-culture": {
    needs: ["composting", "soil-biology"],
    applications: ["compost"],
  },
  // Potassium humate: rooting, nutrient uptake, soil conditioner.
  jackpot: {
    needs: ["nutrition", "root-health", "soil-biology"],
    applications: ["foliar", "soil"],
  },
  // Potassium fulvate: chelation, adventitious roots, raises soil organic carbon.
  fulcare: {
    needs: ["nutrition", "root-health", "soil-biology"],
    applications: ["foliar", "soil"],
  },
  // Fulvic + 30% EDTA calcium: cell walls, new roots; manure enrichment route.
  calcare: {
    needs: ["nutrition", "root-health"],
    applications: ["foliar", "soil", "compost"],
  },
  // EDTA chelated micronutrients: foliar or drip, 1-2 kg/ha.
  "nutricare-c2": { needs: ["nutrition"], applications: ["foliar", "drip"] },
  // Amino acids + Ascophyllum nodosum: root and shoot growth, stress support.
  ascogold: {
    needs: ["nutrition", "root-health"],
    applications: ["foliar", "drip"],
  },
};

export function needsOf(product: Product): NeedId[] {
  return index[product.slug]?.needs ?? [];
}

export function applicationsOf(product: Product): ApplicationId[] {
  return index[product.slug]?.applications ?? [];
}

/* ----------------------------------------------------------------- crops */

export type CropId =
  | "coffee"
  | "black-pepper"
  | "pomegranate"
  | "floriculture"
  | "other";

export type Crop = {
  id: CropId;
  name: string;
  /** Kannada name, as printed on Bloom packs. */
  kn?: string;
  glyph: string;
  photo: string;
  alt: string;
  /** One line on why this crop is on the list — always a printed source. */
  basis: string;
  /** Needs this crop is commonly worked on with Bloom packs. */
  needs: NeedId[];
  /** Packs named for this crop in the brochure, not merely "all crops". */
  named: string[];
};

export const crops: readonly Crop[] = [
  {
    id: "coffee",
    name: "Coffee",
    kn: "ಕಾಫಿ",
    glyph: "☕",
    photo: "/photos/coffee.jpg",
    alt: "Ripening coffee berries on the branch",
    basis:
      "The production unit sits in coffee land, Chikkamagaluru. Bio Hit prints coffee berry borer as a target, and Bloom Compost Culture prints a coffee pulp windrow dose of 2 kg per MT.",
    needs: ["composting", "pests", "soil-biology", "root-health"],
    named: ["bio-hit", "bloom-compost-culture", "bio-sanjiveeni"],
  },
  {
    id: "black-pepper",
    name: "Black pepper",
    kn: "ಕಾಳು ಮೆಣಸು",
    glyph: "🌶",
    photo: "/photos/pepper.jpg",
    alt: "Black pepper spike ripening on the vine",
    basis:
      "The brochure names black pepper among the commercial crops where AMC has been accepted as part of crop protection management.",
    needs: ["disease", "root-health", "soil-biology", "nematodes"],
    named: ["bio-sanjiveeni", "bhu-samruddhi"],
  },
  {
    id: "pomegranate",
    name: "Pomegranate",
    kn: "ದಾಳಿಂಬೆ",
    glyph: "🍎",
    photo: "/photos/pomegranate.jpg",
    alt: "Pomegranate fruit ripening on the tree",
    basis:
      "The brochure names pomegranate among the commercial crops where AMC has been accepted as part of crop protection management. The Bhu Samruddhi label carries a pomegranate.",
    needs: ["disease", "nutrition", "root-health", "soil-biology"],
    named: ["bio-sanjiveeni", "bhu-samruddhi"],
  },
  {
    id: "floriculture",
    name: "Floriculture",
    kn: "ಪುಷ್ಪ ಕೃಷಿ",
    glyph: "🌸",
    photo: "/photos/seedling.jpg",
    alt: "A young seedling raised in nursery media",
    basis:
      "The brochure names floriculture among the commercial crops where AMC has been accepted as part of crop protection management.",
    needs: ["disease", "pests", "root-health", "nutrition"],
    named: ["bio-sanjiveeni", "bhu-samruddhi"],
  },
  {
    id: "other",
    name: "Other crops",
    kn: "ಇತರ ಬೆಳೆಗಳು",
    glyph: "🌾",
    photo: "/plant/aerial-fields.jpg",
    alt: "Farmland around the Bloom Biotech production unit",
    basis:
      "Most Bloom packs print “suitable for all crops”. Fruit, vegetable, flower and field crops are named on the nutrition line.",
    needs: ["disease", "pests", "nematodes", "nutrition", "root-health", "soil-biology", "composting"],
    named: [],
  },
] as const;

export function getCrop(id: string) {
  return crops.find((c) => c.id === id);
}

export function getNeed(id: string) {
  return needs.find((n) => n.id === id);
}

/** True when the pack prints "All crops" rather than a named crop list. */
export function suitsAllCrops(product: Product) {
  return product.crops.some((c) => /all crops/i.test(c));
}

/**
 * Packs relevant to a crop. A pack qualifies if it is named for the crop, or if
 * its label prints "suitable for all crops". Named packs sort first.
 */
export function productsForCrop(cropId: CropId): Product[] {
  const crop = getCrop(cropId);
  if (!crop) return [];
  const named = new Set(crop.named);
  return products
    .filter((p) => named.has(p.slug) || suitsAllCrops(p) || cropId === "other")
    .sort((a, b) => Number(named.has(b.slug)) - Number(named.has(a.slug)));
}

export type FinderQuery = {
  crop?: CropId;
  need?: NeedId;
  application?: ApplicationId;
};

/**
 * How strongly a pack answers a crop.
 *
 *   named    — the brochure or the label ties this pack to this crop.
 *   match    — the pack addresses one of the needs that crop is worked on for.
 *   suitable — the label prints "suitable for all crops" and nothing more.
 *
 * The distinction matters because 13 of the 15 packs print "all crops", so a
 * plain crop filter returns almost the whole catalogue and helps nobody.
 */
export type Tier = "named" | "match" | "suitable";

export type Ranked = {
  product: Product;
  tier: Tier;
  /** Why this pack is on the list, in the grower's own terms. */
  reason: string;
  /** Crop needs this pack actually addresses. */
  matched: NeedId[];
};

const tierRank: Record<Tier, number> = { named: 0, match: 1, suitable: 2 };

/** How many of the shortlist we show before "show all". */
export const SHORTLIST = 6;

/**
 * Rank the catalogue for a crop, optionally narrowed by need and route.
 *
 * With a need chosen the filter is strict — the pack either targets it or it
 * does not. Without one, everything suitable is returned but tiered, so the UI
 * can lead with the packs that actually belong to this crop.
 */
export function rankForCrop({ crop, need, application }: FinderQuery): Ranked[] {
  const cropRecord = crop ? getCrop(crop) : undefined;
  const named = new Set(cropRecord?.named ?? []);
  const cropNeeds = new Set<NeedId>(cropRecord?.needs ?? []);

  return products
    .filter((p) => {
      if (crop && crop !== "other" && !named.has(p.slug) && !suitsAllCrops(p))
        return false;
      if (need && !needsOf(p).includes(need)) return false;
      if (application && !applicationsOf(p).includes(application)) return false;
      return true;
    })
    .map((p): Ranked => {
      const matched = needsOf(p).filter((n) => cropNeeds.has(n));

      if (named.has(p.slug)) {
        return {
          product: p,
          tier: "named",
          matched,
          reason: cropRecord
            ? `Named for ${cropRecord.name.toLowerCase()}`
            : "Named pack",
        };
      }

      if (matched.length) {
        const labels = matched
          .map((n) => getNeed(n)?.short.toLowerCase())
          .filter(Boolean);
        return {
          product: p,
          tier: "match",
          matched,
          reason: labels.join(" · "),
        };
      }

      return {
        product: p,
        tier: "suitable",
        matched,
        reason: "Suitable for all crops",
      };
    })
    .sort((a, b) => {
      const byTier = tierRank[a.tier] - tierRank[b.tier];
      if (byTier) return byTier;
      // More of the crop's needs answered wins.
      const byMatch = b.matched.length - a.matched.length;
      if (byMatch) return byMatch;
      // Then the licensed consortia, which are the core of the line.
      const rank = (p: Product) => (p.category === "Consortium" ? 0 : 1);
      return rank(a.product) - rank(b.product);
    });
}

/**
 * Split a ranking into the shortlist a grower should read first and the rest.
 * A chosen need already narrows hard, so nothing is held back in that case.
 */
export function shortlist(ranked: Ranked[], need?: NeedId) {
  if (need) return { lead: ranked, rest: [] as Ranked[] };
  const strong = ranked.filter((r) => r.tier !== "suitable");
  const lead = (strong.length ? strong : ranked).slice(0, SHORTLIST);
  const leadSet = new Set(lead.map((r) => r.product.slug));
  return { lead, rest: ranked.filter((r) => !leadSet.has(r.product.slug)) };
}

/** Flat list, kept for the catalogue filters which want no tiering. */
export function recommend(query: FinderQuery): Product[] {
  return rankForCrop(query).map((r) => r.product);
}
