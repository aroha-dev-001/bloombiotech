"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { site, telHref } from "@/lib/site";

/**
 * Seven destinations, ordered the way the site tells its story. Labels are what
 * a grower would say out loud, not what the plant calls things internally.
 */
const links = [
  { href: "/about", label: "About", note: "Since 2013", core: true },
  { href: "/products", label: "Products", note: "15 packs", core: true },
  { href: "/solutions", label: "Solutions", note: "By crop", core: true },
  { href: "/#labs-to-farms", label: "Labs to farms", note: "The journey", core: false },
  { href: "/field", label: "Field stories", note: "Crop records", core: false },
  { href: "/gallery", label: "Manufacturing", note: "Plant + footage", core: false },
  { href: "/enquire", label: "Contact", note: "Quote desk", core: true },
];

/** Hash links must not light up as a section; match on pathname only. */
function isActive(path: string, href: string) {
  if (href.includes("#")) return false;
  if (href === "/") return path === "/";
  return path === href || path.startsWith(`${href}/`);
}

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const onHero = path === "/";

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="site-header" data-solid={onHero ? undefined : "true"}>
        <div className="shell flex h-[var(--nav-h)] items-center justify-between gap-6">
          <Link href="/" aria-label="Bloom Biotech, home" className="flex items-center">
            <Logo priority className="h-8 w-auto sm:h-9" tone="dark" />
          </Link>

          <nav className="hidden items-center gap-5 xl:gap-7 lg:flex" aria-label="Primary">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                data-active={isActive(path, l.href) || undefined}
                className={l.core ? "nav-link" : "nav-link hidden xl:inline-flex"}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href={telHref()} className="nav-link hidden 2xl:inline-flex">
              {site.phoneDisplay}
            </a>
            <Link
              href="/solutions#finder"
              className="btn btn-primary hidden h-10 min-h-10 sm:inline-flex"
            >
              Find the right product
              <span className="arw" aria-hidden>
                →
              </span>
            </Link>
            <button
              type="button"
              className="nav-toggle xl:hidden"
              aria-expanded={open}
              aria-controls="nav-sheet"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="grid gap-[5px]" aria-hidden>
                <i
                  className="block h-px w-5 bg-current transition-transform duration-300"
                  style={open ? { transform: "translateY(6px) rotate(45deg)" } : undefined}
                />
                <i
                  className="block h-px w-5 bg-current transition-opacity duration-300"
                  style={open ? { opacity: 0 } : undefined}
                />
                <i
                  className="block h-px w-5 bg-current transition-transform duration-300"
                  style={open ? { transform: "translateY(-6px) rotate(-45deg)" } : undefined}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="nav-sheet"
        className={`nav-sheet ${open ? "is-open" : ""}`}
        aria-hidden={!open}
        data-tone="dark"
      >
        <div className="shell flex h-[var(--nav-h)] items-center justify-between">
          <Logo className="h-8 w-auto" tone="dark" />
          <button
            type="button"
            className="nav-toggle"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            tabIndex={open ? 0 : -1}
          >
            <span aria-hidden className="text-lg leading-none">
              ×
            </span>
          </button>
        </div>

        <nav className="shell self-center py-6" aria-label="Mobile">
          {links.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              className="nav-sheet-item"
              onClick={() => setOpen(false)}
              style={{ ["--i" as string]: i }}
              tabIndex={open ? 0 : -1}
            >
              <span className="display d-3">{l.label}</span>
              <span className="eyebrow">{l.note}</span>
            </Link>
          ))}
        </nav>

        <div className="shell grid gap-3 pb-[calc(2rem+env(safe-area-inset-bottom))] sm:grid-cols-2">
          <a href={telHref()} className="btn btn-ghost" tabIndex={open ? 0 : -1}>
            Call {site.phoneDisplay}
            <span className="arw" aria-hidden>
              →
            </span>
          </a>
          <Link
            href="/solutions#finder"
            className="btn btn-primary"
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
          >
            Find the right product
            <span className="arw" aria-hidden>
              →
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
