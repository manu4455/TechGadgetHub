"use client";

import React, { useContext } from "react";
import UserAddresses from "../user/UserAddresses";
import Link from "next/link";
import AuthContext from "@/context/AuthContext";

const Profile = ({ addresses }) => {
  const { user } = useContext(AuthContext);
 

  
 

  return (
    <>

      <div className="mb-5 text-center">
        <span className="text-bold text-3xl">Personal Information</span>
      </div>
      <div className="flex flex-col border border-gray-300 rounded-2xl shadow-md h-auto mx-auto " style={{ width: '400px' }}>
        <div className="flex flex-col gap-4 p-5">
          <div className="flex flex-col border-b border-gray-200 shadow-sm">
            <label className="text-gray-500">Full Name</label>
            <span className="text-bold">{user?.name}</span>
          </div>

          <div className="flex flex-col border-b border-gray-200 shadow-sm">
            <label className="text-gray-500">Email ID</label>
            <span className="text-bold">{user?.email}</span>

          </div>

          <div className="flex flex-col border-b border-gray-200 shadow-sm">
            <label className="text-gray-500">Phone No</label>
            <span className="text-bold">+91 9612852296</span>
          </div>

          {addresses && addresses.length > 0 && ( // Check if addresses exist
            <div className="flex flex-col border-b border-gray-200 shadow-sm">
              <label className="text-gray-500">Default Address</label>
              <span className="text-bold">
                <p>
                  {addresses[0].street } <br /> {addresses[0].city }, {addresses[0].state},{" "}
                  {addresses[0].zipCode }, {addresses[0].country }
                </p>
              </span>
            </div>
          )}
          <div >
            
            <Link href={'/me/update'}>
            <button className="py-2  px-3 shadow-md w-full border  hover:border-green-500 rounded-2xl  transition ease-in-out duration-300">Edit</button>
            </Link>

          </div>

        </div>

      </div>




    </>
  );
};

export default Profile;
