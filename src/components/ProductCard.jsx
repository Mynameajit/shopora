import React from "react";
import { FaStar } from "react-icons/fa";
import { UseProductContext } from "../context/ProductProvider";

const ProductCard = ({ product }) => {

  const {handlerAddCard}=UseProductContext()||{}

  const { name, price, image, rating, description } = product || {}
  return (
    <div 
    
    className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group">
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-fill group-hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-2 right-2 bg-yellow-400 text-white text-xs px-2 py-1 rounded-full font-bold ">
          {rating} <FaStar size={14} className="inline ml-1 text-green-600" /> <FaStar size={14} className="inline  text-green-600" />
        </span>
      </div>
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
          {name}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-indigo-700 font-bold text-lg">₹ {price}</span>
          <button
            onClick={() => handlerAddCard(product)}
            className="bg-indigo-600 text-white px-3 py-1 text-sm rounded-md cursor-pointer hover:bg-indigo-700 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
