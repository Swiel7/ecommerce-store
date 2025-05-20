"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { TShippingAddress, TUser } from "@/types";
import { eq, InferInsertModel } from "drizzle-orm";
import { updatePasswordSchema, updateProfileSchema } from "../validations";
import { authenticateUser } from "./auth";
import { getUserById } from "../services/user";
import { compare, hash } from "bcryptjs";

type UpdateUserResponse =
  | { success: false; message: string }
  | {
      success: true;
      message: string;
      data: Pick<TUser, "firstName" | "lastName" | "email">;
    };

export const createUser = async (values: InferInsertModel<typeof users>) => {
  return await db.insert(users).values(values).returning();
};

export const updateUserInfo = async (
  values: unknown,
): Promise<UpdateUserResponse> => {
  try {
    const user = await authenticateUser();
    if (!user) return { success: false, message: "User not authenticated!" };

    const result = updateProfileSchema.parse(values);

    if (
      user.firstName === result.firstName &&
      user.lastName === result.lastName &&
      user.email === result.email
    )
      return {
        success: true,
        message: "User updated successfully!",
        data: {
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.email,
        },
      };

    const existingUser = await getUserById(user.id!);
    if (!existingUser) return { success: false, message: "User not found!" };

    const { firstName, lastName, email } = await db
      .update(users)
      .set(result)
      .where(eq(users.id, existingUser.id))
      .returning()
      .then((res) => res[0]);

    return {
      success: true,
      message: "User updated successfully!",
      data: { firstName, lastName, email },
    };
  } catch {
    return { success: false, message: "Oops. Something went wrong!" };
  }
};

export const changeUserPassword = async (
  values: unknown,
): Promise<{ success: boolean; message: string }> => {
  try {
    const user = await authenticateUser();
    if (!user) return { success: false, message: "User not authenticated!" };

    const { currentPassword, newPassword } = updatePasswordSchema.parse(values);

    const existingUser = await getUserById(user.id!);
    if (!existingUser) return { success: false, message: "User not found!" };

    const isPasswordValid = await compare(
      currentPassword,
      existingUser.password,
    );

    if (!isPasswordValid)
      return { success: false, message: "Current password is incorrect!" };

    const hashedPassword = await hash(newPassword, 10);

    await db
      .update(users)
      .set({ password: hashedPassword })
      .where(eq(users.id, existingUser.id));

    return { success: true, message: "Password changed successfully!" };
  } catch {
    return { success: false, message: "Oops. Something went wrong!" };
  }
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
