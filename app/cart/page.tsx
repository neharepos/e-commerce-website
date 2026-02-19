"use client";
import { useCart } from "../context/CartContext";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const [products, setProducts] = useState<any[]>([]);

  // fetch product details for cart items
  useEffect(() => {
    async function loadProducts() {
      if (cart.length === 0) return;

      const ids = cart.map(i => i.id).join(",");
      const res = await fetch(`/api/products?ids=${ids}`);
      const data = await res.json();
      setProducts(data);
    }

    loadProducts();
  }, [cart]);

  if (cart.length === 0) {
    return <p className="pt-24 text-center">Your cart is empty</p>;
  }

  const cartWithDetails = cart.map(item => {
    const product = products.find(p => String(p.id) === String(item.id));
    return product
      ? { ...product, quantity: item.quantity }
      : null;
  }).filter(Boolean);

  const total = cartWithDetails.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="pt-12 pb-5 px-12 md:px-16 max-w-5xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 font-serif">
        Your Cart
      </h1>

      <div className="space-y-4">
        {cartWithDetails.map((item: any) => (
          <div
            key={item.id}
            className="flex justify-between items-center border rounded-lg p-4 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 object-cover rounded"
              />

              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-gray-500">
                  Qty: {item.quantity}
                </p>
                <p className="text-sm">₹{item.price * item.quantity}</p>
              </div>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="border px-3 py-1 text-sm rounded hover:bg-red-500 hover:text-white transition"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <h2 className="text-xl font-bold">Total: ₹{total}</h2>

        <button
          onClick={clearCart}
          className="border px-5 py-2 rounded-xl bg-black text-white hover:bg-gray-800"
        >
          Clear Cart
        </button>

        <Link href="/order?from=cart">
          <button className="border px-5 py-2 rounded-xl bg-black text-white hover:bg-gray-800">
            Proceed to Order
          </button>
        </Link>
      </div>
    </div>
  );
}
