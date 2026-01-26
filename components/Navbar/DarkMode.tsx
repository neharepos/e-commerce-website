"use client";
import React, { useState, useEffect } from 'react';
import LightButton from "../../public/website/light-mode-button.png";
import DarkButton from "../../public/website/dark-mode-button.png";

const DarkMode = () => {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        setTheme(savedTheme);
    }, []);

    useEffect(() => {
        const element = document.documentElement;
        if (theme === "dark") {
            element.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            element.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [theme]);

    return (
        // Added a fixed width and height to the container so the images don't collapse
        <div className='relative w-12 h-5'>
            <img 
                src={LightButton.src}
                alt="Switch to Dark" 
                onClick={() => setTheme("dark")}
                className={`w-12 cursor-pointer drop-shadow-md transition-all duration-300 absolute right-0 z-10 
                ${theme === "dark" ? "opacity-0 invisible" : "opacity-100 visible"}`}
            />

            <img 
                src={DarkButton.src}
                alt="Switch to Light"
                onClick={() => setTheme("light")} 
                className={`w-12 cursor-pointer drop-shadow-md transition-all duration-300 absolute right-0 
                ${theme === "light" ? "opacity-0 invisible" : "opacity-100 visible"}`}
            />
        </div>
    );
};

export default DarkMode;