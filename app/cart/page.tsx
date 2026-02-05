"use client";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  if (cart.length === 0) {
    return <p className="pt-24 text-center">Your cart is empty</p>;
  }

  const total = cart.reduce(
  (sum, item) => sum + Number(item.price) * item.quantity,
  0
);


//   if (cart.length === 0) return <p>Cart is empty</p>;

  return (
     <div className="pt-24 pb-5 px-4 md:px-16 max-w-5xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Your Cart</h1>
      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center border rounded-lg p-4 shadow-sm"
          >
            <div>
              <p className="font-semibold text-base md:text-lg">
                {item.title}
              </p>
              <p className="text-sm text-gray-500">
                Quantity: {item.quantity}
              </p>
            </div>

             <div className="flex items-center gap-4 mt-3 sm:mt-0">
              <p className="font-semibold">
                ₹{Number(item.price) * item.quantity}
              </p>

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

      {/* Total */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-8 border-t pt-4">
        <h2 className="text-xl font-bold">Total: ₹{total}</h2>
         <button
          onClick={clearCart}
          className="mt-3 sm:mt-0 border px-5 py-2 rounded hover:bg-black hover:text-white transition"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}
