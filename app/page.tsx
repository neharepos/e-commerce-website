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
    const fetchHomeProducts = async() => {
      const res = await fetch("/api/home");
      const data = await res.json();
      setProducts(data);
    };

    fetchHomeProducts()
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
