import React from "react";
import Image from "next/image";
import Link from "next/link";

const OrderItem = ({ order }) => {
 
  return (
    <article className="p-3 lg:p-5 mb-5  border border-gray-300 rounded-2xl">
      <header className="lg:flex justify-between mb-4">
        <div className="mb-4 lg:mb-0">
          <p className="font-semibold">
            <span>Order ID: {order?._id} </span>
            {order?.orderStatus == "Processing" ? (
              <span className="text-red-500">
                • {order?.orderStatus.toUpperCase()}
              </span>
            ) : (
              <span className="text-green-500">
                • {order?.orderStatus.toUpperCase()}
              </span>
            )}
          </p>
          <p className="">{order?.createAt?.substring(0, 10)} </p>
        </div>
      </header>
      <div className="grid md:grid-cols-3 gap-2">
        <div>
          <p className=" mb-1">Person</p>
          <ul className="">
            <li>{order?.user?.name}</li>
            <li>Phone: {order?.shippingInfo?.phoneNo}</li>
            <li>Email: {order?.user?.email}</li>
          </ul>
        </div>
        <div>
          <p className=" mb-1">Delivery address</p>
          <ul className="">
            <li>{order?.shippingInfo?.street}</li>
            <li>
              {order?.shippingInfo?.city}, {order?.shippingInfo?.state},{" "}
              {order?.shippingInfo?.zipCode}
            </li>
            <li>{order?.shippingInfo?.country}</li>
          </ul>
        </div>
        <div>
          <p className=" mb-1">Payment</p>
          <ul className="">
            <li className="text-green-400">
              {order?.paymentInfo?.status?.toUpperCase()}
            </li>
            <li>Tax paid: Rs.{order?.paymentInfo?.taxPaid}</li>
            <li>Total paid: Rs.{order?.paymentInfo?.amountPaid}</li>
          </ul>
        </div>
      </div>

      <hr className="my-4" />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {order?.orderItems?.map((item) => (
          <figure className="flex flex-row mb-4">
            <div>
              <div className="block w-20 h-20 rounded border border-gray-200 overflow-hidden p-3">
                <Image
                  src={item?.image}
                  height="60"
                  width="60"
                  alt={item.name}
                />
              </div>
            </div>
            <figcaption className="ml-3">
              
              <Link  className="hover:text-green-500" href={`/product/${item.product}`}>
              <p>{item.name.substring(0, 35)}</p>

              </Link>
              <p className="mt-1 font-semibold">
                {item.quantity}x = Rs.{item.price * item.quantity}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </article>
  );
};

export default OrderItem;
