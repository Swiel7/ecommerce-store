import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatSlug = (text: string) => {
  return text.trim().toLowerCase().replace(" ", "-");
};
