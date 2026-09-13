import Link from "next/link";
import { HeroStage } from "@/components/HeroStage";
import { products } from "@/lib/products";
import { articles } from "@/lib/articles";
import { ProductCard } from "@/components/ProductCard";
import { AudienceBoard } from "@/components/AudienceBoard";
import { CropGuide } from "@/components/CropGuide";
import { AmcRoutes } from "@/components/AmcRoutes";
import { StatsStrip } from "@/components/StatsStrip";
import { Reveal } from "@/components/Reveal";
import { AboutStory, HomeCatalogue } from "@/components/sections/AboutStory";
import { Benefits } from "@/components/sections/Benefits";
import { Biology } from "@/components/sections/Biology";
import { Process } from "@/components/sections/Process";
import { Voices } from "@/components/sections/Voices";
import { Impact } from "@/components/sections/Impact";
import { FAQ } from "@/components/sections/FAQ";
import { Newsletter } from "@/components/sections/Newsletter";

const ticker = [
  "Arka Microbial Consortium",
  "Bio Sanjiveeni",
  "Bhu Samruddhi",
  "Bio Astra · ACT",
  "Bluderma · Trichoderma",
  "Bloom Compost Culture",
  "First AMC licence in India",
  "ICAR-IIHR collaboration",
];

export default function HomePage() {
  return (
    <>
      <HeroStage />

      <Reveal>
        <div className="ticker" aria-hidden="true">
          <div className="ticker-track py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
            {[...ticker, ...ticker].map((item, i) => (
              <span key={`${item}-${i}`} className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-leaf" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal>
        <StatsStrip />
      </Reveal>

      <AboutStory />

      <Reveal>
        <CropGuide />
      </Reveal>

      <HomeCatalogue>
        <div className="shop-grid mt-8">
          {products.slice(0, 6).map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </HomeCatalogue>

      <Benefits />

      <Biology />

      <Process />

      <Reveal>
        <AmcRoutes />
      </Reveal>

      <Reveal>
        <AudienceBoard />
      </Reveal>

      <Voices />

      <Impact />

      <FAQ />

      <Reveal>
        <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="flex items-end justify-between">
            <h2 className="font-serif text-3xl text-forest">From the journal</h2>
            <Link href="/journal" className="nav-link text-sm">
              All articles
            </Link>
          </div>
          <div className="mt-8 divide-y divide-forest/10 border-y border-forest/10">
            {articles.slice(0, 3).map((a) => (
              <Link
                key={a.slug}
                href={`/journal/${a.slug}`}
                className="group grid gap-2 py-6 md:grid-cols-[8rem_1fr]"
              >
                <p className="font-mono text-[11px] text-muted">{a.date}</p>
                <div>
                  <h3 className="font-serif text-2xl text-forest group-hover:text-moss">
                    {a.title}
                  </h3>
                  <p className="mt-1 max-w-xl text-sm text-muted">{a.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </Reveal>

      <Newsletter />
    </>
  );
}
