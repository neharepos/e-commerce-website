import { db } from "@/src/lib/db";
import { products } from "@/src/db/schema";
import { NextResponse } from "next/server";
import { inArray } from "drizzle-orm";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const ids = searchParams.get("ids");

  // 👉 if cart sends ids
  if (ids) {
    const idArray = ids.split(",").map(Number);

    const data = await db
      .select()
      .from(products)
      .where(inArray(products.id, idArray));

    return NextResponse.json(data);
  }

  // 👉 normal fetch (admin / product list)
  const data = await db.select().from(products);
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const { title, slug, category, description, image, price, stock } =
    await req.json();

  if (
    !title ||
    !slug ||
    !category ||
    !description ||
    !image ||
    price == null ||
    stock == null
  ) {
    return NextResponse.json(
      { error: "All fields required" },
      { status: 400 }
    );
  }

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
}
