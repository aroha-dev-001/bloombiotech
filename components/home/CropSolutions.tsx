import { CropExplorer } from "../solutions/CropExplorer";
import { SectionHead } from "../SectionHead";

export function CropSolutions() {
  return (
    <section id="crops" data-tone="light" className="band">
      <div className="shell">
        <SectionHead
          index="03"
          kicker="By crop"
          title="Solutions for the crops you grow."
          lede="Pomegranate, black pepper and floriculture are the commercial crops the brochure names for AMC. The plant itself sits in coffee land."
        />
        <div className="mt-12" data-rv>
          <CropExplorer />
        </div>
      </div>
    </section>
  );
}
