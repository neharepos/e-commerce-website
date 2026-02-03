"use client";
import { GoSearch } from "react-icons/go";
import { PiShoppingCartFill } from "react-icons/pi";
import DarkMode from "./DarkMode";
import { MdArrowDropDown } from "react-icons/md";

// ... (Keep your Menu and DropdownLinks arrays)
const Menu = [
    {
        id: 1,
        name: "Home",
        link: "/#",
    },
    {
        id: 2,
        name: "Top Rated",
        link: "/Products/top-rated",
    },
    {
        id: 3,
        name: "Kids Wear",
        link: "/Products/kids",
    },
    {
        id: 4,
        name: "Mens Wear",
        link: "/Products/men",
    },
    {
        id: 5,
        name: "Electronics",
        link: "/Products/electronics",
    },
];


const DropdownLinks = [
    {
        id: 1,
        name: "Trending Products",
        link: "/Products/trending",
    },
    {
        id: 2,
        name: "Best Selling",
        link: "/Products/best-selling",
    },
    {
        id: 3,
        name: "Top Rated",
        link: "/Products/top-rated",
    },
];



const Navbar = ({ handleOrderPopup }) => {
  return (
    <div className='shadow-md bg-white dark:bg-gray-950 dark:text-white duration-200 relative z-40'>
      {/* Upper Navbar - Solid background without global opacity */}
      <div className='bg-blue-300/80 dark:bg-blue-900/40 py-2'>
        <div className='mx-auto px-4 sm:px-12 flex justify-between items-center'>
          <div>
            <a href="#" className='font-bold text-2xl sm:text-3xl flex gap-2'>
              <img className="size-12 object-contain" src="https://github.com/dilshad-ahmed/shopsy/blob/main/src/assets/logo.png?raw=true" alt="Logo" />
              Shopsy
            </a>
          </div>

          {/* Search bar and order button */}
          <div className='flex justify-between items-center gap-4'>
            <div className='relative group hidden sm:block'>
              <input 
                type="text"
                placeholder="search"
                className='w-50 group-hover:w-74 transition-all duration-300 rounded-full border border-gray-200 px-2 py-1 focus:outline-none focus:border-orange-400 dark:border-gray-500 dark:bg-gray-800'
              />
              <GoSearch className='text-gray-300 group-hover:text-orange-300 absolute top-1/2 -translate-y-1/2 right-3' />
            </div>

            {/* Order button */}
            <button
              onClick={() => handleOrderPopup()}
              className='bg-linear-to-r from-orange-400 to-orange-600 transition-all duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3 group'
            >
              <span className="group-hover:block hidden transition-all duration-200">Cart</span>
              <PiShoppingCartFill className="text-xl text-white drop-shadow-sm cursor-pointer" />
            </button>

            {/* Darkmode switch */}
            <div>
              <DarkMode />
            </div>
          </div>
        </div>
      </div>

      {/* Lower Navbar Menu */}
      <div data-aos="zoom-in" className='flex justify-center bg-white dark:bg-gray-900 py-2'>
        <ul className='sm:flex hidden items-center gap-4'>
          {Menu.map((data) => (
            <li key={data.id}>
              <a href={data.link} className='inline-block px-4 hover:text-orange-400 duration-200'>
                {data.name}
              </a> 
            </li>
          ))}
          
          {/* Dropdown Menu */}
          <li className='group relative cursor-pointer'>
            <a href="#" className='flex items-center gap-0.5 py-2'>
              Trending Products
              <span>
                <MdArrowDropDown className='transition-all duration-200 group-hover:rotate-180' />
              </span>
            </a>
            <div className='absolute z-9999 hidden group-hover:block w-40 rounded-md bg-white dark:bg-gray-800 p-2 text-black dark:text-white shadow-md'> 
              <ul>
                {DropdownLinks.map((data) => (
                  <li key={data.id}>
                    <a 
                      href={data.link}
                      className='inline-block w-full rounded-md p-2 hover:bg-orange-300 dark:hover:bg-orange-500/50'
                    >
                      {data.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;