"use client";

import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";

export default function ProductClient({ product }: { product: any }) {
  const { addToCart } = useCart();

   const router = useRouter();

  const handleOrderNow = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: Number(product.price),
      img: product.img.src,
    });

    router.push("/order"); // 👉 go to order page
  };

  return (
    <div className="pt-32 px-4 md:px-14 container mx-auto pb-6">
      <div className="flex flex-col md:flex-row gap-12">
        
        <div className="flex-1">
          <img
            src={product.img.src}
            alt={product.title}
            className="rounded-3xl w-full object-cover"
          />
        </div>

        <div className="flex-1 space-y-6">
          <h1 className="text-5xl font-bold">{product.title}</h1>
          <p className="text-2xl text-gray-700">₹{product.price}</p>
          <p className="text-gray-600">{product.description}</p>

          <button
            onClick={() =>
              addToCart({
                id: product.id,
                title: product.title,
                price: Number(product.price),
                img: product.img.src,
              })
            }
            className="bg-black text-white px-10 py-3 rounded-full hover:bg-gray-800"
          >
            Add to Cart
          </button>

            <button
              onClick={handleOrderNow}
              className="bg-black text-white px-10 py-3 ml-6 rounded-full hover:bg-gray-800"
            >
              Order Now
            </button>
        </div>
      </div>
    </div>
  );
}
