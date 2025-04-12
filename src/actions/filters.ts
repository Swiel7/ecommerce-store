"use server";

import { db } from "@/db";
import { categories, products } from "@/db/schema";
import { TFilterOption, TFilterOptionColor } from "@/types";
import { eq, sql } from "drizzle-orm";

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
