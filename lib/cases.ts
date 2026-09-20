/**
 * Field records — "Bloom Biotech in the Field".
 *
 * NOTHING HERE IS A RESULT CLAIM.
 *
 * The brochure carries no case studies, no trial data and no farmer results, so
 * every observation field below is an explicit placeholder in square brackets.
 * The structure is the deliverable: drop a real record in and it renders.
 *
 * Only two things in each record are real today:
 *   - `crop` and `region`, taken from the brochure line naming the commercial
 *     crops where AMC is used across Karnataka;
 *   - `stages[]`, which are the printed application routes photographed at the
 *     plant, labelled as what the photographs actually show.
 *
 * `status: "pending"` drives the UI to mark the record as awaiting field data.
 * Set it to "published" only when every bracketed field has been replaced.
 */

export type CaseStage = {
  key: "before" | "during" | "after";
  label: string;
  /** Null until a real photograph of this stage exists. */
  photo: string | null;
  alt: string;
  caption: string;
};

export type FieldCase = {
  slug: string;
  crop: string;
  cropId: string;
  region: string;
  status: "pending" | "published";
  /** Printed source that puts this crop on the record at all. */
  basis: string;
  challenge: string;
  solution: string;
  /** Packs indicated for this record — real product slugs. */
  products: string[];
  application: string;
  duration: string;
  result: string;
  stages: CaseStage[];
};

const pendingPhoto = (label: string): CaseStage => ({
  key: "before",
  label,
  photo: null,
  alt: "",
  caption: "[Photograph pending]",
});

export const fieldCases: readonly FieldCase[] = [
  {
    slug: "pomegranate-karnataka",
    crop: "Pomegranate",
    cropId: "pomegranate",
    region: "Karnataka",
    status: "pending",
    basis:
      "The brochure names pomegranate among the commercial crops where AMC has been accepted as part of crop protection management, through work across Karnataka with IIHR scientists.",
    challenge: "[Challenge]",
    solution: "[Solution]",
    products: ["bio-sanjiveeni", "bhu-samruddhi"],
    application: "[Application]",
    duration: "[Duration]",
    result: "[Observed result]",
    stages: [
      { ...pendingPhoto("Before"), key: "before" },
      {
        key: "during",
        label: "During",
        photo: "/farm/application.jpg",
        alt: "Carrier consortium mixed into water and drenched over the root zone",
        caption: "Soil drench — 1 kg in 40 L of water over the root system.",
      },
      { ...pendingPhoto("After"), key: "after" },
    ],
  },
  {
    slug: "black-pepper-karnataka",
    crop: "Black pepper",
    cropId: "black-pepper",
    region: "Karnataka",
    status: "pending",
    basis:
      "The brochure names black pepper among the commercial crops where AMC has been accepted as part of crop protection management.",
    challenge: "[Challenge]",
    solution: "[Solution]",
    products: ["bio-sanjiveeni", "bluderma"],
    application: "[Application]",
    duration: "[Duration]",
    result: "[Observed result]",
    stages: [
      { ...pendingPhoto("Before"), key: "before" },
      {
        key: "during",
        label: "During",
        photo: "/farm/compost.jpg",
        alt: "Carrier consortium mixed into a farmyard manure heap before field application",
        caption: "FYM enrichment — 5-10 kg in 1 MT, applied after 7-10 days.",
      },
      { ...pendingPhoto("After"), key: "after" },
    ],
  },
  {
    slug: "coffee-chikkamagaluru",
    crop: "Coffee",
    cropId: "coffee",
    region: "Chikkamagaluru",
    status: "pending",
    basis:
      "Bloom Compost Culture prints a coffee pulp windrow dose of 2 kg per MT, maturing in 30-45 days. The production unit is in coffee land, Chikkamagaluru.",
    challenge: "[Challenge]",
    solution: "[Solution]",
    products: ["bloom-compost-culture", "bio-hit"],
    application: "[Application]",
    duration: "[Duration]",
    result: "[Observed result]",
    stages: [
      { ...pendingPhoto("Before"), key: "before" },
      {
        key: "during",
        label: "During",
        photo: "/farm/drip.jpg",
        alt: "Mixed consortium filtered through cloth into a tank feeding a drip line",
        caption: "Drip fertigation — mixed, filtered, then run through the line.",
      },
      { ...pendingPhoto("After"), key: "after" },
    ],
  },
] as const;

export function getCase(slug: string) {
  return fieldCases.find((c) => c.slug === slug);
}

/** A bracketed field is a placeholder, not content. */
export function isPlaceholder(value: string) {
  return /^\[.*\]$/.test(value.trim());
}
