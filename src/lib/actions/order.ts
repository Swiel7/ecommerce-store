"use server";

import { db } from "@/db";
import { orders } from "@/db/schema";
import { TOrder } from "@/types";
import { generateOrderId } from "../services/order";

export const createOrder = async (order: TOrder): Promise<TOrder> => {
  const id = await generateOrderId();

  return await db
    .insert(orders)
    .values({ ...order, id })
    .returning()
    .then((res) => res[0]);
};
