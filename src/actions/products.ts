"use server";

import { db } from "@/db";
import { categories, products } from "@/db/schema";
import {
  TCategory,
  TFilterURLSearchParams,
  TProduct,
  TSortValue,
} from "@/types";
import {
  and,
  asc,
  eq,
  getTableColumns,
  isNotNull,
  SQL,
  sql,
} from "drizzle-orm";
import { getFilterConditions } from "./filters";
import { PRODUCTS_PER_PAGE } from "@/lib/constants";

export const getCategories = async (): Promise<TCategory[]> => {
  return await db.select().from(categories).where(isNotNull(categories.image));
};

export const getFeaturedProducts = async (): Promise<TProduct[]> => {
  return await db
    .select()
    .from(products)
    .where(eq(products.isFeatured, true))
    .orderBy(asc(products.name))
    .limit(4);
};

export const getOnSaleProducts = async (): Promise<TProduct[]> => {
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
  const page = Number(searchParams.page || 1);
  const sort: TSortValue = (searchParams.sort as TSortValue) || "default";
  const conditions = await getFilterConditions(searchParams);
  const offset = (page - 1) * PRODUCTS_PER_PAGE;

  const sortOptions: Record<TSortValue, SQL> = {
    default: sql`name ASC`,
    rating: sql`rating DESC`,
    price_asc: sql`COALESCE(discountPrice, regularPrice) ASC`,
    price_desc: sql`COALESCE(discountPrice, regularPrice) DESC`,
    latest: sql`createdAt DESC`,
  };

  const [items, total] = await Promise.all([
    db
      .select()
      .from(products)
      .where(and(...conditions))
      .orderBy(sortOptions[sort])
      .offset(offset)
      .limit(PRODUCTS_PER_PAGE),

    db
      .select({ count: sql<number>`COUNT(*)` })
      .from(products)
      .where(and(...conditions)),
  ]);

  return {
    products: items,
    total: total[0]?.count ?? 0,
    totalPages: Math.ceil((total[0]?.count ?? 0) / PRODUCTS_PER_PAGE),
  };
};

export const getProductBySlug = async (
  slug: string,
): Promise<TProduct | null> => {
  const product = await db
    .select({ ...getTableColumns(products), category: categories.name })
    .from(products)
    .where(eq(products.slug, slug))
    .innerJoin(categories, eq(products.category, categories.id));

  return product.length > 0 ? product[0] : null;
};
