import { WhatsAppNudge } from "@/components/products/WhatsAppNudge";
import { products } from "@/lib/products";

/**
 * Shared by the catalogue and every product page, so the time someone spends
 * browsing packs carries across them rather than restarting on each one.
 */
const names = Object.fromEntries(products.map((p) => [p.slug, p.name]));

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <WhatsAppNudge names={names} />
    </>
  );
}
