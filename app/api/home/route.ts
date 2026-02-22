import { db } from "@/src/lib/db";
import { products } from "@/src/db/schema";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const latestItems = await db
      .select()
      .from(products)
      .orderBy(desc(products.id))
      .limit(6);

    // 👉 Wrap the result in an object so the frontend can find 'latestProducts'
    return NextResponse.json({ 
      latestProducts: latestItems 
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}