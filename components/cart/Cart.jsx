"use client";

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import CartContext from "@/context/CartContext";
import AuthContext from "@/context/AuthContext";

const Cart = () => {
  const { addItemToCart, deleteItemFromCart, cart, saveOnCheckout } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const [userCartItems, setUserCartItems] = useState([]);

  useEffect(() => {
    if (user && cart.cartItems) {
      const filteredItems = cart.cartItems.filter(item => item.userId === user._id);
      setUserCartItems(filteredItems);
    }
  }, [user, cart.cartItems]);

  const increaseQty = (cartItem) => {
    const newQty = cartItem?.quantity + 1;
    if (newQty > Number(cartItem.stock)) return;
    addItemToCart({ ...cartItem, quantity: newQty });
  };

  const decreaseQty = (cartItem) => {
    const newQty = cartItem?.quantity - 1;
    if (newQty <= 0) return;
    addItemToCart({ ...cartItem, quantity: newQty });
  };

  const amountWithoutTax = userCartItems.reduce(
    (acc, item) => acc + item.quantity * item.price, 0
  );
  const taxAmount = (amountWithoutTax * 0.05).toFixed(2);
  const totalAmount = (Number(amountWithoutTax) + Number(taxAmount)).toFixed(2);

  const checkoutHandler = () => {
    saveOnCheckout({ amount: amountWithoutTax, tax: taxAmount, totalAmount });
  };

  return (
    <>
      <section className="py-5 sm:py-7 ">
  <div className="container max-w-screen-xl mx-auto px-4">
    <div className="flex flex-col sm:flex-row justify-between items-center">
      <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-0 text-gray-800">
         My Cart       
      </h2>
      
    </div>
  </div>
</section>

      {userCartItems.length > 0 && (
        <section className="py-5 ">
          <div className="container max-w-screen-xl mx-auto px-4 ">
            <div className="flex flex-col md:flex-row gap-4">
              <main className="md:w-3/4">
                <article className="border border-gray-200 rounded-2xl shadow-sm  mb-5 p-3 lg:p-5">
                  {userCartItems.map((cartItem) => (
                    <div key={cartItem.product}>
                      <div className="flex flex-wrap lg:flex-row gap-5 mb-4">
                        <div className="w-full lg:w-2/5 xl:w-2/4">
                          <figure className="flex leading-5">
                            <div>
                              <div className="block w-16 h-16 rounded border border-gray-200 overflow-hidden">
                                <img src={cartItem.image} alt={cartItem.name} />
                              </div>
                            </div>
                            <figcaption className="ml-3">
                              <p>
                                <a href={`/product/${cartItem.product}`} className="hover:text-blue-600">
                                  {cartItem.name}
                                </a>
                              </p>
                              <p className="mt-1 text-gray-400">
                                Seller: {cartItem.seller}
                              </p>
                            </figcaption>
                          </figure>
                        </div>
                        <div className="w-24">
                          <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                            <button
                              data-action="decrement"
                              className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                              onClick={() => decreaseQty(cartItem)}
                            >
                              <span className="m-auto text-2xl font-thin">−</span>
                            </button>
                            <input
                              type="number"
                              className="focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black md:text-base cursor-default flex items-center text-gray-900 outline-none custom-input-number"
                              name="custom-input-number"
                              value={cartItem.quantity}
                              readOnly
                            ></input>
                            <button
                              data-action="increment"
                              className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                              onClick={() => increaseQty(cartItem)}
                            >
                              <span className="m-auto text-2xl font-thin">+</span>
                            </button>
                          </div>
                        </div>
                        <div>
                          <div className="leading-5">
                            <p className="font-semibold not-italic">
                              Rs.{(cartItem.price * cartItem.quantity).toFixed(2)}
                            </p>
                            <small className="text-gray-400">
                              Rs.{cartItem.price} / per item
                            </small>
                          </div>
                        </div>
                        <div className="flex-auto">
                          <div className="float-right">
                            <button
                              className="px-4 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
                              onClick={() => deleteItemFromCart(cartItem.product, cartItem.userId)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                      <hr className="my-4" />
                    </div>
                  ))}
                </article>
              </main>
              <aside className="md:w-1/4">
                <article className="border border-gray-200 rounded-2xl shadow-sm  mb-5 p-3 lg:p-5">
                <p className="text-xl font-semibold mb-2 ">Payment Details</p>
                  <ul className="mb-5">
                    <li className="flex justify-between mb-1">
                      <span>Amount before Tax:</span>
                      <span>Rs.{amountWithoutTax}</span>
                    </li>
                    <hr className="my-4" />
                   
                    <li className="flex justify-between mb-1">
                      <span>Total Units:</span>
                      <span className="text-green-500">
                        {userCartItems.reduce((acc, item) => acc + item.quantity, 0)} (Units)
                      </span>
                    </li>
                    <hr className="my-4" />
                    <li className="flex justify-between mb-1">
                      <span>GST(5%):</span>
                      <span>Rs.{taxAmount}</span>
                    </li>
                    <li className="text-lg font-bold border-t flex justify-between mt-3 pt-3">
                      <span>Total price:</span>
                      <span>Rs.{totalAmount}</span>
                    </li>
                  </ul>
                  <button
                    className="px-4 py-3 mb-2 inline-block text-lg w-full text-center font-medium text-white bg-green-600 border border-transparent rounded-2xl hover:bg-green-700 cursor-pointer"
                    onClick={checkoutHandler}
                  >
                    Continue
                  </button>
                  
                  <Link
                    href="/Filter"
                    className="px-4 py-3 inline-block text-lg w-full text-center font-medium text-green-600 bg-white shadow-sm border border-gray-200 rounded-2xl hover:bg-gray-100 hover:border-gray-700"
                  >
                    Back to shop
                  </Link>
                </article>
              </aside>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Cart;
