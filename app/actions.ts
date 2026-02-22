"use server";

import { db } from "@/src/lib/db";
import { products, cart, orders, orderItems } from "@/src/db/schema";
import { saveImage } from "@/src/lib/upload";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

// 1. Create a new Product (with Image)
export async function createProduct(formData: FormData) {
  const imageFile = formData.get("image") as File;
  const imageUrl = await saveImage(imageFile);

  await db.insert(products).values({
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    category: formData.get("category") as string,
    description: formData.get("description") as string,
    image: imageUrl || "",
    price: Number(formData.get("price")),
    stock: Number(formData.get("stock")),
  });

  revalidatePath("/admin/products");
}

// 2. Add to Cart (Database version)
export async function addToCart(productId: number) {
  const existing = await db.select().from(cart).where(eq(cart.productId, productId)).limit(1);

  if (existing.length > 0) {
    await db.update(cart)
      .set({ quantity: existing[0].quantity + 1 })
      .where(eq(cart.productId, productId));
  } else {
    await db.insert(cart).values({ productId, quantity: 1 });
  }
  revalidatePath("/cart");
}

// 3. Place Order & Clear Cart
export async function placeOrder(orderData: any, items: any[]) {
  const [newOrder] = await db.insert(orders).values({
    userName: orderData.userName,
    email: orderData.email,
    address: orderData.address,
    totalAmount: orderData.total,
    paymentMethod: "COD",
  }).returning();

  await db.insert(orderItems).values(
    items.map(item => ({
      orderId: newOrder.id,
      productId: item.productId,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
    }))
  );

  // CLEAR CART after order
  await db.delete(cart); 
  
  revalidatePath("/order-success");
}