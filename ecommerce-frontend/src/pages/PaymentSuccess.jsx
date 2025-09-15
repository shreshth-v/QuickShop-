import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiClient } from "../api/apiClient";

function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5); // Countdown for redirect
  const [statusMessage, setStatusMessage] = useState("Processing payment...");

  useEffect(() => {
    const capturePayment = async () => {
      const params = new URLSearchParams(location.search);
      const token = params.get("token");     // PayPal order ID
      const orderId = params.get("orderId"); // Backend order ID

      if (!token || !orderId) {
        console.error("Missing PayPal token or orderId");
        setStatusMessage("Payment details missing. Cannot process payment.");
        return;
      }

      try {
        const response = await apiClient.post(`orders/${orderId}/capture`, {
          paypalOrderId: token
        });

        if (response.data.message.includes("successfully")) {
          setStatusMessage("Payment successful! Redirecting...");
        } else {
          setStatusMessage("Payment captured but status unexpected.");
        }
      } catch (error) {
        console.error("Payment capture failed:", error.response?.data || error.message);
        setStatusMessage("Payment capture failed. Please contact support.");
      }
    };

    capturePayment();
  }, [location.search]);

  useEffect(() => {
    if (countdown === 0) {
      navigate("/");
      return;
    }
    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4">
      <h1 className="text-2xl font-bold mb-4">Payment Status</h1>
      <p className="mb-4">{statusMessage}</p>
      <p className="text-gray-600">
        Redirecting to homepage in {countdown} second{countdown !== 1 ? "s" : ""}...
      </p>
    </div>
  );
}

export default PaymentSuccess;
