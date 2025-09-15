import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerAddress: { type: String, required: true },
  orderItems: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ["Pending", "Completed", "Cancelled"], default: "Pending" },
  paypalTransactionId: { type: String },
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

export default Order;
