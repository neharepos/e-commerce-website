import { db } from "@/src/lib/db";
import { generateUniqueFileName } from "@/src/lib/utils";
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
    const formData = await req.formData();
    
    // Extract fields from FormData
    const file = formData.get("image") as File;
    const title = formData.get("title") as string;
    const price = formData.get("price");
    const stock = formData.get("stock");
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;

    // Validation
    if (!file || !title || !price || !category || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 👉 Generate Unique Image Name
    const uniqueName = generateUniqueFileName(file.name);
    
    // 👉 Image Path (This is what goes in your DB)
    const imagePath = `/uploads/${uniqueName}`;

    // 👉 Insert into Database using Drizzle
    const [newProduct] = await db.insert(products).values({
      title: title,
      slug: title.toLowerCase().replace(/ /g, "-"), // Auto-generate slug
      category: category,
      description: description,
      image: imagePath, 
      price: Number(price),
      stock: stock ? Number(stock) : 0,
    }).returning();

    return NextResponse.json({ 
      message: "Product created successfully!", 
      product: newProduct 
    }, { status: 201 });

  } catch (error: any) {
    console.error("POST Product Error:", error);
    return NextResponse.json({ error: error.message || "Failed to create product" }, { status: 500 });
  }
}