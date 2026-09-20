import Link from "next/link";
import { site } from "@/lib/site";
import { plant } from "@/lib/plant";
import { Logo } from "./Logo";

const columns = [
  {
    title: "Products",
    links: [
      { href: "/products", label: "All packs" },
      { href: "/products/bio-sanjiveeni", label: "Bio Sanjiveeni" },
      { href: "/products/bhu-samruddhi", label: "Bhu Samruddhi" },
      { href: "/products/bio-astra", label: "Bio Astra" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { href: "/solutions#find", label: "Find your solution" },
      { href: "/solutions?crop=coffee", label: "Coffee" },
      { href: "/solutions?crop=black-pepper", label: "Black pepper" },
      { href: "/solutions?crop=pomegranate", label: "Pomegranate" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/gallery", label: "The plant" },
      { href: "/field", label: "In the field" },
      { href: "/faq", label: "Questions" },
      { href: "/enquire", label: "Contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer data-tone="dark" className="relative">
      <div className="shell grid gap-14 py-20 md:grid-cols-2 lg:grid-cols-[1.3fr_repeat(3,minmax(0,0.7fr))] md:py-24">
        <div>
          <Logo tone="dark" className="h-9" />
          <p className="lede mt-7 max-w-[26ch]">
            Microbial consortia, biocontrols and crop nutrition, made in
            Chikkamagaluru.
          </p>
          <div className="mt-8 flex gap-2">
            <a href={site.instagram} className="tag hover:text-[var(--fg)]">
              Instagram
            </a>
            <a href={site.facebook} className="tag hover:text-[var(--fg)]">
              Facebook
            </a>
          </div>
        </div>

        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <p className="eyebrow text-[var(--fg)]">{col.title}</p>
            <ul className="mt-5 space-y-3">
              {col.links.map((l) => (
                <li key={l.href + l.label}>
                  <Link
                    href={l.href}
                    className="text-[1.0625rem] text-[var(--dim)] transition-colors hover:text-[var(--fg)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="shell grid gap-6 border-t border-[var(--line)] py-10 md:grid-cols-2">
        <address className="not-italic text-[1.0625rem] leading-relaxed text-[var(--dim)]">
          {plant.unitAddress}
          <span className="mt-3 block">
            <a className="text-[var(--fg)] hover:text-[var(--accent)]" href={`tel:+91${site.phone}`}>
              {site.phoneDisplay}
            </a>
            <span className="mx-2 opacity-40">·</span>
            <a className="text-[var(--fg)] hover:text-[var(--accent)]" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </span>
        </address>
        <p className="meta md:text-right">
          © {new Date().getFullYear()} Bloom Biotech · In technological
          collaboration with ICAR-IIHR
        </p>
      </div>
    </footer>
  );
}
