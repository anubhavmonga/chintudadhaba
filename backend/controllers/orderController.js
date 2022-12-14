import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Order from "../models/orderModel.js";
import Table from "../models/tableModel.js";

// @desc create new order
// @route POST /api/orders/
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    address,
    paymentMethod,
    itemsPrice,
    totalPrice,
    orderWay,
    tableReserved,
  } = req.body;

  if (tableReserved !== null) {
    const table = await Table.find({ name: tableReserved });
    const data = { ...table };
    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error("no order items");
    } else {
      const order = new Order({
        orderItems,
        user: req.user._id,
        address,
        paymentMethod,
        itemsPrice,
        totalPrice,
        orderWay,
        tableReserved: data[0]._id,
      });

      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    }
  } else {
    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error("no order items");
    } else {
      const order = new Order({
        orderItems,
        user: req.user._id,
        address,
        paymentMethod,
        itemsPrice,
        totalPrice,
        orderWay,
        tableReserved: null,
      });

      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    }
  }
});

// @desc Get order by ID
// @route GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not Found");
  }
});

// @desc Update order to paid
// @route PUT /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    if (req.body.id && req.body.payer.email_address) {
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };
    } else {
      order.paymentResult = {
        id: new mongoose.Types.ObjectId(),
        status: req.body.status,
        update_time: req.body.update_time,
      };
    }
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not Found");
  }
});
// @desc Update order to delivered
// @route PUT /api/orders/:id/deliver
// @access Private
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not Found");
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// @desc    Get All orders
// @route   GET /api/orders/allorders
// @access  Private
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({});
  res.json(orders);
});

export {
  addOrderItems,
  getOrderById,
  getMyOrders,
  updateOrderToPaid,
  getAllOrders,
  updateOrderToDelivered,
};
