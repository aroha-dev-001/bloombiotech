import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { Biology } from "@/components/home/Biology";
import { StoryScroll } from "@/components/home/StoryScroll";
import { FindYourSolution } from "@/components/home/FindYourSolution";
import { Packs } from "@/components/home/Packs";
import { Questions } from "@/components/home/Questions";
import { Contact } from "@/components/home/Contact";

/**
 * One arc, in the order the story actually runs:
 *
 *   the land            → Hero
 *   the company         → Intro
 *   the life in it      → Biology     canopy → leaf → root → soil → the culture
 *   where it is made    → StoryScroll the sign, the unit, the hall, the pack
 *   what we make        → Packs
 *   find yours          → FindYourSolution
 *   the questions       → Questions
 *   reach us            → Contact
 *
 * Biology and StoryScroll are the two pinned runs and they do not overlap:
 * the descent owns the field, the film owns the plant. The packs section picks
 * the film up on the pack it ends on.
 *
 * What lives where it is actually looked for, rather than here:
 *   the company in full, capability, and how a pack is made → /about
 *   the application routes                                  → /solutions
 *   the film room and the plate wall                        → /gallery
 *   field records                                           → /field
 *   the rest of the catalogue                               → /products
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <Biology />
      <StoryScroll />
      <Packs />
      <FindYourSolution />
      <Questions />
      <Contact />
    </>
  );
}
