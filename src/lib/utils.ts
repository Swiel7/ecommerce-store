import { TFilterURLSearchParams, TSortValue } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { SLIDER_MAX_PRICE } from "./constants";
import { sortValues } from "@/data";
import { redirect } from "next/navigation";

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

export const formatDate = (date: Date | number | string) => {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
};

// export const getAverage = (array: number[]) => {
//   return array.reduce((sum, current) => sum + current, 0) / array.length;
// };

export const createSearchParams = (
  searchParams: Record<string, string | string[] | undefined>,
): URLSearchParams => {
  const params = new URLSearchParams();

  for (const key in searchParams) {
    const value = searchParams[key];
    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (v) params.append(key, v);
      });
    } else if (value) {
      params.set(key, value);
    }
  }

  return params;
};

export const getFilterSearchParams = (
  searchParams: TFilterURLSearchParams,
): TFilterURLSearchParams => {
  let shouldRedirect = false;
  let isValidPrice = false;

  let {
    page = "1",
    sort = "default",
    price = ["0", `${SLIDER_MAX_PRICE}`],
  } = searchParams as TFilterURLSearchParams;

  if (Array.isArray(sort) || !sortValues.includes(sort as TSortValue)) {
    sort = "default";
    shouldRedirect = true;
  }

  if (
    Array.isArray(page) ||
    isNaN(parseInt(page, 10)) ||
    parseInt(page, 10) < 1
  ) {
    page = "1";
    shouldRedirect = true;
  }

  if (Array.isArray(price) && price.length === 2) {
    const [minPrice, maxPrice] = price;
    const min = Number(minPrice);
    const max = Number(maxPrice);
    isValidPrice =
      !isNaN(min) &&
      !isNaN(max) &&
      min >= 0 &&
      max <= SLIDER_MAX_PRICE &&
      min < max;
  }

  if (!isValidPrice) {
    price = ["0", `${SLIDER_MAX_PRICE}`];
    shouldRedirect = true;
  }

  const params = createSearchParams({ ...searchParams, page, sort, price });

  if (shouldRedirect) redirect(`?${params.toString()}`);

  return { ...searchParams, page, sort, price };
};
