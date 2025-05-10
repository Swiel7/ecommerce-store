import { db } from "@/db";
import { reviews, users } from "@/db/schema";
import { REVIEWS_PER_PAGE } from "@/lib/constants";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";

export const getReviewsByProductId = async (
  productId: string,
  page = 1,
  limit?: number,
) => {
  const offset = limit ? (page - 1) * limit : 0;

  const sq = db.$with("sq").as(
    db
      .select({
        ...getTableColumns(reviews),
        firstName: users.firstName,
        lastName: users.lastName,
        image: users.image,
      })
      .from(reviews)
      .innerJoin(users, eq(reviews.userId, users.id))
      .where(eq(reviews.productId, productId))
      .orderBy(desc(reviews.createdAt))
      .offset(offset),
  );

  if (!limit) return await db.with(sq).select().from(sq);

  return await db.with(sq).select().from(sq).limit(limit);
};

export const getReviewsCount = async (productId: string) => {
  const [totalResult] = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(reviews)
    .where(eq(reviews.productId, productId));

  const totalReviews = totalResult.count;
  const totalPages = Math.ceil(totalReviews / REVIEWS_PER_PAGE);

  return { totalReviews, totalPages };
};

export const getRatingCounts = async (productId: string) => {
  const ratingResult = await db
    .select({
      rating: reviews.rating,
      count: sql<number>`COUNT(*)`,
    })
    .from(reviews)
    .where(eq(reviews.productId, productId))
    .groupBy(reviews.rating);

  const ratingCounts: Record<number, number> = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  for (const r of ratingResult) {
    if (r.rating >= 1 && r.rating <= 5) {
      ratingCounts[r.rating] = r.count;
    }
  }

  return ratingCounts;
};

export const getTestimonials = async () => {
  const sq = db
    .selectDistinctOn([users.email], {
      ...getTableColumns(reviews),
      firstName: users.firstName,
      lastName: users.lastName,
      image: users.image,
    })
    .from(reviews)
    .innerJoin(users, eq(reviews.userId, users.id))
    .where(eq(reviews.rating, 5))
    .orderBy(users.email, desc(sql<number>`length(${reviews.description})`))
    .as("sq");

  return await db
    .select()
    .from(sq)
    .orderBy(desc(sql<number>`length(${sq.description})`))
    .limit(6);
};
