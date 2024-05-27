'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useState, useContext } from "react";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Fetch all categories
  const getCategories = async () => {
    
    setLoading(true);
    try {
      const { data } = await axios.get(`${process.env.API_URL}/api/categories`);
      
      setCategories(data.categories);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  // Create a new category
  const createCategory = async (category) => {
    try {
      const { data } = await axios.post(`${process.env.API_URL}/api/admin/categories`, category);
      router.push('/admin/categories');
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  // Update an existing category
  const updateCategory = async (id, category) => {
   
    try {
      const { data } = await axios.put(`${process.env.API_URL}/api/admin/categories/${id}`, category);
      if(data){
        router.push('/admin/categories');

      }
    
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  // Delete a category
  const deleteCategory = async (id) => {
    try {
      const { data } = await axios.delete(`${process.env.API_URL}/api/admin/categories/${id}`);
      if(data){
        router.push('/admin/categories');

      }
      
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  // Clear errors
  const clearErrors = () => setError(null);

  return (
    <CategoryContext.Provider value={{
      categories,
      error,
      loading,
      getCategories,
      createCategory,
      updateCategory,
      deleteCategory,
      clearErrors
    }}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContext;
