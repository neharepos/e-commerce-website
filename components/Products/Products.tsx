import React from "react";
import { IoStarSharp } from "react-icons/io5";
import Link from "next/link";

// Updated Type to match your Database Schema
type Product = {
  id: number;
  title: string;
  rating: number;
  color: string;
  category: string;
  image: string; // Changed from img object to match DB field
  aosDelay?: string;
};

const Products = ({ products }: { products: Product[] }) => {
  // We handle the safety check here in case products is undefined/empty during fetch
  const topRatedProducts = Array.isArray(products) 
    ? [...products]
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .slice(0, 5)
    : [];

  return (
    <div className="mt-14 mb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header section */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p data-aos="fade-up" className="text-sm text-orange-500">
            Top Selling Products for you
          </p>
          <h1 data-aos="fade-up" className="text-3xl font-bold">
            Products
          </h1>
          <p data-aos="fade-up" className="text-xs text-gray-400">
            Discover our most loved items crafted with quality and style in mind.
          </p>
        </div>
        
        {/* body section */}
        <div>
          <div
            className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4
                lg:grid-cols-5 place-items-center gap-5"
          >
            {/* card section */}
            {topRatedProducts.map((data) => (
              <Link
                href={`/products/${data.category}/item/${data.id}`}
                key={data.id}
                className="cursor-pointer group"
              >
                <div
                  data-aos="fade-up"
                  data-aos-delay={data.aosDelay || "0"}
                  className="space-y-3"
                >
                  <img
                    src={data.image} // Updated to data.image
                    alt={data.title}
                    className="h-[220px] w-[150px] object-cover rounded-md group-hover:scale-105 transition-transform duration-300"
                  />
                  <div>
                    <h3 className="font-semibold truncate w-[150px]">{data.title}</h3>
                    <p className="text-sm text-gray-600">{data.color}</p>

                    <div className="flex items-center gap-1">
                      <IoStarSharp className="text-yellow-400" />
                      <span>{data.rating}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* view all button */}
          <div className="flex justify-center">
            <Link href="/products">
              <button
                className="text-center mt-10
                  cursor-pointer bg-orange-400 text-white py-1 
                  px-5 rounded-md hover:bg-orange-500 transition-colors"
              >
                View All Products
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;