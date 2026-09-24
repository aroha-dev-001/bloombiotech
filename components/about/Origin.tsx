import Image from "next/image";
import { Button } from "../Button";
import { KeyPoints } from "../KeyPoints";

/**
 * Where Bloom comes from, as key points rather than three paragraphs. Every
 * point is from the brochure: the 2013 AMC and AFC licences, ACT in 2015, the
 * field work with IIHR, and the unit in Chikkamagaluru.
 */
const story = [
  {
    title: "First to licence AMC",
    how: "India's first licence for Arka Microbial Consortium and Arka Fermented Cocopeat, from ICAR-IIHR, in 2013.",
  },
  {
    title: "First again with ACT",
    how: "Arka Actino Consortium followed in 2015.",
  },
  {
    title: "Proven in the field",
    how: "Taken into crop protection with IIHR scientists on pomegranate, black pepper and floriculture.",
  },
  {
    title: "Made in coffee country",
    how: "Our own production unit in Chikkamagaluru, built around what planters ask for.",
  },
];

export function Origin() {
  return (
    <section id="origin" data-tone="light" className="pg-band">
      <div className="shell ab-origin">
        <div>
          <h2 className="display pg-h2" data-rv>
            Two people, one licence, a coffee-country plant.
          </h2>
          <p className="pg-note" data-rv>
            Good biotech products and technical help, so growers produce more
            for less.
          </p>
          <KeyPoints items={story} className="mt-6" />
          <blockquote className="ab-quote" data-rv>
            <p>
              “Innovation, dedication to quality and simplicity is not a goal
              but way of life.”
            </p>
            <footer>From the company brochure</footer>
          </blockquote>
          <div className="pg-btns mt-6">
            <Button href="/gallery" variant="ghost" arrow={false}>
              Inside the plant
            </Button>
            <Button href="/products" variant="ghost" arrow={false}>
              The catalogue
            </Button>
          </div>
        </div>

        <figure className="frame zoomer ab-founders" data-rv="mask">
          <Image
            src="/photos/founders.jpg"
            alt="The founders of Bloom Biotech, photographed for the company brochure"
            width={766}
            height={913}
            sizes="(min-width: 1024px) 24rem, 100vw"
            className="object-cover object-[50%_25%]"
          />
        </figure>
      </div>
    </section>
  );
}
