import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SolutionFinder } from "@/components/solutions/SolutionFinder";
import { RouteGuide } from "@/components/solutions/RouteGuide";
import {
  getCrop,
  getNeed,
  getApplication,
  type CropId,
  type NeedId,
  type ApplicationId,
} from "@/lib/solutions";
import { site, telHref } from "@/lib/site";
import { Split } from "@/components/motion/Split";

export const metadata: Metadata = {
  title: "Solutions by crop",
  description:
    "Find the Bloom Biotech pack for your crop. Coffee, black pepper, pomegranate, floriculture and all crops — by crop and by problem.",
};

type Props = {
  searchParams: Promise<{ crop?: string; need?: string; apply?: string }>;
};

/** Introduction → find your solution → how to apply it → get in touch. */
export default async function SolutionsPage({ searchParams }: Props) {
  const q = await searchParams;
  const crop = (getCrop(q.crop ?? "")?.id ?? undefined) as CropId | undefined;
  const need = (getNeed(q.need ?? "")?.id ?? undefined) as NeedId | undefined;
  const apply = (getApplication(q.apply ?? "")?.id ?? undefined) as
    | ApplicationId
    | undefined;

  return (
    <>
      <header
        data-tone="dark"
        className="relative isolate flex min-h-[70svh] items-end overflow-hidden pt-[calc(var(--nav-h)+5rem)] pb-20"
      >
        <Image
          src="/farm/plantation.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="hero-veil -z-10" />
        <div className="grain" aria-hidden />
        <div className="shell">
          <Split as="h1" text="Start with what you grow." className="display d-hero max-w-[13ch]" />
          <p className="lede lede-wide mt-8" data-rv style={{ ["--rv-d" as string]: "240ms" }}>
            Every pack sorted by the two things you already know: the crop in
            the ground and the problem in front of you.
          </p>
        </div>
      </header>

      <section data-tone="bone" className="band">
        <div className="shell">
          <SolutionFinder
            initialCrop={crop}
            initialNeed={need}
            initialApplication={apply}
          />
        </div>
      </section>

      <RouteGuide />

      <section data-tone="carbon" className="band">
        <div className="shell flex flex-wrap items-end justify-between gap-10">
          <Split as="h2" text="Still not sure?" className="display d-1 max-w-[16ch]" />
          <div className="flex flex-wrap gap-3">
            <Link href="/enquire" className="btn btn-primary">
              Get in touch
              <span className="arw" aria-hidden>
                →
              </span>
            </Link>
            <a href={telHref()} className="btn btn-ghost">
              {site.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
