import Link from "next/link";

/**
 * The way out of a product page: always to the catalogue.
 *
 * It used to step back through the browser's history, which from a product
 * opened on the home page, the chat or a search went somewhere other than the
 * products. The owner wants it to go to the products every time, so it is a
 * plain link that says where it goes.
 */
export function BackLink({ href = "/products", label = "Back to products" }: { href?: string; label?: string }) {
  return (
    <Link href={href} className="link">
      <span aria-hidden>←</span> {label}
    </Link>
  );
}
