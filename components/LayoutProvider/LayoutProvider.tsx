"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import Products from "../Products/Products";
import AOS from "aos";
import "aos/dist/aos.css";
import TopProducts from "../TopProducts/TopProducts";
import Banner from "../Banner/Banner";
import Notify from "../Notify/Notify";
import Testimonials from "../Testimonials/Testimonials";
import Footer from "../Footer/Footer";

export default function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [orderPopup, setOrderPopup] = useState(false);

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
      once: true,
    });
    AOS.refresh();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-950 dark:text-white duration-200 transition-colors">
      <Navbar handleOrderPopup={handleOrderPopup} />
      <Hero handleOrderPopup={handleOrderPopup} />
      <Products/>
      <TopProducts handleOrderPopup={handleOrderPopup}/>
      <Banner/>
      <Notify/>
      <Products/>
      <Testimonials/>
      <Footer/>
      <main>{children}</main>
      
      {/* If you have a Popup component, you'd place it here: */}
      {/* <Popup orderPopup={orderPopup} setOrderPopup={setOrderPopup} /> */}
    </div>
  );
}