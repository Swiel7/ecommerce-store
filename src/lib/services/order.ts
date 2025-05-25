import { db } from "@/db";
import { orders } from "@/db/schema";
import { TOrder } from "@/types";
import { and, count, desc, eq, SQL } from "drizzle-orm";
import { authenticateUser } from "../actions/auth";
import { ORDERS_PER_PAGE } from "../constants";

export const getOrderById = async (orderId: string): Promise<TOrder> => {
  return await db
    .select()
    .from(orders)
    .where(eq(orders.id, orderId))
    .then((res) => res[0]);
};

export const getMyOrders = async (
  status: TOrder["orderStatus"] | "All",
  page = 1,
  limit = ORDERS_PER_PAGE,
): Promise<{ data: TOrder[]; totalPages: number }> => {
  const user = await authenticateUser();
  if (!user) return { data: [], totalPages: 0 };

  const offset = limit ? (page - 1) * limit : 0;

  const filters: Record<TOrder["orderStatus"], SQL | undefined> = {
    Pending: eq(orders.orderStatus, "Pending"),
    Delivered: eq(orders.orderStatus, "Delivered"),
    Refunded: eq(orders.orderStatus, "Refunded"),
  };

  const data = await db
    .select()
    .from(orders)
    .where(
      and(
        eq(orders.userId, user.id!),
        eq(orders.isPaid, true),
        status !== "All" ? filters[status] : undefined,
      ),
    )
    .orderBy(desc(orders.createdAt))
    .offset(offset)
    .limit(limit);

  const dataCount = await db
    .select({ count: count() })
    .from(orders)
    .where(
      and(
        eq(orders.userId, user.id!),
        eq(orders.isPaid, true),
        status !== "All" ? filters[status] : undefined,
      ),
    );

  return { data, totalPages: Math.ceil(dataCount[0].count / limit) };
};
