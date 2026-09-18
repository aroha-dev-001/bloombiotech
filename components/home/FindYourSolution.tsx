import { ProductFinder } from "../solutions/ProductFinder";
import { SectionHead } from "../SectionHead";

/** The guided finder, framed for the homepage. */
export function FindYourSolution() {
  return (
    <section id="find" data-tone="bone" className="band">
      <div className="shell">
        <SectionHead
          index="02"
          kicker="Find your solution"
          title="Three questions. Then the packs."
          lede="Crop, problem, and how you apply it. Nothing is submitted and nothing is required — change any answer and the list changes with it."
        />
        <div className="mt-12" data-rv>
          <ProductFinder />
        </div>
      </div>
    </section>
  );
}
