"use server";

import { db } from "@/db";
import { categories, products } from "@/db/schema";
import { TFilterOptionColor, TFilterURLSearchParams } from "@/types";
import { and, eq, inArray, SQL, sql } from "drizzle-orm";
import { toArray } from "drizzle-orm/mysql-core";

export const getFilters = async (searchParams: TFilterURLSearchParams) => {
  const [category, brand, color, status] = await Promise.all([
    db
      .select({ label: categories.name, count: sql<number>`COUNT(*)` })
      .from(products)
      .innerJoin(categories, eq(products.category, categories.id))
      .where(and(...(await getFilterConditions(searchParams, "category"))))
      .groupBy(categories.name),

    db
      .select({ label: products.brand, count: sql<number>`COUNT(*)` })
      .from(products)
      .where(and(...(await getFilterConditions(searchParams, "brand"))))
      .groupBy(products.brand),

    db.execute(sql`
      SELECT DISTINCT
      variant->>'colorName' AS "colorName",
      variant->>'colorCode' AS "colorCode"
    FROM products,
    LATERAL jsonb_array_elements(variants) AS variant
      WHERE ${and(...(await getFilterConditions(searchParams, "color")))} 
    `),

    getStatuses(await getFilterConditions(searchParams, "status")),
  ]);

  return {
    category,
    brand,
    color: color.rows as TFilterOptionColor[],
    status,
  };
};

const getStatuses = async (conditions: SQL[]) => {
  const [featured, onSale, inStock] = await Promise.all([
    db
      .select({ count: sql<number>`COUNT(*)` })
      .from(products)
      .where(and(eq(products.isFeatured, true), ...conditions)),

    db
      .select({ count: sql<number>`COUNT(*)` })
      .from(products)
      .where(and(eq(products.onSale, true), ...conditions)),

    db.execute(sql`
      SELECT COUNT(*) FROM products 
      WHERE EXISTS (
        SELECT 1 FROM jsonb_array_elements(variants) AS variant
        WHERE (variant->>'stock')::int > 0
      )
      AND ${and(...conditions)}
    `),
  ]);

  return [
    { label: "Featured", count: featured[0]?.count || 0 },
    {
      label: "In Stock",
      count: inStock.rows[0]?.count || 0,
    },
    { label: "On Sale", count: onSale[0]?.count || 0 },
  ];
};

export const getFilterConditions = async (
  searchParams: TFilterURLSearchParams,
  excludeKey?: string,
) => {
  const conditions = [];

  if (searchParams.category && excludeKey !== "category") {
    const categoryNames = toArray(searchParams.category);
    const categoryIds = await db
      .select({ id: categories.id })
      .from(categories)
      .where(inArray(categories.name, categoryNames));

    if (categoryIds.length > 0) {
      conditions.push(
        inArray(
          products.category,
          categoryIds.map((c) => c.id),
        ),
      );
    }
  }

  if (searchParams.brand && excludeKey !== "brand") {
    conditions.push(inArray(products.brand, toArray(searchParams.brand)));
  }

  if (searchParams.color && excludeKey !== "color") {
    const colors = toArray(searchParams.color);
    conditions.push(
      sql`EXISTS (
        SELECT 1 FROM jsonb_array_elements(${products.variants}) AS elem
        WHERE elem->>'colorName' IN (${sql.join(colors, sql`, `)})
      )`,
    );
  }

  if (searchParams.status && excludeKey !== "status") {
    const statuses = toArray(searchParams.status);
    if (statuses.includes("Featured")) {
      conditions.push(eq(products.isFeatured, true));
    }
    if (statuses.includes("On Sale")) {
      conditions.push(eq(products.onSale, true));
    }
    if (statuses.includes("In Stock")) {
      conditions.push(
        sql`EXISTS (
          SELECT 1 FROM jsonb_array_elements(${products.variants}) AS variant
          WHERE (variant->>'stock')::int > 0
        )`,
      );
    }
  }

  if (searchParams.price && excludeKey !== "price") {
    const [minPrice, maxPrice] = toArray(searchParams.price);
    conditions.push(
      sql`COALESCE(${products.discountPrice}, ${products.regularPrice}) BETWEEN ${minPrice} AND ${maxPrice}`,
    );
  }

  return conditions;
};
