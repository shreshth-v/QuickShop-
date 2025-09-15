function PaymentCancelled() {
  return (
    <div className="p-4 text-center">
      <h1 className="text-xl font-bold text-red-500">Payment Cancelled</h1>
      <p>You have cancelled the payment. You can return to the <a href="/" className="text-blue-600">home page</a>.</p>
    </div>
  );
}

export default PaymentCancelled;
