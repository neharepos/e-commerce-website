import { db } from "@/src/lib/db";
import { products } from "@/src/db/schema";
import { NextResponse } from "next/server";
import { inArray, desc } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const ids = searchParams.get("ids");

    // 👉 Logic for Cart/Checkout: Fetch only specific IDs
    if (ids) {
      const idArray = ids.split(",").map(Number).filter(id => !isNaN(id));

      if (idArray.length === 0) {
        return NextResponse.json([], { status: 200 });
      }

      const data = await db
        .select()
        .from(products)
        .where(inArray(products.id, idArray));

      return NextResponse.json(data);
    }

    // 👉 Standard Fetch: Returns all products (ordered by newest first)
    const data = await db
      .select()
      .from(products)
      .orderBy(desc(products.id));

    return NextResponse.json(data);
  } catch (error) {
    console.error("GET Products Error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, slug, category, description, image, price, stock } = body;

    // 👉 Strict Validation
    if (!title || !slug || !category || !description || !image || price == null || stock == null) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // 👉 Insert into Database
    const [created] = await db
      .insert(products)
      .values({
        title,
        slug,
        category,
        description,
        image,
        price: Number(price),
        stock: Number(stock),
      })
      .returning();

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("POST Product Error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}