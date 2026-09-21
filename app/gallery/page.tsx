import type { Metadata } from "next";
import { FilmRoom } from "@/components/home/FilmRoom";
import { Split } from "@/components/motion/Split";

export const metadata: Metadata = {
  title: "Manufacturing",
  description:
    "Drone footage, fermentation-hall film and photographs from the Bloom Biotech production unit in Chikkamagaluru.",
};

export default function GalleryPage() {
  return (
    <>
      <header data-tone="light" className="pt-[calc(var(--nav-h)+5rem)] pb-16">
        <div className="shell">
          <Split as="h1" text="The unit, unedited." className="display d-hero max-w-[12ch]" />
          <p className="lede lede-wide mt-8" data-rv style={{ ["--rv-d" as string]: "240ms" }}>
            The sheds from the air, the fermentation floor, and the cans those
            vessels fill.
          </p>
        </div>
      </header>
      <FilmRoom heading={false} />
    </>
  );
}
