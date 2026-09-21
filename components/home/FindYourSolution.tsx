import { SolutionFinder } from "../solutions/SolutionFinder";
import { Split } from "@/components/motion/Split";

/** One interactive section: crop, need, packs. */
export function FindYourSolution() {
  return (
    <section data-tone="bone" className="band">
      <div className="shell">
        <div className="sec-head" data-rv>
          <Split as="h2" text="Find your solution." className="display d-1 max-w-[16ch]" />
          <p className="lede">
            Tell us the crop and what you are dealing with.
          </p>
        </div>
        <div className="mt-16" data-rv>
          <SolutionFinder />
        </div>
      </div>
    </section>
  );
}
