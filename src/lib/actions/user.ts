"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { TShippingAddress, TUser } from "@/types";
import { eq, InferInsertModel } from "drizzle-orm";
import { updatePasswordSchema, updateProfileSchema } from "../validations";
import { authenticateUser } from "./auth";
import { getUserById } from "../services/user";
import { compare, hash } from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { v4 as uuid } from "uuid";

type UpdateUserResponse =
  | { success: false; message: string }
  | {
      success: true;
      message: string;
      data: Pick<TUser, "firstName" | "lastName" | "email">;
    };

export const createUser = async (
  values: InferInsertModel<typeof users>,
): Promise<TUser> => {
  return await db
    .insert(users)
    .values(values)
    .returning()
    .then((res) => res[0]);
};

export const updateUser = async (
  values: Partial<InferInsertModel<typeof users>>,
): Promise<TUser> => {
  return await db
    .update(users)
    .set(values)
    .returning()
    .then((res) => res[0]);
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
): Promise<{ success: boolean; message: string }> => {
  const user = await getUserById(userId);
  if (!user) return { success: false, message: "User not found!" };

  const existing = user.addresses?.some(
    (a) => JSON.stringify(a) === JSON.stringify(address),
  );

  if (existing)
    return { success: false, message: "Shipping address already exists!" };

  const newAddresses = [...(user?.addresses || []), { ...address, id: uuid() }];

  await db
    .update(users)
    .set({ addresses: newAddresses })
    .where(eq(users.id, userId));

  revalidatePath("account/addresses");
  return { success: true, message: "Shipping address added successfully!" };
};

export const deleteShippingAddress = async (
  id: string,
): Promise<{ success: boolean; message: string }> => {
  try {
    const user = await authenticateUser();
    if (!user) return { success: false, message: "User not authenticated!" };

    const existingUser = await getUserById(user.id!);
    if (!existingUser) return { success: false, message: "User not found!" };

    const newAddresses = existingUser.addresses?.filter((a) => a.id !== id);
    await updateUser({ addresses: newAddresses });

    revalidatePath("account/addresses");
    return { success: true, message: "Shipping address deleted successfully!" };
  } catch {
    return { success: false, message: "Oops. Something went wrong!" };
  }
};

export const updateShippingAddress = async (
  address: TShippingAddress,
): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const user = await authenticateUser();
    if (!user) return { success: false, message: "User not authenticated!" };

    const existingUser = await getUserById(user.id!);
    if (!existingUser) return { success: false, message: "User not found!" };

    const addresses = existingUser.addresses?.map((a) =>
      a.id === address.id ? address : a,
    );

    await updateUser({ addresses });

    revalidatePath("account/addresses");
    return { success: true, message: "Shipping address updated successfully!" };
  } catch {
    return { success: false, message: "Oops. Something went wrong!" };
  }
};

export const addToWishlist = async (productId: string) => {
  try {
    const user = await authenticateUser();
    if (!user) redirect("/login");

    const existingUser = await getUserById(user.id!);
    if (!existingUser) return { success: false, message: "User not found!" };

    const wishlist = [...(existingUser.wishlist || []), productId];

    await updateUser({ wishlist });

    return { success: true, message: "Product added to wishlist!" };
  } catch {
    return { success: false, message: "Oops. Something went wrong!" };
  }
};

export const removeFromWishlist = async (productId: string) => {
  try {
    const user = await authenticateUser();
    if (!user) redirect("/login");

    const existingUser = await getUserById(user.id!);
    if (!existingUser) return { success: false, message: "User not found!" };

    if (existingUser.wishlist && existingUser.wishlist.includes(productId)) {
      const wishlist = existingUser.wishlist?.filter((id) => id !== productId);

      await updateUser({ wishlist });
      return { success: true, message: "Product removed from wishlist!" };
    }
  } catch {
    return { success: false, message: "Oops. Something went wrong!" };
  }
};
