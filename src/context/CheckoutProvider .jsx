// src/context/CheckoutContext.jsx
import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { placeOrder } from '../utils/OrderComfromed';
import { UseAuthContext } from './AuthProvider';
import { UseProductContext } from './ProductProvider';

const CheckoutContext = createContext();

const CheckoutProvider = ({ children }) => {
    const Navigate = useNavigate();

    // Context providers
    const { totalAmount, cart } = UseProductContext() || {};
    const { user } = UseAuthContext();

    // Selected address ID from localStorage
    const [selectedAddressId, setSelectedAddressId] = useState(() => {
        return localStorage.getItem("selectedAddressId") || null;
    });

    // States
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    // Form data for shipping details
    const [formData, setFormData] = useState({
        fullName: "",
        mobileNumber: "",
        houseNo: "",
        landMark: "",
        city: "",
        state: "",
        pinCode: "",
    });

    // Handle form input changes
    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    // Dialog handlers
    const openEditAddressDialog = (address) => {
        setFormData(address);
        setIsEdit(true);
    };

    const closeEditAddressDialog = () => {
        setIsEdit(false);
    };

    // Razorpay payment integration
    const loadRazorpay = async ({ amount, method, user }) => {
        const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

        try {
            setIsLoading(true);

            const { data } = await axios.post('http://localhost:8080/api/payment/create-order', { amount });

            const options = {
                key: RAZORPAY_KEY_ID,
                amount: data.amount,
                currency: "INR",
                name: "Dev Ajit Ecommers",
                description: "Test Transaction",
                order_id: data.id,
                handler: async function (response) {
                    const verifyRes = await axios.post('http://localhost:8080/api/payment/verify', {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                    });

                    if (verifyRes.data.success) {
                        toast.success("Payment Success and Verified!");

                        placeOrder({
                            paymentMethod: "Online",
                            addressId: selectedAddressId,
                            totalAmount,
                            cartItems: cart,
                            setLoading
                        });

                        Navigate('/my-order');
                    } else {
                        toast.error("Payment Failed Verification!");
                    }
                },
                prefill: {
                    name: user.name,
                    email: user.email,
                },
                theme: {
                    color: "#3399cc"
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            console.error("Razorpay Error: ", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <CheckoutContext.Provider value={{
            selectedAddressId,
            setSelectedAddressId,
            isEdit,
            openEditAddressDialog,
            closeEditAddressDialog,
            formData,
            handleChange,
            setFormData,
            isLoading,
            loadRazorpay,
        }}>
            {children}
        </CheckoutContext.Provider>
    );
};

export const useCheckoutContext = () => useContext(CheckoutContext);

export default CheckoutProvider;
