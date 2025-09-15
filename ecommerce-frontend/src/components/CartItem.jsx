import { useDispatch } from "react-redux";
import { removeFromCart } from "../features/cart/cartSlice";

function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center border-b p-2">
      <img src={item.image} alt={item.name} className="h-20 w-20 object-cover mr-4" />
      <div className="flex-1">
        <h3 className="font-bold">{item.name}</h3>
        <p>${item.price.toFixed(2)} x {item.quantity}</p>
      </div>
      <button
        className="bg-red-500 text-white px-3 py-1 rounded"
        onClick={() => dispatch(removeFromCart(item.productId))}
      >
        Remove
      </button>
    </div>
  );
}

export default CartItem;
