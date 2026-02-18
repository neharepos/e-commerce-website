import { db } from "@/src/lib/db";
import { products } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  const [product] = await db
    .select()
    .from(products)
    .where(eq(products.id, id));

  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const body = await req.json();

  const [updated] = await db
    .update(products)
    .set(body)
    .where(eq(products.id, id))
    .returning();

  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  await db.delete(products).where(eq(products.id, id));

  return new NextResponse(null, { status: 204 });
}
