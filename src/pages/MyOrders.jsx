import React, { useEffect, useState, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { FaClipboardList } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-hot-toast";
import { statusColor, trackingStage } from "../utils/orderUtils";
import { SpinLoader } from "../components/SpinLoader";
import { API_URL } from "../App";

// Lazy load layout and order card
const AppLayout = lazy(() => import("../layout/AppLayout"));
const OrderCard = lazy(() => import("../components/OrderCard"));

const MyOrders = () => {
  const [filter, setFilter] = useState("All");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/order/my-order`, {
          withCredentials: true,
        });
        setOrders(data.orders);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load your orders.");
      }
    };

    loadOrders();
  }, []);

  const handleCancelOrder = async (_id) => {
    if (window.confirm("Are you sure you want to cancel your order?")) {
      try {
        await axios.post(
          `${API_URL}/api/order/update/${_id}`,
          { status: "Cancelled" },
          { withCredentials: true }
        );
        toast.success("Order cancelled successfully!");
        setOrders((prev) =>
          prev.map((order) =>
            order._id === _id ? { ...order, status: "Cancelled" } : order
          )
        );
      } catch (error) {
        toast.error("Failed to cancel order.");
      }
    }
  };

  const filteredOrders =
    filter === "All" ? orders : orders.filter((order) => order.status === filter);

  return (
    <Suspense fallback={<SpinLoader/>}>
      <AppLayout>
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 sm:p-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-indigo-800 mb-4 text-center">
            📦 My Orders
          </h1>

          {/* Filter Dropdown */}
          <div className="flex justify-center mb-6">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-indigo-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {["All", "Pending", "Processing", "Shipped", "Out for Delivery", "Delivered", "Cancelled"].map((status) => (
                <option key={status} value={status}>
                  {status === "All" ? "All Orders" : status}
                </option>
              ))}
            </select>
          </div>

          {/* Order List */}
          <div className="space-y-6 max-w-3xl mx-auto">
            { filteredOrders.length === 0 ? (
              <EmptyOrderSection />
            ) : (
              filteredOrders.map((order) => (
                <OrderCard
                  key={order._id}
                  order={order}
                  statusColor={statusColor}
                  trackingStage={trackingStage}
                  onCancel={handleCancelOrder}
                />
              ))
            )}
          </div>
        </div>
      </AppLayout>
    </Suspense>
  );
};

export default MyOrders;

// Empty Orders Component
const EmptyOrderSection = () => (
  <div className="flex flex-col items-center justify-center text-gray-500 py-16">
    <FaClipboardList className="text-5xl text-indigo-400 mb-4" />
    <h2 className="text-xl font-semibold">No Orders Found</h2>
    <p className="text-sm text-gray-400 mt-1">You haven’t placed any orders yet.</p>
    <Link
      to="/products"
      className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium transition"
    >
      Shop Now
    </Link>
  </div>
);
