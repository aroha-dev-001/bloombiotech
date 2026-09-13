"use client";

import { useEffect, useRef, useState } from "react";

export function CountUp({
  value,
  decimals = 0,
  suffix = "",
  prefix = "",
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}) {
  const [bump, setBump] = useState(false);
  const seen = useRef(false);
  const el = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = el.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || seen.current) return;
        seen.current = true;
        setBump(true);
      },
      { threshold: 0.2 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [value]);

  return (
    <span
      ref={el}
      className={`inline-block origin-bottom ${bump ? "stat-bump" : ""}`}
    >
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}
