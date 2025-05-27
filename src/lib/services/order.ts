import { db } from "@/db";
import { orders } from "@/db/schema";
import { TOrder, TUser } from "@/types";
import { and, count, desc, eq, SQL } from "drizzle-orm";
import { authenticateUser } from "../actions/auth";
import { ORDERS_PER_PAGE } from "../constants";

export const getOrderById = async (
  orderId: string,
): Promise<
  | (TOrder & { user: Pick<TUser, "email" | "firstName" | "lastName"> })
  | undefined
> => {
  return await db.query.orders.findFirst({
    where: eq(orders.id, orderId),
    with: {
      user: { columns: { email: true, firstName: true, lastName: true } },
    },
  });
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

export const generateOrderId = async (): Promise<string> => {
  let orderId, exists;

  do {
    orderId = `ORD${Date.now()}`;
    exists = await db.query.orders.findFirst({
      where: eq(orders.id, orderId),
    });
  } while (exists);

  return orderId;
};
