import { db } from "@/src/lib/db";
import { products } from "./src/db/schema"
import data from "@/src/data/products.json"

async function seed() {
  await db.insert(products).values(
    data.map(p => ({
      title: p.title,
      slug: p.slug,
      category: p.category,
      description: p.description,
      image: p.img,
      price: p.price,
      stock: 100,
    }))
  );

  console.log("✅ Seeded products");
  process.exit(0);
}

seed();