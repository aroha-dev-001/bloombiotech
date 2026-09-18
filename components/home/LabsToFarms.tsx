import Image from "next/image";
import Link from "next/link";
import { SectionHead } from "../SectionHead";

/**
 * Labs to farms. Five legs, each one grounded in something printed: the IIHR
 * licence, the fermentation hall, the two formulations, the application routes
 * on the pack, and — honestly — the field record that does not exist yet.
 */
const legs = [
  {
    n: "01",
    title: "Research",
    body: "The biology is licensed, not invented here. Arka Microbial Consortium, Arka Actino Consortium and Arka Fermented Cocopeat are ICAR-IIHR technologies, printed on the pack as R&D by IIHR.",
    photo: "/plant/sign.jpg",
    alt: "Bloom Biotech signboard at the production unit gate",
  },
  {
    n: "02",
    title: "Laboratory",
    body: "Strains are carried into culture under the collaboration with IIHR scientists that put AMC into commercial crop protection across Karnataka.",
    photo: "/plant/panel.jpg",
    alt: "Control panels and process piping on the fermentation floor",
  },
  {
    n: "03",
    title: "Manufacturing",
    body: "Scigenics stainless-steel fermenters, sterile air lines and a gowning room off the floor. Liquid consortia are grown here before they meet a bottle.",
    photo: "/plant/hall-wide.jpg",
    alt: "Wide view of the fermentation hall with stainless steel vessels",
  },
  {
    n: "04",
    title: "Farm",
    body: "Four printed routes to the root: soil drench, FYM or compost enrichment, filtered drip fertigation, and liquid at 10 ml per litre.",
    photo: "/photos/amc/amc-01-soil-drench.jpg",
    alt: "Carrier consortium drenched over the root zone of a young plant",
  },
  {
    n: "05",
    title: "Results",
    body: "What comes back from the field is the one part we will not print until it is ours to print. Field records are being collected crop by crop.",
    photo: "/photos/pomegranate.jpg",
    alt: "Pomegranate fruit ripening on the tree",
    href: "/field",
  },
] as const;

export function LabsToFarms() {
  return (
    <section id="labs-to-farms" data-tone="carbon" className="band">
      <div className="shell">
        <SectionHead
          index="01"
          kicker="Labs to farms"
          title="A licensed strain becomes something a grower can pour."
          lede="Five legs between an ICAR-IIHR laboratory and a root zone in Karnataka. Every frame below was shot at the unit on Hampapura Bypass Road."
        />
      </div>

      <div className="shell mt-14">
        <ol className="journey">
          {legs.map((l, i) => {
            const inner = (
              <>
                <Image
                  src={l.photo}
                  alt={l.alt}
                  fill
                  sizes="(min-width: 760px) 20vw, 100vw"
                />
                <p className="leg-n">{l.n}</p>
                <h3 className="display d-3">{l.title}</h3>
                <p className="prose-body text-[0.86rem] leading-relaxed">{l.body}</p>
                {"href" in l && l.href ? (
                  <span className="eyebrow eyebrow-accent mt-1">
                    Field records →
                  </span>
                ) : null}
              </>
            );

            return (
              <li
                key={l.n}
                className="leg"
                data-rv
                style={{ ["--rv-d" as string]: `${i * 70}ms` }}
              >
                {"href" in l && l.href ? (
                  <Link href={l.href} className="contents">
                    {inner}
                  </Link>
                ) : (
                  inner
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
