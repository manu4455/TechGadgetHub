import Product from "../models/product";
import APIFilters from "../utils/APIFilters";
import { cloudinary, uploads } from "../utils/cloudinary";
import fs from "fs";
import ErrorHandler from "../utils/errorHandler";
import Category from "../models/category";



import algoliasearch from 'algoliasearch';

// Initialize the Algolia client
const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_API_KEY);
const index = client.initIndex(process.env.ALGOLIA_INDEX_NAME);



export const newProduct = async (req, res, next) => {
  req.body.user = req.user._id;

  const product = await Product.create(req.body);

  
  res.status(201).json({
    product,
  });
};


export const getProducts = async (req, res, next) => {

  fillIndex()
  const resPerPage = 20;
  const productsCount = await Product.countDocuments();

  const apiFilters = new APIFilters(Product.find(), req.query)
    .search()
    .filter();

  let products = await apiFilters.query;
  const filteredProductsCount = products.length;

  apiFilters.pagination(resPerPage);

  products = await apiFilters.query.clone();


  

  res.status(200).json({
    productsCount,
    resPerPage,
    filteredProductsCount,
    products,
  });
};

export const fillIndex = async (req, res, next) => {
  
  try {
    const products = await Product.find();
    const productYo = await Promise.all(products.map(async (product) => {
      const category = await Category.findById(product.category);
      return { ...product.toObject(), category: { _id: category._id, name: category.name, description: category.description } };
    }));
   
  
  const formattedProducts = productYo.map(product => ({
    objectID: product._id, // Algolia requires an objectID
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
    specs: product.specs,
    ...product._doc  // Assuming there are additional fields to include
  }));

    await index.saveObjects(formattedProducts);
    // console.log('Products indexed to Algolia successfully');
  } catch (error) {
    console.error('Error indexing products to Algolia:', error);
   
  }
}

export const getProduct = async (req, res, next) => {
  
  try {
    const product = await Product.findById(req.query.id).populate({
      path: 'reviews.user',
      select: 'avatar name', // Select only the fields you need
    });
  
    if (!product) {
      return next(new ErrorHandler("Product not found.", 404));
    }
    
  
    res.status(200).json({
      product,
    });
  } catch (error) {
    console.log(error)
  }
};

export const uploadProductImages = async (req, res, next) => {
  let product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found.", 404));
  }

  const uploader = async (path) => await uploads(path, "TechYo/products");

  const urls = [];
  const files = req.files;

  for (const file of files) {
    const { path } = file;
    const imgUrl = await uploader(path);
    urls.push(imgUrl);
    fs.unlinkSync(path);
  }

  product = await Product.findByIdAndUpdate(req.query.id, {
    images: urls,
  });

  res.status(200).json({
    data: urls,
    product,
  });
};

export const updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found.", 404));
  }

  product = await Product.findByIdAndUpdate(req.query.id, req.body);

  res.status(200).json({
    product,
  });
};

export const deleteProduct = async (req, res, next) => {
  let product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found.", 404));
  }

  // Deleting images associated with the product
  for (let i = 0; i < product.images.length; i++) {
    const res = await cloudinary.v2.uploader.destroy(
      product.images[i].public_id
    );
  }

  await product.deleteOne();

  //delte product in algolia
  await index.deleteObject(product._id.toString());

  res.status(200).json({
    success: true,
  });
};

export const createProductReview = async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req?.user?._id,
    rating: Number(rating),
    comment,
  };

  let product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHandler("Product not found.", 404));
  }

  const isReviewed = product?.reviews?.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product?.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product?.reviews.push(review);
  }

  product.ratings =
    product?.reviews?.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product?.save();

  res.status(200).json({
    success: true,
  });
};

export const addMultipleProducts = async (req, res, next) => {


  const products = req.body.map(product => ({
    ...product,
    user: req.user ? req.user._id : null // Attach user ID if available, otherwise null
  }));


  try {
    const productNames = products.map(product => product.name);

    const existingProducts = await Product.find({
      name: { $in: productNames }
    });

    const existingNames = new Set(existingProducts.map(product => product.name));
    const productsToInsert = products.filter(product => !existingNames.has(product.name));


    let insertedProducts = [];
    if (productsToInsert.length > 0) {
      insertedProducts = await Product.insertMany(productsToInsert);
    }
   


    res.status(201).json({
      success: true,
      message: `${insertedProducts.length} products added successfully, ${products.length - insertedProducts.length} duplicates skipped`,
      data: insertedProducts
    });
  } catch (error) {
    console.error('Failed to add products:', error);
    next(error);
  }
};
