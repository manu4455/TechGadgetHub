"use client";

import { useRouter } from "next/navigation";
import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";


const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const router = useRouter();

  useEffect(() => {
    setCartToState();
  }, []);

  const setCartToState = () => {
    setCart(
      localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : []
    );
  };

  const addItemToCart = async ({
    product,
    name,
    price,
    image,
    stock,
    seller,
    quantity = 1,
    userId,
  }) => {
    if (!userId) {
      // Optionally handle unauthenticated users by redirecting or showing an error message
     toast.warn("You Must Be Logged in To Add Items To Cart")
      return; // Exit the function if there is no user ID
    }
  
    const item = {
      product,
      name,
      price,
      image,
      stock,
      seller,
      quantity,
      userId, // Add the user ID to each cart item
    };
  
    const isItemExist = cart?.cartItems?.find(
      (i) => i.product === item.product && i.userId === userId
    );
  
    let newCartItems;
  
    if (isItemExist) {
      newCartItems = cart?.cartItems?.map((i) =>
        i.product === isItemExist.product && i.userId === userId ? item : i
      );
    } else {
      newCartItems = [...(cart?.cartItems || []), item];
    }
  
    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
    setCartToState();
  };

  const deleteItemFromCart = (productId, userId) => {
    const newCartItems = cart?.cartItems?.filter(item => item.product !== productId || item.userId !== userId);
  
    localStorage.setItem("cart", JSON.stringify({ ...cart, cartItems: newCartItems }));
    setCartToState();
  };

  const saveOnCheckout = ({ amount, tax, totalAmount }) => {
    const checkoutInfo = {
      amount,
      tax,
      totalAmount,
    };

    const newCart = { ...cart, checkoutInfo };

    localStorage.setItem("cart", JSON.stringify(newCart));
    setCartToState();
    router.push("/shipping");
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCartToState();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItemToCart,
        saveOnCheckout,
        deleteItemFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
