import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="border rounded p-4 shadow hover:shadow-lg transition">
      <img src={product.image} alt={product.name} className="h-40 w-full object-cover mb-2" />
      <h2 className="font-bold">{product.name}</h2>
      <p className="text-sm text-gray-600">{product.category}</p>
      <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
      <Link to={`/product/${product._id}`} className="block bg-blue-600 text-white text-center mt-2 py-1 rounded">View Details</Link>
    </div>
  );
}

export default ProductCard;
