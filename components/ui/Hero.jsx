"use client"

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRouter } from 'next/navigation';
import { useColorMode } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import Link from 'next/link';

// const PrevArrow = ({ onClick }) => (
//   <button
//     className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-700 text-white w-10 h-10 rounded-full flex items-center justify-center z-10"
//     onClick={onClick}
//   >
//     {'<'}
//   </button>
// );

// const NextArrow = ({ onClick }) => (
//   <button
//     className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-700 text-white w-10 h-10 rounded-full flex items-center justify-center z-10"
//     onClick={onClick}
//   >
//     {'>'}
//   </button>

// );

const HeroData = [
    {
        id: 1,
        img: "/assets/hero/headphone.png",
        subtitle: "Best in The Market",
        title: "Wireless Headphones",
        link: "/Filter"
    },
    {
        id: 2,
        img: "/assets/category/vr.png",
        subtitle: "Real Live Experience",
        title: "Immersive VR",
        link: "/Filter"
    },
    {
        id: 3,
        img: "/assets/category/macbook.png",
        subtitle: "Best Quality",
        title: "Affordable Laptops",
        link: "/Filter"
    }
];

const HeroSection = ({ products }) => {
    const router = useRouter()
    const redirectToPage = (link) => {
        router.push(link); // Redirect to the specified link when called
    };
    const settings = {

        dots: false,
        arrows: false,
        infinite: true,
        speed: 800,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        cssEase: "ease-in-out",
        pauseOnhover: false,
        pauseOnFocus: true,

    };
    const { colorMode } = useColorMode();

    return (

        <div className='container mt-5 px-5'>
      <div  className={`overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px]  flex justify-center items-center  ${colorMode === 'dark' ? 'bg-gray-800 ' : 'bg-gray-300'} `} >
        <div className='container pb-8 sm:pb-0'>
          <Slider {...settings}>
            {HeroData.map(data => (
              <div key={data.id}>
                <div className='grid grid-cols-1 sm:grid-cols-2'>
                  <div className='flex mx-10 flex-col justify-between sm:pl-3 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10'>
                    <h1 className='text-xl sm:text-6xl lg:text-2xl font-bold'>{data.subtitle}</h1>
                    <h1 className='text-2xl sm:text-6xl lg:text-7xl font-bold'>{data.title}</h1>
                    {/* Adjust text color based on color mode */}
                    {/* <h1 className={`text-3xl uppercase ${colorMode === 'dark' ? 'text-white/5' : 'text-white dark:text-white/5'} sm:text-[80px] md:text-[100px] xl:text-[150px] font-bold`}>{data.title2}</h1> */}
                    <div>
                      {/* Use Chakra UI Button component */}
                      
                      <Link href="/Filter" className=' duration-300 font-bold rounded-full bg-white text-black hover:bg-gray-600 hover:text-white transition-colors  px-6 py-3 border hover:border-gray-900 inline-block'>
                      Shop By Category

                      </Link>
                    </div>
                  </div>
                  <div className='order-1 sm:order-2'>
                    <div>
                      <img
                        src={data.img}
                        atl=""
                        className="w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] sm:scale-105 lg:scale-120 object-contain mx-auto drop-shadow-[-8px_4px_6px_rgba(0,0,0,.4)] relative z-40"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>

    );

};

export default HeroSection;