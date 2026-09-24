import Image from "next/image";
import { routes } from "@/lib/plant";

/**
 * Four ways a pack reaches the root, all on screen at once: the photograph,
 * the route, the dose as the big line, and what to do in a few words.
 *
 * It used to be a tab list with one photograph and a paragraph beside it, so
 * three of the four doses were always hidden and a phone showed the list, then
 * a photograph, then the answer, a screen and a half apart.
 */
export function RouteGuide() {
  return (
    <section id="routes" data-tone="light" className="pg-band">
      <div className="shell">
        <div className="pg-head">
          <h2 className="display pg-h2">How it reaches the root.</h2>
          <p className="pg-note">If the pack in your hand prints a different dose, follow the pack.</p>
        </div>

        <ul className="rg">
          {routes.map((r) => (
            <li key={r.index} className="rg-card">
              <figure className="rg-shot">
                <Image src={r.photo} alt={r.alt} fill sizes="(min-width: 900px) 20rem, 6rem" />
              </figure>
              <div>
                <p className="pk-dose-way">{r.name}</p>
                <p className="pk-dose">{r.dose}</p>
                <p className="pk-dose-note">{r.short}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="pk-caution">
          <svg viewBox="0 0 20 20" aria-hidden>
            <path d="M10 2.5l8 14.5H2z" />
            <path d="M10 8v4M10 14.2v.3" />
          </svg>
          <p>
            Never tank-mix these with fungicides, pesticides or insecticides.
            They are living organisms, and chemicals kill them.
          </p>
        </div>
      </div>
    </section>
  );
}
