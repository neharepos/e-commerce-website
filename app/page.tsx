"use client"; // Must be a client component to use state
import React, { useState, useEffect } from "react";

import Hero from "@/components/Hero/Hero";
import Products from "@/components/Products/Products";
import AOS from "aos";
import "aos/dist/aos.css";
import TopProducts from "@/components/TopProducts/TopProducts";
import Banner from "@/components/Banner/Banner";
import Notify from "@/components/Notify/Notify";
import Testimonials from "@/components/Testimonials/Testimonials";
import Popup from "@/components/Popup/Popup";

export default function Home() {
  const [orderPopup, setOrderPopup] = useState(false);
  const [products, setProducts] = useState<any[]>([]);

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };

  useEffect(() => {
  const fetchHomeProducts = async () => {
    try {
      const res = await fetch("/api/home");
      const data = await res.json();
      
      // 👉 Logic: If data is an array, use it directly. 
      // If it's the object we planned for, use data.latestProducts.
      if (Array.isArray(data)) {
        setProducts(data);
      } else if (data && data.latestProducts) {
        setProducts(data.latestProducts);
      } else {
        console.error("Unknown data format:", data);
        setProducts([]); 
      }
    } catch (error) {
      console.error("Failed to fetch home products:", error);
      setProducts([]);
    }
  };

  fetchHomeProducts();
}, []);


  return (
    <div className="p-10">
      <Hero handleOrderPopup={handleOrderPopup} />
      <Products products= {products}/>
      <TopProducts handleOrderPopup={handleOrderPopup}/>
      <Banner/>
      <Notify/>
      <Products products= {products}/>
      <Testimonials/>
      <Popup orderPopup={orderPopup}
       setOrderPopup={setOrderPopup}/>
    </div>
  );
}
