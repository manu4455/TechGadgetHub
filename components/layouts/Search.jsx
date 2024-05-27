'use client'
import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import debounce from 'lodash.debounce';

const Search = () => {
  const [keyword, setKeyword] = useState('');
  const router = useRouter(); // Import from next/navigation

  // Debounced function to handle live search navigation
  const handleSearchRouting = useCallback(debounce((query) => {
    if (query.length > 0) {
      router.push(`/admin/products/?keyword=${query}`);
    } else {
      router.push('/admin/products');
    }
  }, 300), [router]); // Debounce delay of 300 ms

  const onInputChange = (e) => {
    const query = e.target.value;
    setKeyword(query);
    handleSearchRouting(query);
  };

  return (
    <form
      className="flex flex-nowrap items-center w-full order-last md:order-none mt-5 md:mt-0 md:w-2/4 lg:w-2/4"
      onSubmit={(e) => e.preventDefault()} // Prevents form submission
    >
      <input
        className="flex-grow appearance-none border border-gray-200 bg-gray-100 rounded-md mr-2 py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400"
        type="text"
        placeholder="Enter your keyword"
        value={keyword}
        onChange={onInputChange}
        required
      />
      <button
        type="button"
        className="px-4 py-2 inline-block border border-transparent bg-blue-600 text-white rounded-md hover:bg-blue-700"
        onClick={() => setKeyword('')}
      >
        Clear
      </button>
    </form>
  );
};

export default Search;
