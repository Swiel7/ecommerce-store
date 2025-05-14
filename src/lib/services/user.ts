import { db } from "@/db";
import { users } from "@/db/schema";
import { TUser } from "@/types";
import { eq } from "drizzle-orm";
import { stripe } from "../stripe";

export const getUserByEmail = async (email: string) => {
  return await db.query.users.findFirst({ where: eq(users.email, email) });
};

export const getUserById = async (id: string) => {
  return await db.query.users.findFirst({ where: eq(users.id, id) });
};

export const createOrGetStripeCustomer = async (
  user: TUser,
): Promise<
  { success: true; stripeCustomerId: string } | { success: false }
> => {
  if (user.stripeCustomerId)
    return { success: true, stripeCustomerId: user.stripeCustomerId };

  try {
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: {
        userId: user.id,
      },
    });

    await db
      .update(users)
      .set({ stripeCustomerId: customer.id })
      .where(eq(users.id, user.id));

    return { success: true, stripeCustomerId: customer.id };
  } catch (error) {
    console.error(error);

    return { success: false };
  }
};
