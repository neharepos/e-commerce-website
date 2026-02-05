import { ProductsData } from "@/app/data/products/page";
import { notFound } from "next/navigation";
import ProductClient from "./ProductClient";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ category: string; id: string }>;
}) {
  const { id } = await params;

  const product = ProductsData.find(
    (p) => p.id.toString() === id
  );

  if (!product) return notFound();

  return <ProductClient product={product} />;
}
