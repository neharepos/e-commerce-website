import React from "react";
import { IoStarSharp } from "react-icons/io5";
import Link from "next/link";
// import { useCart } from "@/app/context/CartContex";

type Product={
  id: number;
  title: string;
  rating: number;
  color: string;
  category: string;
  img: {src: string };
  aosDelay?: string;
}

const Products = ({ products }: { products: Product[] }) => {
  const topRatedProducts = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  return (
    <div className="mt-14 mb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-75">
        {/* Header section */}
        <div className="text-center mb-10 max-w-150 ">
          <p data-aos="fade-up" className="text-sm text-orange-500">
            Top Selling Products for you
          </p>
          <h1 data-aos="fade-up" className="text-3xl font-bold">
            Products
          </h1>
          <p data-aos="fade-up" className="text-xs text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea,
            expedita.
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
                className="cursor-pointer" // Changes the mouse to a hand icon
              >
                <div
                  data-aos="fade-up"
                  data-aos-delay={data.aosDelay}
                  key={data.id}
                  className="space-y-3"
                >
                  <img
                    src={data.img.src}
                    alt=""
                    className="h-55 w-37.5 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="font-semibold">{data.title}</h3>
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
                  px-5 rounded-md"
            >
              View All Button
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
