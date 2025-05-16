import { TOrderItem, TShippingAddress } from "@/types";
import { relations } from "drizzle-orm";
import {
  pgTable,
  uuid,
  text,
  pgEnum,
  timestamp,
  jsonb,
  integer,
  boolean,
  numeric,
} from "drizzle-orm/pg-core";

export const USER_ROLE = pgEnum("role", ["CUSTOMER", "ADMIN"]);
export const ORDER_STATUS = pgEnum("order_status", [
  "Pending",
  "Delivered",
  "Cancelled",
  "Refunded",
]);

export const users = pgTable("users", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: USER_ROLE("role").default("CUSTOMER").notNull(),
  image: text("image"),
  addresses: jsonb("addresses").$type<TShippingAddress[]>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const categories = pgTable("categories", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const products = pgTable("products", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  category: uuid("category_id")
    .references(() => categories.id)
    .notNull(),
  brand: text("brand").notNull(),
  model: text("model").unique(),
  description: text("description"),
  variants: jsonb("variants")
    .$type<{ colorName: string; colorCode: string; stock: number }[]>()
    .notNull(),
  images: text("images").array().notNull(),
  regularPrice: integer("regular_price").notNull(),
  discountPrice: integer("discount_price"),
  isFeatured: boolean("is_featured").default(false).notNull(),
  onSale: boolean("on_sale").default(false).notNull(),
  dimensions: text("dimensions"),
  weight: integer("weight"),
  rating: numeric("rating", { precision: 3, scale: 2 }).notNull().default("0"),
  numReviews: integer("num_reviews").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const productsRelations = relations(products, ({ many }) => ({
  reviews: many(reviews),
}));

export const reviews = pgTable("reviews", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  productId: uuid("product_id")
    .references(() => products.id)
    .notNull(),
  rating: integer("rating").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at"),
});

export const reviewsRelations = relations(reviews, ({ one }) => ({
  user: one(users, { fields: [reviews.userId], references: [users.id] }),
  product: one(products, {
    fields: [reviews.productId],
    references: [products.id],
  }),
}));

export const orders = pgTable("orders", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  items: jsonb("items").$type<TOrderItem[]>().notNull(),
  shippingAddress: jsonb("shipping_address").$type<TShippingAddress>(),
  paymentMethod: text("payment_method"),
  orderStatus: ORDER_STATUS("order_status").default("Pending").notNull(),
  itemsPrice: integer("items_price").notNull(),
  shippingPrice: integer("shipping_price").notNull(),
  totalPrice: integer("total_price").notNull(),
  isPaid: boolean("is_paid").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at"),
});

export const ordersRelations = relations(orders, ({ one }) => ({
  user: one(users, { fields: [orders.userId], references: [users.id] }),
}));
