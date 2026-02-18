import {
  pgTable,
  serial,
  varchar,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

export const products = pgTable("productss", {
  id: serial("id").primaryKey(),

  title: varchar("title", { length: 150 }).notNull(),

  slug: varchar("slug", { length: 150 }).notNull().unique(),

  category: varchar("category", { length: 50 }).notNull(),

  price: integer("price").notNull(),

  stock: integer("stock").notNull().default(0),

  createdAt: timestamp("created_at").defaultNow(),
});
