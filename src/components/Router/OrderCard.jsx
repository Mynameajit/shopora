// Reusable Order Card Component
  
import { FaCreditCard, FaBoxOpen, FaClipboardList } from "react-icons/fa";



const OrderCard = ({ order, onCancel }) => {
  const isCancelable = ["Pending", "Processing", "Shipped", "Out for Delivery"].includes(order.status);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition p-4 sm:p-6 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div className="flex items-center gap-3 text-indigo-700 font-medium text-sm">
          <FaBoxOpen className="text-pink-500 text-xl" />
          <span>Order ID: {order._id}</span>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${statusColor[order.status]}`}
        >
          {order.status}
        </span>
      </div>

      {/* Products */}
      <div className="border-t pt-4 space-y-4">
        {order.products.map((product) => (
          <div key={product.product._id} className="flex items-start sm:items-center gap-4">
            <img
              src={product.product.image}
              alt={product.product.name}
              className="w-20 h-20 sm:w-24 sm:h-24 object-cover border rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{product.product.name}</h3>
              <p className="text-sm text-gray-600 mt-1">
                ₹{product.product.price} × {product.quantity}
              </p>
              <p className="text-xs text-gray-400 mt-1 hidden sm:block">
                {product.product.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mt-2">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full transition-all duration-500 ${
              order.status === "Cancelled"
                ? "bg-gray-400"
                : trackingStage[order.status] === 100
                ? "bg-green-500"
                : "bg-indigo-500"
            }`}
            style={{ width: `${trackingStage[order.status]}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {order.status === "Cancelled"
            ? "Order was cancelled"
            : `Delivery progress: ${trackingStage[order.status]}%`}
        </p>
      </div>

      {/* Summary */}
      <div className="flex justify-between items-center flex-wrap gap-4 text-sm mt-2">
        <div className="flex items-center gap-2 text-indigo-700 font-medium">
          <FaCreditCard />
          {order.paymentMethod}
        </div>
        <div className="text-gray-600">Ordered on: {order.createdAt}</div>
        <p className="font-bold text-indigo-700">Total: ₹{order.totalAmount}</p>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-3 flex-wrap">
        <Link
          to={`/order-details/${order._id}`}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
        >
          View Details
        </Link>

        {order.status === "Delivered" && (
          <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition">
            Return
          </button>
        )}

        {isCancelable && (
          <button
            onClick={() => onCancel(order._id)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
          >
            Cancel
          </button>
        )}

        {order.status === "Cancelled" && (
          <span className="text-sm text-gray-500 italic">Order Cancelled</span>
        )}
      </div>
    </div>
  );
};


export default OrderCard