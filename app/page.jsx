'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";
import queryString from "query-string";
import Footer from "@/components/ui/Footer";
import HeroSection from "@/components/ui/Hero";
import CategoryPage from "@/components/ui/Category";
import ProductGrid from "@/components/ui/ProductGrid";
import ProductGrid2 from "@/components/ui/ProductGrid2";
import Testimonial from "@/components/layouts/testimonial";
import { toast } from "react-toastify";
import Loading from "./loading";

const getProducts = async (searchParams) => {
  const urlParams = {
    keyword: searchParams.keyword,
    page: searchParams.page,
    category: searchParams.category,
    "price[gte]": searchParams.min,
    "price[lte]": searchParams.max,
    "ratings[gte]": searchParams.ratings,
  };

  const searchQuery = queryString.stringify(urlParams);

  try {
    const { data } = await axios.get(
      `${process.env.API_URL}/api/products?${searchQuery}`
    );
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    toast.error("Error fetching products");
    return null;
  }
};

const getProductsByCategory = async (categoryId) => {
  const searchQuery = queryString.stringify({ category: categoryId });

  try {
    const { data } = await axios.get(
      `${process.env.API_URL}/api/products?${searchQuery}`
    );
    return data;
  } catch (error) {
    console.error(`Error fetching products for category ${categoryId}:`, error);
    toast.error("Error fetching products for category");
    return null;
  }
};

const getProductsByRating = async (rating) => {
  const searchQuery = queryString.stringify({ "ratings[gte]": rating });

  try {
    const { data } = await axios.get(
      `${process.env.API_URL}/api/products?${searchQuery}`
    );
    return data;
  } catch (error) {
    console.error("Error fetching products by rating:", error);
    toast.error("Error fetching products by rating");
    return null;
  }
};

const HomePage = ({ searchParams }) => {
  const [productsData, setProductsData] = useState(null);
  const [smartphones, setSmartphones] = useState(null);
  const [trending, setTrending] = useState(null);
 

  useEffect(() => {
    const fetchData = async () => {
     
      try {
        const [products, smartphonesData, trendingData] = await Promise.all([
          getProducts(searchParams),
          getProductsByCategory("664b56569c2dfb9e81fc768f"),
          getProductsByRating(4),
        ]);

        setProductsData(products);
        setSmartphones(smartphonesData);
        setTrending(trendingData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } 
    };

    fetchData();
  }, [searchParams]);

  

  return (
    <div className="flex flex-col justify-center items-center">
      <HeroSection />
      <CategoryPage />
      <ProductGrid title="Trending Products" data={trending} categoryName="664b56569c2dfb9e81fc768f" />
      <ProductGrid title="Smartwatch" data={smartphones} categoryName="664b56569c2dfb9e81fc768f" />
      <ProductGrid2 title="All Products" data={productsData} />
      <Testimonial />
      <Footer />
    </div>
  );
};

export default HomePage;
