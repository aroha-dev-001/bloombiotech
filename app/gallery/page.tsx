import type { Metadata } from "next";
import { FilmRoom } from "@/components/home/FilmRoom";

export const metadata: Metadata = {
  title: "Manufacturing",
  description:
    "Drone footage, fermentation-hall film and photographs from the Bloom Biotech production unit in Chikkamagaluru.",
};

export default function GalleryPage() {
  return (
    <>
      <header data-tone="dark" className="pt-[calc(var(--nav-h)+3rem)] pb-12">
        <div className="shell">
          <p className="eyebrow">
            <span className="eyebrow-accent">Manufacturing</span>
            <span className="mx-2 opacity-40">/</span>
            Plant + packs
          </p>
          <h1 className="display d-hero mt-6 max-w-[12ch]">The unit, unedited.</h1>
          <p className="lede mt-8">
            Two films and ten plates from the production unit at Beekanahalli
            Village: the sheds from the air, the fermentation floor, and the cans
            those vessels fill. Open any plate to read it full size.
          </p>
        </div>
      </header>
      <FilmRoom heading={false} />
    </>
  );
}
