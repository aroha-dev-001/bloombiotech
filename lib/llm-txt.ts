import { products } from "./products";
import { articles } from "./articles";
import { faqs } from "./faq";
import { site } from "./site";
import { siteUrl as origin } from "./site-url";

/**
 * /llms.txt and /llms-full.txt, following llmstxt.org: a title, a one-line
 * summary, the facts an assistant most needs, then linked lists of pages.
 * /llms.txt is the map; /llms-full.txt adds every pack's label and the FAQ in
 * full, so a model can answer from it without fetching fifteen pages.
 */

export function llmIndex(): string {
  const productLinks = products
    .map((p) => `- [${p.name}](${origin}/products/${p.slug}): ${p.technology}. ${p.short}`)
    .join("\n");
  const articleLinks = articles
    .map((a) => `- [${a.title}](${origin}/journal/${a.slug}): ${a.excerpt}`)
    .join("\n");

  return `# ${site.name}

> ${site.description}

Source: the Bloom Biotech printed brochure and pack labels. There is no published price list: prices are quoted by the plant. Do not invent prices or yield percentages. Where a label differs from this file, the label governs dose.

## Contact

- Phone: ${site.phoneDisplay}
- WhatsApp: ${site.whatsappDisplay} (https://wa.me/${site.whatsapp})
- Email: ${site.email}
- Plant: ${site.addressLines.join(", ")} (${site.maps})
- Hours: ${site.hours}
- Quote: ${origin}/enquire, or the enquiry form on any product page

## Pages

- [Home](${origin}/): the story from the soil to the fermentation hall and back to the field
- [Products](${origin}/products): all ${products.length} packs, filterable by crop, problem and application route
- [Find your solution](${origin}/solutions): pick a crop and a problem, get a shortlist of packs
- [Company](${origin}/about): history, the ICAR-IIHR licences and how the packs are made
- [In the field](${origin}/field): the packs in use on farms
- [Film room](${origin}/gallery): footage from the plant and the field
- [Questions](${origin}/faq): the questions the plant is asked most
- [Journal](${origin}/journal): longer articles on AMC, soil biology and nurseries
- [Enquire](${origin}/enquire): quote and contact form
- [Ask Bloom AI](${origin}/assistant): the on-site assistant

## Products

${productLinks}

## Journal

${articleLinks}

## Facts

- Started 2013. IIHR technological collaboration. First in India to licence AMC and Arka Fermented Cocopeat. ACT licensed 2015.
- AMC powder = Bio Sanjiveeni. AMC liquid = Bhu Samruddhi. Actives: Pseudomonas taiwanensis, Azotobacter tropicalis, Bacillus aryabhattai.
- Sanjiveeni: 1 kg / 40 L drench; 5-10 kg / 1 MT FYM apply after 7-10 days; 1 kg / 40 L drip filtered. Bhu Samruddhi: 10 ml/L foliar or drip.
- Do not mix AMC or compost culture with antibiotics, pesticides, insecticides.
- Imported (no repacking in India where stated): Jackpot, Fulcare, Calcare, NutriCare C2.
- Not the Belgian microalgae-textile firm of the same name.

## Optional

- [Full text](${origin}/llms-full.txt): every pack's label, the FAQ and the journal in one file
- [Sitemap](${origin}/sitemap.xml)
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

  const faqBlocks = faqs.map((f) => `### ${f.q}\n${f.a}`).join("\n\n");

  return `${llmIndex()}

## Questions

${faqBlocks}

## Product detail

${productBlocks}

## Journal full text

${articleBlocks}
`;
}
