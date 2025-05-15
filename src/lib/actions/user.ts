"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { TShippingAddress, TUser } from "@/types";
import { eq, InferInsertModel } from "drizzle-orm";

export const createUser = async (values: InferInsertModel<typeof users>) => {
  return await db.insert(users).values(values).returning();
};

export const createShippingAddress = async (
  address: TShippingAddress,
  userId: string,
): Promise<TUser> => {
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
    columns: { addresses: true },
  });

  const currentAddresses = user?.addresses ?? [];
  const updatedAddresses = [...currentAddresses, address];

  const result = await db
    .update(users)
    .set({ addresses: updatedAddresses })
    .where(eq(users.id, userId))
    .returning();

  return result[0];
};
