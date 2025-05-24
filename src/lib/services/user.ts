import { db } from "@/db";
import { products, users } from "@/db/schema";
import { TProduct, TShippingAddress } from "@/types";
import { eq, inArray } from "drizzle-orm";
import { authenticateUser } from "../actions/auth";

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

export const getWishlist = async (userId: string): Promise<string[]> => {
  const { wishlist } = await db
    .select({ wishlist: users.wishlist })
    .from(users)
    .where(eq(users.id, userId))
    .then((res) => res[0]);

  return wishlist || [];
};

export const getProductsFromWishlist = async (): Promise<TProduct[]> => {
  const user = await authenticateUser();
  if (!user) return [];

  const wishlist = await getWishlist(user.id!);

  return await db.select().from(products).where(inArray(products.id, wishlist));
};
