import asyncHandler from "express-async-handler";
import { subMonths } from "date-fns";
import User from "../modals/User";
import Order from "../modals/Order";
import Product from "../modals/Product";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
import agenda from "../config/agenda";

import type { Request, Response } from "express";

dotenv.config();

if (process.env.SENDGRID_API_KEY)
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * @desc    Create new order
 * @route   POST /api/orders
 * @access  Private
 * @param   {object} req.query
 * @param   {object} res
 * @returns {object} { msg ,order}
 */

const addOrderItems = asyncHandler(async (req: Request, res: Response) => {
  const ag = await agenda;
  ag.start();
  try {
    const {
      orderItems,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paymentResult,
      shippingAddress,
    } = req.body;
    const user = req.user.id;
    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error("No order items");
    } else {
      orderItems.forEach(async (item) => {
        const product = await Product.findById(item.product);
        if (!product || product.countInStock < item.qty) {
          res.status(400);
          throw new Error("Product not found");
        }
      });

      const order = await Order.create({
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

      await User.findOneAndUpdate(
        { _id: user },
        { cart: [] },
        { new: true }
      ).lean();

      const createdOrder = await order.save();

      ag.schedule(new Date(Date.now() + 1000), "place order", {
        order: createdOrder,
        email: req.userModal.email,
      });
      ag.schedule(new Date(Date.now() + 1000), "update product", {
        order: order,
      });

      res.status(201);
      res.json({
        msg: "Order has Been Placed and Mail has been sent with details",
        order: createdOrder,
      });
    }
  } catch (error) {
    if (error.message === "Product out of stock") {
      ag.schedule(
        new Date(Date.now() + 1000),
        "remove out of stock from cart",
        {
          orderItems: req.body.orderItems,
        }
      );
    }
    res.status(400);
    throw new Error("Order Server error" + error);
  }
});

/**
 * @desc    Get order by ID
 * @route   GET /api/order
 * @access  Private
 * @param   {object} req.params.id
 * @param   {object} res
 */

const getOrder = asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "name email")
    .lean();

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

/**
 * @desc    Get order by ID
 * @route   GET /api/orders
 * @access  Private
 * @param   {object} req.user.id
 * @param   {object} res
 */

const getUserOrders = asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.find({ user: req.user.id })
    .select("paymentMethod totalPrice isDelivered createdAt")
    .lean();

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Orders not found");
  }
});

/**
 * @desc    Get All orders
 * @route   GET /api/admin/orders
 * @access  Admin
 * @param   {object} res
 */

const getAllOrders = asyncHandler(async (req: Request, res: Response) => {
  let sort = "-createdAt";
  if (req.query.sort && typeof req.query.sort === "string") {
    const sortBy = req.query.sort.split(",").join(" ");
    sort = sortBy;
  }
  const pageSize = JSON.parse(req.query.perPage as string);
  const page = JSON.parse(req.query.page as string);

  const order = await Order.find({})
    .select(
      req.params.select || "paymentMethod totalPrice isDelivered createdAt"
    )
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort(sort)
    .populate("user", ["name", "email"])
    .lean();

  const orderCount = await Order.countDocuments();
  res.set("x-total-count", orderCount.toString());
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Orders not found");
  }
});

/**
 * @desc    Get All orders of last month
 * @route   GET /api/admin/orders/lastMonth
 * @access  Admin
 * @param   {object} res
 */

const getLastMonth = asyncHandler(async (req: Request, res: Response) => {
  const CurrentDay = new Date();
  const LastMonth = subMonths(CurrentDay, 1);

  const order = await Order.find({
    createdAt: {
      $gte: LastMonth,
    },
  })
    .select(
      req.params.select || "paymentMethod totalPrice isDelivered createdAt"
    )
    .populate("user", ["name", "email"])
    .lean();

  const orderCount = await Order.countDocuments();
  res.set("x-total-count", orderCount.toString());
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Orders not found");
  }
});

/**
 * @desc    Update Order to delivered
 * @route   Put /api/orders
 * @access  Admin
 * @param   {object} req.params.id
 * @param   {object} res
 */

const UpdateOrder = asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        ...req.body,
        deliveredAt: new Date(),
      },
    },
    { new: true }
  );

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }
  res.json({
    msg: "Order is Delivered",
  });
});

/**
 * @desc    Delete Order to delivered
 * @access  Admin
 * @param   {object} req.params.id
 * @param   {object} res
 */

const DeleteOrder = asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.findByIdAndDelete(req.params.id).lean();
  if (order) {
    res.json({
      msg: "Order has been deleted",
    });
  } else {
    res.status(404);
    throw new Error("Orders not found");
  }
});

/**
 * @desc    Delete Multiple Orders
 * @access  Admin
 * @param   {object} req.query.ids
 * @param   {object} res
 */

const DeleteMany = asyncHandler(async (req: Request, res: Response) => {
  const Ids = req.query.ids;
  // build array of ids
  const IdsArray = typeof Ids === "string" && Ids.split(",");
  const orders = await Order.deleteMany({
    _id: { $in: IdsArray },
  }).lean();
  if (orders) {
    res.json({
      msg: "Orders have been deleted",
      ids: IdsArray,
    });
  } else {
    res.status(404);
    throw new Error("Orders not found");
  }
});

export {
  addOrderItems,
  getUserOrders,
  getOrder,
  getLastMonth,
  getAllOrders,
  UpdateOrder,
  DeleteOrder,
  DeleteMany,
};
