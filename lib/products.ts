export type UsageStep = { title: string; text: string };

export type Product = {
  slug: string;
  name: string;
  aliases: string[];
  category: "Consortium" | "Biocontrol" | "Compost" | "Nutrition";
  technology: string;
  short: string;
  crops: string[];
  use: string;
  pack: string;
  photo: string;
  actives: string;
  cfu: string;
  targets: string;
  usage: UsageStep[];
  precaution: string;
  storage: string;
  imported?: boolean;
  benefits?: string[];
  specs?: { label: string; value: string }[];
  body: string[];
};

const soilFungi =
  "Pythium spp., Phytophthora spp., Rhizoctonia solani, Fusarium spp., Botrytis cinerea, Sclerotium spp., Sclerotinia sp., Ustilago spp.";

const coolDry =
  "Store in a cool, dry place away from direct sunlight.";

const noChem =
  "Do not mix with antibiotics, pesticides, or insecticides.";

const noFung =
  "Do not mix with fungicides, pesticides, or insecticides.";

const drench40 = (name: string) => ({
  title: "Soil drenching",
  text: `Mix 1 kg of ${name} in 40 L of water and drench the entire root system.`,
});

const fym10 = (name: string) => ({
  title: "FYM or compost enrichment",
  text: `Mix 10 kg of ${name} in 1 MT of FYM or compost and apply to soil after 7-10 days.`,
});

const fym5to10 = (name: string) => ({
  title: "FYM or compost enrichment",
  text: `Mix 5-10 kg of ${name} in 1 MT of FYM or compost and apply to soil after 7-10 days.`,
});

const drip40 = (name: string) => ({
  title: "Drip fertigation",
  text: `Mix 1 kg of ${name} in 40 L of water, filter the solution, and apply through drip irrigation.`,
});

const neem = (name: string) => ({
  title: "Neem cake enrichment",
  text: `Mix 1 kg of ${name} in 50 kg of neem cake and apply to soil after 1 week.`,
});

export const products: Product[] = [
  {
    slug: "bio-sanjiveeni",
    name: "Bio Sanjiveeni",
    aliases: ["bio sanjeevini", "sanjeevini", "sanjiveeni", "amc", "arka microbial consortium"],
    category: "Consortium",
    technology: "Arka Microbial Consortium (AMC) · carrier",
    short:
      "Powder AMC from IIHR: Azotobacter, P and Zn solubilizers, and Pseudomonas in one pack. Bloom was the first company in India to licence AMC.",
    crops: ["All crops", "Pomegranate", "Black pepper", "Floriculture", "Coffee"],
    use: "Soil drench, FYM or compost enrichment, drip fertigation",
    pack: "Carrier pouch (label pack 5 kg). Expiry 6 months from manufacture.",
    photo: "/catalogue/bio-sanjiveeni.jpg",
    actives: "Pseudomonas taiwanensis, Azotobacter tropicalis, Bacillus aryabhattai",
    cfu: "Combined CFU ≥ 1 × 10⁹ per g (brochure). Pack label may print > 1 × 10⁸ per g; follow the pack in hand.",
    targets: soilFungi,
    usage: [drench40("Bio Sanjiveeni"), fym5to10("Bio Sanjiveeni"), drip40("Bio Sanjiveeni")],
    precaution: noChem,
    storage: coolDry,
    body: [
      "Bio Sanjiveeni is the carrier (powder) formulation of Arka Microbial Consortium developed by ICAR-IIHR. It puts compatible strains of Azotobacter, phosphorus and zinc solubilizing bacteria, and Pseudomonas in one formulation so separate N-fixer, PSB, and Pseudomonas packets are not required.",
      "Regular use is described as helping control soil-borne disease and strengthening the plant immune system. Certified for organic agriculture on the pack (100% Organic / Jaivik Bharat marks).",
      "Bloom Biotech started in 2013 and states it was the first company in India to licence AMC and Arka Fermented Cocopeat from IIHR.",
    ],
  },
  {
    slug: "bhu-samruddhi",
    name: "Bhu Samruddhi",
    aliases: ["bhu samruddhi", "liquid amc", "liquid arka", "amc liquid"],
    category: "Consortium",
    technology: "Liquid Arka Microbial Consortium (AMC)",
    short:
      "Liquid AMC from IIHR. Same consortium idea as Bio Sanjiveeni, applied at 10 ml per litre as foliar spray or drip.",
    crops: ["All crops"],
    use: "Foliar spray and drip fertigation at 10 ml/L",
    pack: "Liquid bottle",
    photo: "/catalogue/bhu-samruddhi.jpg",
    actives: "Pseudomonas taiwanensis, Azotobacter tropicalis, Bacillus aryabhattai",
    cfu: "Combined CFU ≥ 1 × 10⁸ per ml",
    targets: soilFungi,
    usage: [
      {
        title: "Foliar spray and drip fertigation",
        text: "10 ml per litre.",
      },
    ],
    precaution: noChem,
    storage: coolDry,
    benefits: [
      "Biological nitrogen fixation, phosphorus and zinc solubilization, and disease control in one formulation.",
      "Patented technology from IIHR.",
      "Effective against soil-borne fungal and bacterial pathogens.",
      "Described as environmentally friendly and non-hazardous to humans, livestock, and wildlife.",
      "Certified for organic agriculture.",
    ],
    body: [
      "Bhu Samruddhi is the liquid formulation of Arka Microbial Consortium. It contains the same class of AMC strains as the powder: Azotobacter, P and Zn solubilizers, and Pseudomonas.",
      "Dose on the brochure is 10 ml/L for foliar spray and drip fertigation. Do not mix with antibiotics, pesticides, or insecticides.",
    ],
  },
  {
    slug: "bio-astra",
    name: "Bio Astra",
    aliases: ["bio astra", "act", "arka actino", "actino consortium", "streptomyces"],
    category: "Consortium",
    technology: "Arka Actino Consortium (ACT)",
    short:
      "Three compatible Streptomyces strains from IIHR. Antibiotics in the root zone plus IAA and gibberellins for rooting. Licensed by Bloom in 2015.",
    crops: ["All crops"],
    use: "Soil drench, FYM enrichment, drip fertigation",
    pack: "Carrier pouch (label pack 5 kg) and liquid. Expiry 6 months from manufacture.",
    photo: "/catalogue/bio-astra.jpg",
    actives: "3 strains of Streptomyces sp.",
    cfu: "Carrier ≥ 1 × 10⁷ per g; liquid 1 × 10⁹ per ml",
    targets: soilFungi,
    usage: [drench40("Bio Astra"), fym5to10("Bio Astra"), drip40("Bio Astra")],
    precaution: noFung,
    storage: coolDry,
    body: [
      "Bio Astra is a carrier or liquid formulation of Arka Actino Consortium developed by IIHR. Three compatible antibiotic-producing Streptomyces strains secrete antibiotics in the root zone and plant-growth promoters (IAA and gibberellins) for rooting and development.",
      "Bloom Biotech states it was the first company in India to licence ACT from IIHR (licensed in 2015).",
    ],
  },
  {
    slug: "bluderma",
    name: "Bluderma",
    aliases: ["bluderma", "trichoderma", "harzianum", "viride", "damping off"],
    category: "Biocontrol",
    technology: "Trichoderma harzianum / viride",
    short:
      "Trichoderma that outgrows and parasitizes soil fungi behind damping-off, wilt, root rot, charcoal rot, and collar rot.",
    crops: ["All crops"],
    use: "Soil drench, FYM enrichment, neem cake enrichment",
    pack: "Carrier and liquid",
    photo: "/catalogue/bluderma.jpg",
    actives: "Trichoderma harzianum / viride",
    cfu: "Carrier 10⁷ per g; liquid 10⁹ per ml",
    targets: soilFungi,
    usage: [drench40("Bluderma"), fym10("Bluderma"), neem("Bluderma")],
    precaution: noFung,
    storage: coolDry,
    body: [
      "Bluderma is a carrier or liquid formulation of Trichoderma harzianum / viride. It controls soil-borne diseases such as damping-off, wilt, root rot, charcoal rot, and collar rot by outgrowing and parasitizing pathogenic fungi.",
    ],
  },
  {
    slug: "blumonas",
    name: "Blumonas",
    aliases: ["blumonas", "biomonas", "pseudomonas fluorescens", "pseudomonas"],
    category: "Biocontrol",
    technology: "Pseudomonas fluorescens",
    short:
      "Pseudomonas for soil-borne and foliar disease (leaf spots, blights, blast) and as a growth promoter via hormones and organic acids.",
    crops: ["All crops"],
    use: "Soil drench, FYM enrichment, neem cake enrichment",
    pack: "Carrier and liquid",
    photo: "/catalogue/blumonas.jpg",
    actives: "Pseudomonas fluorescens",
    cfu: "Carrier 10⁹ per g; liquid 10¹¹ per ml",
    targets:
      "Downy mildew, powdery mildew, anthracnose, blast, leaf spot, collar rot, fruit rot, root rot, seedling rot, Botrytis, early blight, late blight",
    usage: [drench40("Blumonas"), fym10("Blumonas"), neem("Blumonas")],
    precaution: noFung,
    storage: coolDry,
    body: [
      "Blumonas is a carrier or liquid formulation of Pseudomonas fluorescens. It is used against soil-borne and foliar diseases and as a plant-growth promoter.",
    ],
  },
  {
    slug: "bio-vanish",
    name: "Bio Vanish",
    aliases: ["bio vanish", "nematicide", "pochonia", "nematode", "root knot"],
    category: "Biocontrol",
    technology: "Pochonia chlamydosporia · bio nematicide",
    short:
      "Entomopathogenic soil fungus that infects larvae and adults of plant-parasitic nematodes. Approved for organic agriculture.",
    crops: ["All crops"],
    use: "Soil drench, FYM enrichment, neem cake enrichment",
    pack: "Carrier and liquid",
    photo: "/catalogue/bio-vanish.jpg",
    actives: "Pochonia chlamydosporia",
    cfu: "Carrier 10⁷ per g; liquid 10⁹ per ml",
    targets:
      "Root-knot, reniform, cyst, burrowing, and lesion nematodes (Meloidogyne, Heterodera, Helicotylenchus, Hoplolaimus and others)",
    usage: [drench40("Bio Vanish"), fym10("Bio Vanish"), neem("Bio Vanish")],
    precaution: noFung,
    storage: coolDry,
    body: [
      "Bio Vanish is a biological nematicide based on Pochonia chlamydosporia. It infects and kills larval and adult stages of many plant-pathogenic nematodes. The brochure states it is approved for use in organic agriculture.",
    ],
  },
  {
    slug: "bio-erase",
    name: "Bio Erase",
    aliases: ["bio erase", "metarhizium", "termite", "root grub"],
    category: "Biocontrol",
    technology: "Metarhizium anisopliae",
    short:
      "Contact biological insecticide for root grubs, termites, ants, locusts, and other soil insects. Infection in 24-48 hours.",
    crops: ["All crops"],
    use: "Soil drench, FYM enrichment, neem cake enrichment",
    pack: "Carrier and liquid",
    photo: "/catalogue/bio-erase.jpg",
    actives: "Metarhizium anisopliae",
    cfu: "Carrier 10⁷ per g; liquid 10⁹ per ml",
    targets: "Termites, root grubs, locusts, root weevils, ants, beetles, caterpillar pests",
    usage: [drench40("Bio Erase"), fym10("Bio Erase"), neem("Bio Erase")],
    precaution: noFung,
    storage: coolDry,
    body: [
      "Bio Erase is based on Metarhizium anisopliae. Spores attach to the insect, enter through spiracles and sense-organ pores, and germinate. It infects on contact; the insect does not need to eat the product. Infection establishes in 24-48 hours. Infected insects may live three to five days after infection.",
    ],
  },
  {
    slug: "bio-hit",
    name: "Bio Hit",
    aliases: ["bio hit", "beauveria", "berry borer", "coffee borer", "mealy bug"],
    category: "Biocontrol",
    technology: "Beauveria bassiana",
    short:
      "Beauveria for coffee berry borer, lepidopterous pests, caterpillars, and mealy bugs. Produces beauvericin.",
    crops: ["All crops", "Coffee"],
    use: "Soil drench, FYM enrichment, neem cake enrichment",
    pack: "Carrier and liquid",
    photo: "/catalogue/bio-hit.jpg",
    actives: "Beauveria bassiana",
    cfu: "Carrier 10⁷ per g; liquid 10⁹ per ml",
    targets: "Coffee berry borer, lepidopterous pests, caterpillar pests, mealy bugs",
    usage: [drench40("Bio Hit"), fym10("Bio Hit"), neem("Bio Hit")],
    precaution: noFung,
    storage: coolDry,
    body: [
      "Bio Hit contains spores and mycelial fragments of Beauveria bassiana. Enzymes dissolve the insect cuticle; the fungus grows into the body and produces beauvericin, which weakens the host immune system.",
    ],
  },
  {
    slug: "bio-ace",
    name: "Bio Ace",
    aliases: ["bio ace", "verticillium", "lecanii", "thrips", "whitefly", "aphid", "mite"],
    category: "Biocontrol",
    technology: "Verticillium lecanii (Lecanicillium)",
    short:
      "Biological insecticide for mealy bugs and sucking pests: thrips, jassids, aphids, whiteflies, and mites.",
    crops: ["All crops"],
    use: "Soil drench, FYM enrichment, neem cake enrichment",
    pack: "Carrier and liquid",
    photo: "/catalogue/bio-ace.jpg",
    actives: "Verticillium lecanii",
    cfu: "Carrier 10⁷ per g; liquid 10⁹ per ml",
    targets: "Mealy bugs, thrips, aphids, whiteflies, mites",
    usage: [drench40("Bio Ace"), fym10("Bio Ace"), neem("Bio Ace")],
    precaution: noFung,
    storage: coolDry,
    body: [
      "Bio Ace is based on Verticillium lecanii. Mycelia produce toxins with insecticidal properties that weaken the pest immune system.",
    ],
  },
  {
    slug: "bloom-compost-culture",
    name: "Bloom Compost Culture",
    aliases: [
      "compost culture",
      "decomposer",
      "arka fermented cocopeat",
      "afc",
      "aspergillus",
      "coffee pulp",
    ],
    category: "Compost",
    technology: "Arka Fermented Cocopeat (AFC) culture",
    short:
      "Aspergillus culture from IIHR to finish compost in 30-45 days: coffee pulp, FYM, green leaf, or raw coco-peat.",
    crops: ["Coffee pulp", "FYM", "Green leaf / waste", "Coco-peat"],
    use: "Windrow composting of pulp, FYM, green waste, or coco-peat",
    pack: "Powder",
    photo: "/catalogue/bloom-compost-culture.jpg",
    actives: "Aspergillus spp.",
    cfu: "Combined CFU ≥ 1 × 10⁹ per g",
    targets: "Composting, not a crop disease product",
    usage: [
      {
        title: "Coffee pulp",
        text: "Mix 2 kg of culture in 1 MT of coffee pulp waste; prepare windrow beds. Matures in 30-45 days.",
      },
      {
        title: "FYM composting",
        text: "Mix 3 kg of culture in 1 MT of FYM; prepare windrow beds. Matures in 45 days.",
      },
      {
        title: "Green leaf compost",
        text: "Mix 1 kg of culture in 1 MT of green leaves or agricultural waste. Matures in 30-40 days.",
      },
      {
        title: "Coco-peat composting",
        text: "Mix 4 kg of culture and 4 kg of urea in 1 MT of raw moist coco-peat. Matures in 30-40 days.",
      },
    ],
    precaution: noChem,
    storage: coolDry,
    body: [
      "Bloom Compost Culture is the powder culture used with IIHR Arka Fermented Cocopeat technology. Bloom was the first company in India to licence AFC from IIHR.",
    ],
  },
  {
    slug: "jackpot",
    name: "Jackpot",
    aliases: ["jackpot", "potassium humate", "humic", "leonardite"],
    category: "Nutrition",
    technology: "High-grade potassium humate",
    short:
      "100% water-soluble humic acid with potassium, extracted from leonardite. Imported. 1 kg and 5 kg. No repacking in India.",
    crops: ["All crops"],
    use: "Foliar, soil drench, fertilizer mix, seed treatment",
    pack: "1 kg and 5 kg",
    photo: "/catalogue/jackpot.jpg",
    actives: "Humic acid with soluble potassium",
    cfu: "Not a microbial product",
    targets: "Plant nutrition and soil conditioning",
    imported: true,
    specs: [
      { label: "Humic acid (dry basis)", value: "70% min" },
      { label: "K₂O", value: "12% min" },
      { label: "Solubility", value: "100% water soluble" },
      { label: "Moisture", value: "15% max" },
      { label: "pH", value: "9-11" },
    ],
    usage: [
      { title: "Foliar", text: "2.5 g/L" },
      { title: "Soil drenching", text: "5.0 g/L" },
      { title: "Fertilizer mix", text: "10 kg / MT of NPK" },
      { title: "Seed treatment", text: "2 g/L" },
    ],
    precaution: "Imported product. No repacking in India.",
    storage: coolDry,
    benefits: [
      "Natural growth stimulant; promotes root development and seed germination.",
      "Enhances nutrient uptake and resilience to abiotic and biotic stress.",
      "Potassium supports drought tolerance and photosynthesis.",
      "Soil conditioner: structure, CEC, beneficial microbes, fertilizer efficiency.",
    ],
    body: [
      "Jackpot is high-grade potassium humate from leonardite using micro carbon technology. It is 100% water soluble and marked imported on the brochure.",
    ],
  },
  {
    slug: "fulcare",
    name: "Fulcare",
    aliases: ["fulcare", "potassium fulvate", "fulvic"],
    category: "Nutrition",
    technology: "Potassium fulvate",
    short:
      "Mineral fulvic acid with humic acid from oxidized leonardite. Imported. 1 kg and 25 kg. No repacking in India.",
    crops: ["All crops"],
    use: "Foliar with NPK or micronutrients, ground application, mix with organics and biofertilizers",
    pack: "1 kg and 25 kg",
    photo: "/catalogue/fulcare.jpg",
    actives: "Fulvic acid with humic acid and potassium",
    cfu: "Not a microbial product",
    targets: "Nutrient chelation and uptake",
    imported: true,
    specs: [
      { label: "Fulvic acid (dry basis)", value: "15% min" },
      { label: "Humic acid (dry basis)", value: "70% min" },
      { label: "K₂O", value: "12% min" },
      { label: "Solubility", value: "100% water soluble" },
      { label: "Moisture", value: "1% max" },
      { label: "pH", value: "9-11" },
    ],
    usage: [
      { title: "Foliar", text: "2.5 g/L" },
      { title: "Soil drenching", text: "5.0 g/L" },
      { title: "Fertilizer mix", text: "10 kg / MT of NPK" },
      { title: "Seed treatment", text: "2 g/L" },
    ],
    precaution: "Imported product. No repacking in India.",
    storage: coolDry,
    benefits: [
      "Forms complexes or chelates metal ions and dissolves minerals plants need.",
      "Enhances availability of trace elements as metal-fulvic complexes.",
      "Promotes adventitious roots, foliar absorption, seed germination, and shoot/root growth.",
      "Raises soil organic carbon and activates beneficial microbes.",
    ],
    body: [
      "Fulcare is a short-carbon-chain fulvic product extracted from highly oxidized leonardite, combined with humic acid, for loading capacity and plant physiological activity.",
    ],
  },
  {
    slug: "calcare",
    name: "Calcare",
    aliases: ["calcare", "calcium fulvic", "cao"],
    category: "Nutrition",
    technology: "Mineral fulvic acid with 30% calcium",
    short:
      "Fulvic acid plus 30% EDTA calcium. Imported. 1 kg and 5 kg. Caution with high-phosphorus fertilizers.",
    crops: ["All crops"],
    use: "Foliar, soil drench, fertilizer mix, seed treatment, manure enrichment",
    pack: "1 kg and 5 kg",
    photo: "/catalogue/calcare.jpg",
    actives: "Fulvic acid with EDTA calcium",
    cfu: "Not a microbial product",
    targets: "Calcium nutrition and root establishment",
    imported: true,
    specs: [
      { label: "Fulvic acid (dry basis)", value: "30% min" },
      { label: "CaO (EDTA calcium)", value: "30% min" },
      { label: "Solubility", value: "100% water soluble" },
      { label: "Moisture", value: "1% max" },
      { label: "pH", value: "9-11" },
    ],
    usage: [
      { title: "Foliar", text: "1-2 g/L" },
      { title: "Soil drenching", text: "3 g/L" },
      { title: "Fertilizer mix", text: "3 kg / MT of NPK" },
      { title: "Seed treatment", text: "0.5 kg / MT of seeds" },
      { title: "Manure enrichment", text: "500 g / MT" },
    ],
    precaution:
      "Imported product. No repacking in India. Caution when mixing with high-phosphorus fertilizers.",
    storage: coolDry,
    benefits: [
      "Fulvic acid helps dissolve insoluble calcium in soil minerals into plant-available complexes.",
      "Supports cell walls, new roots, photosynthesis, flower retention, and fruit formation.",
    ],
    body: [
      "Calcare combines mineral fulvic acid with 30% calcium. Calcium is described as a secondary macronutrient for cell-wall thickening, roots, and micronutrient uptake such as boron.",
    ],
  },
  {
    slug: "nutricare-c2",
    name: "NutriCare C2",
    aliases: ["nutricare", "nutri care", "edta", "micronutrient", "chelate"],
    category: "Nutrition",
    technology: "EDTA chelated micronutrients",
    short:
      "Water-soluble, non-dusting mix of Fe, Zn, Mn, Cu chelates plus B, Mo, Mg, and S. Imported. 1 kg.",
    crops: ["Fruit", "Vegetable", "Flower", "Field crops"],
    use: "Foliar or drip at 1-2 kg/ha; typically 2-3 applications per season",
    pack: "1 kg",
    photo: "/catalogue/nutricare-c2.jpg",
    actives: "EDTA chelated Fe, Zn, Mn, Cu with B, Mo, Mg, S",
    cfu: "Not a microbial product",
    targets: "Micronutrient deficiency, especially zinc-deficient areas",
    imported: true,
    specs: [
      { label: "Appearance", value: "Green micro granules" },
      { label: "pH (1% solution)", value: "5-6.5" },
      { label: "Bulk density", value: "Approx. 600-700 kg/m³" },
      { label: "Iron (Fe)", value: "4.0%" },
      { label: "Zinc (Zn) EDTA", value: "4.0%" },
      { label: "Manganese (Mn) EDTA", value: "3.0%" },
      { label: "Copper (Cu) EDTA", value: "0.5%" },
      { label: "Boron (B)", value: "1.5%" },
      { label: "Molybdenum (Mo) EDTA", value: "0.05%" },
      { label: "Magnesium oxide (MgO)", value: "2.2%" },
      { label: "Magnesium (Mg)", value: "1.3%" },
      { label: "Sulphur (S)", value: "1.3%" },
    ],
    usage: [
      {
        title: "Foliar spray or drip fertigation",
        text: "1-2 kg/ha per application. Typically 2-3 applications per growing season. Foliar concentration 0.75-1 g/L.",
      },
    ],
    precaution: "Imported product. Store in original pack below 25°C.",
    storage: "Store in the original package in a cool, dry place below 25°C. Avoid direct sunlight.",
    body: [
      "NutriCare C2 is a fast-acting, stable, water-soluble mixture of trace-element chelates for foliar feeding and for soil or fertigation mixes with NPK.",
    ],
  },
  {
    slug: "ascogold",
    name: "AscoGold",
    aliases: ["ascogold", "asco gold", "seaweed", "ascophyllum", "amino"],
    category: "Nutrition",
    technology: "Amino acids with Ascophyllum nodosum extract",
    short:
      "Selected amino acids plus seaweed extract with vitamins, minerals, cytokinins, auxins, and micronutrients. Dose 3 ml/L.",
    crops: ["All crops", "Fruit", "Vegetable", "Flower", "Arable"],
    use: "Foliar feeding; also drip fertigation with NPK and micronutrient mixes",
    pack: "1 L and 5 L",
    photo: "/catalogue/ascogold.jpg",
    actives: "Amino acids and Ascophyllum nodosum extract",
    cfu: "Not a microbial product",
    targets: "Growth stimulation and stress support",
    usage: [
      {
        title: "Foliar",
        text: "Dilute 3 ml in 1 litre of water. Spray thoroughly on the undersides of leaves.",
      },
    ],
    precaution: "Store in original pack below 25°C.",
    storage: "Store in the original package in a cool, dry place below 25°C. Avoid direct sunlight.",
    benefits: [
      "Natural plant-growth stimulant; promotes root development and seed germination.",
      "Increases chlorophyll for better CO₂ absorption.",
      "Improves uptake of micronutrients and fertilizers.",
      "Increases resistance to biotic and abiotic stress.",
      "Enhances yield and marketable grade of produce.",
    ],
    body: [
      "AscoGold combines selected amino acids with Ascophyllum nodosum (seaweed) extracts. It contains naturally occurring vitamins, minerals, cytokinins, and auxins, along with micronutrients.",
    ],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

/* --------------------------------------------------------- presentation */

/**
 * Two of the fifteen photographs are not packaging: AscoGold's is microscopy of
 * the extract and Bloom Compost Culture's is a petri dish of the granules. They
 * are real pictures of those products, so they stay — but the UI says what they
 * are rather than captioning them as a pack.
 */
const contentsShot = new Set(["ascogold", "bloom-compost-culture"]);

export type PackShot = "pack" | "contents";

export function shotOf(product: Product): PackShot {
  return contentsShot.has(product.slug) ? "contents" : "pack";
}

/**
 * The normalized 4:5 plate every product surface draws, built by
 * `scripts/build-plates.sh` from the source photograph in `public/catalogue/`
 * or, where a higher-resolution studio shot of the same pack exists, from
 * `public/packs/`. `product.photo` is still the untouched original.
 */
export function plateOf(product: Product) {
  return `/plates/${product.slug}.jpg`;
}
