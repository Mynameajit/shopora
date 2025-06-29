import React from "react";
import { UseAuthContext } from "../context/AuthProvider";
import Loader from "../components/Loader";
import AppLayout from "../layout/AppLayout";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";

// Profile Page Component
const Profile = () => {
  const { user, handleLogout } = UseAuthContext() || {};

  // Show loading screen until user is fetched
  if (!user) return <Loader />;

  const { name, email, role, createdAt, updatedAt, addresses } = user;

  // Handle logout
  const logoutHandler = () => {
    handleLogout();
  };

  // Delete address API call
  const deleteAddress = async (id) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/address/delete",
        { _id: id },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Address deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to delete address");
    }
  };

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          User Profile
        </h2>

        {/* User Info */}
        <div className="space-y-4">
          <InfoRow label="Name" value={name} />
          <InfoRow label="Email" value={email} />
          <InfoRow label="Role" value={role} />
          <InfoRow label="Created At" value={new Date(createdAt).toLocaleString()} />
          <InfoRow label="Updated At" value={new Date(updatedAt).toLocaleString()} />

          {/* Address List */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Addresses</h3>
            {addresses && addresses.length > 0 ? (
              <ul className="space-y-3">
                {addresses.map((addr) => (
                  <AddressItem
                    key={addr._id}
                    address={addr}
                    onDelete={() => deleteAddress(addr._id)}
                  />
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No addresses saved yet.</p>
            )}
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-8 text-center">
          <button
            onClick={logoutHandler}
            className="px-5 py-2 bg-red-500 text-white font-medium rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </AppLayout>
  );
};

// ✅ Reusable Info Row for name/email/role etc.
const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-center border-b py-2">
    <span className="text-gray-600 font-medium">{label}</span>
    <span className="text-gray-800">{value}</span>
  </div>
);

// ✅ Reusable Address Display Component
const AddressItem = ({ address, onDelete }) => (
  <li className="flex justify-between items-start bg-indigo-50 rounded-lg p-3 shadow-sm hover:shadow-md transition">
    <div className="text-gray-700">
      <p className="font-semibold">{address.fullName}</p>
      <p className="text-sm">
        {address.houseNo}, {address.landMark}, {address.city}, {address.state} - {address.pinCode}
      </p>
      {address.mobileNumber && (
        <p className="text-xs text-gray-500">📞 {address.mobileNumber}</p>
      )}
    </div>
    <button
      onClick={onDelete}
      className="text-red-500 hover:text-red-700"
      title="Delete Address"
    >
      <MdDelete size={20} />
    </button>
  </li>
);

export default Profile;
