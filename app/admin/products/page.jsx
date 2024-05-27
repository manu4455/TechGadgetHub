import React from "react";
import axios from "axios";
// import ListProducts from "@/components/products/ListProducts";
import Products from "@/components/admin/Products";

import queryString from "query-string";
import Search from "@/components/layouts/Search";
import Filters from "@/components/layouts/Filters";
import Link from "next/link";

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

  const { data } = await axios.get(
    `${process.env.API_URL}/api/products?${searchQuery}`
  );
  return data;
};

const HomePage = async ({ searchParams }) => {

  const productsData = await getProducts(searchParams);

  return <>
    <div className="flex flex-col gap-2 text-black ">

      <div className="flex flex-row justify-between  ">
        <Search />
        <Link href='/admin/products/new'>
        <div className="px-4 py-2  inline-block border border-transparent bg-green-500  rounded-md cursor-pointer hover:bg-green-600 text-white">Add New Product</div>
        </Link>
      </div>
      <Filters />
      <Products data={productsData} />
    </div>
  </>;
};

export default HomePage;