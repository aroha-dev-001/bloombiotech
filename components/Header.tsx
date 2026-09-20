"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { site, telHref } from "@/lib/site";

/** Four destinations. Anything else lives one click deeper. */
const links = [
  { href: "/products", label: "Products" },
  { href: "/solutions", label: "Solutions" },
  { href: "/about", label: "About" },
  { href: "/enquire", label: "Contact" },
];

function isActive(path: string, href: string) {
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
        <div className="glass-bar">
          <Link href="/" aria-label="Bloom Biotech, home" className="glass-brand">
            <Logo priority className="h-7 w-auto sm:h-8" tone="dark" />
          </Link>

          <nav className="glass-nav" aria-label="Primary">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                data-active={isActive(path, l.href) || undefined}
                className="nav-link"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/solutions#find"
              className="btn btn-primary hidden h-11 min-h-11 px-5 text-[0.95rem] sm:inline-flex"
            >
              Find your solution
            </Link>
            <button
              type="button"
              data-menu
              className="nav-toggle"
              aria-expanded={open}
              aria-controls="nav-sheet"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="grid gap-[6px]" aria-hidden>
                <i
                  className="block h-px w-5 bg-current transition-transform duration-300"
                  style={open ? { transform: "translateY(7px) rotate(45deg)" } : undefined}
                />
                <i
                  className="block h-px w-5 bg-current transition-opacity duration-300"
                  style={open ? { opacity: 0 } : undefined}
                />
                <i
                  className="block h-px w-5 bg-current transition-transform duration-300"
                  style={open ? { transform: "translateY(-7px) rotate(-45deg)" } : undefined}
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
            <span aria-hidden className="text-xl leading-none">
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
              <span className="display d-2">{l.label}</span>
              <span aria-hidden className="text-[var(--lime)]">
                →
              </span>
            </Link>
          ))}
        </nav>

        <div className="shell grid gap-3 pb-[calc(2rem+env(safe-area-inset-bottom))] sm:grid-cols-2">
          <a href={telHref()} className="btn btn-ghost" tabIndex={open ? 0 : -1}>
            Call {site.phoneDisplay}
          </a>
          <Link
            href="/solutions#find"
            className="btn btn-primary"
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
          >
            Find your solution
          </Link>
        </div>
      </div>
    </>
  );
}
