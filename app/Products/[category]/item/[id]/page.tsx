import { notFound } from "next/navigation";
import ProductClient from "./ProductClient";
import { db } from "@/src/lib/db";
import { products } from "@/src/db/schema";
import { eq } from "drizzle-orm";
// import { products } from "../../../../lib/schema";
// async function getProduct(id: string){
//   const res = await fetch(`http://localhost:3000/api/products/${id}`,{
//     cache:"no-store",
//   });

//   if (!res.ok) 
//     {
//       return null;
//     }

//   return res.json();
// }

async function getProduct(id: string) {
  const numericId = Number(id);

  if (isNaN(numericId)) {
    return null;
  }


  const product = await db
    .select()
    .from(products)
    .where(eq(products.id, Number(id)))
    .limit(1); // fetch single product

  return product[0];
}


export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ category: string; id: string }>;
}) {
  const { id } = await params;

  const product = await getProduct(id);

  if (!product) return notFound();

  return <ProductClient product={product} />;
}
