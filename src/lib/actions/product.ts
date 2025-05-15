"use server";

import { db } from "@/db";
import { products } from "@/db/schema";
import { TProduct } from "@/types";
import { eq } from "drizzle-orm";

export const updateProductStock = async (
  productId: string,
  color: string,
  quantity: number,
): Promise<TProduct> => {
  const product = await db.query.products.findFirst({
    where: eq(products.id, productId),
    columns: { variants: true },
  });

  const variants = product?.variants.map((v) =>
    v.colorName === color ? { ...v, stock: v.stock - quantity } : v,
  );

  const result = await db
    .update(products)
    .set({ variants })
    .where(eq(products.id, productId))
    .returning();

  return result[0];
};
