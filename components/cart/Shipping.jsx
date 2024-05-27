"use client";

import CartContext from "@/context/CartContext";
import axios from "axios";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import BreadCrumbs from "../layouts/BreadCrumbs";
import AuthContext from "@/context/AuthContext";
import { useRouter } from "next/navigation";




const Shipping = ({ addresses }) => {
  const { cart, clearCart} = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const [shippingInfo, setShippinInfo] = useState("");

  const getUserCartItems = () => {
    return (cart.cartItems || []).filter(item => item.userId === user?._id);
  };

  const userCartItems = getUserCartItems();

  const setShippingAddress = (address) => {
    setShippinInfo(address._id);
  };

  const makePayment = async () => {
   
    const res = await initializeRazorpay();
    if (!shippingInfo) {
      return toast.error("Please select your shipping address");
    }

    if (!res) {
      toast.error("Razorpay SDK Failed to load");
      return;
    }


    // Make API call to the serverless API
    const requestData = {
      items: userCartItems,
      shippingInfo: shippingInfo,
    };

    const response = await fetch("/api/orders/checkout_session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    const data = await response.json();

   

    
   
    var options = {
      key: process.env.RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      name: "Tech Gadget Hub",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: "Thankyou for your test donation",
      image: "https://manuarora.in/logo.png",
      handler: async (response) => {
        try {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
          const result = await axios.post("/api/orders/webhook", {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
            shippingInfo,
            items: userCartItems,
            amount: data.amount, // Ensure totalAmount includes the tax calculation
            user, // Assuming user info is available on the client-side
          });
          
         

          if (result.data.success) {
            toast.success("Payment successful");
            clearCart();
            
            
            router.push('/me/orders');
          } else {
            toast.error("Payment verification failed");
          }
        } catch (error) {
          console.error(error);
          toast.error("Payment verification failed");
        }
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: user.phoneNo,
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      // document.body.appendChild(script);

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };
  const breadCrumbs = [
    { name: "Home", url: "/" },
    { name: "Cart", url: "/cart" },
    { name: "Order", url: "" },
  ];

  return (
    <div>
      <BreadCrumbs breadCrumbs={breadCrumbs} />
      <section className="py-10 ">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 lg:gap-8">
            <main className="md:w-2/3">
              <article className="border border-gray-200  shadow-sm  p-4 lg:p-6 mb-5 rounded-2xl">
                <h2 className="text-xl font-semibold mb-5">Shipping information</h2>

                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  {addresses?.map((address) => (
                    <label
                      key={address._id}
                      className="flex p-3 border border-gray-200 rounded-2xl hover:border-blue-400  cursor-pointer"
                      onClick={() => setShippingAddress(address)}
                    >
                      <span>
                        <input
                          name="shipping"
                          type="radio"
                          className="h-4 w-4 mt-1"
                          checked={shippingInfo === address._id}
                          readOnly
                        />
                      </span>
                      <p className="ml-2">
                        <span>{address.street}</span>
                        <small className="block text-sm ">
                          {address.city}, {address.state}, {address.zipCode}
                          <br />
                          {address.country}
                          <br />
                          {address.phoneNo}
                        </small>
                      </p>
                    </label>
                  ))}
                </div>

                <Link
                  href="/me/address/new"
                  className="px-4 py-2 inline-block text-blue-600 border border-gray-300 rounded-2xl hover:bg-gray-100 "
                >
                  <i className="mr-1 fa fa-plus"></i> Add new address
                </Link>

                <div className="flex justify-end space-x-2 mt-10">
                  <Link
                    href="/cart"
                    className="px-5 py-2 inline-block  rounded-2xl  shadow-sm border border-gray-200  hover:bg-gray-100 hover:text-blue-600 hover:border-gray-400"
                  >
                    Back
                  </Link>
                  
                  <button
                  className="px-5 py-2 inline-block bg-gradient-to-r from-green-300 to-green-500 border border-transparent rounded-full hover:border-gray-400 cursor-pointer"
                    onClick={makePayment}>
                    Make Payment

                  </button>
                </div>
              </article>
            </main>
            <aside className="md:w-1/3">
              <article className="" style={{ maxWidth: "350px" }}>
                <h2 className="text-lg font-semibold mb-3">Summary</h2>
                <ul>
                  <li className="flex justify-between mb-1">
                    <span>Amount:</span>
                    <span>Rs.{cart?.checkoutInfo?.amount}</span>
                  </li>
                  <li className="flex justify-between mb-1">
                    <span>Est TAX:</span>
                    <span>Rs.{cart?.checkoutInfo?.tax}</span>
                  </li>
                  <li className="border-t flex justify-between mt-3 pt-3">
                    <span>Total Amount:</span>
                    <span className=" font-bold">
                      Rs.{cart?.checkoutInfo?.totalAmount}
                    </span>
                  </li>
                </ul>

                <hr className="my-4" />

                <h2 className="text-lg font-semibold mb-3">Items in cart</h2>

                {userCartItems?.map((item) => (
                  <figure key={item.product} className="flex items-center mb-4 leading-5">
                    <div>
                      <div className="block relative w-20 h-20 rounded p-1 border border-gray-200">
                        <img
                          width="50"
                          height="50"
                          src={item.image}
                          alt={item.name}
                        />
                        <span className="absolute -top-2 -right-2 w-6 h-6 text-sm text-center flex items-center justify-center text-white bg-gray-400 rounded-full">
                          {item.quantity}
                        </span>
                      </div>
                    </div>
                    <figcaption className="ml-3">
                      <p>{item.name.substring(0, 50)}</p>
                      <p className="mt-1 ">
                        Total: Rs.{item.quantity * item.price}
                      </p>
                    </figcaption>
                  </figure>
                ))}
              </article>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shipping;
