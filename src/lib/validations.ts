import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email().min(3, "Email must be at least 3 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  remember: z.boolean(),
});

export const registerSchema = z
  .object({
    firstName: z.string().min(3, "First name must be at least 3 characters"),
    lastName: z.string().min(3, "Last name must be at least 3 characters"),
    email: z.string().email().min(3, "Email must be at least 3 characters"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    terms: z.boolean(),
  })
  .refine((data) => data.terms === true, {
    message: "You must accept Terms and Conditions",
    path: ["terms"],
  });

export const forgotPasswordSchema = z.object({
  email: z.string().email().min(3, "Email must be at least 3 characters"),
});

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Confirm password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const reviewSchema = z.object({
  rating: z.coerce
    .number()
    .int()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),
  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(100, "Description is too long"),
});
