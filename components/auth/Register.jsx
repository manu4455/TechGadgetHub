"use client";

import Link from "next/link";
import React, { useState, useContext, useEffect } from "react";
import AuthContext from "@/context/AuthContext";
import { toast } from "react-toastify";
import { IoMailOutline, IoPersonOutline } from "react-icons/io5";
import { BiLockAlt } from "react-icons/bi";
import { useColorMode } from "@chakra-ui/react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";


const Register = () => {
  const { error, registerUser, clearErrors } = useContext(AuthContext);
  const {colorMode} = useColorMode()

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [error]);

  const submitHandler = (e) => {
    e.preventDefault();

    registerUser({ name, email, password });
  };

  return (
    <div className="">
  <section className="flex justify-center items-center h-screen w-max-[400]">
    <div className={`w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 m-auto flex flex-col p-10 rounded-3xl ${colorMode === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
      <div className="mt-12 mb-6 flex flex-col gap-3">
        <h2 className="text-center md:text-left text-3xl font-bold">Sign Up for Tech Gadget Hub</h2>
        <p className="text-center md:text-left text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:text-green-500 font-semibold">
            Sign in
          </Link>
        </p>
      </div>
      <form onSubmit={submitHandler} className="flex flex-col gap-4">
        <div className="flex flex-col relative mb-4">
          <label htmlFor="name" className="block text-sm font-semibold mb-3">Name</label>
          <span className="absolute top-[39px] left-3 bg-green-100 p-1 rounded text-primary">
            <IoPersonOutline className="text-green-500" />
          </span>
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            required
            className="py-2 pl-10 pr-3 border border-gray-200 bg-gray-100 rounded-md w-full hover:border-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col relative mb-4">
          <label htmlFor="email" className="block text-sm font-semibold mb-3">Email</label>
          <span className="absolute top-[39px] left-3 bg-green-100 p-1 rounded text-primary">
            <IoMailOutline className="text-green-500" />
          </span>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            required
            className="py-2 pl-10 pr-3 border border-gray-200 bg-gray-100 rounded-md w-full hover:border-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col relative mb-4">
          <label htmlFor="password" className="block text-sm font-semibold mb-3">Password</label>
          <span className="absolute top-[39px] left-3 bg-green-100 p-1 rounded text-primary">
            <BiLockAlt className="text-green-500" />
          </span>
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
            required
            className="py-2 pl-10 pr-3 border border-gray-200 bg-gray-100 rounded-md w-full hover:border-gray-400 focus:outline-none focus:border-blue-500"
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute top-[39px] right-3 bg-gray-100 p-1 text-gray-700 rounded"
            aria-label="Toggle password visibility"
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </button>
        </div>
        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white rounded-lg py-2 px-5 shadow-lg font-semibold flex items-center justify-center gap-2 max-h-max text-center">Create Account</button>
      </form>
    </div>
  </section>
</div>

  );
};

export default Register;
