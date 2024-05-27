"use client";

import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import StarRatings from "react-star-ratings";
import { getPriceQueryParams } from "@/helpers/helpers";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/solid";
import CategoryContext from "@/context/CategoryContext";
import { useColorMode } from "@chakra-ui/react";

const Filters = () => {
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [expanded, setExpanded] = useState(null);
  const { categories, getCategories } = useContext(CategoryContext);
  const { colorMode } = useColorMode();

  const router = useRouter();

  useEffect(() => {
    getCategories();
  }, []);

  const handlePriceFilter = () => {
    let queryParams = new URLSearchParams(window.location.search);
    queryParams = getPriceQueryParams(queryParams, "min", min);
    queryParams = getPriceQueryParams(queryParams, "max", max);
    router.push(window.location.pathname + "?" + queryParams.toString());
  };

  const handleFilterChange = (e) => {
    let queryParams = new URLSearchParams(window.location.search);
    const { name, value, checked } = e.target;

    if (name === "category") {
      const categories = queryParams.getAll("category");
      if (checked) {
        if (!categories.includes(value)) {
          categories.push(value);
        }
      } else {
        const index = categories.indexOf(value);
        if (index > -1) {
          categories.splice(index, 1);
        }
      }
      queryParams.delete("category");
      queryParams.delete("page");
      categories.forEach((cat) => queryParams.append("category", cat));
    } else {
      checked ? queryParams.set(name, value) : queryParams.delete(name);
    }

    router.push(window.location.pathname + "?" + queryParams.toString());
  };

  const toggleSection = (section) => {
    setExpanded(expanded === section ? null : section);
  };

  const groupCategoriesByParent = (categories) => {
    const groupedCategories = categories.reduce((acc, category) => {
      const parent = category.parent ? category.parent : null;
      if (!acc[parent]) acc[parent] = [];
      acc[parent].push(category);
      return acc;
    }, {});
    return groupedCategories;
  };

  const groupedCategories = groupCategoriesByParent(categories);

  return (
    <aside
      className={`shadow  p-4 border rounded-2xl divide-y ${
        colorMode === "dark"
          ? "divide-gray-700 bg-gray-800 text-white"
          : "divide-gray-200 bg-white text-black border-gray-400"
      }`}
    >
      {/* Price Filter Section */}
      <div className="py-2">
        <h3
          className="flex justify-between items-center text-lg font-semibold cursor-pointer"
          onClick={() => toggleSection("price")}
        >
          Price (₹)
          {expanded === "price" ? (
            <ChevronUpIcon className="w-5 h-5" />
          ) : (
            <ChevronDownIcon className="w-5 h-5" />
          )}
        </h3>
        {expanded === "price" && (
          <div className="mt-4 flex justify-center gap-2 flex-col items-center">
            <input
              type="number"
              placeholder="Min"
              value={min}
              onChange={(e) => setMin(e.target.value)}
              className={`flex-1 appearance-none border rounded-md py-2 px-3 focus:outline-none focus:ring-1 ${
                colorMode === "dark"
                  ? "border-gray-600 bg-gray-700 focus:border-blue-500 focus:ring-blue-500"
                  : "border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-500"
              }`}
            />
            <input
              type="number"
              placeholder="Max"
              value={max}
              onChange={(e) => setMax(e.target.value)}
              className={`flex-1 appearance-none border rounded-md py-2 px-3 focus:outline-none focus:ring-1 ${
                colorMode === "dark"
                  ? "border-gray-600 bg-gray-700 focus:border-blue-500 focus:ring-blue-500"
                  : "border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-500"
              }`}
            />
            <button
              onClick={handlePriceFilter}
              className="bg-blue-500 hover:bg-blue-600 font-bold py-2 px-4 rounded focus:outline-none"
            >
              Go
            </button>
          </div>
        )}
      </div>

      {/* Category Filter Section */}
      {groupedCategories[null]?.map((parentCategory) => (
        <div key={parentCategory._id} className="py-2">
          <h3
            className="flex justify-between items-center text-lg font-semibold cursor-pointer"
            onClick={() => toggleSection(parentCategory._id)}
          >
            {parentCategory.name}
            {expanded === parentCategory._id ? (
              <ChevronUpIcon className="w-5 h-5" />
            ) : (
              <ChevronDownIcon className="w-5 h-5" />
            )}
          </h3>
          {expanded === parentCategory._id && (
            <div className="mt-4 space-y-2">
              {categories
                .filter(
                  (subcategory) =>
                    subcategory.parent &&
                    subcategory.parent._id === parentCategory._id
                )
                .map((subcategory) => (
                  <div key={subcategory._id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={subcategory._id}
                      name="category"
                      value={subcategory._id}
                      onChange={handleFilterChange}
                      className="mr-2"
                    />
                    <label htmlFor={subcategory._id}>{subcategory.name}</label>
                  </div>
                ))}
            </div>
          )}
        </div>
      ))}

      {/* Ratings Filter Section */}
      <div className="py-2">
        <h3
          className="flex justify-between items-center text-lg font-semibold cursor-pointer"
          onClick={() => toggleSection("ratings")}
        >
          Ratings
          {expanded === "ratings" ? (
            <ChevronUpIcon className="w-5 h-5" />
          ) : (
            <ChevronDownIcon className="w-5 h-5" />
          )}
        </h3>
        {expanded === "ratings" && (
          <div className="mt-4 space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center">
                <input
                  type="radio"
                  id={`rating-${rating}`}
                  name="ratings"
                  value={rating}
                  onChange={handleFilterChange}
                  className="mr-2"
                />
                <label
                  htmlFor={`rating-${rating}`}
                  className="flex items-center"
                >
                  <StarRatings
                    rating={rating}
                    starRatedColor="orange"
                    numberOfStars={5}
                    name="rating"
                    starDimension="18px"
                    starSpacing="2px"
                  />
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};

export default Filters;
