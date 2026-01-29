"use client";
import { useParams } from "next/navigation";
import { ProductsData } from "../../data/products/page";

const CategoryPage = () => {
  const { category } = useParams();

  // Ensure category is a string to prevent errors during .toLowerCase()
  const categoryName = Array.isArray(category) ? category[0] : category;

  const filteredProducts = ProductsData.filter(
    (item) => item.category.toLowerCase() === categoryName?.toLowerCase()
  );

  return (
    <div className="pt-24 px-4 md:px-14 container mx-auto min-h-screen">
      <h1 className="text-3xl font-bold capitalize mb-8 border-b pb-4">
        {categoryName?.replace("-", " ")} Collection
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <div key={product.id} className="group flex flex-col h-full">
            {/* Image Container with Fixed Aspect Ratio */}
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 mb-4">
              <img
                src={product.img.src}
                alt={product.title}
                className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Product Details */}
            <div className="flex flex-col flex-grow">
              <h3 className="text-sm text-gray-700 font-medium line-clamp-2 mb-1">
                {product.title}
              </h3>
              
              <div className="mt-auto">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500 text-sm">★</span>
                  <span className="text-sm text-gray-500">{product.rating}</span>
                </div>
                {/* Add price here if available in your data */}
                <p className="text-lg font-bold text-gray-900 mt-1">
                  ${product.price || "0.00"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          No products found in this category.
        </div>
      )}
    </div>
  );
};

export default CategoryPage;