'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useState, useContext } from "react";

const TestimonialContext = createContext();

export const TestimonialProvider = ({ children }) => {
  const [testimonial, setTestimonial] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Fetch all testimonial
  const getTestimonials = async () => {
    
    
    setLoading(true);
    try {
      const { data } = await axios.get(`${process.env.API_URL}/api/testimonial`);
      
      setTestimonial(data.testimonial);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  // Create a new testimonial
  const createTestimonial = async (testimonial) => {
    try {
      
      const { data } = await axios.post(`${process.env.API_URL}/api/testimonial`, testimonial);
      router.push('/');
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  // Update an existing testimonial
  const updateTestimonial = async (id, testimonial) => {
   
    try {
      const { data } = await axios.put(`${process.env.API_URL}/api/admin/testimonial/${id}`, testimonial);
      if(data){
        router.push('/admin/testimonial');

      }
    
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  // Delete a testimonial
  const deleteTestimonial = async (id) => {
    try {
      const { data } = await axios.delete(`${process.env.API_URL}/api/admin/testimonial/${id}`);
      if(data){
        router.push('/admin/testimonial');

      }
      
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  // Clear errors
  const clearErrors = () => setError(null);

  return (
    <TestimonialContext.Provider value={{
      testimonial,
      error,
      loading,
      getTestimonials,
      createTestimonial,
      updateTestimonial,
      deleteTestimonial,
      clearErrors
    }}>
      {children}
    </TestimonialContext.Provider>
  );
};

export default TestimonialContext;
