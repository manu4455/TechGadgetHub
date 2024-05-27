'use client'
import AuthContext from "@/context/AuthContext";
import { useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { useContext } from "react";
import { FaUser, FaProductHunt, FaSignOutAlt } from "react-icons/fa";

const Sidebar2 = () => {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logoutHandler = () => {
    signOut();
  };

  return (
    <aside className=" h-auto border rounded-2xl  border-gray-300 w-auto mx-auto " >
      <div className="container flex flex-col justify-between p-2">
        <div className=" flex flex-row  h-1/5 ">
          <div className=" flex justify-center  items-center  w-1/3 ">
            {/* <FaUser className="text-3xl text-green-500" /> */}
            <div className="relative ">
              <img
                className="w-16 h-16 rounded-full mr-4"
                src={user?.avatar ? user?.avatar?.url : "/images/default.png"}
                alt={user?.name}
              />
            </div>

          </div>
          <Link href={'/me'} className="hover:bg-green-300 hover:text-black rounded-lg  p-2">
            <div className=" w-full">
              <figcaption>
                <h5 className="font-semibold text-lg">{user?.name}</h5>
                <p>
                  {user?.email}

                </p>
              </figcaption>
            </div>
          </Link>
        </div>
        <div className=" h-full mt-5">
          <ul className="sidebar">
            {user?.role === "admin" && (
              <>
                <li className="flex items-center px-3 py-2 rounded-md border-b border-gray-300 shadow-sm transition-all duration-300 ease-in-out hover:bg-gray-100 transform hover:scale-105">
                  <i className="fa-solid fa-warehouse text-green-500 text-lg mr-3"></i>
                  <Link href="/admin/products" className="flex-grow block  hover:text-purple-600">
                    Inventory <span className="text-red-500">(Admin)</span>
                  </Link>
                </li>


                <li className="flex items-center px-3 py-2 rounded-md border-b border-gray-300 shadow-sm transition-all duration-300 ease-in-out hover:bg-gray-100 transform hover:scale-105">


                  <i class="fa-solid fa-list  text-green-500 text-lg mr-3"></i>
                  <Link href="/admin/categories" className="flex-grow block  hover:text-purple-600">
                    Categories <span className="text-red-500">(Admin)</span>
                  </Link>
                </li>

                <li className="flex items-center px-3 py-2 rounded-md border-b border-gray-300 shadow-sm transition-all duration-300 ease-in-out hover:bg-gray-100 transform hover:scale-105">
                  <i className="fa-solid fa-boxes-stacked text-green-500 text-lg mr-3"></i>
                  <Link href="/admin/orders" className="flex-grow block  hover:text-purple-600">
                    All Orders <span className="text-red-500">(Admin)</span>
                  </Link>
                </li>

                <li className="flex items-center px-3 py-2 rounded-md border-b border-gray-300 shadow-sm transition-all duration-300 ease-in-out hover:bg-gray-100 transform hover:scale-105">
                  <i className="fa-solid fa-users text-green-500 text-lg mr-3"></i>
                  <Link href="/admin/users" className="flex-grow block  hover:text-purple-600">
                    All Users <span className="text-red-500">(Admin)</span>
                  </Link>
                </li>
                <hr />
              </>
            )}

            <li className="flex items-center px-3 py-2 rounded-md border-b border-gray-300 shadow-sm transition-all duration-300 ease-in-out hover:bg-gray-100 transform hover:scale-105">

              <i className="fa-solid fa-address-book text-green-500 text-lg mr-3"></i>
              <Link href="/me/address" className="flex-grow block  hover:text-purple-600">
                Address
              </Link>
            </li>

            <li className="flex items-center px-3 py-2 rounded-md border-b border-gray-300 shadow-sm transition-all duration-300 ease-in-out hover:bg-gray-100 transform hover:scale-105">
              <i className="fa-solid fa-box text-green-500 text-lg mr-3"></i>
              <Link href="/me/orders" className="flex-grow block  hover:text-purple-600">
                My Orders
              </Link>
            </li>

            <li className="flex items-center px-3 py-2 rounded-md border-b border-gray-300 shadow-sm transition-all duration-300 ease-in-out hover:bg-gray-100 transform hover:scale-105">
              <i className="fa-solid fa-address-card text-green-500 text-lg mr-3"></i>
              <Link href="/me/update" className="flex-grow block  hover:text-purple-600">
                Update Profile
              </Link>
            </li>

            <li className="flex items-center px-3 py-2 rounded-md border-b border-gray-300 shadow-sm transition-all duration-300 ease-in-out hover:bg-gray-100 transform hover:scale-105">
              <i className="fa-solid fa-wrench text-green-500 text-lg mr-3"></i>
              <Link href="/me/update_password" className="flex-grow block  hover:text-purple-600">
                Update Password
              </Link>
            </li>

            <li className="flex items-center px-3 py-2 hover:bg-red-100 rounded-md transform hover:scale-105">
              <FaSignOutAlt className="text-red-800 text-lg mr-3" />

              <div className="flex-grow block  hover:text-purple-600 cursor-pointer" onClick={logoutHandler}>
                Logout
              </div>
            </li>


          </ul>



        </div>
      </div>



    </aside>
  )
}

export default Sidebar2
