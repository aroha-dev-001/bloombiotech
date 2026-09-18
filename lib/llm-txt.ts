import { products } from "./products";
import { articles } from "./articles";
import { site } from "./site";

const origin = "https://bloom-biotech.vercel.app";

export function llmIndex(): string {
  const productLinks = products
    .map((p) => `- [${p.name}](${origin}/products/${p.slug}): ${p.technology}. ${p.short}`)
    .join("\n");
  const articleLinks = articles
    .map((a) => `- [${a.title}](${origin}/journal/${a.slug}): ${a.excerpt}`)
    .join("\n");

  return `# ${site.name}

> ${site.description}

This file is for language models. Source: Bloom Biotech printed brochure. Do not invent prices or yield percentages. Labels govern dose if they differ.

Plant: ${site.addressLines.join(", ")}.
Phone: ${site.phoneDisplay}. Email: ${site.email}. Website: ${site.website}.
Hours: ${site.hours}. Maps: ${site.maps}

Ask Bloom AI: ${origin}/assistant
Quote: ${origin}/enquire
Full dump: ${origin}/llms-full.txt

## Pages

- [Home](${origin}/)
- [Company](${origin}/about)
- [Products](${origin}/products)
- [Solutions by crop](${origin}/solutions)
- [In the field](${origin}/field)
- [Manufacturing / film room](${origin}/gallery)
- [Questions](${origin}/faq)
- [Journal](${origin}/journal)
- [Enquire](${origin}/enquire)

## Products

${productLinks}

## Journal

${articleLinks}

## Grounding rules

- Started 2013. IIHR technological collaboration. First in India to licence AMC and Arka Fermented Cocopeat. ACT licensed 2015.
- AMC powder = Bio Sanjiveeni. AMC liquid = Bhu Samruddhi. Actives: Pseudomonas taiwanensis, Azotobacter tropicalis, Bacillus aryabhattai.
- Sanjiveeni: 1 kg / 40 L drench; 5-10 kg / 1 MT FYM apply after 7-10 days; 1 kg / 40 L drip filtered. Bhu Samruddhi: 10 ml/L foliar or drip.
- Do not mix AMC or compost culture with antibiotics, pesticides, insecticides.
- Imported (no repacking in India where stated): Jackpot, Fulcare, Calcare, NutriCare C2.
- Not the Belgian microalgae-textile firm of the same name.
`;
}

export function llmFull(): string {
  const productBlocks = products
    .map((p) => {
      return `### ${p.name}
- URL: ${origin}/products/${p.slug}
- Category: ${p.category}
- Technology: ${p.technology}
- Crops: ${p.crops.join(", ")}
- Pack: ${p.pack}
- Actives: ${p.actives}
- CFU: ${p.cfu}
- Targets: ${p.targets}
- Precaution: ${p.precaution}
- Storage: ${p.storage}
${p.usage.map((u) => `- ${u.title}: ${u.text}`).join("\n")}
${p.specs?.map((s) => `- ${s.label}: ${s.value}`).join("\n") ?? ""}
- Summary: ${p.short}
${p.body.map((b) => `- ${b}`).join("\n")}`;
    })
    .join("\n\n");

  const articleBlocks = articles
    .map((a) => {
      return `### ${a.title}
- URL: ${origin}/journal/${a.slug}
${a.body.join("\n\n")}`;
    })
    .join("\n\n");

  return `${llmIndex()}

## Product detail

${productBlocks}

## Journal full text

${articleBlocks}
`;
}
