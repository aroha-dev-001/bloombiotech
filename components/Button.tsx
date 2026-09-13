import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "solid";

type Props = {
  href?: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
  arrow?: boolean;
  onClick?: () => void;
};

const variants: Record<Variant, string> = {
  primary: "btn-primary",
  ghost: "btn-ghost",
  solid: "btn-solid",
};

export function Button({
  href,
  variant = "primary",
  className,
  children,
  type = "button",
  disabled,
  arrow = true,
  onClick,
}: Props) {
  const cls = cn("btn", variants[variant], className);
  const inner = (
    <>
      {children}
      {arrow ? (
        <span className="arw" aria-hidden>
          →
        </span>
      ) : null}
    </>
  );

  if (href) {
    const external = /^(https?:|tel:|mailto:|sms:)/i.test(href);
    if (external) {
      return (
        <a href={href} className={cls} onClick={onClick}>
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} onClick={onClick}>
        {inner}
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled} className={cls} onClick={onClick}>
      {inner}
    </button>
  );
}
