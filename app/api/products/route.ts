import { db } from "@/src/lib/db";
import { products } from "@/src/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await db.select().from(products);
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const { title, slug, category, price, stock } = await req.json();

  if (!title || !slug || !category || price == null || stock == null) {
    return NextResponse.json(
      { error: "All fields required" },
      { status: 400 }
    );
  }

  const [created] = await db.insert(products).values({
    title,
    slug,
    category,
    price: Number(price),
    stock: Number(stock),
  }).returning();

  return NextResponse.json(created, { status: 201 });
}
