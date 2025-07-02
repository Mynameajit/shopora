import React from 'react';
import axios from 'axios';
import { API_URL } from '../App';

const RazorpayButton = ({ amount = 500 }) => {

  const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID


  const loadRazorpay = async () => {
    try {
      const { data } = await axios.post(`${API_URL}/api/payment/create-order`, { amount });

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: "INR",
        name: "Shopora Store",
        description: "Test Transaction",
        order_id: data.id,
        handler: async function (response) {
          // Optional: verify on server
          const verifyRes = await axios.post(`${API_URL}/api/payment/verify`, {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          if (verifyRes.data.success) {
            alert("Payment Success and Verified!");
          } else {
            alert("Payment Failed Verification!");
          }
        },
        prefill: {
          name: "Ajit Kumar",
          email: "ajit@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc"
        },
      };

      const rzp = new window.Razorpay(options); // ✅ Now it will work
      rzp.open();

    } catch (err) {
      console.error("Razorpay Error: ", err);
    }
  };

  return (
    <button onClick={loadRazorpay} className="bg-green-600 px-4 py-2 text-white rounded">
      Pay ₹{amount}
    </button>
  );
};

export default RazorpayButton;
