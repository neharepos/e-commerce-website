import Link from "next/link";
import { ProductsData } from "../data/products/page";

const ProductsOverview = () => {

  const categories = Array.from(
    new Set(ProductsData.map((item) => item.category))
  );

  return (
    <div className="pt-24 px-4 md:px-14 container mx-auto min-h-screen pb-6">
      <h1 className="text-4xl font-extrabold mb-4">Shop by Category</h1>
      <p className="text-gray-600 mb-10">Select a category to explore our collection.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Link 
            href={`/products/${cat.toLowerCase()}`} 
            key={cat}
            className="group relative h-64 overflow-hidden rounded-2xl bg-gray-200"
          >

            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors z-10" />
            
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <h2 className="text-white text-3xl font-bold capitalize tracking-wide">
                {cat}
              </h2>
            </div>

            
            <img 
              src={ProductsData.find(p => p.category === cat)?.img.src} 
              alt={cat}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductsOverview;