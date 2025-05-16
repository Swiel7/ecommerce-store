"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { TShippingAddress } from "@/types";
import { eq, InferInsertModel } from "drizzle-orm";

export const createUser = async (values: InferInsertModel<typeof users>) => {
  return await db.insert(users).values(values).returning();
};

export const createShippingAddressIfNotExists = async (
  address: TShippingAddress,
  userId: string,
) => {
  const user = await db.query.users.findFirst({ where: eq(users.id, userId) });

  const existing = user?.addresses?.some(
    (a) => JSON.stringify(a) === JSON.stringify(address),
  );

  if (!existing) {
    const newAddresses = [...(user?.addresses || []), address];

    await db
      .update(users)
      .set({ addresses: newAddresses })
      .where(eq(users.id, userId));
  }
};
