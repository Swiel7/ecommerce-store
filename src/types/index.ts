import { sortOptions } from "@/data";
import { categories, orders, products, reviews, users } from "@/db/schema";
import { ContactOption } from "@stripe/stripe-js";
import { InferSelectModel } from "drizzle-orm";
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type TProduct = InferSelectModel<typeof products>;
export type TReview = InferSelectModel<typeof reviews>;
export type TUser = InferSelectModel<typeof users>;
export type TCategory = InferSelectModel<typeof categories>;
export type TOrder = InferSelectModel<typeof orders>;

export type TCartItem = {
  productId: string;
  name: string;
  slug: string;
  image: string;
  regularPrice: number;
  discountPrice: number | null;
  quantity: number;
  color: string;
};

export type TOrderItem = Omit<
  TCartItem,
  "regularPrice" | "discountPrice" | "slug"
> & {
  price: number;
};

export type TCart = {
  items: TCartItem[];
  itemsCount: number;
  itemsPrice: number;
  shippingPrice: number;
  totalPrice: number;
};

export type TShippingAddress = ContactOption & { id: string };

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
