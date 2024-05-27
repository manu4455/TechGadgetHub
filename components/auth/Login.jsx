"use client";

import Link from "next/link";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { IoMailOutline } from "react-icons/io5";
import { BiLockAlt } from "react-icons/bi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useColorMode } from "@chakra-ui/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const {colorMode} = useColorMode()

  const router = useRouter();
  const params = useSearchParams();
  const callBackUrl = params.get("callbackUrl");

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: callBackUrl ? callBackUrl : "/"
    });

    if (data?.error) {
      toast.error(data.error);
    }

    if (data?.ok) {
      router.push(data.url);
    }
  };

  const googleLoginHandler = () => {
    signIn("google", { callbackUrl: callBackUrl ? callBackUrl : "/" });
  };

  return (
    <div className="">
  <section className="flex justify-center items-center h-screen w-max-[400]">
    <div className={`w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 m-auto flex flex-col p-10 rounded-3xl ${colorMode === 'dark' ? 'bg-gray-800' : 'bg-gray-50 '}`}>
      <div className="mt-12 mb-6 flex flex-col gap-3">
        <h2 className="text-center md:text-left text-3xl font-bold">SignIn to Tech Gadget Hub</h2>
        <p className="text-center md:text-left text-sm">
          Don't Have an Account?{" "}
          <Link href="/register" className="text-primary hover:text-green-500 font-semibold">
            Create an account
          </Link>
        </p>
      </div>
      <form onSubmit={submitHandler} className="flex flex-col gap-4">
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
            placeholder="Type your email"
            required
            autoComplete="email"
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
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="py-2 pl-10 pr-3 border border-gray-200 bg-gray-100 rounded-md w-full hover:border-gray-400 focus:outline-none focus:border-blue-500"
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute top-[39px] right-3 bg-gray-100 p-1 text-gray-700 rounded"
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </button>
        </div>
        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white rounded-lg py-2 px-5 shadow-lg font-semibold flex items-center justify-center gap-2 max-h-max text-center">Login</button>
      </form>

      <div className="flex items-center justify-center my-4">
            <span className="text-gray-500">or</span>
          </div>
          <button
            onClick={googleLoginHandler}
            className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 rounded-lg py-2 px-5 shadow-lg font-semibold flex items-center justify-center gap-2 max-h-max text-center"
          >
            <FcGoogle className="text-2xl" />
            Continue with Google
          </button>
        
    </div>
  </section>
</div>

  );
};

export default Login;
