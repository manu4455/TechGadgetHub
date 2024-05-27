'use client'
import React, { useState, useContext, useEffect } from 'react';
import ProductContext from '@/context/ProductContext';
import CategoryContext from '@/context/CategoryContext';

const NewProduct = () => {
  const { newProduct } = useContext(ProductContext);
  const { categories, getCategories} = useContext(CategoryContext);

  useEffect(() => {
    getCategories();
  }, []);
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    brand: '',
    specs: {},
    seller: '',
    stock: '',
  });
  const [specs, setSpecs] = useState([]);

  const handleSpecChange = (index, field, value) => {
    const newSpecs = specs.map((spec, i) => {
      if (i === index) {
        return { ...spec, [field]: value };
      }
      return spec;
    });
    setSpecs(newSpecs);
  };

  const addSpec = () => {
    setSpecs([...specs, { key: '', value: '' }]);
  };

  const removeSpec = index => {
    const newSpecs = specs.filter((_, i) => i !== index);
    setSpecs(newSpecs);
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert specs array to object
    const specsObject = specs.reduce((obj, item) => {
      obj[item.key] = item.value;
      return obj;
    }, {});
    newProduct({ ...product, specs: specsObject });
  };

  return (
    <div className="container mx-auto px-4 py-8">
  <h1 className="text-2xl font-semibold text-gray-800 mb-6">Add New Product</h1>
  <form onSubmit={handleSubmit} className="space-y-6">
    <div>
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
      <input
        id="name"
        type="text"
        name="name"
        placeholder="Product Name"
        value={product.name}
        onChange={handleChange}
        required
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      />
    </div>
    <div>
      <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
      <textarea
        id="description"
        name="description"
        placeholder="Description"
        value={product.description}
        onChange={handleChange}
        required
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        rows="4"
      />
    </div>
    <div>
      <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
      <input
        id="price"
        type="number"
        name="price"
        placeholder="Price"
        value={product.price}
        onChange={handleChange}
        required
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      />
    </div>
    <div>
      <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
      <select
        id="category"
        name="category"
        value={product.category}
        onChange={handleChange}
        required
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>{cat.name}</option>
        ))}
      </select>
    </div>
    <div>
      <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Brand</label>
      <input
        id="brand"
        type="text"
        name="brand"
        placeholder="Brand"
        value={product.brand}
        onChange={handleChange}
        required
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      />
    </div>
    {specs.map((spec, index) => (
      <div key={index} className="grid grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Spec Key"
          value={spec.key}
          onChange={e => handleSpecChange(index, 'key', e.target.value)}
          required
          className="col-span-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="Spec Value"
          value={spec.value}
          onChange={e => handleSpecChange(index, 'value', e.target.value)}
          required
          className="col-span-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
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
    <div>
      <label htmlFor="seller" className="block text-sm font-medium text-gray-700">Seller</label>
      <input
        id="seller"
        type="text"
        name="seller"
        placeholder="Seller"
        value={product.seller}
        onChange={handleChange}
        required
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      />
    </div>
    <div>
      <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
      <input
        id="stock"
        type="number"
        name="stock"
        placeholder="Stock"
        value={product.stock}
        onChange={handleChange}
        required
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      />
    </div>
    <button type="submit" className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600">Submit Product</button>
  </form>
</div>

  );
};

export default NewProduct;
