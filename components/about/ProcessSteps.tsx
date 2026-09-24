import Image from "next/image";
import { chapters } from "@/lib/plant";

/**
 * From culture to pack, in five steps: a picture, the step, and one line.
 *
 * This replaced a pinned scroll where each step carried a paragraph and, on a
 * phone, its own full-width photograph, which made the About page seventeen
 * screens long. The longer text is still in lib/plant.ts (`detail`).
 */
export function ProcessSteps() {
  return (
    <ol className="ab-steps">
      {chapters.map((c) => (
        <li key={c.index} className="ab-step" data-rv>
          <figure className="ab-step-shot">
            <Image
              src={c.still}
              alt={c.alt}
              fill
              sizes="(min-width: 1024px) 15rem, 5.5rem"
              className="object-cover"
            />
          </figure>
          <div>
            <p className="ab-step-n" aria-hidden>
              {Number(c.index)}
            </p>
            <h3 className="ab-step-title">{c.title}</h3>
            <p className="ab-step-line">{c.lede}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
