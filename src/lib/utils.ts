import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatSlug = (text: string) => {
  return text.trim().toLowerCase().replace(" ", "-");
};

export const formatPrice = (number: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number / 100);
};

export const getAverage = (array: number[]) => {
  return array.reduce((sum, current) => sum + current, 0) / array.length;
};
