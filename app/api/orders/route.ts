// // pages/api/orders/[id].ts
// import type { NextApiRequest, NextApiResponse } from "next";
// import { db } from "@/lib/db";
// import { orders, orderItems, products } from "@/lib/schema";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { id } = req.query;

//   const orderWithItems = await db
//     .select({
//       order: orders,
//       items: orderItems,
//     })
//     .from(orders)
//     .leftJoin(orderItems, orderItems.orderId.eq(orders.id))
//     .leftJoin(products, products.id.eq(orderItems.productId))
//     .where(orders.id.eq(Number(id)));

//   res.status(200).json(orderWithItems);
// }

import { eq, desc } from "drizzle-orm";
import { db } from "@/src/lib/db";
import { orders, orderItems } from "@/src/db/schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("1. API Received Data:", body); 
    // 1. Destructure the exact fields your frontend is sending
    const { 
      customerName, 
      email, 
      address, 
      // phone, 
      totalAmount, 
      cartItems 
    } = body;

    // 2. Validation: Ensure we have the minimum data needed
    if (!customerName || !cartItems || cartItems.length === 0) {
      return NextResponse.json({ error: "Missing order details" }, { status: 400 });
    }

    // 3. Start a Database Transaction
    // This makes sure the Order and Items are created together. 
    // If one fails, everything is rolled back.
    const result = await db.transaction(async (tx) => {
      console.log("2. Starting Transaction...");

      // A. Create the main Order record
      const [newOrder] = await tx.insert(orders).values({
        userName: customerName,
        email: email,
        address: address,
        // phone: phone,
        totalAmount: Math.round(totalAmount), // Ensure it's a number
        paymentMethod:"COD",
        status: "pending",
      }).returning();

      console.log("3. Order created in DB with ID:", newOrder.id);

      // B. Prepare the items for the orderItems table
      const orderEntries = cartItems.map((item: any) => ({
        orderId: newOrder.id,
        productId: item.productId,
        title: item.title || "Product",
        price: Math.round(item.price),
        quantity: item.quantity,
      }));

      // C. Insert all items into the orderItems table
      await tx.insert(orderItems).values(orderEntries);

      return newOrder;
    });

    // 4. Return the orderId so the frontend 'alert' works
    return NextResponse.json({ 
      message: "Order placed!", 
      orderId: result.id 
    }, { status: 201 });

  } catch (error) {
    console.error("Drizzle Order Error:", error);
    return NextResponse.json(
      { error: "Could not save order to database" }, 
      { status: 500 }
    );
  }
}


export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const isAdmin = searchParams.get("admin") === "true";
    const userId = searchParams.get("userId");

    // 1. Logic for Admin Dashboard: Fetch ALL orders
    if (isAdmin) {
      const allOrders = await db
        .select()
        .from(orders)
        .orderBy(desc(orders.id)); // Newest orders first

      return NextResponse.json(allOrders);
    }

    // 2. Logic for User Profile: Fetch only THEIR orders
    if (userId) {
      const userOrders = await db
        .select()
        .from(orders)
        .where(eq(orders.email, userId)) // Or use a userId column if you added one
        .orderBy(desc(orders.id));

      return NextResponse.json(userOrders);
    }

    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  } catch (error) {
    console.error("GET Orders Error:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}