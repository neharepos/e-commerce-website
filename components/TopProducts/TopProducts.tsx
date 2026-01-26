import React from 'react'
import Img1 from "../../public/shirt/shirt1.webp";
import Img2 from "../../public/shirt/shirt2.webp";
import Img3 from "../../public/shirt/shirt3.jpg";
import { IoIosStar } from "react-icons/io";


const ProductsData = [
  {
    id: 1,
    img: Img1,
    title: "Casual Wear",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 2,
    img: Img2,
    title: "Printed shirt",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 3,
    img: Img3,
    title: "Women shirt",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];



const TopProducts = ({handleOrderPopup}) => {
  return (
    <div>
        <div className='container p-6'>
            {/* Header section */}
             <div className='text-left mb-24'>
                <p data-aos="fade-up" className='text-sm text-orange-500'>Top Rated Products for you</p>
                <h1 data-aos="fade-up" className='text-3xl font-bold'>Best Products</h1>
                <p data-aos="fade-up" className='text-xs text-gray-400'>Lorem ipsum dolor sit amet consectetur 
                    adipisicing elit. Ea, expedita.</p>
            </div>

            {/* body section */}
            <div className='grid grid-cols-1 p-2 sm:grid-cols-2
            md:grid-cols-3 gap-20 md:gap-5 place-items-center'>
                {
                    ProductsData.map((data) => (
                        <div
                        key={data.id} 
                        data-aos="zoom-in"
                        className='rounded-2xl bg-white dark:bg-gray-800
                        hover:bg-black opacity-80 dark:hover:bg-orange-400
                        hover:text-white relative shadow-xl duration-300 group max-w-75'
                        >
                          {/* image section */}
                          <div className='h-25'>
                              <img src={data.img.src} alt=""
                              className='max-w-25 block mx-auto 
                              transform -translate-y-20 group-hover:scale-105 
                              duration-300 drop-shadow' />
                          </div>
                            {/* details section */}
                            <div className='p-4 text-center'>
                                {/* star rating */}
                                <div className='w-full flex items-center 
                                justify-center gap-1'>
                                    <IoIosStar className="text-yellow-500" />
                                    <IoIosStar className="text-yellow-500" />
                                    <IoIosStar className="text-yellow-500" />
                                    <IoIosStar className="text-yellow-500" />
                                </div>
                                <h1 className='text-xl font-bold'>{data.title}</h1>
                                <p className='text-gray-500 group-hover:text-white
                                 duration-300 text-sm line-clamp-2'>{data.description}</p>
                                 <button 
                                 className='bg-orange-500 hover:scale-105
                                 duration-300 text-white py-1 space-y-3 px-4 rounded-full
                                 mt-4 group-hover:text-orange-400'
                                 onClick={handleOrderPopup}
                                 >Order Now</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default TopProducts