"use client";
import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useCart } from "@/app/context/CartContext";

const Popup = ({ orderPopup, setOrderPopup }) => {
  const { cart, clearCart } = useCart();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOrder = () => {
    if (!form.name || !form.email || !form.address) {
      alert("Please fill all fields");
      return;
    }

    const orderData = {
      customer: form,
      items: cart,
      total,
      date: new Date(),
    };

    console.log("ORDER PLACED:", orderData); // later send to backend

    clearCart();
    setOrderPopup(false);
    alert("Order placed successfully");
  };

  if (!orderPopup) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-[350px] shadow-lg">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Place Order</h1>
          <IoCloseOutline
            className="text-2xl cursor-pointer"
            onClick={() => setOrderPopup(false)}
          />
        </div>

        {/* Total */}
        <p className="mb-3 font-semibold">Total: ₹{total}</p>

        {/* Form */}
        <div className="space-y-3">
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-full border px-3 py-2 dark:bg-gray-800"
          />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-full border px-3 py-2 dark:bg-gray-800"
          />

           <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full rounded-full border px-3 py-2 dark:bg-gray-800"
          />

          <input
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="w-full rounded-full border px-3 py-2 dark:bg-gray-800"
          />

          <button
            onClick={handleOrder}
            className="w-full bg-black text-white py-2 rounded-full hover:bg-gray-800 transition"
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
