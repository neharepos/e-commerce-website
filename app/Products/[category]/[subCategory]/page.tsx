"use client";
import { useParams } from "next/navigation";
import { ProductsData } from "../../../data/products/page";

const SubCategoryPage = () => {
  const { category, subCategory } = useParams();

  // Filter by BOTH category (kids) and subCategory (boys/girls)
  const filteredProducts = ProductsData.filter(
    (item) => 
      item.category.toLowerCase() === category?.toString().toLowerCase() &&
      item.subCategory?.toLowerCase() === subCategory?.toString().toLowerCase()
  );

  return (
    <div className="pt-24 p-4 container mx-auto min-h-screen">
      <h1 className="text-3xl font-bold capitalize mb-8">
        Kids {subCategory} Collection
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="group border rounded-xl overflow-hidden shadow-sm">
             <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                <img 
                  src={product.img.src} 
                  className="w-full h-full object-cover group-hover:scale-105 transition" 
                  alt={product.title} 
                />
             </div>
             <div className="p-4">
                <h3 className="font-bold">{product.title}</h3>
                <p className="text-orange-500 font-semibold">₹{product.price}</p>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubCategoryPage;