"use client";

import React, { useContext, useEffect } from "react";
import Link from "next/link";
import CustomPagination from "../layouts/CustomPagination";
import ProductContext from "@/context/ProductContext";
import Image from "next/image";
import { toast } from "react-toastify";
import { useColorMode } from "@chakra-ui/react"; // Import useColorMode from Chakra UI

import CategoryContext from "@/context/CategoryContext";

const Products = ({ data }) => {
  const { deleteProduct, error, clearErrors } = useContext(ProductContext);
  const { categories, getCategories } = useContext(CategoryContext);
  const { colorMode } = useColorMode(); // Use destructuring to get colorMode

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [error]);

  const deleteHandler = (id) => {
    deleteProduct(id);
  };

  return (
    <div className={`relative overflow-x-auto rounded-2xl shadow-md  border ${colorMode === 'dark' ? 'border-emerald-400 bg-gray-900 text-white' : 'border-emerald-400 bg-white text-black'}`}>
      <h1 className="text-3xl my-5 ml-4 font-bold">
        Inventory ({data?.productsCount} Products)
      </h1>

      <table className={`w-full text-sm text-left ${colorMode === 'dark' ? 'text-white' : 'text-black'}`}>
        <thead className={`text-xs uppercase ${colorMode === 'dark' ? 'bg-gray-800 text-gray-200' : 'bg-gray-50 text-gray-700'}`}>
          <tr>
            <th scope="col" className="px-6 py-3">Image</th>
            <th scope="col" className="px-6 py-3">Name</th>
            <th scope="col" className="px-6 py-3">Category</th>
            <th scope="col" className="px-6 py-3">Stock</th>
            <th scope="col" className="px-6 py-3">Price</th>
            <th scope="col" className="px-6 py-3">Last Updated</th>
            <th scope="col" className="px-6 py-3">Sell By</th>
            <th scope="col" className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.products?.map((product) => (
            <tr key={product._id} className={`${colorMode === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              <td className="px-6 py-4">
                <Image src={product.images[0]?.url || "/images/default_product.png"} alt={product.name} width={50} height={50} className="rounded-full" />
              </td>
              <td className="px-6 py-2">{product.name}</td>
              <td className="px-6 py-2">
                {
                  categories.find(cat => cat._id === product.category)?.name || 'Category not found'
                }
              </td>
              <td className="px-6 py-2">{product.stock}</td>
              <td className="px-6 py-2">Rs.{product.price.toFixed(2)}</td>
              <td className="px-6 py-2">{new Date(product.createdAt).toLocaleDateString()}</td>
              <td className="px-6 py-2">{product.seller}</td>
              <td className="px-6 py-2">
                <div className="flex space-x-2">
                  <Link href={`/admin/products/${product._id}/upload_images`}>
                    <i className="fa fa-image text-green-600 cursor-pointer" />
                  </Link>
                  <Link href={`/admin/products/${product._id}`}>
                    <i className="fa fa-pencil text-yellow-600 cursor-pointer" />
                  </Link>
                  <div
                    className="fa fa-trash text-red-600 cursor-pointer"
                    onClick={() => deleteHandler(product._id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mb-6">
        <CustomPagination
          resPerPage={data.resPerPage}
          productsCount={data.filteredProductsCount}
        />
      </div>
    </div>
  );
};

export default Products;
