import React, { useEffect, lazy, Suspense } from "react";
import AppLayout from "../layout/AppLayout";
import { UseProductContext } from "../context/ProductProvider";
import { UseAuthContext } from "../context/AuthProvider";
import { useNavigate, Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { useCheckoutContext } from "../context/CheckoutProvider ";

const EditAddressModal = lazy(() => import("../dialog/EditAddressModal"));


const OrderSummary = () => {
  const { cart, totalAmount, shipping, discount, subtotal } =
    UseProductContext() || {};
  const { user } = UseAuthContext() || {};
  const { addresses } = user || {};
  const navigate = useNavigate();

  const {
    selectedAddressId,
    setSelectedAddressId,
    isEdit,
    openEditAddressDialog,
    closeEditAddressDialog,
    formData,
    handleChange,
  } = useCheckoutContext();

  useEffect(() => {
    if (cart.length === 0) {
      toast.error("Please add a product to cart.");
      setTimeout(() => navigate('/'), 500); // toast display hone ka time
    }
  }, [cart]);

  useEffect(() => {
    if (selectedAddressId) {
      localStorage.setItem("selectedAddressId", selectedAddressId);
    }
  }, [selectedAddressId]);

  const handleUpdateAddress = async () => {
    try {
      await axios.put(`/api/address/update`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      closeEditAddressDialog();
      toast.success("Address updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to update address"
      );
    }
  };


  const onProceedPayment = () => {
    if (!selectedAddressId) {
      toast.error("Please select the address");
      return;
    }
    navigate("/payment-method");
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-100 to-pink-50 py-6 px-4">
        <div className="max-w-6xl mx-auto space-y-10">
          {/* Header & Add Button */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-indigo-800">
              🧾 Order Summary
            </h1>
            <Link
              to={"/shipping-details"}
              className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition text-center"
            >
              + Add Address
            </Link>
          </div>

          {/* Address Selection */}
          <h2 className="text-2xl font-bold text-gray-800 mt-8">
            Select Shipping Address
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {addresses.map((addr) => (
              <AddressCard
                key={addr._id}
                address={addr}
                selected={selectedAddressId === addr._id}
                onSelect={() => setSelectedAddressId(addr._id)}
                onEdit={openEditAddressDialog}
              />
            ))}
          </div>

          {/* Product Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cart.map((product, i) => (
              <ProductMiniCard key={i} product={product} />
            ))}
          </div>

          {/* Price Summary */}
          <div className="bg-white shadow-lg rounded-lg p-6 w-full text-gray-800 space-y-4">
            <h2 className="text-2xl font-bold text-indigo-800 mb-2">
              Price Details
            </h2>

            <div className="flex justify-between border-b pb-2">
              <span>Total Items</span>
              <span>{cart.length}</span>
            </div>

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>- ₹{discount}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping Charges</span>
              <span>₹{shipping}</span>
            </div>

            <hr />

            <div className="flex justify-between font-bold text-xl text-pink-600">
              <span>Total Amount</span>
              <span>₹{totalAmount}</span>
            </div>

            <div className="flex w-full justify-end">
              <button
                onClick={onProceedPayment}
                className="bg-pink-600 text-white px-4 py-2 ml-auto rounded-lg hover:bg-pink-700 transition text-center"
              >
                💳 Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>

      <Suspense fallback={<div className="text-center p-4">Loading...</div>}>
        <EditAddressModal
          isOpen={isEdit}
          onClose={closeEditAddressDialog}
          formData={formData}
          handleSubmit={handleUpdateAddress}
          handleChange={handleChange}
        />
      </Suspense>
    </AppLayout>
  );
};

export default OrderSummary;

const ProductMiniCard = ({ product }) => (
  <div className="bg-white shadow-md rounded-lg p-4 flex items-center gap-4">
    <img
      src={product.image}
      alt={product.name}
      className="w-16 h-16 rounded-md object-cover"
    />
    <div>
      <h3 className="font-semibold text-gray-800">{product.name}</h3>
      <p className="text-pink-600 font-bold">₹{product.price}</p>
    </div>
  </div>
);

const AddressCard = ({ address, selected, onSelect, onEdit }) => (
  <div
    onClick={onSelect}
    className={`p-4 border rounded-lg shadow-sm cursor-pointer transition hover:shadow-md ${selected ? "border-indigo-600 bg-indigo-50" : "border-gray-300"
      }`}
  >
    <div className="flex justify-between items-start">
      <div>
        <h3 className="font-bold text-gray-800">{address.fullName}</h3>
        <p className="text-gray-600 text-sm">
          {address.houseNo}, {address.landMark}
        </p>
        <p className="text-gray-600 text-sm">
          {address.city}, {address.state} - {address.pinCode}
        </p>
        <p className="text-gray-600 text-sm">📞 {address.mobileNumber}</p>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onEdit(address);
        }}
        className="text-indigo-600 hover:text-indigo-800"
      >
        <FaEdit />
      </button>
    </div>
  </div>
);
