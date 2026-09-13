import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const revealEase = [0.22, 1, 0.36, 1] as const;

export const revealViewport = { once: true, margin: "-80px" as const };

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
