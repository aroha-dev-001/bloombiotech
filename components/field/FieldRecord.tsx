import Image from "next/image";
import Link from "next/link";
import { isPlaceholder, type FieldCase } from "@/lib/cases";
import { getProduct } from "@/lib/products";

function Fact({ label, value }: { label: string; value: string }) {
  const pending = isPlaceholder(value);
  return (
    <div>
      <dt>{label}</dt>
      <dd className={pending ? "is-placeholder" : undefined}>{value}</dd>
    </div>
  );
}

/**
 * One field record. Every observation field is rendered through `Fact`, which
 * marks bracketed placeholders visually — so an incomplete record can never be
 * mistaken for a result claim.
 */
export function FieldRecord({ record }: { record: FieldCase }) {
  const packs = record.products.map(getProduct).filter(Boolean);

  return (
    <article className="case-grid" data-rv>
      {/* ------------------------------------------------------- the facts */}
      <div>
        <p className="eyebrow">{record.region}</p>
        <h3 className="display d-2 mt-3">{record.crop}</h3>

        {record.status === "pending" ? (
          <p className="tag mt-5 inline-block border-[var(--amber)] text-[var(--amber)]">
            Awaiting field data
          </p>
        ) : null}

        <dl className="case-facts mt-8">
          <Fact label="Challenge" value={record.challenge} />
          <Fact label="Solution" value={record.solution} />
          <Fact label="Application" value={record.application} />
          <Fact label="Duration" value={record.duration} />
          <Fact label="Observed result" value={record.result} />
        </dl>

        {packs.length ? (
          <div className="mt-8 border-t border-[var(--line)] pt-6">
            <p className="eyebrow">Packs indicated</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {packs.map((p) => (
                <li key={p!.slug}>
                  <Link href={`/products/${p!.slug}`} className="tag hover:text-[var(--fg)]">
                    {p!.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      {/* ------------------------------------------- before / during / after */}
      <div>
        <p className="eyebrow">Before, during, after</p>
        {/* Below 640px this is a snap scroller: three columns of captions on a
            320px screen leaves two words per line. */}
        <ol className="stage-row mt-6">
          {record.stages.map((s) => (
            <li key={s.key} className="stage-cell">
              <div className={s.photo ? "stage" : "stage stage-empty"}>
                <span className="stage-tag">{s.label}</span>
                {s.photo ? (
                  <Image
                    src={s.photo}
                    alt={s.alt}
                    fill
                    sizes="(min-width: 900px) 20vw, 70vw"
                  />
                ) : (
                  <p className="is-placeholder mt-6">Photograph pending</p>
                )}
              </div>
              <p className="meta mt-3">{s.caption}</p>
            </li>
          ))}
        </ol>
      </div>
    </article>
  );
}
