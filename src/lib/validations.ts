import { z } from "zod";

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
