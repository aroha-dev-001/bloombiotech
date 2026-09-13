export type Article = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  body: string[];
};

export const articles: Article[] = [
  {
    slug: "what-arka-microbial-consortium-does",
    title: "Bio Sanjiveeni and Bhu Samruddhi: the two AMC packs",
    date: "2026-03-12",
    excerpt:
      "Powder and liquid Arka Microbial Consortium from IIHR. Same strains, different application.",
    tags: ["AMC", "IIHR", "Sanjiveeni"],
    body: [
      "On the Bloom brochure, Arka Microbial Consortium is two commercial packs. Bio Sanjiveeni is the carrier (powder). Bhu Samruddhi is the liquid. Both carry Pseudomonas taiwanensis, Azotobacter tropicalis, and Bacillus aryabhattai.",
      "The powder is used as a soil drench (1 kg in 40 L), mixed into FYM or compost (5-10 kg per metric tonne, applied after 7-10 days), or filtered through drip (1 kg in 40 L). The liquid is 10 ml per litre as foliar spray or drip.",
      "Bloom Biotech started in 2013 and states it was the first company in India to licence AMC from IIHR. Do not mix AMC with antibiotics, pesticides, or insecticides. Store cool and dry. The pouch or bottle in hand still governs dose and CFU if it differs from this note.",
    ],
  },
  {
    slug: "soil-biology-coffee-chikkamagaluru",
    title: "Coffee pulp, FYM, and coco-peat: Bloom Compost Culture",
    date: "2026-04-02",
    excerpt:
      "IIHR Arka Fermented Cocopeat culture. Windrows that finish in 30-45 days.",
    tags: ["Coffee", "Compost", "AFC"],
    body: [
      "Bloom Compost Culture is the Aspergillus powder tied to IIHR Arka Fermented Cocopeat technology. Bloom was first in India to licence that technology.",
      "Coffee pulp: 2 kg culture per metric tonne of pulp, windrow, 30-45 days. FYM: 3 kg per tonne, 45 days. Green leaf or farm waste: 1 kg per tonne, 30-40 days. Raw moist coco-peat: 4 kg culture plus 4 kg urea per tonne, 30-40 days.",
      "Do not mix the culture with antibiotics, pesticides, or insecticides.",
    ],
  },
  {
    slug: "trichoderma-in-wet-nurseries",
    title: "Bluderma and Blumonas: what the brochure actually says",
    date: "2026-05-18",
    excerpt:
      "Trichoderma harzianum / viride and Pseudomonas fluorescens. Drench, FYM, neem cake.",
    tags: ["Bluderma", "Blumonas", "Nursery"],
    body: [
      "Bluderma is Trichoderma harzianum / viride for damping-off, wilt, root rot, charcoal rot, and collar rot. Carrier CFU 10⁷ per g; liquid 10⁹ per ml.",
      "Blumonas is Pseudomonas fluorescens for soil-borne and foliar diseases (mildews, anthracnose, blast, blights, rots). Carrier CFU 10⁹ per g; liquid 10¹¹ per ml.",
      "Both: 1 kg in 40 L as a root drench; 10 kg in 1 MT FYM or compost, apply after 7-10 days; 1 kg in 50 kg neem cake, apply after 1 week. Do not mix with fungicides, pesticides, or insecticides.",
    ],
  },
  {
    slug: "how-dealers-should-quote-microbials",
    title: "Two catalogues on one board: IIHR biology and imported nutrition",
    date: "2026-06-09",
    excerpt:
      "AMC, ACT, biocontrols, and compost culture are IIHR-linked. Jackpot, Fulcare, Calcare, and NutriCare C2 are imported.",
    tags: ["Dealers", "Catalogue"],
    body: [
      "Quote the IIHR line and the imported nutrition line as separate stories. Bio Sanjiveeni, Bhu Samruddhi, Bio Astra, Bluderma, Blumonas, Bio Vanish, Bio Erase, Bio Hit, Bio Ace, and Bloom Compost Culture sit with the IIHR collaboration.",
      "Jackpot (potassium humate), Fulcare (potassium fulvate), Calcare (fulvic + 30% Ca), and NutriCare C2 (EDTA micronutrients) are marked imported. Packs say no repacking in India. AscoGold is the amino acid plus Ascophyllum seaweed foliar at 3 ml/L.",
      "Do not invent prices or yield percentages. Send crop, area, and solid vs liquid to +91 88845 68019 or bloombiotech@gmail.com.",
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}
