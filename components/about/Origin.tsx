import Image from "next/image";
import { Button } from "../Button";

export function Origin() {
  return (
    <section id="origin" data-tone="light" className="band">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[1fr_minmax(0,32rem)] lg:gap-16">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)] lg:self-start">
            <h2 className="display d-1 max-w-[16ch]" data-rv>
              Two people, one licence, a coffee-country plant.
            </h2>
            <div className="mt-8 max-w-[46ch] space-y-5 prose-body" data-rv style={{ ["--rv-d" as string]: "120ms" }}>
              <p>
                Bloom Biotech began in 2013 as the{" "}
                <strong>first company in India to licence Arka Microbial Consortium</strong>{" "}
                and Arka Fermented Cocopeat from the Indian Institute of
                Horticultural Research. In 2015 it was first again, with Arka
                Actino Consortium.
              </p>
              <p>
                Work across Karnataka with IIHR scientists put AMC into
                commercial crop protection on pomegranate, black pepper and
                floriculture. The production unit sits in coffee land at
                Chikkamagaluru, built to meet what farmers and planters actually
                ask for.
              </p>
              <p>
                The printed aim has not changed: high-quality biotechnology
                products and technical assistance, so growers{" "}
                <strong>produce more for less</strong>.
              </p>
            </div>
            <blockquote className="mt-10 max-w-[36ch] border-l-2 border-[var(--brand)] pl-5" data-rv>
              <p className="display d-3">
                “Innovation, dedication to quality and simplicity is not a goal
                but way of life.”
              </p>
              <footer className="eyebrow mt-4">Bloom Biotech · company brochure</footer>
            </blockquote>
            <div className="mt-10 flex flex-wrap gap-3" data-rv>
              <Button href="/gallery" variant="ghost">
                Inside the plant
              </Button>
              <Button href="/products" variant="ghost">
                The catalogue
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            <figure className="frame zoomer aspect-[3/2] sm:aspect-[16/10] lg:aspect-[4/5]" data-rv="mask">
              <Image
                src="/photos/founders.jpg"
                alt="The founders of Bloom Biotech, photographed for the company brochure"
                width={766}
                height={913}
                sizes="(min-width: 1024px) 32rem, 100vw"
                className="object-cover object-[50%_22%] lg:object-[50%_35%]"
              />
            </figure>
            <div className="grid grid-cols-2 gap-4">
              <figure className="frame zoomer aspect-[4/3]" data-rv="mask" style={{ ["--rv-d" as string]: "80ms" }}>
                <Image
                  src="/plant/gate.jpg"
                  alt="The gate of the Bloom Biotech production unit"
                  width={640}
                  height={352}
                  sizes="(min-width: 1024px) 16rem, 50vw"
                />
              </figure>
              <figure className="frame zoomer aspect-[4/3]" data-rv="mask" style={{ ["--rv-d" as string]: "160ms" }}>
                <Image
                  src="/photos/pepper.jpg"
                  alt="Black pepper spike on the vine"
                  width={504}
                  height={574}
                  sizes="(min-width: 1024px) 16rem, 50vw"
                />
              </figure>
            </div>
            <dl className="spec mt-2" data-rv>
              <div>
                <dt>Licensed</dt>
                <dd>AMC · ACT · Arka Fermented Cocopeat</dd>
              </div>
              <div>
                <dt>Partner</dt>
                <dd>ICAR-IIHR, Bengaluru</dd>
              </div>
              <div>
                <dt>Crops on record</dt>
                <dd>Pomegranate, black pepper, floriculture, coffee</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
