// pages/api/orders/[id].ts
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { orders, orderItems, products } from "@/lib/schema";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  const orderWithItems = await db
    .select({
      order: orders,
      items: orderItems,
    })
    .from(orders)
    .leftJoin(orderItems, orderItems.orderId.eq(orders.id))
    .leftJoin(products, products.id.eq(orderItems.productId))
    .where(orders.id.eq(Number(id)));

  res.status(200).json(orderWithItems);
}
