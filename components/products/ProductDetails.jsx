'use client'
import React, { useContext, useRef, useEffect, useState } from 'react';
import StarRatings from 'react-star-ratings';
import BreadCrumbs from '../layouts/BreadCrumbs';
import CartContext from '@/context/CartContext';
import NewReview from '../review/NewReview';
import OrderContext from '@/context/OrderContext';
import Reviews from '../review/Reviews';
import AuthContext from '@/context/AuthContext';
import { useColorMode } from '@chakra-ui/react';
import { toast } from 'react-toastify';

const ProductDetails = ({ product }) => {


  const { canUserReview, canReview } = useContext(OrderContext);
  const { addItemToCart, cart } = useContext(CartContext);
  const { user } = useContext(AuthContext)
  const imgRef = useRef(null);

  const initialSpecs = Object.entries(product?.specs || {}).map(([key, value]) => ({ key, value }));
  const [specs, setSpecs] = useState(initialSpecs);

  useEffect(() => {
    canUserReview(product?._id);
  }, [product?._id]);

  const setImgPreview = (url) => {
    imgRef.current.src = url;
  };
  const isProductInCart = (productId) => {
    return cart.cartItems.some(item => item.product === productId);
  };
  const inStock = product?.stock > 0;

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
    <>
      <BreadCrumbs breadCrumbs={[{ name: 'Home', url: '/' }, { name: 'Shop', url: '/Filter' }, { name: `${product?.name.substring(0, 100)}...`, url: `/product/${product._id}` }]} />
      <section className=" py-10">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-5">
            {/* Image Gallery */}
            <aside className="lg:col-span-1">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img
                  ref={imgRef}
                  className="object-cover w-full h-auto transition duration-300 ease-in-out transform hover:scale-105"
                  src={product?.images[0]?.url || "/images/default_product.png"}
                  alt="Product Image"
                />
              </div>
              <div className="mt-4 flex justify-center gap-2">
                {product?.images?.map((img, index) => (
                  <button
                    key={index}
                    className="w-16 h-16 border border-gray-200 rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => setImgPreview(img.url)}
                  >
                    <img
                      src={img.url}
                      alt={`Thumbnail ${index}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </aside>

            {/* Product Details */}
            <main className="lg:col-span-2">
              <h1 className="text-4xl font-bold  mb-2">{product?.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <StarRatings
                  rating={product?.ratings}
                  starRatedColor="#facc15"
                  numberOfStars={5}
                  starDimension="24px"
                  starSpacing="2px"
                  name="rating"
                />
                <span className="text-sm font-medium ">({product.ratings.toFixed(1)})</span>
              </div>
              <p className="text-xl  mb-3">{product?.description}</p>
              <p className="text-2xl font-semibold  mb-4">₹{product?.price}</p>
              <button
                className={`px-6 py-2  font-semibold rounded-full shadow transition duration-300 ease-in-out  ${inStock ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'}`}
                onClick={addToCartHandler}
                disabled={!inStock}
              >
                <i className="fas fa-shopping-cart mr-2"></i> Add to Cart
              </button>
              <div className="mt-6">
                <h3 className="font-semibold ">Product Details</h3>
                <ul className="mt-2">
                  <li className="">Stock: <span className={`${inStock ? 'text-green-500' : 'text-red-500'}`}>{inStock ? 'In Stock' : 'Out of Stock'}</span></li>
                  {/* <li className="">Category: {product?.category?.name}</li> */}
                  <li className="">Seller: {product?.seller}</li>
                  <li className="">Specifications:
                    <ul>
                      
                      {specs.map((spec, index) => (
                        <li key={index}>{spec.key}: {spec.value}</li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </div>
            </main>
          </div>
          {canReview && <NewReview product={product} />}
          <hr className="my-8" />
          <Reviews reviews={product?.reviews} />
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
