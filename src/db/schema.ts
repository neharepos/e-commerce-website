import {
  pgTable,
  serial,
  varchar,
  integer,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

/* ===================== PRODUCTS ===================== */

export const products = pgTable("products", {
  id: serial("id").primaryKey(),

  title: varchar("title", { length: 150 }).notNull(),

  slug: varchar("slug", { length: 150 }).notNull().unique(),

  category: varchar("category", { length: 50 }).notNull(),

  description: text("description").notNull(),

  image: text("image").notNull(),

  price: integer("price").notNull(),

  stock: integer("stock").notNull().default(0),

  createdAt: timestamp("created_at").defaultNow(),
});

/* ===================== ORDERS ===================== */

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),

  userName: text("user_name").notNull(),
  email: text("email").notNull(),
  address: text("address").notNull(),

  totalAmount: integer("total_amount").notNull(),

  paymentMethod: text("payment_method").notNull(), // COD, UPI, Card

  status: text("status").default("pending"),

  createdAt: timestamp("created_at").defaultNow(),
});

/* ===================== ORDER ITEMS ===================== */

export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),

  orderId: integer("order_id").notNull(), // FK to orders.id
  productId: integer("product_id").notNull(),

  title: text("title").notNull(),
  price: integer("price").notNull(),
  quantity: integer("quantity").notNull(),
});

/* ===================== TYPES ===================== */

// Product types
export type Product = InferSelectModel<typeof products>;
export type NewProduct = InferInsertModel<typeof products>;

// Order types
export type Order = InferSelectModel<typeof orders>;
export type NewOrder = InferInsertModel<typeof orders>;

// OrderItem types
export type OrderItem = InferSelectModel<typeof orderItems>;
export type NewOrderItem = InferInsertModel<typeof orderItems>;