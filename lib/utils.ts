import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string, { short = true } = {}) {
  return new Date(date)
    .toLocaleDateString(undefined, {
      year: "numeric",
      month: short ? "short" : "long",
      day: "numeric",
    })
    .toLowerCase();
}
