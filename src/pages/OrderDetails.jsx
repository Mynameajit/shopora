import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  FaUserAlt,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaCheckCircle,
  FaBoxOpen,
} from 'react-icons/fa';
import { API_URL } from '../App';

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/order/details/${id}`);
        setOrder(data);
      } catch (err) {
        console.error('Failed to fetch order', err);
      }
    };
    fetchOrder();
  }, [id]);

  if (!order)
    return <div className="text-center py-10 text-xl font-semibold">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">🧾 Order Details</h2>

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <OrderInfo order={order} />
        <AddressInfo address={order.address} />
      </div>

      <h3 className="text-2xl font-bold text-gray-800 mb-4">🛒 Products</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {order.products.map((item) => (
          <ProductCard key={item.product._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default OrderDetails;

const OrderInfo = ({ order }) => (
  <div className="bg-white p-6 rounded-xl shadow-md border">
    <div className="mb-4 flex items-center gap-3 text-lg text-gray-700">
      <FaCheckCircle className="text-green-500" />
      <p><strong>Status:</strong> <span className="text-blue-600">{order.status}</span></p>
    </div>
    <div className="mb-4 flex items-center gap-3 text-lg text-gray-700">
      <FaMoneyBillWave className="text-green-600" />
      <p><strong>Payment:</strong> {order.paymentMethod}</p>
    </div>
    <div className="mb-4 flex items-center gap-3 text-lg text-gray-700">
      <FaBoxOpen className="text-yellow-600" />
      <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
    </div>
    {order.user && (
      <div className="flex items-center gap-3 text-lg text-gray-700">
        <FaUserAlt className="text-indigo-500" />
        <p><strong>User:</strong> {order.user.name} ({order.user.email})</p>
      </div>
    )}
  </div>
);

const AddressInfo = ({ address }) => (
  <div className="bg-white p-6 rounded-xl shadow-md border">
    <div className="flex items-center gap-3 mb-4 text-lg font-semibold text-pink-600">
      <FaMapMarkerAlt />
      <h3>Delivery Address</h3>
    </div>
    {address ? (
      <div className="text-gray-700 space-y-2">
        <p><strong>Name:</strong> {address.fullName}</p>
        <p><strong>Phone:</strong> {address.mobileNumber}</p>
        <p><strong>Address:</strong> {address.houseNo}, {address.city}, {address.landMark}, {address.state} - {address.pinCode}</p>
      </div>
    ) : (
      <p className="text-gray-500">No address information available.</p>
    )}
  </div>
);

const ProductCard = ({ item }) => (
  <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition border">
    <img
      src={item.product.image || 'https://via.placeholder.com/150'}
      alt={item.product.name}
      className="w-full h-40 object-cover rounded mb-3"
    />
    <h4 className="text-lg font-semibold text-indigo-700">{item.product.name}</h4>
    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
    <p className="font-medium text-gray-800">
      ₹{item.product.price} × {item.quantity} = <span className="text-green-600 font-bold">₹{item.product.price * item.quantity}</span>
    </p>
  </div>
);
