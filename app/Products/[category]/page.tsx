"use client";
import { useParams } from "next/navigation";
import {ProductsData}  from "../../data/products/page"; 


const CategoryPage = () => {
  const { category } = useParams();

  // Filter products based on the URL category
  const filteredProducts = ProductsData.filter(
    (item) => item.category.toLowerCase() === category
  );
  return (
    <div className="pt-24 p-4 border m-14 container min-h-screen">
      <h1 className="text-3xl font-bold capitalize mb-8">
        {category.replace("-", " ")} Collection
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {filteredProducts.map((product) => (
          <div key={product.id}>
             {/* Reuse your Product Card UI here */}
             <img src={product.img.src} alt={product.title} className="..." />
             <h3>{product.title}</h3>
             <h3>{product.rating}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryPage