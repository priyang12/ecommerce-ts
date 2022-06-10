const asyncHandler = require("express-async-handler");

const User = require("../modals/User");

const Product = require("../modals/Product");

const Order = require("../modals/order");
const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
const agenda = require("../config/agenda");

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  try {
    const {
      orderItems,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      payment,
    } = req.body;
    const user = req.user.id;
    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error("No order items");
    } else {
      const paymentResult = {
        id: payment.id,
        status: payment.status,
        update_time: payment.update_time,
        email_address: payment.payer.email_address,
      };
      const shippingAddress = {
        address: req.body.shippingAddress.homeAddress,
        city: req.body.shippingAddress.city,
        postalcode: req.body.shippingAddress.postalCode,
      };
      const order = new Order({
        user: user,
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentResult,
        paidAt: Date.now(),
      });

      await User.findOneAndUpdate({ _id: user }, { cart: [] }, { new: true });

      orderItems.forEach((item) => {
        updateProduct(item);
      });

      const createdOrder = await order.save();

      const ag = await agenda;

      ag.start();

      ag.schedule(new Date(Date.now() + 1000), "place order", {
        order: createdOrder,
        email: req.userModal.email,
      });

      res.status(201);
      res.json({
        msg: "Order has Been Placed and Mail has been sent with details",
        order: createdOrder,
      });
    }
  } catch (error) {
    res.status(400);

    throw new Error("Order Server error" + error);
  }
});

const updateProduct = async (item) => {
  const newProduct = await Product.findById(item.product._id).select(
    "name countInStock image price"
  );
  newProduct.countInStock = newProduct.countInStock - item.qty;

  await newProduct.save();
};

// @desc    Get order by ID
// @route   GET /api/order
// @access  Private
const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Get order by ID
// @route   GET /api/orders
// @access  Private
const getUserOrders = asyncHandler(async (req, res) => {
  const order = await Order.find({ user: req.user.id }).select(
    "paymentMethod totalPrice isDelivered"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Orders not found");
  }
});

// @desc    Get All orders
// @route   GET /api/orders
// @access  Admin
const getAllOrders = asyncHandler(async (req, res) => {
  const order = await Order.find({})
    .select("paymentMethod totalPrice isDelivered ")
    .populate("user", ["name", "email"]);
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Orders not found");
  }
});

// @desc    Update Order to delivered
// @route   Put /api/orders
// @access  Admin
const UpdateOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  try {
    const Del = req.body.isDelivered;
    order.isDelivered = Del;
    order.save();
    res.json({
      msg: "Order is Delivered",
    });
  } catch {
    res.status(404);
    throw new Error("Orders not found");
  }
});

// @desc    Update Order to delivered
// @route   Put /api/orders
// @access  Admin
const DeleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Orders not found");
  }
});

module.exports = {
  addOrderItems,
  getUserOrders,
  getOrder,
  getAllOrders,
  UpdateOrder,
  DeleteOrder,
};
