import Link from "next/link";
import { site } from "@/lib/site";
import { plant } from "@/lib/plant";
import { Logo } from "./Logo";

const columns = [
  {
    title: "Catalogue",
    links: [
      { href: "/products", label: "All 15 packs" },
      { href: "/products/bio-sanjiveeni", label: "Bio Sanjiveeni · AMC" },
      { href: "/products/bhu-samruddhi", label: "Bhu Samruddhi · liquid AMC" },
      { href: "/products/bio-astra", label: "Bio Astra · ACT" },
      { href: "/products/bloom-compost-culture", label: "Compost culture" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "The plant" },
      { href: "/gallery", label: "Film room" },
      { href: "/journal", label: "Field notes" },
      { href: "/#faq", label: "Questions" },
      { href: "/enquire", label: "Request a quote" },
    ],
  },
];

export function Footer() {
  return (
    <footer data-tone="dark" className="relative">
      <div className="shell grid gap-12 py-16 md:grid-cols-[1.3fr_repeat(2,minmax(0,0.7fr))_1fr] md:py-20">
        <div>
          <Logo tone="dark" className="h-9" />
          <p className="lede mt-6 max-w-xs text-[0.95rem]">
            Microbial consortia, biocontrols and crop nutrition, fermented at our
            own unit in Chikkamagaluru. First in India to licence Arka Microbial
            Consortium from ICAR-IIHR.
          </p>
          <div className="mt-6 flex gap-2">
            <a
              href={site.instagram}
              className="tag hover:text-[var(--fg)]"
              aria-label="Bloom Biotech on Instagram"
            >
              Instagram
            </a>
            <a
              href={site.facebook}
              className="tag hover:text-[var(--fg)]"
              aria-label="Bloom Biotech on Facebook"
            >
              Facebook
            </a>
          </div>
        </div>

        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <p className="eyebrow">{col.title}</p>
            <ul className="mt-5 space-y-2.5 text-sm">
              {col.links.map((l) => (
                <li key={l.href + l.label}>
                  <Link
                    href={l.href}
                    className="text-[var(--dim)] transition-colors hover:text-[var(--fg)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <p className="eyebrow">Reach the plant</p>
          <address className="mt-5 space-y-4 text-sm not-italic text-[var(--dim)]">
            <span className="block">
              <span className="meta block text-[0.62rem] uppercase tracking-[0.18em]">
                Production unit
              </span>
              {plant.unitAddress}
            </span>
            <span className="block">
              <span className="meta block text-[0.62rem] uppercase tracking-[0.18em]">
                Office
              </span>
              {site.addressLines.join(", ")}
            </span>
            <span className="block space-y-1">
              <a
                className="block text-[var(--fg)] hover:text-[var(--accent)]"
                href={`tel:+91${site.phone}`}
              >
                {site.phoneDisplay}
              </a>
              <a
                className="block text-[var(--fg)] hover:text-[var(--accent)]"
                href={`mailto:${site.email}`}
              >
                {site.email}
              </a>
              <span className="block">{site.hours}</span>
            </span>
          </address>
        </div>
      </div>

      <div className="shell flex flex-col gap-2 border-t border-[var(--line)] py-6 text-[0.68rem] sm:flex-row sm:items-center sm:justify-between">
        <p className="meta">© {new Date().getFullYear()} Bloom Biotech, Chikkamagaluru</p>
        <p className="meta">GSTIN {plant.gstin}</p>
        <p className="meta">Technological collaboration with ICAR-IIHR</p>
      </div>
    </footer>
  );
}
