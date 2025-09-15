import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, text: true },
  price: { type: Number, required: true },
  category: { type: String, required: true, index: true },
  stockQuantity: { type: Number, required: true },
  image: { type: String },
  description: { type: String, text: true },
}, { timestamps: true });

// Create a text index on name and description
productSchema.index({ name: "text", description: "text" });

const Product = mongoose.model("Product", productSchema);

export default Product;
