# QuickShop Electronics - MERN E-commerce Project

A full-stack e-commerce web application built with **MERN (MongoDB, Express.js, React.js, Node.js)** and **PayPal integration** for payments. Users can browse products, add to cart, checkout, and make payments. Admins can manage products.

---

## Features

### User Features
- Browse and view products with details.
- Add products to cart and update quantity.
- Checkout with customer details.
- Pay securely via **PayPal**.
- Automatic order processing and payment capture.
- Redirect with countdown after successful payment.

### Admin Features
- Create, update, and delete products.
- View all products and manage stock quantity.

### Technical Features
- **Frontend:** React.js, Redux Toolkit, React Router, Tailwind CSS.
- **Backend:** Node.js, Express.js, MongoDB.
- **Payments:** PayPal sandbox integration.
- Centralized API calls using `apiClient.js`.
- Protected Redux state for cart and products.
- Countdown and redirect logic after payment.
- Error handling for payments and API calls.

---

## Project Structure

### Frontend (`ecommerce-frontend`)
```
src/
├─ api/
│  └─ apiClient.js           # Centralized Axios instance
├─ components/
│  ├─ Header.jsx             # Navigation bar with cart count
│  └─ ...                    # Other reusable components
├─ pages/
│  ├─ Home.jsx               # Product listing page
│  ├─ Cart.jsx               # Cart page
│  ├─ Checkout.jsx           # Checkout page
│  ├─ PaymentSuccess.jsx     # Payment success page with countdown
│  ├─ PaymentCancelled.jsx   # Payment cancelled page
│  ├─ ProductDetail.jsx      # Product detail page
│  └─ CreateProduct.jsx      # Admin create product page
├─ app/
│  └─ store.js               # Redux store
└─ main.jsx                   # Entry point with ReactDOM
```

### Backend (`ecommerce-backend`)
```
controllers/
├─ productController.js
├─ orderController.js
├─ ...
models/
├─ Product.js
├─ Order.js
routes/
├─ productRoutes.js
├─ orderRoutes.js
middlewares/
├─ asyncWrapper.js
├─ customError.js
utils/
├─ paypal.js                 # PayPal helper functions
├─ db.js                     # MongoDB connection
server.js                     # Express server entry
.env                           # Environment variables
```

---

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/shreshth-v/QuickShop-.git
cd electronics ecommerce
```

### 2. Backend Setup
```bash
cd ecommerce-backend
npm install
```

- Create a `.env` file in `ecommerce-backend`:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
PAYPAL_RETURN_URL=https://your-ngrok-url/payment-success
PAYPAL_CANCEL_URL=https://your-ngrok-url/payment-cancelled
```

- Start the backend server:
```bash
npm run dev
```

- (Optional) If using **ngrok** for PayPal redirects:
```bash
ngrok http 5000
```
Update `.env` with the forwarded ngrok URL.

---

### 3. Frontend Setup
```bash
cd ecommerce-frontend
npm install
```

- Start the frontend:
```bash
npm run dev
```

- Open your browser at `http://localhost:5173`

---

### 4. Testing PayPal Payment
1. Add products to cart and go to checkout.
2. Fill in customer details.
3. Click **Proceed to PayPal** to open the sandbox payment page.
4. Complete payment with **sandbox credentials**.
5. After payment, you'll be redirected to the **Payment Success** page with countdown.

---

## Notes
- Ensure `orderId` is appended to `PAYPAL_RETURN_URL` for proper payment capture:
```javascript
paypalLink: paypalOrder.links.find(link => link.rel === "approve").href + `&orderId=${order._id}`
```
- Payment capture updates the order status in MongoDB.
- Frontend and backend should be running simultaneously.
- Use ngrok if testing PayPal redirect on a local environment.

---

## Dependencies

**Frontend**
- react, react-dom
- react-router-dom
- redux, @reduxjs/toolkit, react-redux
- axios
- tailwindcss
- react-icons

**Backend**
- express
- mongoose
- axios
- dotenv
- jsonwebtoken
- bcryptjs (optional for auth)
- cors

---

## License
This project is for educational and demo purposes.

---

## Author
**Shreshth Vishwakarma**
- [LinkedIn](https://www.linkedin.com/in/shreshth21/)
- [GitHub](https://github.com/your-username)

Hello Just test word;
