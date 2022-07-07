import asyncHandler from "express-async-handler";

import User from "../modals/User";

import Order from "../modals/Order";
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
    .select("paymentMethod totalPrice isDelivered")
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
 * @route   GET /api/orders
 * @access  Admin
 * @param   {object} res
 */

const getAllOrders = asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.find({})
    .select("paymentMethod totalPrice isDelivered ")
    .populate("user", ["name", "email"])
    .lean();
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
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }
  const Del = req.body.isDelivered;
  order.isDelivered = Del;
  order.save();
  res.json({
    msg: "Order is Delivered",
  });
});

/**
 * @desc    Update Order to delivered
 * @route   Put /api/orders
 * @access  Admin
 * @param   {object} req.params.id
 * @param   {object} res
 */

const DeleteOrder = asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.findByIdAndDelete(req.params.id).lean();
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Orders not found");
  }
});

export {
  addOrderItems,
  getUserOrders,
  getOrder,
  getAllOrders,
  UpdateOrder,
  DeleteOrder,
};
