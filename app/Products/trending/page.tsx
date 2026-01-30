"use client";
import React from 'react';
import { ProductsData } from "../../data/products/page";
import { IoStarSharp } from "react-icons/io5";

const TrendingPage = () => {
  // Logic: Trending often means high-rated products that are popular right now.
  // We will filter for products with a rating >= 4.7
  const trendingProducts = [...ProductsData]
    .filter(item => parseFloat(item.rating.toString()) >= 4.7)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8); // Showing the top 8 trending items

  return (
    <div className="pt-24 px-4 md:px-14 container mx-auto min-h-screen">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-2">Trending Now</h1>
        <p className="text-gray-500">The most loved pieces from our latest collections.</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {trendingProducts.map((product) => (
          <div key={product.id} className="group relative bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300">
            {/* Trending Badge */}
            <div className="absolute top-6 left-6 z-10 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
              Trending
            </div>

            <div className="aspect-[3/4] overflow-hidden rounded-xl mb-4 bg-gray-100">
              <img 
                src={product.img.src} 
                alt={product.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-gray-800 dark:text-white line-clamp-1">{product.title}</h3>
              <div className="flex justify-between items-center">
                <p className="text-lg font-bold text-orange-600">₹{product.price}</p>
                <div className="flex items-center gap-1 bg-yellow-100 px-2 py-0.5 rounded-lg">
                  <IoStarSharp className="text-yellow-600 text-sm" />
                  <span className="text-yellow-700 font-bold text-xs">{product.rating}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingPage;