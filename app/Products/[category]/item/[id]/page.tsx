import { ProductsData } from "../../../../data/products/page";
import { notFound } from "next/navigation";

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  // Ensure we await params if using Next.js 15
  const { id } = await params;

  // Find the product
  const product = ProductsData.find((p) => p.id.toString() === id);

  // If no product found, show 404 instead of crashing (prevents 500 error)
  if (!product) return notFound();

  return (
    <div className="pt-32 px-4 md:px-14 container mx-auto pb-6">
       <div className="flex flex-col md:flex-row gap-12">
          {/* Image Section */}
          <div className="flex-1">
             <img src={product.img.src} alt={product.title} className="rounded-3xl w-full object-cover" />
          </div>

          {/* Text Section */}
          <div className="flex-1 space-y-6">
             <h1 className="text-5xl font-bold">{product.title}</h1>
             <p className="text-2xl text-gray-700">${product.price}</p>
             <p className="text-gray-600 leading-relaxed">{product.description}</p>
             <button className="bg-black text-white px-10 py-3 rounded-full hover:bg-gray-800">
                Add to Cart
             </button>

             <button className=" ml-8 bg-black text-white px-10 py-3 rounded-full hover:bg-gray-800">
                Buy Now
             </button>
          </div>
       </div>
    </div>
  );
}