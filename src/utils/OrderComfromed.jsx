
import axios from 'axios';
import toast from "react-hot-toast";
import { API_URL } from '../App';

export const placeOrder = async ({ paymentMethod, cartItems, addressId, totalAmount, setLoading,navigate }) => {

    try {
        setLoading(true)
        const products = cartItems.map((item) => ({
            product: item._id,
            quantity: item.quantity,
        }));

        const { data } = await axios.post(
            `${API_URL}/api/order/create`,
            {
                address: addressId,
                products,
                totalAmount,
                paymentMethod,
                paymentStatus: paymentMethod === "Online" ? "Success" : "Pending"
            },
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        if (data.success) {
            toast.success("🛒 Order placed successfully!");
            localStorage.removeItem("cart");
            localStorage.removeItem("selectedAddressId");
            navigate('/my-order')
        }


    } catch (error) {
        console.error("Order error:", error);
        toast.error("❌ Failed to place order.");
        setLoading(false)
        throw error;

    }
};
