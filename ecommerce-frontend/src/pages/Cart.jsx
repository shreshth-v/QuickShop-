import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import Header from "../components/Header";

function Cart() {
  const items = useSelector(state => state.cart.items);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <Header />
      <div className="p-4 max-w-3xl mx-auto">
        <h1 className="text-xl font-bold mb-4">Your Cart</h1>
        {items.length === 0 ? (
          <p>Your cart is empty. <Link to="/" className="text-blue-600">Shop now!</Link></p>
        ) : (
          <>
            {items.map(item => (
              <CartItem key={item.productId} item={item} />
            ))}
            <div className="mt-4 text-right">
              <p className="font-bold text-lg">Total: ${total.toFixed(2)}</p>
              <Link to="/checkout" className="bg-green-600 text-white px-4 py-2 rounded mt-2 inline-block">Proceed to Checkout</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
