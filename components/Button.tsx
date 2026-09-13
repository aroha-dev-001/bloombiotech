"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";

type Props = {
  href?: string;
  variant?: "primary" | "ghost";
  className?: string;
  children: ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
};

export function Button({
  href,
  variant = "primary",
  className = "",
  children,
  type = "button",
  disabled,
  onClick,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const cls = `btn ${variant === "primary" ? "btn-primary" : "btn-ghost"} relative z-10 ${className}`;

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${dx * 0.18}px, ${dy * 0.22}px) scale(1.03)`;
  }

  function onLeave() {
    if (ref.current) ref.current.style.transform = "";
  }

  const motion = { onMouseMove: onMove, onMouseLeave: onLeave };

  if (href) {
    const external = /^(https?:|tel:|mailto:|sms:)/i.test(href);
    if (external) {
      return (
        <a
          href={href}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={cls}
          onClick={onClick}
          {...motion}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href}
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={cls}
        onClick={onClick}
        {...motion}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      className={cls}
      onClick={onClick}
      {...motion}
    >
      {children}
    </button>
  );
}
