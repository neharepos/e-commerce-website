"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar/Navbar";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../Footer/Footer";
import Popup from "../Popup/Popup";

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
      
      <main>{children}</main>
      <Footer/>
      
      
      {/* If you have a Popup component, you'd place it here: */}
      <Popup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />
    </div>
  );
}