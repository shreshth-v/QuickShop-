import Product from "../models/Product.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import CustomError from "../utils/customError.js";

// Get all products with optional search and filter
export const getProducts = asyncWrapper(async (req, res) => {
  const { search, category } = req.query;
  const query = {};

  if (search) {
    query.$text = { $search: search };
  }
  if (category) {
    query.category = category;
  }

  const products = await Product.find(query);
  res.json(products);
});

// Get single product by ID
export const getProductById = asyncWrapper(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new CustomError(404, "Product not found");
  }
  res.json(product);
});

// Create a new product
export const createProduct = asyncWrapper(async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.status(201).json(product);
});

// Update a product
export const updateProduct = asyncWrapper(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!product) {
    throw new CustomError(404, "Product not found");
  }
  res.json(product);
});

// Delete a product
export const deleteProduct = asyncWrapper(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    throw new CustomError(404, "Product not found");
  }
  res.json({ message: "Product deleted successfully" });
});
