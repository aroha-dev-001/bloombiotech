import { media } from "./media";

/**
 * Facts about the Chikkamagaluru production unit.
 *
 * Sources, in order of authority:
 *  - the printed Bloom Biotech brochure (media/brochure-1.pdf)
 *  - the plant signboard and footage in media/ (drone + fermentation hall)
 *  - the physical pack labels photographed in media/
 * Nothing here is inferred. If it is not printed somewhere, it is not written here.
 */

export const plant = {
  /** Printed on the signboard at the production unit gate. */
  unitAddress:
    "Sy. No. 259/1, Hampapura Bypass Road, Beekanahalli Village, Joythinagar, Chikkamagalur 577102",
  gstin: "29BZPPM7901K2ZM",
  /** Address printed on the brochure back cover. */
  officeAddress:
    "Assessment Number 10, 5th Phase KHB Colony, CMC Ward No. 1, K.M. Road, Chikkamagaluru 577102",
} as const;

export type Chapter = {
  index: string;
  title: string;
  lede: string;
  detail: string;
  still: string;
  alt: string;
};

/** The making of a pack, told with the frames that exist in the plant footage. */
export const chapters: readonly Chapter[] = [
  {
    index: "01",
    title: "Licensed strains",
    lede: "The biology is not ours to invent. It is licensed.",
    detail:
      "Arka Microbial Consortium, Arka Actino Consortium and Arka Fermented Cocopeat are ICAR-IIHR technologies. Bloom Biotech was the first company in India to licence AMC and Arka Fermented Cocopeat, in 2013, and the first to licence ACT, in 2015.",
    still: "/film/brand-sign.jpg",
    alt: "The Bloom Biotech sign mounted on the production unit at Beekanahalli",
  },
  {
    index: "02",
    title: "Fermentation",
    lede: "Stainless steel, jacketed, instrumented.",
    detail:
      "The hall runs banks of Scigenics stainless-steel fermenters with their own control panels, sterile air lines and a gowning room off the floor. Liquid consortia are grown here before they ever meet a bottle.",
    still: "/film/fermentation.jpg",
    alt: "Stainless steel fermenters in the Bloom Biotech production hall",
  },
  {
    index: "03",
    title: "Two formulations",
    lede: "Carrier for the soil. Liquid for the line.",
    detail:
      "Every consortium leaves the plant in one of two forms: a carrier powder for drenching and FYM enrichment, or a liquid for foliar spray and drip fertigation. The same organisms, two delivery routes.",
    still: "/film/products-lineup.jpg",
    alt: "Carrier and liquid packs photographed together: Blumonas, Bhu Samruddhi, Bio Astra and Root Care",
  },
  {
    index: "04",
    title: "Counted, not claimed",
    lede: "Every pack states its colony count.",
    detail:
      "CFU is printed on the pack, per gram for carrier and per millilitre for liquid — 1 × 10⁷ for Bio Astra carrier, 1 × 10⁹ for Bluderma liquid, and so on down the line. Bio Sanjiveeni and Bio Astra carry a six-month expiry from the month of manufacture.",
    still: "/film/fermentation-vessels.jpg",
    alt: "Fermentation vessels and their control panels on the production floor",
  },
  {
    index: "05",
    title: "Packed and marked",
    lede: "Batch, date, licence, mark.",
    detail:
      "Labels carry batch number, month and year of manufacture, expiry, maximum retail price, net content, licence number and CIBRC registration number, alongside the 100% Organic, ICAR and IIHR marks and the line: R&D by Indian Institute of Horticultural Research.",
    still: "/packs/can-bhu-samruddhi.jpg",
    alt: "Bhu Samruddhi liquid Arka Microbial Consortium can with its printed label",
  },
];

export type Capability = {
  index: string;
  title: string;
  /** One line for the card. `body` is the full sentence, shown when opened. */
  short: string;
  body: string;
  meta: string[];
};

export const capabilities: readonly Capability[] = [
  {
    index: "01",
    title: "Liquid fermentation",
    short: "Stainless-steel fermenters grow the liquid consortia and biocontrols.",
    body: "Scigenics stainless-steel fermenters with dedicated control panels and sterile air, feeding the liquid consortia and biocontrol lines.",
    meta: ["Bhu Samruddhi", "Bio Astra liquid", "Bluderma", "Blumonas"],
  },
  {
    index: "02",
    title: "Carrier formulation",
    short: "Powder packs for drenching, compost, neem cake and drip.",
    body: "Powder formulations on a carrier base for soil drenching, FYM and compost enrichment, neem cake enrichment and filtered drip fertigation.",
    meta: ["Bio Sanjiveeni", "Bio Astra carrier", "Compost culture"],
  },
  {
    index: "03",
    title: "Entomopathogens",
    short: "Natural fungi against soil insects, sucking pests and nematodes.",
    body: "Metarhizium, Beauveria, Verticillium and Pochonia produced as both carrier and liquid for soil insects, sucking pests and nematodes.",
    meta: ["Bio Erase", "Bio Hit", "Bio Ace", "Bio Vanish"],
  },
  {
    index: "04",
    title: "Composting programmes",
    short: "A culture that turns farm waste into compost in 30-45 days.",
    body: "Arka Fermented Cocopeat culture for coffee pulp, farmyard manure, green waste and raw coco-peat, on windrow beds that mature in 30 to 45 days.",
    meta: ["Coffee pulp 2 kg/MT", "FYM 3 kg/MT", "Coco-peat 4 kg/MT"],
  },
  {
    index: "05",
    title: "Crop nutrition",
    short: "An imported range: humate, fulvate, calcium, micronutrients, seaweed.",
    body: "An imported nutrition line — potassium humate and fulvate, EDTA calcium, chelated micronutrients and seaweed amino acids — held to the printed analysis on each pack.",
    meta: ["Jackpot", "Fulcare", "Calcare", "NutriCare C2", "AscoGold"],
  },
  {
    index: "06",
    title: "Technical assistance",
    short: "Dose by crop, route and pack, quoted from the plant.",
    body: "The brochure mission is products plus technical assistance: dose by crop, route and pack, quoted from the plant rather than sold from a shelf.",
    meta: ["Farmers", "Dealers", "Estates", "KVKs"],
  },
];

export type Assurance = { label: string; value: string; note: string };

export const assurances: readonly Assurance[] = [
  {
    label: "Technology",
    value: "ICAR-IIHR",
    note: "Technological collaboration with the Indian Institute of Horticultural Research. AMC, ACT and Arka Fermented Cocopeat are licensed IIHR technologies, printed as R&D by IIHR on the pack.",
  },
  {
    label: "Organic",
    value: "100% Organic",
    note: "Licensed AMC packs carry the 100% Organic mark alongside the ICAR and IIHR marks. Bhu Samruddhi is printed as certified for use in organic agriculture.",
  },
  {
    label: "Traceability",
    value: "Batch + expiry",
    note: "Batch number, month and year of manufacture, expiry date, maximum retail price and net content are printed on every can and pouch, with licence and CIBRC registration numbers.",
  },
  {
    label: "Colony count",
    value: "CFU on pack",
    note: "Combined colony forming units are declared per gram for carrier and per millilitre for liquid. Where the pack in hand differs from the brochure, the pack wins.",
  },
  {
    label: "Compatibility",
    value: "Mixing rules",
    note: "AMC and compost culture must not be mixed with antibiotics, pesticides or insecticides. The biocontrol line must not be mixed with fungicides, pesticides or insecticides.",
  },
  {
    label: "Storage",
    value: "Cool and dry",
    note: "Store away from direct sunlight. NutriCare C2 and AscoGold stay in the original pack below 25°C. Bio Sanjiveeni and Bio Astra state six months from manufacture.",
  },
];

export type Film = {
  src: string;
  poster: string;
  title: string;
  note: string;
  ratio: string;
};

export const films: readonly Film[] = [
  {
    src: media("/film/plant-aerial-full.mp4"),
    poster: media("/film/plant-aerial-full.jpg"),
    title: "The unit from the air",
    note: "Beekanahalli Village, Chikkamagaluru. Production sheds, drying yard and the fields that surround them.",
    ratio: "20 / 11",
  },
  {
    src: media("/film/fermentation-full.mp4"),
    poster: media("/film/fermentation-full.jpg"),
    title: "Inside the fermentation hall",
    note: "Stainless-steel fermenters, control panels and the gowning room where the liquid line is grown.",
    ratio: "53 / 30",
  },
];

export type Plate = {
  src: string;
  alt: string;
  label: string;
  caption: string;
  /** Intrinsic pixels, so the viewer never upscales a frame past ~1.5x. */
  w: number;
  h: number;
};

export const plates: readonly Plate[] = [
  {
    src: "/plant/aerial-wide.jpg",
    alt: "Aerial photograph of the Bloom Biotech production unit among fields and a lake",
    label: "Aerial",
    caption: "The production unit, drying yard and the farms around it.",
    w: 1368,
    h: 770,
  },
  {
    src: "/plant/hall-wide.jpg",
    alt: "Wide view of the fermentation hall with several stainless steel vessels",
    label: "Hall",
    caption: "The fermentation floor, end to end.",
    w: 848,
    h: 480,
  },
  {
    src: "/plant/sign.jpg",
    alt: "Bloom Biotech signboard listing the survey number and GSTIN",
    label: "Gate",
    caption: "Sy. No. 259/1, Hampapura Bypass Road, Beekanahalli Village.",
    w: 640,
    h: 352,
  },
  {
    src: "/plant/reactor.jpg",
    alt: "Close view of a Scigenics stainless steel fermenter",
    label: "Fermenter",
    caption: "Scigenics vessel with its own panel and sterile air line.",
    w: 848,
    h: 480,
  },
  {
    src: "/packs/can-bhu-samruddhi.jpg",
    alt: "Bhu Samruddhi liquid Arka Microbial Consortium can",
    label: "Bhu Samruddhi",
    caption: "Liquid Arka Microbial Consortium, 5 L can.",
    w: 837,
    h: 1100,
  },
  {
    src: "/packs/can-bluderma.jpg",
    alt: "Bluderma liquid Trichoderma can",
    label: "Bluderma",
    caption: "Liquid Trichoderma harzianum / viride.",
    w: 779,
    h: 1100,
  },
  {
    src: "/packs/can-blumonas.jpg",
    alt: "Blumonas liquid Pseudomonas can",
    label: "Blumonas",
    caption: "Liquid Pseudomonas fluorescens.",
    w: 831,
    h: 1100,
  },
  {
    src: "/packs/can-bio-astra.jpg",
    alt: "Bio Astra Arka Actino Consortium can, label side",
    label: "Bio Astra",
    caption: "Arka Actino Consortium — three Streptomyces strains.",
    w: 825,
    h: 1100,
  },
  {
    src: "/plant/front.jpg",
    alt: "Front elevation of the Bloom Biotech production shed",
    label: "Elevation",
    caption: "The shed front, morning light.",
    w: 640,
    h: 352,
  },
  {
    src: "/packs/can-root-care.jpg",
    alt: "Root Care liquid PSB can",
    label: "Root Care",
    caption: "Root Care — liquid phosphate solubilising bacteria.",
    w: 825,
    h: 1100,
  },
];

/** Application routes, straight from the brochure usage blocks. */
export const routes = [
  {
    index: "01",
    name: "Soil drench",
    short: "Drench the whole root zone.",
    dose: "1 kg in 40 L of water",
    body: "Mix and drench the entire root system. The standard route for Bio Sanjiveeni, Bio Astra and the biocontrol carriers.",
    photo: "/farm/application.jpg",
    alt: "Mixing carrier powder into water and drenching the root zone of a seedling",
  },
  {
    index: "02",
    name: "FYM or compost",
    short: "Mix in, then apply to soil after 7-10 days.",
    dose: "5–10 kg in 1 MT of FYM",
    body: "Enrich farmyard manure or compost, then apply to the soil after 7 to 10 days. Biocontrols go in at 10 kg per tonne.",
    photo: "/farm/compost.jpg",
    alt: "Mixing carrier powder into a farmyard manure heap before field application",
  },
  {
    index: "03",
    name: "Drip fertigation",
    short: "Always filter first. It protects the emitters.",
    dose: "1 kg in 40 L, filtered",
    body: "Mix, filter the solution, then fertigate through the drip line. Filtering is not optional — it protects the emitters.",
    photo: "/farm/drip.jpg",
    alt: "Filtering mixed consortium through cloth into a tank feeding a drip line",
  },
  {
    index: "04",
    name: "Liquid",
    short: "Bhu Samruddhi, as a spray or through drip.",
    dose: "10 ml per litre",
    body: "Bhu Samruddhi as foliar spray or through drip. Same three AMC organisms as the powder, delivered in liquid.",
    photo: "/farm/foliar.jpg",
    alt: "Measuring liquid consortium into a sprayer for foliar application",
  },
] as const;
