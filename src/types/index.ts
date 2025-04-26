import { sortOptions } from "@/data";
import { categories, products, reviews, users } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type TProduct = InferSelectModel<typeof products>;
export type TReview = InferSelectModel<typeof reviews>;
export type TUser = InferSelectModel<typeof users>;
export type TCategory = InferSelectModel<typeof categories>;

export type TIcon = ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
>;

export type TFilterKeys =
  | "status"
  | "category"
  | "brand"
  | "price"
  | "color"
  | "page"
  | "sort";
export type TFilterURLSearchParams = Record<
  TFilterKeys,
  string | string[] | undefined
>;

export type TFilterOption = { label: string; count: number };
export type TFilterOptionColor = { colorName: string; colorCode: string };
export type TSortValue = (typeof sortOptions)[number]["value"];
