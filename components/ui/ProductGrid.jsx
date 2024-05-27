'use client'
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProductItem from '../products/ProductItem';
import { useColorMode, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const NextArrow = ({ onClick }) => (
    <IconButton
      aria-label="Next slide"
      icon={<ChevronRightIcon />}
      onClick={onClick}
      position="absolute"
      right="10px"
      top="50%"
      transform="translateY(-50%)"
      zIndex="2"
      size="lg"
      opacity="0.8"
      
      bg="green.300"
      _hover={{ bg: 'green.500', opacity: '1' }}
    />
  );

const PrevArrow = ({ onClick }) => (
  <IconButton
    aria-label="Previous slide"
    icon={<ChevronLeftIcon />}
    onClick={onClick}
    position="absolute"
    left="10px"
    top="50%"
    
    transform="translateY(-50%)"
    zIndex="2"
    size="lg"
    opacity="0.8"
    bg="green.300"
    _hover={{ bg: 'green.500', opacity: '1' }}
  />
);

const ProductGrid = ({ title, data, categoryName }) => {
    const {colorMode} = useColorMode();


    const settings = {
        
        infinite: false,
    speed: 500,
    easing: 'ease-in-out',
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    touchThreshold: 20,
    draggable: true,
    autoplay: true,
    autoplaySpeed: 2000,
    adaptiveHeight: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

    return (
        <div  className="container mx-auto">
    <div  className={`w-full p-5  rounded-xl mt-4  ${colorMode === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <div className="flex justify-between items-center w-full max-w-6xl mb-4">
                <h2 className="text-2xl font-bold">{title}</h2>
                <a className="text-blue-500 hover:text-blue-700 cursor-pointer" href={`/Filter?category=${categoryName}`}>View All</a>
            </div>
            <Slider {...settings}>
              
                {data?.products?.map(product => (
                    <ProductItem key={product?._id} product={product} />
                ))}
               
            </Slider>
        </div>
        </div>

    )
}

export default ProductGrid
