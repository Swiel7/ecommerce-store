"use server";

import { db } from "@/db";
import { categories, products } from "@/db/schema";
import { PRODUCTS_PER_PAGE } from "@/lib/constants";
import { TFilters, TSortValue } from "@/types";
import {
  and,
  asc,
  count,
  desc,
  eq,
  gte,
  inArray,
  isNotNull,
  lte,
  sql,
} from "drizzle-orm";
import { toArray } from "drizzle-orm/mysql-core";

export const getCategories = async () => {
  return await db.select().from(categories).where(isNotNull(categories.image));
};

export const getFeaturedProducts = async () => {
  return await db
    .select()
    .from(products)
    .where(eq(products.isFeatured, true))
    .orderBy(asc(products.name))
    .limit(4);
};

export const getOnSaleProducts = async () => {
  return await db
    .select()
    .from(products)
    .where(eq(products.onSale, true))
    .orderBy(asc(products.name))
    .limit(4);
};

export const getFilteredProducts = async (
  searchParams: Record<
    TFilters | "page" | "sort",
    string | string[] | undefined
  >,
) => {
  const { brand, category, color, status, price, page, sort } = searchParams;
  const conditions = [];

  if (category) {
    const categoryNames = toArray(category);

    const categoryResults = await db
      .select({ id: categories.id })
      .from(categories)
      .where(inArray(categories.name, categoryNames));

    const categoryIds = categoryResults.map((c) => c.id);
    conditions.push(inArray(products.category, categoryIds));
  }

  if (brand) {
    const brands = toArray(brand);
    conditions.push(inArray(products.brand, brands));
  }

  if (color) {
    const colors = toArray(color);
    conditions.push(
      sql`EXISTS (
        SELECT 1 FROM jsonb_array_elements(${products.variants}) AS elem
        WHERE elem->>'colorName' = ANY(${colors})
      )`,
    );
  }

  if (status) {
    const statuses = toArray(status);

    if (statuses.includes("On Sale")) {
      conditions.push(eq(products.onSale, true));
    }
    if (statuses.includes("Featured")) {
      conditions.push(eq(products.isFeatured, true));
    }
    if (statuses.includes("In Stock")) {
      conditions.push(
        sql`EXISTS (
        SELECT 1 FROM jsonb_array_elements(${products.variants}) AS elem
        WHERE (elem->>'stock')::int > 0
      )`,
      );
    }
  }

  if (price) {
    const prices = toArray(price);
    if (prices.length > 1) {
      conditions.push(
        gte(products.regularPrice, Number(prices[0])),
        lte(products.regularPrice, Number(prices[1])),
      );
    }
  }

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

  const [filteredProducts, [totalProducts]] = await Promise.all([
    db
      .select()
      .from(products)
      .where(and(...conditions))
      .orderBy(order)
      .offset((Number(page) - 1) * PRODUCTS_PER_PAGE)
      .limit(PRODUCTS_PER_PAGE),

    db
      .select({ count: count() })
      .from(products)
      .where(and(...conditions)),
  ]);

  return {
    products: filteredProducts,
    totalProducts: totalProducts.count,
    totalPages: Math.ceil(totalProducts.count / PRODUCTS_PER_PAGE),
  };
};
