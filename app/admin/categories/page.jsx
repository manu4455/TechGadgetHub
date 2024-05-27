'use client'
import React, { useEffect, useContext } from 'react';
import Link from 'next/link';
import CategoryContext from '@/context/CategoryContext';
import { PencilAltIcon, TrashIcon, PlusIcon } from '@heroicons/react/outline'



const CategoryPage = () => {
    const { categories, getCategories, deleteCategory } = useContext(CategoryContext);

  useEffect(() => {
    getCategories();
  }, []);

 

  return (
    <div className=" shadow-md rounded-2xl p-6 mx-auto max-w-4xl mt-10 border border-bray-300 ">
  <h1 className="text-2xl font-bold  mb-6">Categories</h1>
  <Link href="/admin/categories/new" className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4">
    <PlusIcon className="h-5 w-5 mr-2" />
    Add New Category
  </Link>
  <ul className="list-disc pl-5">
    {categories.map(category => (
      <li key={category._id} className="flex items-center justify-between py-2 border-b">
        <span className="text-lg ">{category.name}</span>
        {category.parent && (
                <span className="text-sm  ml-2">{category.parent.name}</span>
              )}
        
        <div className="flex items-center">
          <Link href={`/admin/categories/${category._id}`} className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded mr-2">
            <PencilAltIcon className="h-5 w-5 mr-1" />
            Edit
          </Link>
          <button 
            onClick={() => deleteCategory(category._id)}
            className="inline-flex items-center bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded focus:outline-none">
            <TrashIcon className="h-5 w-5 mr-1" />
            Delete
          </button>
        </div>
      </li>
    ))}
  </ul>
</div>

  )
}

export default CategoryPage
