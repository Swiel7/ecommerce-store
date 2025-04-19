"use server";

import { db } from "@/db";
import { categories, products } from "@/db/schema";
import { PRODUCTS_PER_PAGE } from "@/lib/constants";
import {
  TFilterOption,
  TFilterOptionColor,
  TFilterURLSearchParams,
} from "@/types";
import { and, count, eq, gte, inArray, lte, SQL, sql } from "drizzle-orm";
import { toArray } from "drizzle-orm/mysql-core";

export const getFilters = async () => {
  const getStatuses = async (): Promise<TFilterOption[]> => {
    const [featured, onSale, inStock] = await Promise.all([
      db
        .select({ count: sql<number>`COUNT(*)` })
        .from(products)
        .where(eq(products.isFeatured, true)),
      db
        .select({ count: sql<number>`COUNT(*)` })
        .from(products)
        .where(eq(products.onSale, true)),
      db.execute(sql`
      SELECT COUNT(*) FROM products
      WHERE EXISTS (
        SELECT 1 FROM jsonb_array_elements(variants) AS variant
        WHERE (variant->>'stock')::int > 0
      )
    `),
    ]);

    return [
      { label: "Featured", count: featured[0]?.count ?? 0 },
      {
        label: "In Stock",
        count: parseInt((inStock.rows[0]?.count as string) || "0", 10),
      },
      { label: "On Sale", count: onSale[0]?.count ?? 0 },
    ];
  };

  const getCategories = async (): Promise<TFilterOption[]> => {
    return await db
      .select({ label: categories.name, count: sql<number>`COUNT(*)` })
      .from(products)
      .innerJoin(categories, eq(products.category, categories.id))
      .groupBy(categories.name)
      .orderBy(categories.name);
  };

  const getBrands = async (): Promise<TFilterOption[]> => {
    return await db
      .select({ label: products.brand, count: sql<number>`COUNT(*)` })
      .from(products)
      .groupBy(products.brand)
      .orderBy(products.brand);
  };

  const getColors = async (): Promise<TFilterOptionColor[]> => {
    const result = await db.execute(sql`
    SELECT DISTINCT
      variant->>'colorName' AS "colorName",
      variant->>'colorCode' AS "colorCode"
    FROM products,
    LATERAL jsonb_array_elements(variants) AS variant
  `);

    return result.rows as { colorName: string; colorCode: string }[];
  };

  const [status, category, brand, color] = await Promise.all([
    getStatuses(),
    getCategories(),
    getBrands(),
    getColors(),
  ]);

  return { status, category, brand, color };
};

export const getFilterConditions = async (
  searchParams: TFilterURLSearchParams,
): Promise<SQL<unknown>[]> => {
  const { category, brand, color, status, price } = searchParams;
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
      WHERE elem->>'colorName' IN (${sql.join(colors, sql`, `)})
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

  return conditions;
};

export const getTotals = async (searchParams: TFilterURLSearchParams) => {
  const conditions = await getFilterConditions(searchParams);

  const [productsCount] = await db
    .select({ count: count() })
    .from(products)
    .where(and(...conditions));

  return {
    totalProducts: productsCount.count,
    totalPages: Math.ceil(productsCount.count / PRODUCTS_PER_PAGE),
  };
};
