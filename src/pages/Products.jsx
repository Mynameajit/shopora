import React from "react";
import { lazy, Suspense } from "react";
import { UseProductContext } from "../context/ProductProvider";
import Navbar from "../components/Navbar";
import AppLayout from "../layout/AppLayout";
import {
  FaTshirt,
  FaMobileAlt,
  FaCouch,
  FaRunning,
  FaSpinner
} from "react-icons/fa";
import { MdOutlineSentimentDissatisfied } from "react-icons/md";
import { SpinLoader } from "../components/SpinLoader";

// Lazy Loading Components for performance
const ProductCard = lazy(() => import("../components/ProductCard"));
const EmptyProducts = lazy(() => import("../components/EmptyProducts"));

const categories = [
  { label: "electronics", icon: <FaMobileAlt size={20} className="text-indigo-600" /> },
  { label: "fashion", icon: <FaTshirt size={20} className="text-pink-600" /> },
  { label: "home & living", icon: <FaCouch size={20} className="text-yellow-600" /> },
  { label: "fitness", icon: <FaRunning size={20} className="text-green-600" /> }
];

const Products = ({ isHome = false, id }) => {
  const { products, filterByCategory, filteredProducts } = UseProductContext() || {};



  return (
    <>
      {!isHome && <Navbar />}

      <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 min-h-screen text-gray-800">

        {/* 🔹 Category Section */}
        <section id={id} className="max-w-7xl mx-auto px-4 py-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">Shop by Category</h2>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat, index) => (
              <div
                key={index}
                onClick={() => filterByCategory(cat.label)}
                className="capitalize bg-white shadow-md rounded-2xl p-4 flex flex-col items-center hover:shadow-lg transition-all duration-200 cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mb-3">
                  {cat.icon}
                </div>
                <h3 className="text-sm font-medium text-gray-700 group-hover:text-indigo-700">
                  {cat.label}
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Explore latest in {cat.label.toLowerCase()}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 🔹 Featured Product Section */}
        <section className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Featured Products</h2>
            <button
              onClick={() => filterByCategory("All")}
              className="text-sm text-indigo-600 hover:underline cursor-pointer"
            >
              View All
            </button>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts?.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center text-gray-600 py-10">
                <MdOutlineSentimentDissatisfied size={60} className="text-red-400 mb-2" />
                <h2 className="text-xl font-semibold">No Products Found</h2>
                <p className="text-sm">Try selecting another category or clear the filters.</p>
              </div>
            ) : (
              <Suspense fallback={<SpinLoader/>}>
                {filteredProducts?.map((product, i) => (
                  <ProductCard key={i} product={product} />
                ))}
              </Suspense>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Products;
