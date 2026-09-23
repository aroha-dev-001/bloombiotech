import { World } from "@/components/home/world/World";

/**
 * One continuous flight, in the order the story actually runs:
 *
 *   canopy → crop → soil → microbiology → plant       the farm, then under it
 *   → factory → fermentation → products               where the biology is grown
 *   → application → healthy crop                      and back out to the field
 *
 * The chapters live on the rail, not as sections: the page is a single fixed
 * stage the scroll flies through. What used to sit below the story lives where
 * it is actually looked for:
 *   finding the right pack          → /solutions
 *   the full catalogue              → /products
 *   questions                       → /faq
 *   reach us                        → /enquire
 */
export default function HomePage() {
  return <World />;
}
