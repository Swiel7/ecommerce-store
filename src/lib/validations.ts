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

export const updateProfileSchema = z.object({
  firstName: z.string().min(3, "First name must be at least 3 characters"),
  lastName: z.string().min(3, "Last name must be at least 3 characters"),
  email: z.string().email().min(3, "Email must be at least 3 characters"),
});

export const updatePasswordSchema = z
  .object({
    currentPassword: z.string(),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmNewPassword: z
      .string()
      .min(8, "Confirm password must be at least 8 characters"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ["confirmNewPassword"],
  });

// export const shippingAddressSchema = z.object({
//   firstName: z.string().min(3, "First name must be at least 3 characters"),
//   lastName: z.string().min(3, "Last name must be at least 3 characters"),
//   // country: z.string().min(3, "country must be at least 3 characters"),  Dropdown (3 opcje)
//   line1: z.string().min(3, "Address must be at least 3 characters"),
//   line2: z.string().optional().nullable(),
//   city: z.string().min(3, "City must be at least 3 characters"),
//   state: z.string().optional().nullable(),
//   postalCode: z.string().min(3, "Postal code must be at least 3 characters"),

// });
