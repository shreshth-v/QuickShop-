import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiClient } from "../api/apiClient";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import Header from "../components/Header";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadProduct = async () => {
      const res = await apiClient.get(`products/${id}`);
      setProduct(res.data);
    };
    loadProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const handleAddToCart = () => {
    dispatch(addToCart({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity
    }));
  };

  return (
    <div>
      <Header />
      <div className="p-4 max-w-3xl mx-auto">
        <img src={product.image} alt={product.name} className="w-full h-64 object-cover mb-4"/>
        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-600 mb-2">{product.category}</p>
        <p className="text-xl font-semibold mb-4">${product.price.toFixed(2)}</p>
        <div className="mb-4">
          <label>Quantity:</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="border rounded p-1 ml-2 w-16"
          />
        </div>
        <button onClick={handleAddToCart} className="bg-blue-600 text-white px-4 py-2 rounded">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;
