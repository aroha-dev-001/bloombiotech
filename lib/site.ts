export const site = {
  name: "Bloom Biotech",
  tagline: "Green biotechnology",
  headline: "Biology for farms in coffee country",
  description:
    "Bloom Biotech is an agri-biotech company in Chikkamagaluru, Karnataka, in technological collaboration with ICAR-IIHR. First in India to licence Arka Microbial Consortium (AMC) and Arka Fermented Cocopeat; licensed Arka Actino Consortium (ACT) in 2015. Production since 2013.",
  founded: "2013",
  website: "https://www.bloombiotech.co.in",
  phone: "8884568019",
  phoneDisplay: "+91 88845 68019",
  whatsapp: "15551480890",
  whatsappDisplay: "+1 (555) 148-0890",
  email: "bloombiotech@gmail.com",
  instagram: "https://www.instagram.com/bloom_biotech/",
  facebook: "https://www.facebook.com/bloombiotech/",
  maps:
    "https://www.google.com/maps/search/?api=1&query=Bloom+Biotech+KHB+Colony+K.M.+Road+Chikkamagaluru",
  addressLines: [
    "Assessment Number 10, 5th Phase KHB Colony",
    "CMC Ward No. 1, K.M. Road",
    "Chikkamagaluru, Karnataka 577102",
  ],
  hours: "Opens 9:30 am",
  googleRating: "5.0",
  googleReviews: 18,
} as const;

export function telHref() {
  return `tel:+91${site.phone}`;
}

export function whatsappUrl(text?: string) {
  const message =
    text ??
    "Hello Bloom Biotech, I would like a quote for biofertilizer / microbial products.";
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
