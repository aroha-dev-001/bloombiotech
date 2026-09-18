import { Hero } from "@/components/home/Hero";
import { DataRail } from "@/components/home/DataRail";
import { LabsToFarms } from "@/components/home/LabsToFarms";
import { FindYourSolution } from "@/components/home/FindYourSolution";
import { CropSolutions } from "@/components/home/CropSolutions";
import { ProductRail } from "@/components/home/ProductRail";
import { FieldStories } from "@/components/home/FieldStories";
import { PlantStory } from "@/components/home/PlantStory";
import { Pathways } from "@/components/home/Pathways";
import { Questions } from "@/components/home/Questions";
import { Contact } from "@/components/home/Contact";

/**
 * Nine sections, one arc:
 *   understand the science → find your solution → by crop → the line →
 *   see it in the field → see how it is made → act → ask → reach us.
 *
 * What used to sit here and now lives where it is actually looked for:
 *   the company, the numbers, capability and assurance  → /about
 *   the four application routes                         → /solutions
 *   the film room and the plate wall                    → /gallery
 *   every question past the first four                  → /faq
 *   the other twelve packs                              → /products
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <DataRail />
      <LabsToFarms />
      <FindYourSolution />
      <CropSolutions />
      <ProductRail />
      <FieldStories />
      <PlantStory />
      <Pathways />
      <Questions />
      <Contact />
    </>
  );
}
