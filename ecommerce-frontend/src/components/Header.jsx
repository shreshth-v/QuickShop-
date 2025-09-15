import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";

function Header() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">
        <Link to="/">QuickShop Electronics</Link>
      </h1>
      <nav className="flex items-center space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/create-product" className="hover:underline">Create Product</Link>
        <Link to="/cart" className="relative">
          <FaShoppingCart size={24} />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full px-1 w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
}

export default Header;
