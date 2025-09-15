// utils/paypal.js
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// PayPal environment variables from .env
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
const PAYPAL_RETURN_URL = process.env.PAYPAL_RETURN_URL;
const PAYPAL_CANCEL_URL = process.env.PAYPAL_CANCEL_URL;

// Get access token from PayPal
export const getAccessToken = async () => {
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString('base64');
  const response = await axios({
    method: 'post',
    url: 'https://api-m.sandbox.paypal.com/v1/oauth2/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${auth}`
    },
    data: 'grant_type=client_credentials'
  });
  return response.data.access_token;
};

// Create PayPal order with return and cancel URLs
// utils/paypal.js
export const createPayPalOrder = async (totalAmount, orderId) => {
  const accessToken = await getAccessToken();
  const response = await axios({
    method: 'post',
    url: 'https://api-m.sandbox.paypal.com/v2/checkout/orders',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    data: {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: totalAmount.toFixed(2)
          }
        }
      ],
      application_context: {
        // Append orderId dynamically
        return_url: `${PAYPAL_RETURN_URL}?orderId=${orderId}`,
        cancel_url: PAYPAL_CANCEL_URL
      }
    }
  });
  return response.data;
};


// Capture PayPal order by order ID
export const capturePayPalOrder = async (orderId) => {
  const accessToken = await getAccessToken();
  const response = await axios({
    method: 'post',
    url: `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}/capture`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }
  });
  return response.data;
};
