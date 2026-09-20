import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { StoryScroll } from "@/components/home/StoryScroll";
import { FindYourSolution } from "@/components/home/FindYourSolution";
import { ProductRail } from "@/components/home/ProductRail";
import { Questions } from "@/components/home/Questions";
import { Contact } from "@/components/home/Contact";

/**
 * Six sections, one arc:
 *   the company → the journey, told as film → find your solution →
 *   the packs → the questions → reach us.
 *
 * What used to sit here and now lives where it is actually looked for:
 *   the company in full, capability and assurance → /about
 *   the application routes                        → /solutions
 *   the film room and the plate wall              → /gallery
 *   field records                                 → /field
 *   the rest of the catalogue                     → /products
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <StoryScroll />
      <FindYourSolution />
      <ProductRail />
      <Questions />
      <Contact />
    </>
  );
}
