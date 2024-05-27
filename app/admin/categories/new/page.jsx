'use client'
import React, { useState,useEffect, useContext } from 'react';
import CategoryContext from '@/context/CategoryContext';
import { useRouter } from 'next/navigation';




const AddCategory = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [parent, setParent] = useState('');

  const { categories, getCategories, deleteCategory, createCategory } = useContext(CategoryContext);
  const router = useRouter();

  // Dummy data - replace with data fetched from your API
  useEffect(() => {
    getCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCategory({ name, description });
    router.push('/admin/categories');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto my-10">
      <div className="mb-6">
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description:</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="parent" className="block mb-2 text-sm font-medium text-gray-900">Parent Category:</label>
        <select
          id="parent"
          value={parent}
          onChange={(e) => setParent(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option value="">None</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
      </div>
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Add Category</button>
    </form>
  );
};

export default AddCategory;

