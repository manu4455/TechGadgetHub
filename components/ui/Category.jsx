'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

const CategoryPage = () => {
    const router = useRouter()
    const redirectToPage = (link) => {
        router.push(link); // Redirect to the specified link when called
    };
    return (
        <div className="container mx-auto px-4 mt-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="py-10 pl-5 bg-gradient-to-br from-black/90 to-black/70 text-white rounded-3xl relative h-[320px] flex items-end">
                    <div>
                        <div className="mb-4">
                            <p className="mb-1 text-gray-400">Enjoy</p>
                            <p className="text-2xl font-semibold">With</p>
                            <p className="text-4xl xl:text-5xl font-bold text-opacity-20 mb-2">Earphone</p>
                            <button onClick={() => {redirectToPage("/Filter")}} className="bg-white hover:bg-gray-900 hover:text-white text-black cursor-pointer hover:scale-105 transition duration-300 py-2 px-8 rounded-full relative z-10">
                                Browse
                            </button>
                        </div>
                    </div>
                    <img src="/assets/category/earphone.png" alt="Stylish Earphones" className="w-[320px] absolute bottom-2" />
                </div>
                <div className="py-10 pl-5 bg-gradient-to-br  from-teal-500 to-teal-300 text-white rounded-3xl relative h-[320px] flex items-end">
                    <div>
                        <div className="mb-4">
                            <p className="mb-1 text-white">Enjoy</p>
                            <p className="text-2xl font-semibold">With</p>
                            <p className="text-4xl xl:text-5xl font-bold text-opacity-40 mb-2">Smartwatch</p>
                            <button onClick={() => {redirectToPage("/Filter")}} className="bg-white text-teal-500 hover:text-white hover:bg-teal-700 cursor-pointer hover:scale-105 transition duration-300 py-2 px-8 rounded-full relative z-10">
                                Browse
                            </button>
                        </div>
                    </div>
                    <img src="/assets/category/smartwatch.png" alt="Smart Watch" className="w-[220px] absolute -right-5 lg:top-[40px]" />
                </div>
                <div className="sm:col-span-2 py-10 pl-5 bg-gradient-to-br from-primary to-primary/90 text-white rounded-3xl relative h-[320px] flex items-end">
                    <div>
                        <div className="mb-4">
                            <p className="mb-1 text-white">Enjoy</p>
                            <p className="text-2xl font-semibold">With</p>
                            <p className="text-4xl xl:text-5xl font-bold text-opacity-40 mb-2">Laptop</p>
                            <button onClick={() => {redirectToPage("/Filter")}} className="bg-white text-blue-500 hover:text-white hover:bg-blue-700 cursor-pointer hover:scale-105 transition duration-300 py-2 px-8 rounded-full relative z-10">
                                Browse
                            </button>
                        </div>
                    </div>
                    <img src="/assets/category/macbook.png" alt="Modern Laptop" className="w-[250px] absolute top-1/2 -translate-y-1/2 -right-0" />
                </div>
                <div className="sm:col-span-2 py-10 pl-5 bg-gradient-to-br from-green-500 to-green-300 text-white rounded-3xl relative h-[320px] flex items-end">
                    <div>
                        <div className="mb-4">
                            <p className="mb-1 text-white">Enjoy</p>
                            <p className="text-2xl font-semibold">With</p>
                            <p className="text-4xl xl:text-5xl font-bold text-opacity-40 mb-2">Television</p>
                            <button onClick={() => {redirectToPage("/Filter")}} className="bg-white text-green-500 hover:text-white hover:bg-green-700 cursor-pointer hover:scale-105 transition duration-300 py-2 px-8 rounded-full relative z-10">
                                Browse
                            </button>
                        </div>
                    </div>
                    <img src="/categoryImage/tv1.png" alt="Modern Laptop" className="w-[250px] absolute top-1/2 left-1/2 transform -translate-x-2/2 -translate-y-1/2" />
                </div>

                <div className="py-10 pl-5 bg-gradient-to-br from-purple-500 to-purple-300 text-white rounded-3xl relative h-[320px] flex items-end">
                    <div>
                        <div className="mb-4">
                            <p className="mb-1 text-white">Enjoy</p>
                            <p className="text-2xl font-semibold">With</p>
                            <p className="text-4xl xl:text-5xl font-bold text-opacity-40 mb-2">Speakers</p>
                            <button onClick={() => {redirectToPage("/Filter")}} className="bg-white text-purple-500 hover:text-white hover:bg-purple-700 cursor-pointer hover:scale-105 transition duration-300 py-2 px-8 rounded-full relative z-10">
                                Browse
                            </button>
                        </div>
                    </div>
                    <img src="/assets/category/speaker.png" alt="Smart Watch" className="w-[320px] absolute -right-4 lg:top-[40px]" />
                </div>

                <div className="py-10 pl-5 bg-gradient-to-br from-red-500 to-red-300 text-white rounded-3xl relative h-[320px] flex items-end">
                    <div>
                        <div className="mb-4">
                            <p className="mb-1 text-gray-400">Enjoy</p>
                            <p className="text-2xl font-semibold">With</p>
                            <p className="text-4xl xl:text-5xl font-bold text-opacity-20 mb-2">Play Station</p>
                            <button onClick={() => {redirectToPage("/Filter")}} className="bg-white  text-red-500 hover:text-white hover:bg-red-700 cursor-pointer hover:scale-105 transition duration-300 py-2 px-8 rounded-full relative z-10">
                                Browse
                            </button>
                        </div>
                    </div>
                    <img src="/assets/category/gaming.png" alt="Stylish Earphones" className="w-[220px] absolute right-0" />
                </div>
            </div>
        </div>

        


    )
}

export default CategoryPage