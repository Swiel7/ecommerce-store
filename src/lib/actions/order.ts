"use server";

import { db } from "@/db";
import { orders } from "@/db/schema";
import { TOrder } from "@/types";

export const createOrder = async (order: TOrder): Promise<TOrder> => {
  return await db
    .insert(orders)
    .values(order)
    .returning()
    .then((res) => res[0]);
};
