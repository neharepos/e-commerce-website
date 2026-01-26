import React from 'react'
import Pattern from "../../public/website/pattern1.jpg"


const PatternImg = {
    backgroundImage: `url(${Pattern.src})`,
    backgroundPosition: "center",
    backgroundRepeat: "no repeat",
    backgroundSize: "cover",
    height: "100%",
    width: "100%",
}


const Notify = () => {
  return (
    <div className='px-18'>
        <div 
        data-aos="zoom-in"
        className='mb-20 bg-gray-100 dark:bg-gray-800 text-white'
        style={PatternImg}
        >
            <div className='container backdrop-blur-sm py-10'>
                <div className='space-y-6 backdrop-blur-sm py-10'>
                    <h1 className='text-2xl text-center px-7
                     sm:text-left sm:text-4xl font-semibold'>
                        Get Notified About New Products
                    </h1>
                    <div className='px-8'>
                    <input 
                    data-aos="fade-up"
                    type="text"
                    placeholder='Enter your email'
                    className='w-full p-3 bg-purple-300'
                    />
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Notify