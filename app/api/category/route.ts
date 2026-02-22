import { db } from "@/src/lib/db";
import { products } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    // This key must match exactly what you send in the fetch URL: ?category=...
    const category = searchParams.get("category");

    if (!category) {
      return NextResponse.json(
        { error: "Category is required" },
        { status: 400 }
      );
    }

    // Database Query using Drizzle ORM
    const categoryProducts = await db
      .select()
      .from(products)
      .where(eq(products.category, category));

    // ALWAYS return an array. If no matches, categoryProducts will be []
    // This prevents the frontend from crashing on [...products]
    return NextResponse.json(categoryProducts); 
    
  } catch (error) {
    console.error("Category Fetch Error:", error);
    return NextResponse.json(
      { error: "Something went wrong while fetching products" },
      { status: 500 }
    );
  }
}