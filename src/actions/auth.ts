"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { loginSchema, registerSchema } from "@/lib/validations";
import { signIn, signOut } from "auth";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect, RedirectType } from "next/navigation";
import { z, ZodError } from "zod";

export const redirectToUrl = async (url: string, type?: RedirectType) => {
  redirect(url, type);
};

export const loginWithCredentials = async (
  values: z.infer<typeof loginSchema>,
) => {
  try {
    loginSchema.parse(values);
    await signIn("credentials", values);

    return { success: true, message: "Sign in successfully" };
  } catch (error) {
    if (isRedirectError(error)) throw error;

    return { success: false, message: "Invalid email or password" };
  }
};

export const register = async (values: z.infer<typeof registerSchema>) => {
  try {
    const { email, password, firstName, lastName } =
      registerSchema.parse(values);

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0) throw new Error("User already exists");

    const hashedPassword = await hash(password, 10);

    await db.insert(users).values({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await loginWithCredentials({ email, password, remember: false });

    return { success: true };
  } catch (error) {
    let err = "An error occurred.";

    if (error instanceof ZodError) {
      err = fromError(error).toString();
    } else if (error instanceof AuthError || error instanceof Error) {
      err = error.message;
    }
    return { success: false, error: err };
  }
};

export const logout = async () => {
  await signOut();
};

// TODO: Add forgot password functionality
// TODO: Add reset password functionality
