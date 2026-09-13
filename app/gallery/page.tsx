import type { Metadata } from "next";
import { gallery } from "@/lib/gallery";
import { PhotoBook } from "@/components/PhotoBook";

export const metadata: Metadata = {
  title: "Photos",
  description: "Plant, nursery, and field imagery for Bloom Biotech.",
};

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <p className="text-xs uppercase tracking-[0.2em] text-soil">Photos</p>
      <h1 className="mt-2 font-serif text-4xl text-forest">Field book</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Frames from the printed Bloom Biotech brochure: pepper, pomegranate,
        coffee, seedling in hand, and the team photograph. Open a plate to read
        it full size.
      </p>
      <div className="mt-10">
        <PhotoBook plates={gallery} />
      </div>
    </div>
  );
}
