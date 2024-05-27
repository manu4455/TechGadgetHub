
import Order from "../models/order";
import APIFilters from "../utils/APIFilters";
import ErrorHandler from "../utils/errorHandler";
import Razorpay from "razorpay";
import crypto from 'crypto';
import shortid from "shortid";
import Product from "../models/product";

export const getOrders = async (req, res) => {
  try {
    const resPerPage = 5;
    const ordersCount = await Order.countDocuments();

    const apiFilters = new APIFilters(Order.find(), req.query).pagination(
      resPerPage
    );

    const orders = await apiFilters.query.find().populate("shippingInfo user");

    res.status(200).json({
      ordersCount,
      resPerPage,
      orders,
    });
  } catch (error) {
    console.error("Error getting orders:", error);
    res.status(500).json({ error: "Failed to get orders" });
  }
};

export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.query.id).populate(
      "shippingInfo user"
    );

    if (!order) {
      return next(new ErrorHandler("No Order found with this ID", 404));
    }

    res.status(200).json({
      order,
    });
  } catch (error) {
    console.error("Error getting order:", error);
    res.status(500).json({ error: "Failed to get order" });
  }
};

export const myOrders = async (req, res) => {
  try {
    const resPerPage = 10;
    const ordersCount = await Order.countDocuments();

    const apiFilters = new APIFilters(Order.find(), req.query).pagination(
      resPerPage
    );

    const orders = await apiFilters.query
      .find({ user: req.user._id })
      .populate("shippingInfo user");

    res.status(200).json({
      ordersCount,
      resPerPage,
      orders,
    });
  } catch (error) {
    console.error("Error getting user's orders:", error);
    res.status(500).json({ error: "Failed to get user's orders" });
  }
};

export const updateOrder = async (req, res) => {
  try {
    let order = await Order.findById(req.query.id);

    if (!order) {
      return next(new ErrorHandler("No Order found with this ID", 404));
    }

    order = await Order.findByIdAndUpdate(req.query.id, {
      orderStatus: req.body.orderStatus,
    });

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ error: "Failed to update order" });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    let order = await Order.findById(req.query.id);

    if (!order) {
      return next(new ErrorHandler("No Order found with this ID", 404));
    }

    await order.deleteOne();

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ error: "Failed to delete order" });
  }
};

export const canReview = async (req, res) => {
  try {
    const productId = req.query.productId;

    const orders = await Order.find({
      user: req?.user?._id,
      "orderItems.product": productId,
    });

    let canReview = orders?.length >= 1 ? true : false;

    res.status(200).json({
      canReview,
    });
  } catch (error) {
    console.error("Error checking if user can review:", error);
    res.status(500).json({ error: "Failed to check if user can review" });
  }
};

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const checkoutSession = async (req, res) => {
  const { items, shippingInfo, user } = req.body;

  const orderAmount = calculateOrderAmount(items);

  const options = {
    amount: orderAmount * 100, // Amount in paise
    currency: "INR",
    receipt: shortid.generate(),
  };

  try {
    const response = await razorpay.orders.create(options);
    res.status(200).json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
      items,
      shippingInfo,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ error: "Failed to create Razorpay order" });
  }
};

// Function to calculate the total order amount
const calculateOrderAmount = (items) => {
  let totalAmount = 0;
  items.forEach((item) => {
    totalAmount += item.price * item.quantity ;
  });
  const taxAmount = totalAmount * 0.05; // Calculate 15% tax
  totalAmount += taxAmount; // Add tax to the total amount
  const amountInPaise = Math.round(totalAmount * 100);
  return totalAmount;
};




export const webhook = async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature, shippingInfo, items, user, amount } = req.body;

  const secret = process.env.RAZORPAY_KEY_SECRET;
  const shasum = crypto.createHmac('sha256', secret);
  shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = shasum.digest('hex');

  if (digest === razorpay_signature) {
    // Payment is verified, create the order
    const orderData = {
      paymentInfo: {
        id: razorpay_payment_id,
        status: "captured",
        amountPaid: amount / 100, // Convert paise to INR
        taxPaid: (amount * 0.15) / 100, // Calculate tax amount
      },
      shippingInfo,
      orderItems: items,
      user: user._id, // Assuming you have user information available in the request
      orderStatus: "Processing",
      createdAt: new Date(),
    };

    try {
      const order = await Order.create(orderData);
      console.log("Order created successfully");
      for (const item of items) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { stock: -item.quantity },
        });
      }

      
    

      res.status(201).json({ success: true, order });
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ success: false, error: "Failed to create order" });
    }
  } else {
    res.status(400).json({ success: false, error: "Invalid signature" });
  }
};


