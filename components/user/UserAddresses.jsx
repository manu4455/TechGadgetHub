'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";

const UserAddresses = ({ addresses }) => {
  const [renderedAddresses, setRenderedAddresses] = useState([]);

  useEffect(() => {
    setRenderedAddresses(addresses);
  }, [addresses]);

  return renderedAddresses?.map((address) => (
    <Link href={`/me/address/${address._id}`} key={address._id}>
      <div className="h-auto rounded-lg">
        <div className="flex flex-row justify-center gap-2 items-center p-4 border border-gray-300  rounded-2xl  shadow hover:bg-gray-200 hover:text-gray-900 cursor-pointer transition duration-200 ease-in-out">
          <div className="flex items-center justify-center text-green-500  px-4 py-2 rounded-full shadow mr-4">
            <i className="fa fa-map-marker-alt text-xl"></i>
          </div>
          <div className="flex flex-col justify-between ">
            <span className="font-bold">{address.name}</span>
            <span>
              {address.street}, {address.city}
            </span>
            <span>
              {address.state}, {address.zipCode}
            </span>
            <span>{address.country}</span>
            <span className="text-sm t mt-1">
              Phone: {address.phoneNo}
            </span>
          </div>
        </div>
      </div>
    </Link>
  ));
};

export default UserAddresses;

