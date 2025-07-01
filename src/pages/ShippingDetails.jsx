import React, { useState, useEffect } from "react";
import { State, City } from "country-state-city"; // 📦 State and City utilities
import InputField from "../components/InputField"; // 🧩 Custom Input component
import SelectField from "../components/SelectField"; // 🧩 Custom Select component
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../App";
import { UseAuthContext } from "../context/AuthProvider";

const ShippingDetails = () => {
  const navigate = useNavigate(); // 🧭 Navigation hook
  const { getUser, } = UseAuthContext() ||{}

  // 📌 Form state – user address input
  const [form, setForm] = useState({
    fullName: "",
    mobileNumber: "",
    landMark: "",
    city: "",
    pinCode: "",
    state: "",
    houseNo: "",
  });

  // 📌 Dropdown data for states and cities
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔁 On first load, fetch Indian states
  useEffect(() => {
    setStates(State.getStatesOfCountry("IN"));
  }, []);




  // 🔁 Whenever state changes, load its cities
  useEffect(() => {
    if (form.state) {
      setDistricts(City.getCitiesOfState("IN", form.state) || []);
      setForm(prev => ({ ...prev, city: "" })); // Reset city
    }
  }, [form.state]);

  // 🔧 Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };


  // 📤 Submit the address form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const response = await axios.post(
        `${API_URL}/api/address/add`,
        form,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Address created successfully!");
      setLoading(false)
      getUser()
      // 🎯 Reset form after submission
      setForm({
        fullName: "",
        mobileNumber: "",
        landMark: "",
        city: "",
        pinCode: "",
        state: "",
        houseNo: "",
      });
      setStates([]);
      setDistricts([]);

      // ✅ Redirect to order summary
      navigate("/order-summary");
    } catch (error) {
      setLoading(false)
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to create address");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-2xl border border-blue-200">
        <h2 className="text-3xl font-semibold mb-6 text-blue-800 text-center">
          🏠 Shipping Details
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 👤 Full Name */}
          <InputField
            name="fullName"
            label="Full Name"
            value={form.fullName}
            onChange={handleChange}
            autoFocus
          />

          {/* 📱 Mobile Number */}
          <InputField
            name="mobileNumber"
            label="Phone"
            value={form.mobileNumber}
            onChange={handleChange}
            type="tel"
            pattern="[0-9]{10}"
            title="Enter 10-digit number"
          />

          {/* 📍 Landmark */}
          <InputField
            name="landMark"
            label="Landmark"
            value={form.landMark}
            onChange={handleChange}
          />

          {/* 🏡 House & PinCode */}
          <div className="flex gap-4">
            <InputField
              name="houseNo"
              label="House No / Village"
              value={form.houseNo}
              onChange={handleChange}
              half
            />
            <InputField
              name="pinCode"
              label="PIN Code"
              value={form.pinCode}
              onChange={handleChange}
              type="text"
              pattern="[0-9]{6}"
              title="Enter 6-digit PIN code"
              half
            />
          </div>

          {/* 🌍 Country (Static) */}
          <InputField name="Country" label="Country" value={"India"} readOnly />

          {/* 🏙️ State Dropdown */}
          <SelectField
            label="State"
            name="state"
            value={form.state}
            onChange={handleChange}
            options={states.map((s) => ({ label: s.name, value: s.isoCode }))}
          />

          {/* 🏢 City Dropdown */}
          <SelectField
            label="City"
            name="city"
            value={form.city}
            onChange={handleChange}
            options={districts.map((d) => ({ label: d.name, value: d.name }))}
            disabled={!form.state}
          />

          {/* 📦 Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition duration-200 font-semibold text-lg"
          >{

              loading ? "Adding...." : "Continue to Payment"
            }
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShippingDetails;
