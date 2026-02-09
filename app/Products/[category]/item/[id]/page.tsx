import { notFound } from "next/navigation";
import ProductClient from "./ProductClient";

async function getProduct(id: string){
  const res = await fetch(`http://localhost:3000/api/products/${id}`,{
    cache:"no store",
  });

  if (!res.ok) 
    {
      return null;
    }

  return res.json();
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
