import { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";

const Contact = ({ isHome = false }) => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await axios.post(
        "http://localhost:8080/api/contact/create",
        form,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!isHome && <Navbar />}

      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 py-20 px-6">
        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-10">
          <h2 className="text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-500">
            Contact Us
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="5"
              placeholder="Your Message"
              className="border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            ></textarea>

            <button
              type="submit"
              className="flex justify-center items-center gap-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition duration-200"
              disabled={loading}
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
