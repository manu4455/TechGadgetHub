"use client";

import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import CartContext from "@/context/CartContext";
import { useSession } from "next-auth/react";
import AuthContext from "@/context/AuthContext";
import Search2 from "./Search2";
import { signOut } from "next-auth/react";
import { useColorMode, IconButton } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { FaShoppingCart, FaBars, FaUser, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';

const Header = () => {
  const { user, setUser } = useContext(AuthContext);
  const { colorMode, toggleColorMode } = useColorMode();
  const { data } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logoutHandler = () => {
    signOut();
  };

  const getUserCartItems = () => {
    return (cart.cartItems || []).filter(item => item.userId === user?._id);
  };

  useEffect(() => {
    if (data) {
      setUser(data?.user);
    }
  }, [data]);

  const { cart } = useContext(CartContext);
  const cartItems = getUserCartItems();

  return (
    <header className="py-2 border-b relative">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="flex flex-wrap items-center">
          <div className="flex-shrink-0 mr-5">
            <Link href="/">
              <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-500 to-teal-600 hover:from-teal-700 hover:to-green-700 transition-colors duration-300">
                TechGadgetHub
              </span>
            </Link>
          </div>
          <Search2 />
          <div className="flex items-center space-x-2 ml-auto gap-2">
            <Link
              href="/cart"
              className="relative p-2  items-center justify-center hover:text-green-500 transition-colors duration-300 hidden lg:flex"
            >
              <FaShoppingCart className="text-lg" />
              <span className="ml-2 hidden lg:flex items-center">
                <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
                  {user && cartItems?.length > 0 && (
                    <span className="inline-flex items-center justify-center h-5 w-5 text-xs font-bold text-white bg-red-500 rounded-full">
                      {cartItems.length}
                    </span>
                  )}
                </span>
              </span>
            </Link>
            {!user ? (
              <Link
                href="/login"
                className={`px-2 py-1  items-center justify-center text-center text-white bg-gradient-to-r from-green-400 via-green-500 to-teal-600 hover:text-gray-300 rounded-lg shadow transition duration-300 ease-in-out hidden lg:flex ${colorMode === 'dark' ? 'text-white' : 'text-black'}`}
              >
                <FaUser className="mr-2 text-white" />
                <span className="hidden lg:block">Sign in</span>
              </Link>
            ) : (
              <Link href="/me">
                <div className="items-center space-x-3 cursor-pointer hidden rounded-full shadow-md shadow-green-400 hover:bg-gray-800 lg:flex">
                  <img
                    className="w-10 h-10 rounded-full border border-gray-200"
                    src={user?.avatar ? user?.avatar?.url : "/images/default.png"}
                    alt="User avatar"
                  />
                </div>
              </Link>
            )}
            <IconButton
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              variant="ghost"
              aria-label="Toggle dark mode"
            />
          </div>
          <div className="lg:hidden ml-2">
            <button
              type="button"
              onClick={toggleMenu}
              className="bg-white p-3 inline-flex items-center mt-2 rounded-md text-black hover:bg-gray-200 hover:text-gray-800 border border-transparent"
            >
              <span className="sr-only">Open menu</span>
              <FaBars className="text-lg" />
            </button>
            {isOpen && (
              <div className="lg:hidden absolute top-full right-0 mt-2 bg-white border border-gray-200 shadow-md rounded-md z-10 w-max-[300]">
                <ul className="divide-y divide-gray-200">
                  {user ? (
                    <>
                      <li>
                        <Link href="/me">
                          <div className="flex items-center justify-between py-3 px-4 text-gray-700 hover:bg-green-100 hover:text-green-500 cursor-pointer">
                            <span className="flex items-center">
                              <FaUser className="mr-2 text-green-500" />
                              {user.name}
                            </span>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link href="/cart">
                          <div className="flex items-center justify-between py-3 px-4 text-gray-700 hover:bg-green-100 hover:text-green-500 cursor-pointer">
                            <span className="flex items-center">
                              <FaShoppingCart className="mr-2 text-green-500" />
                              Cart
                            </span>
                          </div>
                        </Link>
                      </li>
                      <li>
                        
                        <button
                        onClick={logoutHandler}
                        className="flex items-center w-full justify-between py-3 px-4 text-gray-700 hover:bg-green-100 hover:text-green-500 cursor-pointer"
                        >
                        <span className="flex items-center">
                            <FaSignOutAlt className="mr-2 text-green-500" />
                            Logout
                          </span>

                        </button>
                      </li>
                    </>
                  ) : (
                    <li>
                      <Link href="/login">
                        <div className="flex items-center justify-between py-3 px-4 text-gray-700 hover:bg-green-100 hover:text-green-500 cursor-pointer">
                          <span className="flex items-center">
                            <FaSignInAlt className="mr-2 text-green-500" />
                            Sign In
                          </span>
                        </div>
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
