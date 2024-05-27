'use client'
import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { Button, useColorMode } from '@chakra-ui/react';
import TestimonialContext from '@/context/TestimonialContext';
import AuthContext from '@/context/AuthContext';
import { toast } from 'react-toastify';


const TestimonialItem = ({ userData }) => {
  const { colorMode } = useColorMode();
  return (
    <div className={`flex flex-col   shadow-lg shadow-green-500 hover:shadow-purple-400 rounded-2xl px-20 py-10 mb-6 m-2 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl ${colorMode === 'dark' ? 'bg-gray-800' : 'bg-white'} border border-gray-200`} >
      <div className="overflow-auto mb-4">
        <p className="text-lg font-medium  ">{userData.comment}</p>
      </div>
      <div className="flex items-center mt-4">
        <img src={userData.user.avatar.url || '/default-avatar.png'} alt={`${userData.user.name}'s profile picture`} className="w-12 h-12 rounded-full mr-4 shadow-md" />
        <div>
          <h3 className="text-sm font-bold">{userData.user.name}</h3>
          <p className="text-xs ">{userData.user.role}</p>
        </div>
      </div>
    </div>
  );
};

// Component for writing a comment
const CommentForm = () => {
  const [comment, setComment] = useState('');
  const { error, createTestimonial, clearErrors } = useContext(TestimonialContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [error, clearErrors]);

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      if (!comment.trim()) return;

      const newComment = {
        user: user._id,
        comment
      };

      createTestimonial(newComment);
      setComment('');
    } catch (error) {
      toast.error("Commenting unsuccessful")

    }
  };
  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your comment..."
        className="w-full h-20 border rounded-md p-2 focus:outline-none focus:border-blue-500"
      ></textarea>
      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
      >
        Post Comment
      </button>
    </form>
  );
};

const Testimonial = () => {
  const { colorMode } = useColorMode();
  const [comments, setComments] = useState([]);
  const { error, getTestimonials, clearErrors, testimonial } = useContext(TestimonialContext);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { user } = useContext(AuthContext);


  useEffect(() => {

    const fetchTestimonialComments = async () => {
      try {
        await getTestimonials();

        setComments(testimonial);  // Update comments state with fetched data
      } catch (error) {
        console.error('Error fetching testimonial:', error);
      }
    };

    fetchTestimonialComments();
  }, [getTestimonials]);



  return (


    <div className="container mx-auto ">
      <div className={`w-full p-5  rounded-xl mt-4  ${colorMode === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="flex justify-center items-center mb-4">
          <h2 className="text-2xl font-bold ">Testimonial</h2>

        </div>
        <div className="flex overflow-x-scroll snap-x snap-mandatory">

          {testimonial.map((commentData) => (
            <div key={commentData._id} className="snap-center shrink-0 first:pl-5 last:pr-5 ">
              <TestimonialItem
                userData={commentData}
              />
            </div>
          ))}

        </div>

        {isFormVisible && <CommentForm />}

        

        
       {user && (
        <Button
        onClick={() => setIsFormVisible(!isFormVisible)}
          size="lg"
          bg="green.300"
          _hover={{ bg: 'green.500', opacity: '1' }}
        >
          post
        </Button>
       )}
        

      </div>


    </div>
  );
};

export default Testimonial;