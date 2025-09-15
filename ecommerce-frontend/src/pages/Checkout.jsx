import { useState } from "react";
import { useSelector } from "react-redux";
import { apiClient } from "../api/apiClient";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function Checkout() {
  const items = useSelector(state => state.cart.items);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const [customer, setCustomer] = useState({ name: "", email: "", address: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleCheckout = async () => {
    try {
      const response = await apiClient.post("orders", {
        customerName: customer.name,
        customerEmail: customer.email,
        customerAddress: customer.address,
        orderItems: items.map(item => ({
          product: item.productId,
          quantity: item.quantity
        }))
      });

      // Append orderId to PayPal approve link
      const paypalLink = `${response.data.paypalLink}&orderId=${response.data.orderId}`;

      // Redirect user to PayPal
      window.location.href = paypalLink;

    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Checkout failed. Please try again.");
    }
  };

  return (
    <div>
      <Header />
      <div className="p-4 max-w-2xl mx-auto">
        <h1 className="text-xl font-bold mb-4">Checkout</h1>

        <div className="mb-4">
          <input
            name="name"
            placeholder="Name"
            value={customer.name}
            onChange={handleChange}
            className="border rounded w-full p-2 mb-2"
          />
          <input
            name="email"
            placeholder="Email"
            value={customer.email}
            onChange={handleChange}
            className="border rounded w-full p-2 mb-2"
          />
          <input
            name="address"
            placeholder="Address"
            value={customer.address}
            onChange={handleChange}
            className="border rounded w-full p-2 mb-2"
          />
        </div>

        <div className="mb-4">
          <p className="font-bold">Order Total: ${total.toFixed(2)}</p>
        </div>

        <button
          onClick={handleCheckout}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Proceed to PayPal
        </button>
      </div>
    </div>
  );
}

export default Checkout;
