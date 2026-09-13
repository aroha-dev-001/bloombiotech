export const heroPhoto = {
  src: "/photos/coffee.png",
  alt: "Hands cupping a seedling in soil",
  caption: "Green biotechnology from Chikkamagaluru.",
  kicker: "Bloom Biotech",
  credit: "Bloom Biotech brochure",
};

export type GalleryPlate = {
  src: string;
  alt: string;
  kicker: string;
  caption: string;
  credit: string;
};

export const gallery: readonly GalleryPlate[] = [
  {
    src: "/photos/pepper.png",
    alt: "Black pepper vine",
    kicker: "Pepper",
    caption: "Horticulture crops named on the AMC story: pepper, pomegranate, floriculture.",
    credit: "Bloom Biotech brochure",
  },
  {
    src: "/photos/pomegranate.png",
    alt: "Pomegranate fruit",
    kicker: "Pomegranate",
    caption: "Target crops on the IIHR collaboration pages include pomegranate.",
    credit: "Bloom Biotech brochure",
  },
  {
    src: "/photos/seedling.png",
    alt: "Ripe coffee berries",
    kicker: "Coffee berries",
    caption: "Coffee country. Production facility in Chikkamagaluru.",
    credit: "Bloom Biotech brochure",
  },
  {
    src: "/photos/founders.png",
    alt: "Bloom Biotech team photograph from the brochure",
    kicker: "The plant · 2013",
    caption: "Started 2013. First in India to licence AMC and Arka Fermented Cocopeat.",
    credit: "Bloom Biotech brochure",
  },
  {
    src: "/photos/coffee.png",
    alt: "Hands cupping a seedling in soil",
    kicker: "Seedling in hand",
    caption: "Technical assistance to farmers is printed as the company mission.",
    credit: "Bloom Biotech brochure",
  },
];
