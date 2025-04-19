"use server";

import { db } from "@/db";
import { categories, products } from "@/db/schema";
import { PRODUCTS_PER_PAGE } from "@/lib/constants";
import { TFilterURLSearchParams, TSortValue } from "@/types";
import { and, asc, desc, eq, isNotNull, sql } from "drizzle-orm";
import { getFilterConditions } from "./filters";

export const getCategories = async (): Promise<
  (typeof categories.$inferSelect)[]
> => {
  return await db.select().from(categories).where(isNotNull(categories.image));
};

export const getFeaturedProducts = async (): Promise<
  (typeof products.$inferSelect)[]
> => {
  return await db
    .select()
    .from(products)
    .where(eq(products.isFeatured, true))
    .orderBy(asc(products.name))
    .limit(4);
};

export const getOnSaleProducts = async (): Promise<
  (typeof products.$inferSelect)[]
> => {
  return await db
    .select()
    .from(products)
    .where(eq(products.onSale, true))
    .orderBy(asc(products.name))
    .limit(4);
};

export const getFilteredProducts = async (
  searchParams: TFilterURLSearchParams,
) => {
  const conditions = await getFilterConditions(searchParams);
  const sort = searchParams.sort || "default";
  const page = searchParams.page || 1;

  let order;
  switch (sort as TSortValue) {
    case "price_asc":
      order = asc(
        sql`COALESCE(${products.discountPrice}, ${products.regularPrice})`,
      );
      break;
    case "price_desc":
      order = desc(
        sql`COALESCE(${products.discountPrice}, ${products.regularPrice})`,
      );
      break;
    case "rating":
      order = desc(products.rating);
      break;
    case "latest":
      order = desc(products.createdAt);
      break;
    default:
      order = asc(products.name);
      break;
  }

  return await db
    .select()
    .from(products)
    .where(and(...conditions))
    .orderBy(order)
    .offset((Number(page) - 1) * PRODUCTS_PER_PAGE)
    .limit(PRODUCTS_PER_PAGE);
};
