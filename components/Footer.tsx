import Link from "next/link";
import { site } from "@/lib/site";
import { Logo } from "./Logo";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.6l.4-3H13v-2c0-.6.4-1 1-1Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-forest text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4">
        <div className="space-y-4 md:col-span-2">
          <div className="inline-flex h-14 max-w-[16rem] items-center overflow-hidden bg-white px-3 py-2">
            <Logo className="h-10 max-h-10" />
          </div>
          <p className="max-w-md text-sm leading-relaxed text-paper/75">
            Microbial inputs from Chikkamagaluru. First in India to licence
            IIHR Arka Microbial Consortium.
          </p>
          <div className="flex gap-3">
            <a
              href={site.instagram}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-paper hover:bg-white/10"
              aria-label="Bloom Biotech on Instagram"
            >
              <InstagramIcon />
            </a>
            <a
              href={site.facebook}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-paper hover:bg-white/10"
              aria-label="Bloom Biotech on Facebook"
            >
              <FacebookIcon />
            </a>
          </div>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-lime">
            Visit
          </p>
          <address className="mt-3 not-italic text-sm leading-relaxed text-paper/80">
            {site.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
            <span className="mt-2 block">{site.hours}</span>
          </address>
        </div>
        <div className="space-y-2 text-sm">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-lime">
            Connect
          </p>
          <a className="block hover:underline" href={`tel:+91${site.phone}`}>
            {site.phoneDisplay}
          </a>
          <a className="block hover:underline" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <Link className="block hover:underline" href="/enquire">
            Enquiry form
          </Link>
          <Link className="block hover:underline" href="/#faq">
            FAQ
          </Link>
          <Link className="block hover:underline" href="/gallery">
            Photos
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center font-mono text-[10px] tracking-wide text-paper/50">
        © {new Date().getFullYear()} Bloom Biotech, Chikkamagaluru
      </div>
    </footer>
  );
}
