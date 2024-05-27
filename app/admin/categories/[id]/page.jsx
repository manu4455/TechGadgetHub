'use client'
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import CategoryContext from '@/context/CategoryContext';
import { useRouter } from 'next/navigation';  // Ensure next/navigation is correct as per your Next.js version.

const EditCategory = ({params}) => {
   
    const router = useRouter();
    const  id  = params.id; // Assuming id is part of the URL
    const { categories, getCategories, updateCategory } = useContext(CategoryContext);
    const [category, setCategory] = useState({
        name: '',
        description: '',
        parent: ''
    });

    useEffect(() => {
        getCategories(); // Load categories if not already available
    }, []);

    useEffect(() => {
        // Find and set the category once categories are loaded and id is available
        if (categories.length > 0 && id) {
            const currentCategory = categories.find(c => c._id === id);
            if (currentCategory) {
                setCategory({
                    name: currentCategory.name || '',
                    description: currentCategory.description || '',
                    parent: currentCategory.parent || ''
                });
            }
        }
    }, [id, categories]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
       
       updateCategory(params.id,category)
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto my-10">
            <div className="mb-6">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={category.name}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                />
            </div>
            <div className="mb-6">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description:</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    value={category.description}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
            </div>
            <div className="mb-6">
                <label htmlFor="parent" className="block mb-2 text-sm font-medium text-gray-900">Parent Category:</label>
                <select
                    id="parent"
                    name="parent"
                    value={category.parent}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                    <option value="">None</option>
                    {categories.map(cat => (
                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                </select>
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Update Category</button>
        </form>
    );
};

export default EditCategory;
