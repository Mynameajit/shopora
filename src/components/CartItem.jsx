import { MdDelete } from "react-icons/md";



const CartItem = ({ item, increaseQuantity, decreaseQuantity, removeFromCart }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4 flex flex-col sm:flex-col lg:flex-row gap-6">
      <img
        src={item.image}
        alt={item.title}
        className="lg:w-48 h-40 object-fill rounded-xl"
      />
      <div className="flex flex-col flex-grow">
        <h2 className="text-lg sm:text-xl font-semibold text-indigo-700 mb-1 line-clamp-2">
          {item.name}
        </h2>
        <p className="text-gray-600 text-sm mb-2">
          {item.description.length > 80
            ? item.description.slice(0, 80) + '...'
            : item.description}
        </p>
        <span className="text-base font-bold text-pink-600 mb-2">
          ₹{item.price}
        </span>

        {/* Quantity Controls */}
        <div className="flex sm:flex-row w-full justify-between items-start sm:items-center gap-2 mt-auto">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => decreaseQuantity(item._id)}
              className="bg-indigo-100 px-2 rounded text-indigo-700 hover:bg-indigo-200"
            >
              −
            </button>
            <span className="px-2 font-semibold">{item.quantity}</span>
            <button
              onClick={() => increaseQuantity(item._id)}
              className="bg-indigo-100 px-2 rounded text-indigo-700 hover:bg-indigo-200"
            >
              +
            </button>
          </div>
          <button
            onClick={() => removeFromCart(item._id)}
            className="text-red-500 hover:text-red-700 cursor-pointer"
          >
            <MdDelete  size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
