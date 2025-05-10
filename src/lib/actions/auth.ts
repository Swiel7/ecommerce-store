"use server";

import { loginSchema, registerSchema } from "@/lib/validations";
import { auth, signIn, signOut } from "auth";
import { hash } from "bcryptjs";
import {
  isRedirectError,
  RedirectType,
} from "next/dist/client/components/redirect-error";
import { CredentialsSignin, User } from "next-auth";
import { getUserByEmail } from "@/lib/services/user";
import { createUser } from "./user";
import { redirect } from "next/navigation";

type AuthResponse = { success: boolean; message: string };

export const redirectToUrl = async (url: string, type?: RedirectType) => {
  redirect(url, type);
};

export const authenticateUser = async (): Promise<User | null> => {
  const session = await auth();

  if (session?.user) return session.user;
  else throw new Error("Unauthorized!");
};

export const loginWithCredentials = async (
  values: unknown,
): Promise<AuthResponse> => {
  try {
    const parsedValues = loginSchema.parse(values);
    await signIn("credentials", { ...parsedValues, redirect: false });

    return { success: true, message: "Sign in successfully!" };
  } catch (error) {
    let message = "Oops. Something went wrong!";

    if (error instanceof CredentialsSignin)
      message = "Invalid email or password!";
    if (isRedirectError(error)) throw error;

    return { success: false, message };
  }
};

export const register = async (values: unknown): Promise<AuthResponse> => {
  try {
    const { email, password, firstName, lastName } =
      registerSchema.parse(values);

    const existingUser = await getUserByEmail(email);

    if (existingUser)
      return { success: false, message: "User already exists!" };

    const hashedPassword = await hash(password, 10);
    await createUser({ firstName, lastName, email, password: hashedPassword });

    const { success, message } = await loginWithCredentials({
      email,
      password,
      remember: false,
    });

    if (!success) return { success, message };

    return { success: true, message: "User created successfully!" };
  } catch (error) {
    if (isRedirectError(error)) throw error;

    return { success: false, message: "Oops. Something went wrong!" };
  }
};

export const logout = async (options?: {
  redirectTo?: string;
  redirect?: true | undefined;
}) => {
  await signOut(options);
};
