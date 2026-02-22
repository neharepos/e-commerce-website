"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

type Product = {
  id: number;
  title: string;
  price: number;
  rating: number;
  category: string;
  image: string; // Changed from img object to string to match DB schema
};

const CategoryPage = () => {
  const { category } = useParams();
  const [sortBy, setSortBy] = useState("default");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const categoryName = Array.isArray(category) ? category[0] : category;

  useEffect(() => {
    if (!categoryName) return;

    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/category?category=${categoryName}`);
        const data = await res.json();

        // 👉 SAFETY CHECK: Only set state if the response is actually an array
        if (data && Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("API returned an error or non-array:", data);
          setProducts([]); // Fallback to empty array to prevent "not iterable" error
        }
      } catch (err) {
        console.error("Fetch failed:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [categoryName]);

  // Spread safely: the safety check in useEffect ensures 'products' is always an array
  const orderedProducts = [...products].sort((a, b) => {
    if (sortBy === "price-low") return Number(a.price) - Number(b.price);
    if (sortBy === "price-high") return Number(b.price) - Number(a.price);
    if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  if (loading) return <div className="pt-24 text-center">Loading collection...</div>;

  return (
    <div className="pt-24 px-4 md:px-14 container mx-auto min-h-screen pb-4">
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold capitalize">
          {categoryName?.replace("-", " ")} Collection
        </h1>

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

      {orderedProducts.length === 0 ? (
        <div className="text-center py-20">No products found in this category.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {orderedProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${categoryName}/item/${product.id}`}
              className="group flex flex-col h-full cursor-pointer"
            >
              <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 mb-4">
                <img
                  src={product.image} // Updated field name
                  alt={product.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-sm font-medium">{product.title}</h3>
              <p className="font-bold">₹{product.price}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;