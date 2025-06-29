import React, { useState, useEffect } from "react";

const EditAddressModal = ({ isOpen, onClose, handleSubmit,formData, handleChange}) => {


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-[90%] max-w-xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-indigo-800 mb-4 text-center">Edit Address</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="border rounded-lg p-2"
          />
          <input
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            placeholder="Mobile Number"
            className="border rounded-lg p-2"
          />
          <input
            name="houseNo"
            value={formData.houseNo}
            onChange={handleChange}
            placeholder="House No."
            className="border rounded-lg p-2"
          />
          <input
            name="landMark"
            value={formData.landMark}
            onChange={handleChange}
            placeholder="Landmark"
            className="border rounded-lg p-2"
          />
          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            className="border rounded-lg p-2"
          />
          <input
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="State"
            className="border rounded-lg p-2"
          />
          <input
            name="pinCode"
            value={formData.pinCode}
            onChange={handleChange}
            placeholder="PIN Code"
            className="border rounded-lg p-2"
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-400 text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAddressModal;
