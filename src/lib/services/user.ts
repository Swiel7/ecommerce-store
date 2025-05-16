import { db } from "@/db";
import { users } from "@/db/schema";
import { TShippingAddress } from "@/types";
import { eq } from "drizzle-orm";

export const getUserByEmail = async (email: string) => {
  return await db.query.users.findFirst({ where: eq(users.email, email) });
};

export const getUserById = async (id: string) => {
  return await db.query.users.findFirst({ where: eq(users.id, id) });
};

export const getShippingAddresses = async (
  userId: string,
): Promise<TShippingAddress[]> => {
  const { addresses } = await db
    .select({ addresses: users.addresses })
    .from(users)
    .where(eq(users.id, userId))
    .then((res) => res[0]);

  return addresses || [];
};
