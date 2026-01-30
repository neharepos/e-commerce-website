"use client";
import React from 'react';
import { ProductsData } from "../../data/products/page";
import { IoStarSharp } from "react-icons/io5";

const TopRatedPage = () => {
  // Filter products that have a rating of 4.5 or higher
  const topProducts = ProductsData.filter(product => product.rating >= 4.5)
    .sort((a, b) => b.rating - a.rating);

  return (
    <div className="pt-24 px-4 container mx-auto min-h-screen">
      <h1 className="text-3xl font-bold mb-8 border-b pb-4">Top Rated Collection</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {topProducts.map((product) => (
          <div key={product.id} className="group border rounded-xl p-3 hover:shadow-lg transition-all">
            <div className="aspect-[3/4] overflow-hidden rounded-lg mb-4">
              <img 
                src={product.img.src} 
                alt={product.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <h3 className="font-bold text-lg">{product.title}</h3>
            <div className="flex items-center gap-1 text-yellow-500 mb-2">
              <IoStarSharp />
              <span className="text-black font-medium">{product.rating}</span>
            </div>
            <p className="text-xl font-extrabold text-orange-600">₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopRatedPage;