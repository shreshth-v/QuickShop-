import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../api/apiClient";

// Fetch all products
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const response = await apiClient.get("products");
  return response.data;
});

// Fetch a single product by ID
export const fetchProductById = createAsyncThunk("products/fetchById", async (id) => {
  const response = await apiClient.get(`products/${id}`);
  return response.data;
});

// Create a new product
export const createProduct = createAsyncThunk("products/create", async (productData) => {
  const response = await apiClient.post("products", productData);
  return response.data;
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    currentProduct: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentProduct(state) {
      state.currentProduct = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearCurrentProduct } = productSlice.actions;
export default productSlice.reducer;
