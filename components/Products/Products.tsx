import React from "react";
import Img1 from "../../public/women/women1.jpg";
import Img2 from "../../public/women/women2.jpg";
import Img3 from "../../public/women/womenn3.jpeg";
import Img4 from "../../public/women/women4.jpg";
import Img5 from "../../public/women/women5.jpg";
import { IoStarSharp } from "react-icons/io5";
import Link from "next/link";
// import { useCart } from "@/app/context/CartContex";

const ProductsData = [
  {
    id: 1,
    img: Img1,
    title: "Women Ethnic",
    rating: 5.0,
    color: "white",
    category: "ethnic",
    aosDelay: "0",
  },
  {
    id: 2,
    img: Img2,
    title: "Women western",
    rating: 4.5,
    color: "Red",
    category: "western",
    aosDelay: "200",
  },
  {
    id: 3,
    img: Img3,
    title: "Goggles",
    category: "goggles",
    rating: 4.7,
    color: "brown",
    aosDelay: "400",
  },
  {
    id: 4,
    img: Img4,
    title: "Printed T-Shirt",
    rating: 4.4,
    color: "Yellow",
    category: "printedtshirts",
    aosDelay: "600",
  },
  {
    id: 5,
    img: Img5,
    title: "Fashin T-Shirt",
    rating: 4.5,
    color: "Pink",
    category: "fashiontshirts",
    aosDelay: "800",
  },
];

const Products = () => {
  const topRatedProducts = [...ProductsData]
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
            {ProductsData.map((data) => (
              <Link
                href={`/Products/${data.category}`}
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
            <Link href="/Products">
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
