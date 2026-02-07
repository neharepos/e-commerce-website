"use client";
import { useCart } from "../context/CartContext";
import { ProductsData } from "../data/products/page";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  if (cart.length === 0) {
    return <p className="pt-24 text-center">Your cart is empty</p>;
  }

   

  // rebuild product objects from ids
  const cartWithDetails = cart
    .map(item => {
      const product = ProductsData.find(p => p.id === item.id);
      if (!product) return null;

      return {
        ...product,
        quantity: item.quantity,
        img: product.img.src,
      };
    })
    .filter(Boolean);

  const total = cartWithDetails.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  return (
    <div className="pt-12 pb-5 px-12 md:px-16 max-w-5xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 font-serif">
        Your Cart
      </h1>

      <div className="space-y-4">
        {cartWithDetails.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center border rounded-lg p-4 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.img}
                alt={item.title}
                className="w-24 h-24 object-cover rounded"
              />
              <div>
                <p className="font-semibold text-base md:text-lg">
                  {item.title}
                </p>
                 <p className="text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-3 sm:mt-0">
              <p className="font-semibold">₹{Number(item.price) * item.quantity}</p>

              <button
                onClick={() => removeFromCart(item.id)}
                className="border px-3 py-1 text-sm rounded hover:bg-red-500 hover:text-white transition"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <h2 className="text-xl font-bold font-mono">Total: ₹{total}</h2>

        <button
          onClick={clearCart}
          className="border w-full sm:w-auto px-5 py-2 rounded-xl bg-black text-white hover:bg-gray-800"
        >
          Clear Cart
        </button>

        <Link href="/order?from=cart">
          <button className="w-full sm:w-auto border px-5 py-2 rounded-xl bg-black text-white hover:bg-gray-800">
            Proceed to Order
          </button>
        </Link>
      </div>
    </div>
  );
}
