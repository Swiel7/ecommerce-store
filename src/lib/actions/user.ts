"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { InferInsertModel } from "drizzle-orm";

export const createUser = async (values: InferInsertModel<typeof users>) => {
  return await db.insert(users).values(values).returning();
};
