// src/pages/PaymentMethod.jsx
import React, { useState } from "react";
import { FaMoneyBillWave, FaCreditCard, FaCheckCircle } from "react-icons/fa";
import { placeOrder } from "../utils/OrderComfromed.jsx";
import { UseProductContext } from "../context/ProductProvider";
import { UseAuthContext } from "../context/AuthProvider";
import { useCheckoutContext } from "../context/CheckoutProvider ";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


// Main payment page component
const PaymentMethod = () => {
  const { totalAmount, cart } = UseProductContext() || {};
  const addressId = localStorage.getItem("selectedAddressId");
  const { user } = UseAuthContext();
  const { loadRazorpay, isLoading } = useCheckoutContext();

  const [selectedMethod, setSelectedMethod] = useState(""); // Track selected payment option
  const [showConfirmation, setShowConfirmation] = useState(false); // Toggle order success modal
  const [loading, setLoading] = useState(false); // Button loading state

  const navigate = useNavigate();


useEffect(() => {
  if (cart.length === 0 || !addressId) {
    toast.error("Please add a product and select address before proceeding.");
    setTimeout(() => navigate('/'), 500); // 0.5 sec delay
  }
}, [cart, addressId]);


  // Function to place order for COD method
  const handlePlaceOrder = () => {
    if (!selectedMethod) {
      alert("Please select a payment method.");
      return;
    }

    if (selectedMethod === "cash") {
      placeOrder({
        paymentMethod: "Cash on Delivery",
        addressId,
        totalAmount,
        cartItems: cart,
        setLoading,
        setShowConfirmation,
        navigate
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-indigo-100 to-pink-100 p-4 sm:p-6">
      <div className="max-w-xl mx-auto bg-white shadow-xl rounded-xl p-6 space-y-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-indigo-800 text-center">
          💳 Choose Payment Method
        </h1>

        {/* Show total amount */}
        <div className="bg-indigo-50 rounded-lg p-4 flex justify-between items-center shadow">
          <h2 className="text-lg font-semibold text-indigo-700">Total Amount</h2>
          <p className="text-2xl font-bold text-pink-600">₹{totalAmount}</p>
        </div>

        {/* Payment method options */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Cash on Delivery */}
          <div
            onClick={() => setSelectedMethod("cash")}
            className={`w-full cursor-pointer border rounded-lg p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition ${selectedMethod === "cash"
                ? "border-green-500 bg-green-50"
                : "border-gray-200"
              }`}
          >
            <FaMoneyBillWave className="text-green-600 text-xl" />
            <p className="text-lg font-semibold text-gray-800">
              Cash on Delivery
            </p>
          </div>

          {/* Razorpay (Online Payment) */}
          <div
            onClick={
              isLoading
                ? null
                : () => loadRazorpay({
                  amount: totalAmount,
                  method: "online",
                  user
                })
            }
            className={`w-full cursor-pointer border rounded-lg p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition ${selectedMethod === "online"
                ? "border-pink-500 bg-pink-50"
                : "border-gray-200"
              }`}
          >
            {!isLoading && (
              <FaCreditCard className="text-indigo-600 text-xl" />
            )}
            <p className="text-lg font-semibold text-gray-800">
              {isLoading ? "  Loading...." : "Online Payment"}
            </p>
          </div>
        </div>

        {/* Confirm Button */}
        <div className="text-center pt-4">
          <button
            onClick={handlePlaceOrder}
            disabled={!selectedMethod || loading}
            className={`px-6 py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition ${selectedMethod
                ? loading
                  ? "bg-indigo-400 cursor-wait"
                  : "bg-indigo-600 hover:bg-indigo-700"
                : "bg-gray-400 cursor-not-allowed"
              }`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
                Placing Order...
              </>
            ) : (
              "Confirm & Place Order"
            )}
          </button>
        </div>
      </div>

      {/* Order Confirmation Modal */}
      <OrderConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        totalAmount={totalAmount}
      />
    </div>
  );
};

export default PaymentMethod;




// Order confirmation popup modal component
const OrderConfirmationModal = ({ isOpen, onClose, totalAmount }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-80 text-center space-y-4">
        <FaCheckCircle className="text-green-500 text-5xl mx-auto" />
        <h2 className="text-2xl font-bold text-indigo-800">Order Confirmed!</h2>
        <p className="text-gray-700">Thank you for your purchase. 🎉</p>
        <p className="text-lg font-semibold text-pink-600">Total: ₹{totalAmount}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};
