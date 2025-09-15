// controllers/orderController.js
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import CustomError from "../utils/customError.js";
import { createPayPalOrder, capturePayPalOrder } from "../utils/paypal.js";

// Helper function to generate unique order number
const generateOrderNumber = () => {
  return "ORD-" + Math.floor(100000 + Math.random() * 900000);
};

// Create new order
export const createOrder = asyncWrapper(async (req, res) => {
  const { customerName, customerEmail, customerAddress, orderItems } = req.body;

  if (!orderItems || orderItems.length === 0) {
    throw new CustomError(400, "Order items are required");
  }

  let totalAmount = 0;
  for (const item of orderItems) {
    const product = await Product.findById(item.product);
    if (!product) {
      throw new CustomError(404, "Product not found");
    }
    if (product.stockQuantity < item.quantity) {
      throw new CustomError(400, `Not enough stock for ${product.name}`);
    }
    totalAmount += product.price * item.quantity;
    product.stockQuantity -= item.quantity;
    await product.save();
    item.price = product.price; // Ensure price is saved in order item
  }

  const order = new Order({
    orderNumber: generateOrderNumber(),
    customerName,
    customerEmail,
    customerAddress,
    orderItems,
    totalAmount,
    status: "Pending",
  });

  await order.save();

  // Create PayPal order
  const paypalOrder = await createPayPalOrder(totalAmount, order._id);

  
  res.status(201).json({
  orderId: order._id,
  orderNumber: order.orderNumber,
  totalAmount: totalAmount,
  paypalOrderId: paypalOrder.id,
  paypalLink: paypalOrder.links.find(link => link.rel === "approve").href
});

});

// Capture PayPal payment
export const captureOrderPayment = asyncWrapper(async (req, res) => {
  const { orderId } = req.params;
  const { paypalOrderId } = req.body;

  // Find the order in DB
  const order = await Order.findById(orderId);
  if (!order) {
    throw new CustomError(404, "Order not found");
  }

  try {
    const captureData = await capturePayPalOrder(paypalOrderId);

    // Safely extract capture status and transaction ID
    const captureStatus =
      captureData?.status ||
      captureData?.purchase_units?.[0]?.payments?.captures?.[0]?.status;

    const transactionId =
      captureData?.purchase_units?.[0]?.payments?.captures?.[0]?.id;

    if (captureStatus === "COMPLETED" && transactionId) {
      // Update order in DB
      order.status = "Completed";
      order.paypalTransactionId = transactionId;
      await order.save();

      return res.json({
        message: "Payment captured successfully",
        order,
      });
    } else {
      console.warn(
        "PayPal capture status not COMPLETED",
        captureData
      );
      // Return 200 with warning if DB update is successful
      return res.json({
        message: "Payment captured, but PayPal status unexpected",
        order,
      });
    }
  } catch (err) {
    console.error("Error capturing PayPal order:", err.response?.data || err.message);
    return res.status(500).json({
      message: "Payment capture failed",
      error: err.message,
    });
  }
});


// Get order by order number
export const getOrderByNumber = asyncWrapper(async (req, res) => {
  const order = await Order.findOne({ orderNumber: req.params.orderNumber }).populate("orderItems.product");
  if (!order) {
    throw new CustomError(404, "Order not found");
  }
  res.json(order);
});

// Update order status
export const updateOrderStatus = asyncWrapper(async (req, res) => {
  const { status, paypalTransactionId } = req.body;
  const order = await Order.findById(req.params.id);
  if (!order) {
    throw new CustomError(404, "Order not found");
  }
  if (status) order.status = status;
  if (paypalTransactionId) order.paypalTransactionId = paypalTransactionId;

  await order.save();
  res.json(order);
});

// Webhook endpoint to handle PayPal events
export const paypalWebhook = asyncWrapper(async (req, res) => {
  const event = req.body;

  if (event.event_type === "CHECKOUT.ORDER.APPROVED") {
    const paypalOrderId = event.resource.id;
    console.log("Order approved:", paypalOrderId);
    // Additional logic can be added if needed
  }

  if (event.event_type === "PAYMENT.CAPTURE.COMPLETED") {
    const paypalTransactionId = event.resource.id;
    const orderId = event.resource.custom_id; // Assumes you saved order ID in custom_id
    const order = await Order.findById(orderId);
    if (order) {
      order.status = "Completed";
      order.paypalTransactionId = paypalTransactionId;
      await order.save();
    }
    console.log("Payment captured:", paypalTransactionId);
  }

  res.status(200).json({ message: "Webhook received" });
});
