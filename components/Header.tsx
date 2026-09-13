"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MorphIcon } from "morphicons/react";
import { Menu, X } from "lucide";
import { Logo } from "./Logo";
import { Button } from "./Button";
import { site, telHref } from "@/lib/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Company" },
  { href: "/products", label: "Catalogue" },
  { href: "/gallery", label: "Photos" },
  { href: "/journal", label: "Journal" },
  { href: "/#faq", label: "FAQ" },
];

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2.5">
        <Link
          href="/"
          className="flex h-12 shrink-0 items-center overflow-hidden sm:h-[3.25rem]"
          onClick={() => setOpen(false)}
        >
          <Logo
            priority
            className="h-10 max-h-10 max-w-[11rem] sm:h-12 sm:max-h-12 sm:max-w-[16rem]"
          />
        </Link>
        <nav className="hidden items-center gap-5 text-[13px] text-forest lg:flex lg:gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              data-active={l.href === "/" ? path === "/" : path.startsWith(l.href)}
              className="nav-link"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <Button href={telHref()} variant="ghost">
            Call {site.phoneDisplay}
          </Button>
          <Button href="/enquire">Request a quote</Button>
        </div>
        <button
          type="button"
          className="grid h-11 w-11 place-items-center border border-forest/15 text-forest lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <MorphIcon
            icon={open ? X : Menu}
            size={22}
            color="currentColor"
            strokeWidth={1.75}
            reducedMotion="user"
          />
        </button>
      </div>
      <nav
        className={`mobile-nav lg:hidden ${open ? "is-open" : ""}`}
        aria-hidden={!open}
      >
        <div className="flex flex-col gap-2 px-4 py-4">
          {links.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              data-active={l.href === "/" ? path === "/" : path.startsWith(l.href)}
              className="nav-card"
              style={{ ["--i" as string]: i }}
            >
              <span>
                <span className="font-mono text-[10px] text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="ml-2 text-lg">{l.label}</span>
              </span>
              <span className="text-leaf">→</span>
            </Link>
          ))}
          <div className="nav-actions mt-1 flex flex-col gap-2">
            <Button
              href={telHref()}
              variant="ghost"
              className="w-full"
              onClick={() => setOpen(false)}
            >
              Call {site.phoneDisplay}
            </Button>
            <Button href="/enquire" className="w-full" onClick={() => setOpen(false)}>
              Request a quote
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}
