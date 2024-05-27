import React, { useContext } from "react";
import Link from "next/link";
import StarRatings from "react-star-ratings";
import Image from "next/image";
import CartContext from "@/context/CartContext";
import AuthContext from "@/context/AuthContext"; // Assuming you have this context
import { toast } from "react-toastify"
import { Button } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";

const ProductItem = ({ product }) => {
  const { addItemToCart, cart } = useContext(CartContext);
  const inStock = product?.stock >= 1;
  const colorMode = useColorMode();

  // const isProductInCart = (productId) => {
  //   return cart.cartItems.some(item => item.product === productId);
  // };
  const isProductInCart = (productId) => cart.cartItems.some(item => item.product === productId);


  // const getButtonSizeClass = (price) => {
  //   // if (price > 100000) return "text-xs py-1 px-2";  // Smaller button for high prices
  //   if (price > 100000) return "text-sm py-2 px-3";

  //   return "text-base py-2 px-4";  // Default button size
  // };
  // const buttonSizeClass = getButtonSizeClass(product.price);


  const { user } = useContext(AuthContext); // Assuming user context holds the user info

  const addToCartHandler = () => {
    if (!user) {
      toast("You Must Be Logged in To Add Items To Cart")
      return;
    }

    addItemToCart({
      product: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0]?.url || "/images/default_product.png",
      stock: product.stock,
      seller: product.seller,
      userId: user._id // Pass user ID to cart function
    });

    if (isProductInCart(product._id)) {
      toast.info(product.name + " Already exist in your cart");
      return;
    }
    else {
      toast.success(product.name + " is added to Cart")
    }
  };

  return (


    <div className="flex flex-col  gap-2 border border-green-300 shadow-md shadow-green-400 rounded-2xl  justify-center items-center m-2 " style={{ height: '350px', width: '300px' }}>
      <div className="relative h-56 w-full  overflow-hidden p-2 bg-white rounded-2xl">
        <Image
          src={product?.images[0]?.url || "/images/default_product.png"}
          alt={product.name}
          layout="fill"
          objectFit="contain"
          className="transition duration-300 ease-in-out transform hover:scale-105"
        />
      </div>
      <div className="relative w-full flex flex-col overflow-hidden p-2">
        <h3 className="mt-2 text-lg font-medium  overflow-ellipsis overflow-hidden whitespace-nowrap">
          <Link href={`/product/${product._id}`} className="text-lg font-semibold  hover:text-green-800 transition-colors">
            {product.name.substring(0, 20)}...
          </Link>
        </h3>

        <p className="mt-1.5 text-sm ">Rs.{product.price}</p>

        
        <button
          className={`px-6 py-2 mt-2  font-semibold rounded-full shadow  ease-in-out  ${inStock ? ' bg-gradient-to-r from-green-400 via-green-500 to-green-300 hover:from-teal-700 hover:to-green-500 transition-colors duration-300 hover:text-white' : 'bg-gray-400 cursor-not-allowed'}`}
          onClick={addToCartHandler}
          disabled={!inStock}
        >
          <i className="fas fa-shopping-cart mr-2"></i> Add to Cart
        </button>
      </div>
    </div>

  );
};

export default ProductItem;




