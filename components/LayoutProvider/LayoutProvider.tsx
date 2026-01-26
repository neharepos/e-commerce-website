"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import Products from "../Products/Products";

export default function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [orderPopup, setOrderPopup] = useState(false);

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };

  return (
    <div className="bg-white dark:bg-gray-950 dark:text-white duration-200 transition-colors">
      <Navbar handleOrderPopup={handleOrderPopup} />
      <Hero handleOrderPopup={handleOrderPopup} />
      <Products/>
      <main>{children}</main>
      
      {/* If you have a Popup component, you'd place it here: */}
      {/* <Popup orderPopup={orderPopup} setOrderPopup={setOrderPopup} /> */}
    </div>
  );
}