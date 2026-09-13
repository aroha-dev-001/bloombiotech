const items = [
  "Arka Microbial Consortium",
  "Bio Sanjiveeni · carrier AMC",
  "Bhu Samruddhi · liquid AMC",
  "Arka Actino Consortium · 2015",
  "Arka Fermented Cocopeat",
  "Trichoderma · Pseudomonas",
  "Metarhizium · Beauveria",
  "ICAR-IIHR collaboration",
];

export function DataRail() {
  return (
    <div className="rail" data-tone="dark" aria-hidden>
      <div className="rail-track eyebrow">
        {[...items, ...items].map((item, i) => (
          <span key={`${item}-${i}`}>
            <i className="block h-1 w-1 rounded-full bg-[var(--lime)]" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
