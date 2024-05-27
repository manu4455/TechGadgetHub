"use client";
import theme from "./theme";

import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { OrderProvider } from "@/context/OrderContext";
import { ProductProvider } from "@/context/ProductContext";
import { SessionProvider } from "next-auth/react";
import { CategoryProvider } from "@/context/CategoryContext";
import { ChakraBaseProvider, ChakraProvider } from "@chakra-ui/react";
import { TestimonialProvider } from "@/context/TestimonialContext";



import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function GlobalProvider({ children }) {
  return (
    <>
      <ToastContainer position="bottom-right" />
      <AuthProvider>
        <CartProvider>
          <OrderProvider>
            <ProductProvider>
              
              <CategoryProvider>
              <ChakraBaseProvider>
              <ChakraProvider theme={theme}>
              <TestimonialProvider>
              <SessionProvider>{children}</SessionProvider>

              </TestimonialProvider>
             
              </ChakraProvider>
              </ChakraBaseProvider>
              
              

              </CategoryProvider>
            </ProductProvider>
          </OrderProvider>
        </CartProvider>
      </AuthProvider>
    </>
  );
}
