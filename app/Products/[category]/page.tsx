"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link"; // Added for sorting state
import { ProductsData } from "../../data/products/page";

const CategoryPage = () => {
  const { category } = useParams();
  const [sortBy, setSortBy] = useState("default"); // New state to track order

  const categoryName = Array.isArray(category) ? category[0] : category;

  // 1. Filter first
  const filteredProducts = ProductsData.filter(
    (item) => item.category.toLowerCase() === categoryName?.toLowerCase()
  );

  // 2. Order/Sort the filtered results
  const orderedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return Number(a.price) - Number(b.price);
    if (sortBy === "price-high") return Number(b.price) - Number(a.price);
    if (sortBy === "rating") return b.rating - a.rating;
    return 0; // Default (original data order)
  });

  return (
    <div className="pt-24 px-4 md:px-14 container mx-auto min-h-screen pb-4">
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold capitalize">
          {categoryName?.replace("-", " ")} Collection
        </h1>

        {/* Sorting Dropdown */}
        <select 
          className="border p-2 rounded-md bg-white dark:bg-gray-800 outline-none text-sm"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="default">Default Order</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
       
        
        {orderedProducts.map((product) => (
            <Link 
    key={product.id} 
    href={`/Products/${categoryName}/item/${product.id}`} // This creates the path /product/123
    className="group flex flex-col h-full cursor-pointer"
  >

          <div key={product.id} className="group flex flex-col h-full">
            {/* ... keep your existing image and info UI here ... */}
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 mb-4">
               <img src={product.img.src} alt={product.title} className="h-full w-full object-cover" />
            </div>
            <h3 className="text-sm font-medium">{product.title}</h3>
            <p className="font-bold">₹{product.price}</p>
          
          </div>
         </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;