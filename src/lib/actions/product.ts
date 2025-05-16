"use server";

import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";

export const updateProductStock = async (
  productId: string,
  color: string,
  quantity: number,
) => {
  const product = await db.query.products.findFirst({
    where: eq(products.id, productId),
  });

  if (!product) return;

  const updatedVariants = product.variants.map((v) =>
    v.colorName === color ? { ...v, stock: v.stock - quantity } : v,
  );

  await db
    .update(products)
    .set({ variants: updatedVariants })
    .where(eq(products.id, productId));
};
