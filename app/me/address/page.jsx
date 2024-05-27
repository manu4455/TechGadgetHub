'use client'
import { useEffect, useState } from 'react';
import UserAddresses from '@/components/user/UserAddresses';
import axios from "axios";
import Link from 'next/link';

const AddressPage = () => {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const nextAuthSessionToken = getCookie("next-auth.session-token");
        const { data } = await axios.get(`${process.env.API_URL}/api/address`, {
          headers: {
            Cookie: `next-auth.session-token=${nextAuthSessionToken}`,
          },
        });
        setAddresses(data?.addresses);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, []);

  const getCookie = (name) => {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
  };

  return (
    <>
      <div className='flex flex-col gap-2'>
        <b className='text-xl'>Saved Address</b>
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8'>
          <UserAddresses addresses={addresses} />
        </div>
        <Link href="/me/address/new">
          <button className="px-4 py-3 inline-block w-full bg-green-700 hover:bg-green-500 text-white border mt-3  rounded-xl">
            <i className="mr-1 fa fa-plus"></i> Add new address
          </button>
        </Link>
      </div>
    </>
  );
};

export default AddressPage;


