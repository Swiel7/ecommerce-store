"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { eq, InferInsertModel } from "drizzle-orm";

export const getUserByEmail = async (email: string) => {
  return await db.query.users.findFirst({ where: eq(users.email, email) });
};

export const getUserById = async (id: string) => {
  return await db.query.users.findFirst({ where: eq(users.id, id) });
};

export const createUser = async (values: InferInsertModel<typeof users>) => {
  return await db.insert(users).values(values).returning();
};
