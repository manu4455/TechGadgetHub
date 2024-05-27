"use client";

import Link from "next/link";
import React, { useContext, useEffect } from "react";
import CustomPagination from "../layouts/CustomPagination";
import OrderContext from "@/context/OrderContext";
import { toast } from "react-toastify";
import { PencilAltIcon, TrashIcon, PlusIcon } from '@heroicons/react/outline'


const Orders = ({ orders }) => {
  const { deleteOrder, error, clearErrors } = useContext(OrderContext);


  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [error]);

  const deleteHandler = (id) => {
    deleteOrder(id);
  };

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <h1 className="text-3xl my-5 ml-4 font-bold">Total Orders ({orders?.ordersCount})</h1>
      <table className="w-full text-sm text-gray-800">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3">ID</th>
            <th className="px-6 py-3">Deliver to</th>
            <th className="px-6 py-3">Order By</th>
            <th className="px-6 py-3">Product</th>
            <th className="px-6 py-3">Amount Paid</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders?.orders?.map((order) => (
            <tr className="bg-white" key={order._id}>
              <td className="px-6 py-4">{order._id}</td>
              <td className="px-6 py-4">
                {order.shippingInfo ? (
                  <>
                    {order.shippingInfo.street}, {order.shippingInfo.city}, {order.shippingInfo.country}
                  </>
                ) : (
                  "Address not found"
                )}
              </td>
              <td className="px-6 py-4 flex items-center">
                {order.user ? (
                  <>
                    <img
                      src={order?.user?.avatar?.url}
                      alt={order.user.name}
                      className="w-10 h-10 rounded-full mr-2"
                    />
                    {order.user.name}
                  </>
                ) : (
                  "User not found"
                )}
              </td>
              <td className="px-6 py-4">
                {order.orderItems.map((item) => (
                  <div key={item.product._id} className="flex items-center mb-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded mr-2"
                    />
                    {item.name}
                  </div>
                ))}
              </td>
              <td className="px-6 py-4">Rs. {order.paymentInfo.amountPaid}</td>
              <td className="px-6 py-4">{order.orderStatus}</td>
              <td className="px-6 py-4">
                {/* <div className="flex">
                <Link
                  href={`/admin/orders/${order?._id}`}
                  className="text-yellow-600 hover:text-yellow-700 mr-2"
                >
                  <i className="fa fa-pencil" aria-hidden="true"></i>
                </Link>
                <a
                  className="text-red-600 hover:text-red-700 cursor-pointer"
                  onClick={() => deleteHandler(order?._id)}
                >
                  <i className="fa fa-trash" aria-hidden="true"></i>
                </a>
              </div> */}
                <div className="flex items-center">
                  <Link href={`/admin/orders/${order?._id}`} className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded mr-2">
                    <PencilAltIcon className="h-5 w-5 mr-1" />
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteHandler(order?._id)}
                    className="inline-flex items-center bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded focus:outline-none">
                    <TrashIcon className="h-5 w-5 mr-1" />
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <CustomPagination resPerPage={orders?.resPerPage} productsCount={orders?.ordersCount} />
    </div>
  );
};

export default Orders;

