"use client";
import React from 'react';
import { ProductsData } from "../../data/products/page";
import { IoStarSharp } from "react-icons/io5";

const BestSellingPage = () => {
  // Logic: Identify Best Sellers (Rating of 5.0 or manually tagged)
  const bestSellingProducts = ProductsData.filter(item => item.rating === 5.0);

  return (
    <div className="pt-24 px-4 md:px-14 container mx-auto min-h-screen pb-6">
      <div className="mb-10 flex flex-col items-center">
        <h1 className="text-4xl font-bold">Best Sellers</h1>
        <div className="h-1 w-20 bg-orange-400 mt-2"></div>
        <p className="text-gray-500 mt-4 text-center max-w-md">
          Our community's favorites. These items are flying off the shelves!
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {bestSellingProducts.map((product) => (
          <div key={product.id} className="group border rounded-2xl p-4 transition-all hover:shadow-2xl relative">
            {/* Best Seller Badge */}
            <div className="absolute -top-2 -right-2 z-10 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-md">
              BEST SELLER
            </div>

            <div className="aspect-[3/4] overflow-hidden rounded-xl bg-gray-100 mb-4">
              <img 
                src={product.img.src} 
                alt={product.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            <h3 className="font-bold text-lg line-clamp-1">{product.title}</h3>
            <div className="flex justify-between items-center mt-2">
              <p className="text-xl font-bold text-gray-900">₹{product.price}</p>
              <div className="flex items-center gap-1">
                <IoStarSharp className="text-yellow-400" />
                <span className="text-sm font-semibold">{product.rating}</span>
              </div>
            </div>
            
            <button className="w-full mt-4 bg-black text-white py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSellingPage;