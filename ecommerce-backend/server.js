import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import connectDb from "./utils/db.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import CustomError from "./utils/customError.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDb();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Welcome to QuickShop Electronics API");
});

// Error handling middleware
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Some went wrong" } = err;
  res.status(statusCode).json({ message });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
