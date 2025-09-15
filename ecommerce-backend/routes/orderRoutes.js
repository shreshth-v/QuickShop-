// routes/orderRoutes.js
import express from "express";
import {
  createOrder,
  getOrderByNumber,
  updateOrderStatus,
  captureOrderPayment,
  paypalWebhook
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", createOrder);
router.post("/:orderId/capture", captureOrderPayment);
router.post("/paypal-webhook", paypalWebhook);
router.get("/:orderNumber", getOrderByNumber);
router.put("/:id/status", updateOrderStatus);

export default router;
