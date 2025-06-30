
import axios from 'axios';
import toast from "react-hot-toast";

export const placeOrder = async ({ paymentMethod, cartItems, addressId, totalAmount, setLoading }) => {

    try {
        setLoading(true)
        const products = cartItems.map((item) => ({
            product: item._id,
            quantity: item.quantity,
        }));

        const response = await axios.post(
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

        toast.success("🛒 Order placed successfully!");
        localStorage.removeItem("cart");
        

        setTimeout(() => {
            window.location.href = "/my-order";
            setLoading(false)

        }, 500);

    } catch (error) {
        console.error("Order error:", error);
        toast.error("❌ Failed to place order.");
        throw error;
        setLoading(false)

    }
};
