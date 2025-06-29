import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi"; // Empty cart icon

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 ">
      <FiShoppingCart className="text-6xl text-gray-400 mb-4" />
      <p className="text-xl text-gray-600 mb-4">Your cart is currently empty.</p>
      <Link
        to="/products"
        className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg text-md font-medium hover:bg-indigo-700 transition duration-300"
      >
       Start Adding Products
      </Link>
    </div>
  );
};

export default EmptyCart;
