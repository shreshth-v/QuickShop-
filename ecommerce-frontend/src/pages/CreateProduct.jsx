import { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../features/products/productSlice";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function CreateProduct() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    stockQuantity: "",
    image: "",
    description: ""
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createProduct({
      name: formData.name,
      price: parseFloat(formData.price),
      category: formData.category,
      stockQuantity: parseInt(formData.stockQuantity),
      image: formData.image,
      description: formData.description
    }));
    navigate("/");
  };

  return (
    <div>
      <Header />
      <div className="max-w-md mx-auto p-4">
        <h1 className="text-xl font-bold mb-4">Create Product</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="border p-2 rounded"/>
          <input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange} className="border p-2 rounded"/>
          <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} className="border p-2 rounded"/>
          <input name="stockQuantity" type="number" placeholder="Stock Quantity" value={formData.stockQuantity} onChange={handleChange} className="border p-2 rounded"/>
          <input name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} className="border p-2 rounded"/>
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="border p-2 rounded"/>
          <button type="submit" className="bg-blue-600 text-white p-2 rounded mt-2">Create</button>
        </form>
      </div>
    </div>
  );
}

export default CreateProduct;
