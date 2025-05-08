"use server";

import { loginSchema, registerSchema } from "@/lib/validations";
import { signIn, signOut } from "auth";
import { hash } from "bcryptjs";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect, RedirectType } from "next/navigation";
import { z } from "zod";
import { createUser, getUserByEmail } from "./user";

export const redirectToUrl = async (url: string, type?: RedirectType) => {
  redirect(url, type);
};

export const loginWithCredentials = async (
  values: z.infer<typeof loginSchema>,
) => {
  try {
    loginSchema.parse(values);
    await signIn("credentials", { ...values, redirect: false });

    return { success: true, message: "Sign in successfully!" };
  } catch (error) {
    if (isRedirectError(error)) throw error;

    return { success: false, message: "Invalid email or password!" };
  }
};

export const register = async (values: z.infer<typeof registerSchema>) => {
  try {
    const { email, password, firstName, lastName } =
      registerSchema.parse(values);

    const existingUser = await getUserByEmail(email);

    if (existingUser)
      return { success: false, message: "User already exists!" };

    const hashedPassword = await hash(password, 10);
    await createUser({ firstName, lastName, email, password: hashedPassword });
    await loginWithCredentials({ email, password, remember: false });

    return { success: true, message: "User created successfully!" };
  } catch (error) {
    if (isRedirectError(error)) throw error;

    return { success: false, message: "Signup error!" };
  }
};

export const logout = async () => {
  await signOut();
};

// TODO: Add forgot password functionality
// TODO: Add reset password functionality
