'use client'
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProductItem from '../products/ProductItem';
import { useColorMode } from '@chakra-ui/react';

const ProductGrid2 = ({ title, data, categoryName }) => {
    const { colorMode } = useColorMode();


   
       
    return (
        
    <div  className="container mx-auto">
    <div  className={`w-full p-5  rounded-xl mt-4  ${colorMode === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{title}</h2>
            <a href={`/Filter/`} className="text-blue-500 hover:text-green-700 cursor-pointer">View All</a>
        </div>
        <div className="flex overflow-x-scroll snap-x snap-mandatory">
            {data?.products?.map(product => (
                <div key={product?._id} className="snap-center shrink-0 first:pl-5 last:pr-5 ">
                    <ProductItem product={product} />
                </div>
            ))}
        </div>
    </div>


    </div>

    )
}

export default ProductGrid2;
