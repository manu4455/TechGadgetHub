"use client";

import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProductContext from "@/context/ProductContext";
import CategoryContext from "@/context/CategoryContext";
import { useRouter } from "next/navigation"; // Correct the import for useRouter
import { useColorMode } from "@chakra-ui/react";

const UpdateProduct = ({ data }) => {
  const { updateProduct, error, updated, setUpdated, clearErrors } = useContext(ProductContext);
  const { categories, getCategories } = useContext(CategoryContext);
  const router = useRouter();

  const initialSpecs = Object.entries(data?.specs || {}).map(([key, value]) => ({ key, value }));

  const [product, setProduct] = useState({
    name: data?.name || '',
    description: data?.description || '',
    seller: data?.seller || '',
    price: data?.price || 0,
    stock: data?.stock || 0,
    category: data?.category || '',
    brand: data?.brand || '',
  });

  const [specs, setSpecs] = useState(initialSpecs);
 
  const {colorMode} = useColorMode();

  useEffect(() => {
    getCategories();
    if (updated) {
      toast.success("Product Updated");
      setUpdated(false);
      router.push("/admin/products");
    }
    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [error, updated, router, setUpdated, clearErrors]);

  const handleSpecChange = (index, field, value) => {
    setSpecs(currentSpecs => currentSpecs.map((spec, i) => i === index ? { ...spec, [field]: value } : spec));
  };

  const addSpec = () => {
    setSpecs(currentSpecs => [...currentSpecs, { key: '', value: '' }]);
  };

  const removeSpec = index => {
    setSpecs(currentSpecs => currentSpecs.filter((_, i) => i !== index));
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setProduct(currentProduct => ({
      ...currentProduct,
      [name]: name === 'price' || name === 'stock' ? parseFloat(value) : value
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const specsObject = specs.reduce((obj, item) => {
      if (item.key) obj[item.key] = item.value;
      return obj;
    }, {});
    const updatedProduct = { ...product, specs: specsObject };
    updateProduct(updatedProduct, data?._id);
  };

  

  return (
    <section className={`container max-w-3xl p-6 mx-auto ${colorMode === 'dark' ? 'text-white bg-gray-900' : 'text-black bg-white'}`}>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl md:text-3xl font-semibold">Update Product</h1>
        
      </div>
      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1">Name</label>
          <input
            id="name"
            type="text"
            className={`appearance-none border ${colorMode === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-100'} rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full`}
            placeholder="Product name"
            name="name"
            value={product.name}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block mb-1">Description</label>
          <textarea
            id="description"
            className={`appearance-none border ${colorMode === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-100'} rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full`}
            placeholder="Product description"
            name="description"
            value={product.description}
            onChange={onChange}
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-x-2">
          <div className="mb-4">
            <label htmlFor="price" className="block mb-1">Price</label>
            <input
              id="price"
              type="number"
              className={`appearance-none border ${colorMode === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-100'} rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full`}
              placeholder="0.00"
              name="price"
              value={product.price}
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block mb-1">Category</label>
            <select
              id="category"
              className={`block appearance-none border ${colorMode === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-100'} rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full`}
              name="category"
              value={product.category}
              onChange={onChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-x-2">
          <div className="mb-4">
            <label htmlFor="seller" className="block mb-1">Seller / Brand</label>
            <input
              id="seller"
              type="text"
              className={`appearance-none border ${colorMode === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-100'} rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full`}
              placeholder="Seller or brand"
              name="seller"
              value={product.seller}
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="stock" className="block mb-1">Stock</label>
            <input
              id="stock"
              type="number"
              className={`appearance-none border ${colorMode === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-100'} rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full`}
              placeholder="0"
              name="stock"
              value={product.stock}
              onChange={onChange}
              required
            />
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          {specs.map((spec, index) => (
            <div key={index} className="grid grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Spec Key"
                value={spec.key}
                onChange={(e) => handleSpecChange(index, 'key', e.target.value)}
                required
                className={`col-span-1 p-2 border rounded-md focus:outline-none focus:border-blue-500 ${colorMode === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-white'}`}
              />
              <input
                type="text"
                placeholder="Spec Value"
                value={spec.value}
                onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
                required
                className={`col-span-1 p-2 border rounded-md focus:outline-none focus:border-blue-500 ${colorMode === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-white'}`}
              />
              <button
                type="button"
                onClick={() => removeSpec(index)}
                className="col-span-1 p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addSpec} className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">Add Spec</button>
        </div>
        <button
          type="submit"
          className="my-2 px-4 py-2 text-center inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 w-full"
        >
          Update Product
        </button>
      </form>
    </section>
  );
};

export default UpdateProduct;
