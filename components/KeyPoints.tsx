/**
 * A short list of key points: each a few bold words and one line under them.
 *
 * The site's reading pages used to explain themselves in paragraphs. This is
 * the replacement wherever a section is really a list of facts: the product
 * page's "what it does", the About page's story, anything a grower should be
 * able to take in at a glance.
 */
export type KeyPoint = { title: string; how: string };

export function Tick() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden className="pk-tick">
      <circle cx="10" cy="10" r="10" />
      <path d="M5.8 10.4l2.7 2.7 5.7-6" />
    </svg>
  );
}

export function KeyPoints({ items, className }: { items: KeyPoint[]; className?: string }) {
  return (
    <ul className={className ? `pk-points ${className}` : "pk-points"}>
      {items.map((p) => (
        <li key={p.title}>
          <Tick />
          <div>
            <h3>{p.title}</h3>
            <p>{p.how}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
