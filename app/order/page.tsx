"use client";
import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function OrderPage() {
  const { cart, clearCart } = useCart();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0,
  );

  const PlaceOrder = () => {
    if (!name || !address || !phone) {
      alert("Please fill your details");
      return;
    }

    const orderData = {
      customer: { name, address, phone },
      items: cart,
      total,
      date: new Date().toISOString(),
    };

    localStorage.setItem("order", JSON.stringify(orderData));
    clearCart();
    alert("Order placed successfully!");
  };

  if (cart.length === 0) {
    return <p className="pt-24 text-center">Your cart is empty</p>;
  }

  return (
    <div className="pt-12 max-w-7xl mx-auto p-12">
      <h1 className="text-2xl font-semibold mb-6 font-serif">
        Place the Order
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left side */}
        <div className="order-2 md:order-1 border border-gray-600 p-6 rounded-lg space-y-3">
          <h2 className="text-lg font-semibold font-sans">Customer Details</h2>
          <input
            className="border border-gray-600 p-2 w-full rounded"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />


          <input
            className="border border-gray-600 p-2 w-full rounded"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          

          <input
            className="border border-gray-600 p-2 w-full rounded"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            className="border border-gray-600 p-2 w-full rounded"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <button
            onClick={PlaceOrder}
            className="bg-black border font-mono border-gray-600 text-white p-2 mt-3 rounded"
          >
            Place Order
          </button>
        </div>

        {/* right side / */}

        <div className="order-1 md:order-2 border border-gray-600 rounded-lg space-y-4 p-4">
          <h2 className="text-2xl font-semibold font-sans">
            Here are your Orders
          </h2>

          {cart.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 items-center border-b border-gray-700 pb-3"
            >
              {/* <img src={item.img?.src || "/placeholder.png"} alt={item.title} className="w-20 h-20 object cover rounded" /> */}

              <img
                src={item.img || "/placeholder.png"}
                alt={item.title}
                className="w-20 h-20 object-cover rounded"
              />

              <div className="flex-1">
                <p className="font-mono">{item.title}</p>
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
              </div>

              <p className="font-semibold">
                ₹{Number(item.price) * item.quantity}
              </p>
            </div>
          ))}

          <div className="text-right font-bold text-lg">Total: ₹{total}</div>
        </div>
      </div>
    </div>
  );
}
